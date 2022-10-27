/**
 * 页面返回功能 
 */
export default function navigateBack() {
	console.log("dainjil")
	let pages = getCurrentPages()
	if (pages.length == 1) { // 处理H5刷新后的跳转，刷新后页面栈长度为1，统一跳转到首页
		uni.reLaunch({
			url: "/pages/index/index"
		})
	} else {
		uni.navigateBack()
	}
}
