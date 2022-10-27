import api from "./api.js";
import store from "@/store/index.js";
import {
	debounce
} from "@/utils/tools.js"
export default function request(networkUrl, methodsWay, dataCont, type, util) {
	// 默认为开启错误提示
	if (util == undefined) {
		util = {
			showError: true, //开启错误提示
		};
	}
	return new Promise((resolve, reject) => {
		uni.request({
			header: {
				"Content-Type": type ? type : "application/json",
				token: uni.getStorageSync("token") ?
					"Bearer " + uni.getStorageSync("token") : "",
			},
			url: api.baseUrl + networkUrl, //由基础路径和接口地址
			method: methodsWay || "GET", //请求的方式必须大写
			data: dataCont || {}, //参数

			// 成功使用resolve
			success: (res) => {
				if (res.data.code == 40001) {
					debounce(() => {
						uni.showToast({
							title: "登录凭证已过期，请重新登录",
							icon: "none",
							duration: 1500,
						});
						store.commit("user/loginOut");
					}, 500)
					return;
				}
				if (res.data && res.statusCode == 200) {
					resolve(res.data);
				} else {
					/**
					 * 请求失败，是否要提示出来;
					 * showError: true,开启错误提示
					 *  showError: false,关闭错误提示
					 * */
					if (util.showError) {
						// showError(res);
					}
					resolve(res.data);
				}
			},
			//失败调用reject，
			fail: (err) => {
				// 失败做处理
				if (util.showError) {
					showError(err);
				}
				reject(err);
			},
		});
	});
}

// 错误处理
const showError = (error) => {
	console.log(error);
	if (error) {
		switch (error.data.code) {
			case 401:
				uni.showToast({
					title: "没有权限",
					icon: "none",
					duration: 1000,
				});
				break;

			case 403:
				uni.showToast({
					title: "拒绝访问",
					icon: "none",
					duration: 1000,
				});
				break;

			case 404:
				uni.showToast({
					title: "很抱歉，资源未找到!",
					icon: "none",
					duration: 1000,
				});
				break;

			case 500:
				uni.showToast({
					title: "没有权限",
					icon: "none",
					duration: 1000,
				});
				break;

			case 502:
				uni.showToast({
					title: "服务器异常",
					icon: "none",
					duration: 1000,
				});
				break;

			case 504:
				uni.showToast({
					title: "网络超时",
					icon: "none",
					duration: 1000,
				});
				break;

			default:
				uni.showToast({
					title: "网络错误",
					icon: "none",
					duration: 1000,
				});
				break;
		}
	}
};
