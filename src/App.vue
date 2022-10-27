<script>
	export default {
		globalData: {
			primaryColor: "#E11E56",
			statusBarHeight: 0,
			navBarHeight: 45,
			screenHeight: 0,
			uploadUrl: 'https://upload-z2.qiniup.com' // 七牛云上传地址
		},
		onLaunch: function() {
			this.initSystem()
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			// setTimeout(() => {
			// 	this.shareDealFunction(); // 检测启动参数
			// }, 500);
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			initSystem() {
				// 状态栏高度
				const e = uni.getSystemInfoSync();
				this.globalData.statusBarHeight = e.statusBarHeight
				let navBarHeight = 45
				// #ifdef MP-WEIXIN
				//获取胶囊位置信息
				let menuBottonInfo = uni.getMenuButtonBoundingClientRect();
				// 胶囊底部 - 状态栏 + 胶囊顶部 - 状态栏 = 导航栏的高度（胶囊距离顶部的距离+胶囊距离底部距离+胶囊自身的高度）
				navBarHeight = menuBottonInfo.bottom - e.statusBarHeight + (menuBottonInfo.top - e.statusBarHeight);
				// #endif
				this.globalData.navBarHeight = navBarHeight // 导航栏高度
				this.globalData.screenHeight = e.safeArea.height // 页面高度
			},
			// 有关分享的处理
			// shareDealFunction() {
			// 	// 当其它三方App通过scheme启动App时，可以通过plus.runtime.arguments获取完整的urlscheme字符串。
			// 	// #ifdef APP-PLUS
			// 	try {
			// 		var args = plus.runtime.arguments;
			// 		console.log("args", args)
			// 		if (args) {
			// 			plus.runtime.arguments = null;
			// 			plus.runtime.arguments = "";
			// 			// 处理args参数，如直达到某新页面等
			// 			let params = args.split("?")[1]
			// 			let data = qs.parse(params)
			// 		}
			// 	} catch (e) {
			// 		// 若传入的参数不是JSON格式字符，需处理异常情况
			// 	}
			// 	// #endif
			// },

		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import "@/style/tailwind.css";
</style>
