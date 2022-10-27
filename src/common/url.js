/**
 * 请求路径
 */
let baseUrl = ""
if (process.env.NODE_ENV === 'development') {
	// console.log('开发环境')
	// #ifdef MP-WEIXIN
	baseUrl = ""
	//  #endif
	// #ifdef APP-PLUS
	baseUrl = ""
	//  #endif
} else {
	// console.log('生产环境')
	// baseUrl = "https://www.incaicloud.com"
	// #ifdef APP-PLUS
	baseUrl = "https://b0701-uploadfile.demo.huizhouyiren.com"
	//  #endif
	// #ifdef APP-PLUS
	baseUrl = ""
	//  #endif
}

export default baseUrl
