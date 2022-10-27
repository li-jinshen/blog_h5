<template>
	<view class="content py-4">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view>
			<view class="text-center mb-2">
				按钮示例
			</view>
			<view class="flex justify-center mb-4">
				<custom-button text='loading效果' type='primary' height='80rpx' width='500rpx' fontSize='30rpx'
					@submit='checkData' :loading='loading'></custom-button>
			</view>
			<view class="flex justify-center">
				<custom-button text='提交' type='default' height='80rpx' width='500rpx' fontSize='30rpx'
					@submit='gotoRegister'>

				</custom-button>
			</view>
		</view>
		<view class="mt-8">
			<view class="text-center mb-2">
				图片加载框示例
			</view>
			<custom-image-box
				src='https://pic1.zhimg.com/80/v2-b2b10364c745847811994a69c21d5532_720w.webp?source=1940ef5c'
				width='400rpx' height='400rpx' roundedClass='rounded' errorImageWidth='70rpx'></custom-image-box>
		</view>
		<view class="mt-8">
			<view class="text-center mb-2">
				tabs示例
			</view>
			<view class="flex items-center padding_box" style="height: 80rpx;">
				<custom-tabs :tabData="list" :activeIndex="current" @tabClick='tabClick' :config='config'></custom-tabs>
			</view>
		</view>
		<view class="mt-8">
			<custom-button text='聊天页' type='default' height='80rpx' width='500rpx' fontSize='30rpx'
				@submit="goPage('/pages/chat/chat')">
				<template slot='suffix'>
					<u-icon name="chat-fill" color='#dd524d'></u-icon>
				</template>
			</custom-button>
		</view>
		<view class="mt-8">
			<custom-button text='富文本编辑' type='default' height='80rpx' width='500rpx' fontSize='30rpx'
				@submit="goPage('/pages/edit/edit')">
				<template slot='prefix'>
					<u-icon name="moments" color='#dd524d'></u-icon>
				</template>
			</custom-button>
		</view>
		<view class="mt-8">
			<custom-button text='layer示例' type='default' height='80rpx' width='500rpx' fontSize='30rpx'
				@submit="goPage('/pages/layerDemo/index')">
			</custom-button>
		</view>

		<view class="padding_box w-full mt-8">
			<view class="text-center mb-2">
				list示例
			</view>
			<custom-list v-for='item in listData' :key='item.title' :icon='item.icon' :count='item.count'
				:url='item.url' :title='item.title' :showBorder='true' textColor='#666666' @submit='listSubmit'>
			</custom-list>
		</view>


	</view>
</template>

<script>
	import {
		mineImages
	} from "@/common/images.js"
	import CustomList from "@/components/customList/customList"
	export default {
		components: {
			CustomList
		},
		data() {
			return {
				mineImages,
				loading: false,
				list: [{
					name: '动态',
					key: "moments"
				}, {
					name: '相册',
					key: "album"
				}, {
					name: '视频',
					key: 'video'
				}, {
					name: '访客',
					key: "visitors"
				}],
				current: 0,
				listData: [{
					icon: mineImages.mine5,
					title: '朋友圈',
					url: "/pages/dynamic/dynamic"
				}, {
					icon: mineImages.mine6,
					title: '邮件',
					url: "/pages/email/email",
					count: 1
				}, {
					icon: mineImages.mine8,
					title: '喜欢',
					url: "/pages/mine/like",
				}, {
					icon: mineImages.mine9,
					title: '信用点余额',
					url: "/pages/mine/money"
				}, {
					icon: mineImages.mine7,
					title: '设置',
					url: "/pages/mine/setting"
				}],
				config: {
					color: '#666666',
					activeColor: '#333333',
					underLineColor: '#E11E56',
				}
			}
		},
		onLoad() {

		},
		methods: {
			checkData() {
				this.loading = true
				setTimeout(() => {
					this.loading = false
				}, 3000)
			},
			tabClick(e) {
				this.current = e
			},
			goPage(url) {
				uni.navigateTo({
					url
				})
			},
			listSubmit(e) {
				console.log("list点击了", e)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
