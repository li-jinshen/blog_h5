let baseUrl = "" // 请求地址
let uploadUrl = 'https://upload-z2.qiniup.com' // 七牛云上传地址
if (process.env.NODE_ENV === 'development') {
	// console.log('开发环境')
	baseUrl = '/api'
} else {
	// console.log('生产环境')
	// baseUrl = "https://www.incaicloud.com"
	baseUrl = 'https://lijinshen.cn/api'
}

export default {
	baseUrl,
	uploadUrl
}
