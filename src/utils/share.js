//  分享
// #ifdef APP-PLUS
import appShare, {
	closeShare
} from '@/uni_modules/zhouWei-APPshare/js_sdk/appShare';
// #endif
export default function shareFunc(data) {
	let {
		params,
		shareImg,
		shareContent,
		shareTitle
	} = data
	// #ifdef APP-PLUS
	let shareData = {
		shareUrl: `http://c0504-share.demo.huizhouyiren.com?${params}`,
		shareTitle,
		shareContent,
		shareImg,
		appId: getApp().globalData.wxAppID, // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
		appPath: "pages/tabbar/home",
		appWebUrl: `http://c0504-share.demo.huizhouyiren.com?${params}`,
	};
	// 调用
	let shareObj = appShare(shareData, res => {
		console.log("分享成功回调", res);
		// 分享成功后关闭弹窗
		// 第一种关闭弹窗的方式
		closeShare();
	});
	// setTimeout(() => {
	// 	// 第二种关闭弹窗的方式
	// 	shareObj.close();
	// }, 5000);
	// #endif
}
