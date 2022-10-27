import testObject from "./test.js"
export function Check(data, options) {
	let result = options.every(item => {
		/**
		 *  mode的值：require 必填，不能为空  length 长度校验 (minLength:最小长度，maxLength:最大长度)   custom 自定义校验  phone 手机校验
		 * 
		   options:
		 * [ 	{
					key: 'startHours',
					message: "请输入自定义时长",
					mode: "require"
				},
				{
					key: 'endHours',
					message: "请输入自定义时长",
					mode: "custom",
					func: () => {
						if (this.selectWorkIndex > -1) {
							return true
						} else {
							return false
						}
					}
				}
			]
		 */
		switch (item.mode) {
			case 'require':
				if (isNull(data[item.key])) {
					showToast(item.message)
					return false
				}
				return true
				break;
			case 'length':
				if (item.minLength) {
					if (data[item.key].length < item.minLength) {
						showToast(item.message)
						return false
					}
					return true
				}
				if (item.maxLength) {
					if (data[item.key].length > item.maxLength) {
						showToast(item.message)
						return false
					}
					return true
				}
				break;
			case 'phone':
				let res = checkPhone(data[item.key])
				if (res) {
					return true
				} else {
					showToast(item.message)
					return false
				}
				break;
			case 'email':
				let emailRes = testObject.email(data[item.key])
				if (emailRes) {
					return true
				} else {
					showToast(item.message)
					return false
				}
				break
			case 'custom':
				let customResult = item.func()
				if (customResult) {
					return true
				} else {
					showToast(item.message)
					return false
				}
				break;

		}

	})
	return result
}

// 弹窗提示
export function showToast(msg, time = 1000) {
	uni.showToast({
		title: msg,
		icon: "none",
		duration: time
	})
}
// 判断是否非空
export function isNull(str) {
	if (str == "") return true;
	if (
		str == null ||
		str === 'null' ||
		str === '' ||
		str === undefined ||
		str === 'undefined' ||
		str === 'unknown'
	) {
		return true
	}
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}

// 手机号码校验
export function checkPhone(phone) {
	if (/^1[3-9]\d{9}$/.test(phone)) {
		return true;
	} else {
		return false;
	}
};

//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
export function checkRate(nubmer) {
	var re = /^[0-9]+.?[0-9]*/;
	if (!re.test(nubmer)) {
		return false
	}
	return true
}

// 银行卡校验
export function CheckBankNo(bankAccount) {
	if (bankAccount == "") {
		uni.showToast({
			duration: 1000,
			title: '请填写银行卡账号',
			icon: "none"
		})
		return false;
	}
	if (bankAccount.length < 15 || bankAccount.length > 19) {
		uni.showToast({
			duration: 1000,
			title: '银行卡号长度必须在15到19之间',
			icon: "none"
		})
		return false;
	}
	var num = /^[0-9]*$/; //全数字
	if (!num.exec(bankAccount)) {
		uni.showToast({
			duration: 1000,
			title: '银行卡号必须全为数字',
			icon: "none"
		})
		return false;
	}
	//开头6位
	var strBin =
		"10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
	if (strBin.indexOf(bankAccount.substring(0, 2)) == -1) {
		uni.showToast({
			duration: 1000,
			title: '银行卡号开头6位不符合规范',
			icon: "none"
		})
		return false;
	}
	return true;
}
