<template>
	<view class="">
		<view class="w-full" style="border-bottom: 2rpx solid #E4E4E4;box-sizing: border-box;">
			<view class="" :style="{height:statusBarHeight + 'px'}">

			</view>
			<view class="flex padding_box relative" :style="{height: navBarHeight + 'px'}">
				<view class="flex items-center absolute left-0 top-0 bottom-0 padding_box" style="width: 80rpx;"
					@click="goBack">
					<u-icon name="arrow-left" size="40" color='black'></u-icon>
				</view>
				<view class="px-2 items-center h-full  flex title_font" style="flex:1;padding: 0rpx 80rpx;">
					{{title}}
				</view>
				<view class="flex flex-end items-center" style="padding-right: 0rpx;">
					<view class="bg-primary text-white text-sm rounded flex justify-center items-center"
						style="width: 120rpx;height: 56rpx;" @click="saveFunc">
						保存
					</view>
				</view>
			</view>
		</view>
		<custom-editor ref="contentEdit" showInsertImg @uploadImgBefore="uploadImgBefore" :pageScrollTop="pageScrollTop"
			v-model="content"></custom-editor>
	</view>
</template>
<script>
	import customEditor from '@/components/customEditor/kn_editor.vue'
	// https://ext.dcloud.net.cn/plugin?id=7816  插件地址
	import minxinsData from "@/minxins/minxins.js"
	import {
		mapState
	} from "vuex"
	export default {
		components: {
			customEditor
		},
		mixins: [minxinsData],
		data() {
			return {
				content: '',
				pageScrollTop: 0,
				statusBarHeight: 0,
				navBarHeight: 0,
				title: "编辑",
				type: "",
			}
		},
		computed: {
			// ...mapState('course', ['editContent']),
		},
		onLoad(options) {
			this.statusBarHeight = getApp().globalData.statusBarHeight
			this.navBarHeight = getApp().globalData.navBarHeight
			this.type = options.type
			this.type == 'desc' ? this.title = '简介编辑' : this.title = '文章编辑'
			// 获取七牛授权token
			// this.$store.dispatch("common/getAccessToken")
			// this.editContent ? this.content = this.editContent : ""
		},
		methods: {
			goBack() {
				uni.showModal({
					title: "提示",
					content: "退出后编辑的内容将会丢失，是否确定退出",
					success: (e) => {
						if (e.confirm) {
							this.$navigateBack()
						}
					}
				})
			},
			// 图片上传
			uploadImgBefore() {
				// 上传逻辑
				this.chooseImage("", 1, ['original', 'compressed'], ['album', 'camera'], {},
					url => {
						console.log(url)
						this.$refs.contentEdit.insertImage(url)
					})
			},
			// 保存
			saveFunc() {
				console.log(this.content)
				// this.$store.commit("course/updateEditContent", this.content)
				this.$navigateBack()
			}
		},
	}
</script>
