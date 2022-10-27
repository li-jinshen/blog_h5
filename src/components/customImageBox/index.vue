<template>
	<view class="relative" :class="[roundedClass]" :style="{borderRadius:borderRadius,height:height,width:width}"
		style="overflow: hidden;">
		<custom-loading v-if="status == 'loading'" :bgColor='bgColor'></custom-loading>
		<image :src="src" :mode="mode" :style="{width:imageWeight,height:imageHeight}" @load='loadFunc'
			@error='errorFunc' @click="previewImage"></image>
		<view class="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center z-10"
			:style="{background:bgColor}" v-if="status == 'error'">
			<image src="./images/error.png" mode="widthFix" style="height: auto;" :style="{width:errorImageWidth}">
			</image>
		</view>
	</view>
</template>

<script>
	import CustomLoading from "@/components/customLoading/index.vue"
	export default {
		components: {
			CustomLoading
		},
		props: {
			roundedClass: { // 设置圆角的类名 rounded rounded-full   tailwind css的圆角类名
				type: String,
				default: ""
			},
			borderRadius: { //  指定圆角大小
				type: String,
				default: ""
			},
			width: { // 图片外部box的宽度
				type: String,
			},
			height: { // 图片外部box的高度
				type: String,
			},
			src: { // image src
				type: String,
				require: true
			},
			mode: { // image的mode
				validator(value) {
					return ['aspectFit', 'aspectFill', 'widthFix', 'heightFix'].indexOf(value) !== -1;
				},
				default: "aspectFill"
			},
			imageWeight: { // 图片的宽度
				type: String,
				default: "100%"
			},
			imageHeight: { // 图片的高度
				type: String,
				default: "100%"
			},
			bgColor: { // loading的背景颜色
				type: String,
				default: "#f6f6f6"
			},
			errorImageWidth: { // error图片的宽度
				type: String,
				default: '80rpx'
			},
			isPreview: { // 是否启用图片预览
				type: Boolean,
				default: false,
			},
			pirctures: { // 预览的图片数组
				type: Array,
				default: () => {
					return []
				},
			},
			current: { // 当前预览的图片的下标值
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				status: 'loading', // loading 加载中  success 加载成功  error 加载失败
			}
		},
		methods: {
			loadFunc() {
				this.status = 'success'
			},
			errorFunc() {
				this.status = 'error'
			},
			previewImage() {
				if (!this.isPreview) {
					return
				}
				uni.previewImage({
					urls: this.pirctures,
					current: this.current,
					success: () => {

					},
					fail: (err) => {
						this.$u.toast(err)
					}
				})
			}
		}
	}
</script>

<style>
</style>
