/**
 * 第三方模块相关
 * 微信支付 | 微信登录
 */
import {
	showToast
} from "./tools.js"

// 微信支付
export function wechatPay(datas, callbackFunc) {
	// #ifdef APP-PLUS
	uni.requestPayment({
		"provider": "wxpay",
		'orderInfo': {
			"appid": datas.appId,
			"noncestr": datas.nonceStr,
			"package": datas.packageValue,
			"partnerid": datas.partnerId,
			"prepayid": datas.prepayId,
			"timestamp": datas.timeStamp,
			"sign": datas.sign
		},
		success: (res) => {
			callbackFunc()
		},
		fail(err) {
			showToast("支付失败")
			console.log("支付失败", err)

		}
	})
	// #endif

	// #ifdef MP-WEIXIN
	uni.requestPayment({ //下面参数为必传
		provider: 'weixin', //支付类型
		appId: datas.appId, //小程序Appid
		timeStamp: datas.timeStamp, //创建订单时间戳
		nonceStr: datas.nonceStr,
		package: datas.packageValue, // 订单包
		signType: datas.signType, // 加密方式
		paySign: datas.sign, // 后台支付签名返回
		success: (res) => {
			callbackFunc()
		},
		fail(err) {
			showToast("支付失败")
		}
	})
	// #endif
}


// 微信授权登录
export function wechatLogin(callback) {
	// #ifdef H5
	showToast('微信登录暂时未开放,请先使用手机或账号密码登录吧!');
	// #endif

	// #ifdef APP-PLUS
	let weixinService = null;
	plus.oauth.getServices(
		function(services) {
			if (services && services.length) {
				for (var i = 0, len = services.length; i < len; i++) {
					if (services[i].id === 'weixin') {
						weixinService = services[i];
						break;
					}
				}
				if (!weixinService) {
					console.log('没有微信登录授权服务');
					return;
				}

				weixinService.authorize(
					function(event) {
						//此处获取code的关键
						console.log(event.code, '这次是真的授权后返回的code');
						callback(event)
					},
					function(error) {
						console.error('authorize fail:' + JSON.stringify(error))
					},
					function() {
						// console.log("")
					}
				);
			} else {
				console.log('无可用的登录授权服务');
			}
		},
		function(error) {
			console.error('getServices fail:' + JSON.stringify(error));
		}
	);
	// #endif

	// #ifdef MP-WEIXIN
	uni.getProvider({
		service: 'oauth',
		success: res => {
			if (~res.provider.indexOf('weixin')) {
				uni.login({
					provider: 'weixin',
					success: (event) => {
						console.log('event', event)
						callback(event)
					},
					fail: () => {
						showToast("微信登录失败");
					}
				})
			} else {
				uni.showToast('请先安装微信或升级版本');
			}
		}
	});
	//#endif
}
