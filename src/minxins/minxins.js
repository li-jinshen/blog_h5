// 混入文件
import {
	mapState
} from "vuex"
let uploadUrl = 'https://upload-z2.qiniup.com' // 七牛云上传地址
export default {
	data() {
		return {
			ImageList: []
		}
	},
	computed: {
		...mapState('common', ['qiniuData'])
	},
	methods: {
		/**
		 * 图片上传
		 * 如需自定义保存上传的图片，可以传入callback 回调函数
		 */
		chooseImage(_, count = 1, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera'], data = {},
			callback) {
			let formData = {
				token: this.qiniuData.accessToken,
				...data
			}
			uni.chooseImage({
				count,
				sizeType,
				sourceType,
				success: (res) => {
					console.log(JSON.stringify(res.tempFilePaths));
					const tempFilePaths = res.tempFilePaths;
					tempFilePaths.forEach(item => {
						uni.uploadFile({
							url: uploadUrl,
							filePath: item,
							name: 'file',
							formData,
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
								let list = this.ImageList
								let res = JSON.parse(uploadFileRes.data)
								if (count == 1) {
									this.ImageList = []
									this.ImageList.push(this.qiniuData.domain + "/" +
										res.hash)
								} else {
									this.ImageList.length < count ? this.ImageList.push(
										this.qiniuData.domain + "/" + res.hash) : ""
								}
								callback ? callback(this.qiniuData.domain + "/" + res
									.hash) : ""
								console.log(this.ImageList)

							},
							fail: (err) => {
								uni.showToast({
									title: JSON.stringify(err)
								})
							}
						});
					})

				},
				fail: (err) => {
					console.log(err)
				}
			});
		},
	}
}
