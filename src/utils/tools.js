// 弹窗提示
export function showToast(msg, time = 1000) {
	uni.showToast({
		title: msg,
		icon: "none",
		duration: time
	})
}

// 处理时间
export function parseDate(timestamp, type, text) {
	/**
	 * @timetamp  时间戳
	 * @type 类型
	 * @text 拼接的字符串
	 */
	let date = new Date(timestamp);
	let Y = ""
	let M = ""
	let D = ""
	if (type == 'Chinese') {
		Y = date.getFullYear() + '年';
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
		D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日';
		return M + D
	}
	Y = date.getFullYear() + text;
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + text;
	const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
	const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
	const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); // 秒
	if (type == 'full') {
		D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		return Y + M + D + h + m + s;
	}
	if (type == 'simple') {
		D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		return Y + M + D;
	}

	if (type == 'time') {
		return h + m + s;
	}
}



// 校验手机号和座机
export function checkPhone(phone) {
	let result = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(phone)
	return result
}

let timeout = null;
/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行 
 * @return null
 */
export function debounce(func, wait = 500, immediate = false) {
	// 清除定时器
	if (timeout !== null) clearTimeout(timeout);
	// 立即执行，此类情况一般用不到
	if (immediate) {
		var callNow = !timeout;
		timeout = setTimeout(function() {
			timeout = null;
		}, wait);
		if (callNow) typeof func === 'function' && func();
	} else {
		// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
		timeout = setTimeout(function() {
			typeof func === 'function' && func();
		}, wait);
	}
}




let timer, flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
export function throttle(func, wait = 500, immediate = true) {
	if (immediate) {
		if (!flag) {
			flag = true;
			// 如果是立即执行，则在wait毫秒内开始时执行
			typeof func === 'function' && func();
			timer = setTimeout(() => {
				flag = false;
			}, wait);
		}
	} else {
		if (!flag) {
			flag = true
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			timer = setTimeout(() => {
				flag = false
				typeof func === 'function' && func();
			}, wait);
		}

	}
};
