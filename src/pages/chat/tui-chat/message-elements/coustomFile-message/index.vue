<template>
	<view>
		<view class="TUI-fileMessage" @tap.stop="download">
			<view class="fileMessage">
				<view class="fileMessage-box">
					<image class="file-icon" :src="chatImages.file"></image>
					<label class="file-title">{{ filePayload.name }}</label>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center" :closeable="false" border-radius="14">
			<view style="width: 600rpx;overflow: hidden;">
				<view class="py-3 text-lg text-center">提示</view>
				<view class="py-1" style="border-top:2rpx solid #D6D8DF"></view>
				<view class="py-4 px-4 text-sm text-center text-light flex justify-around items-center">
					<text class="text-info" @tap.stop="downloadConfirm('view')">预览</text>
					<text class="text-primary" @tap.stop="downloadConfirm('downloadConfirm')">下载</text>
					<text @click="show=false">取消</text>
				</view>

			</view>
		</u-popup>
		<!-- <view class="pop" v-if="Show">
			<view class="text-box"><text class="download-confirm" @tap.stop="downloadConfirm">下载</text></view>
			<view class="text-box"><text class="abandon" @tap="cancel">取消</text></view>
		</view> -->
	</view>
</template>

<script>
	import {chatImages} from "@/common/images.js"
	export default {
		data() {
			return {
				filePayload: {},
				show: false,
				chatImages
			};
		},

		components: {},
		props: {
			message: {
				type: Object,
				default: () => {}
			},
			isMine: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			message: {
				handler: function(newVal) {
					// console.log("newVal", newVal)
					this.filePayload = Object.assign({}, JSON.parse(newVal.payload.extension))
					// console.log("this.filePayload", this.filePayload)
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			download() {
				if (this.filePayload.type == "document") {
					this.show = true
				} else {
					this.downloadConfirm('download')
				}
			},

			downloadConfirm(type) {
				uni.downloadFile({
					url: this.filePayload.url,
					success: (res) => {
						const filePath = res.tempFilePath;
						if (type == 'view') {
							uni.openDocument({
								filePath,
								success() {
									console.log('打开文档成功');
								}
							});
						} else {
							uni.navigateTo({
								url: `/pages/chat/uploadFile?downloadUrl=${this.filePayload.url}`
							})
							// uni.saveFile({
							// 	tempFilePath: filePath,
							// 	success: (res) => {
							// 		var savedFilePath = res.savedFilePath;
							// 		uni.showModal({
							// 			title: '提示',
							// 			content: `文件保存成功，存储路径为：${savedFilePath}`
							// 		})
							// 	},
							// 	fail: () => {
							// 		this.$u.toast("文件保存失败")
							// 	}
							// });
						}
						this.show = false

					},
					fail: () => {
						this.$u.toast("文件保存失败")
					}
				});
			},
			cancel() {
				this.setData({
					Show: false
				});
			}
		}
	};
</script>
<style>
	@import './index.css';
</style>
