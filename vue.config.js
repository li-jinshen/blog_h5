// vue.config.js，如没有此文件则手动创建
module.exports = {
    transpileDependencies: ['uview-ui'],
	devServer: {
		hot: true,
		// port: '8088',
		disableHostCheck: true,
		clientLogLevel: 'warning',
		proxy: {
			'/api': {
				target: 'https://lijinshen.cn',
				// target:"https://a1003.demo.huizhouyiren.com",
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/api': ''
				// }
			}
		},
		overlay: {
			warnings: true,
			errors: true
		}
	}
}