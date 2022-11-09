<template>
	<view class="">
		<view class="">
			<view class="w-full " :style="{height:statusBarHeight + 'px'}">

			</view>
			<view class="w-full relative  padding_box title_font flex items-center border_bottom font-bold"
				:style="{height:navBarHeight + 'px'}">
				博客

				<view class="absolute right-0 top-0 flex items-center padding_box"
					:style="{height:navBarHeight + 'px'}">
					<view class="bg-gray-200 rounded-full relative" style="width: 300rpx;height: 60rpx;">
						<view class="flex items-center text-sm absolute top-0 left-0 z-10">
							<view class="flex items-center justify-center duration-500" @click="changeCurrent(index)"
								v-for="(item,index) in tabs" :key="item" style="width: 150rpx;height: 60rpx;"
								:class="index==current ?'text-white' :'text-gray-500'">
								{{item}}
							</view>
						</view>
						<view class="absolute bg-primary rounded-full duration-500" style="height: 60rpx;width: 150rpx;"
							:style="{left:current * 150 + 'rpx'}">

						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:contentHeight+'px'}" class="bg-gray-100" @scrolltolower="loadmore">
			<view class="padding_box py-2">
				<view class="bg-white rounded-md mb-3 p-3" v-for="(item,index) in list" :key="index"
					style="box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.08);" @click="goDetail">
					<view class="flex justify-between " style="height: 300rpx;">
						<view class="" style="width: 290rpx;">
							<custom-image-box bg='#E2E3E8' :src='item.background' width='270rpx' height='300rpx'
								roundedClass='rounded-md' errorImageWidth='70rpx'></custom-image-box>
						</view>
						<view class="h-full flex"
							style="flex:1;display:flex;flex-flow: column;justify-content: space-between;">
							<view class="">
								<view class="text-sm font-bold">
									{{item.title}}
								</view>
								<view class="text-xs text-gray-400 intro_desc mt-2">
									{{item.Intro}}
								</view>
								<view class="mt-2">
									<text class="bg-primary text-xs rounded-md text-white mr-2"
										v-for="(tag,tagIndex) in item.category" :key='tagIndex'
										style="padding: 4rpx 10rpx;">
										{{tag}}
									</text>
								</view>
							</view>
							<view class="flex justify-between items-center">
								<view class="text-xs text-gray-400 flex items-center">
									<image :src="blogImages.view" mode="heightFix" style="height: 26rpx;width: auto;">
									</image>
									<view class="ml-1 flex items-center" style="padding-top: 4rpx;">
										{{item.views}}
									</view>
								</view>
								<view class="text-xs text-gray-400 flex items-center">
									<image :src="blogImages.date" mode="heightFix" style="height: 26rpx;width: auto;">
									</image>
									<view class="ml-1 flex items-center" style="padding-top: 4rpx;">
										{{getTime(item.date)}}
									</view>

								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="py-2">
					<u-loadmore :status="loadingStatus" fontSize='28' iconSize='160' />
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		blogImages
	} from "@/common/images.js"
	export default {
		data() {
			return {
				blogImages,
				navBarHeight: 0,
				statusBarHeight: 0,
				page: 1,
				limit: 10,
				sort: 1,
				list: [],
				maxPage: 1,
				loadingStatus: "loadmore",
				tabs: ['时间', '浏览量'],
				current: 0,
			}
		},
		onLoad() {
			this.navBarHeight = getApp().globalData.navBarHeight
			this.statusBarHeight = getApp().globalData.statusBarHeight
			this.getArticleList()
		},
		computed: {
			contentHeight: function() {
				return getApp().globalData.screenHeight - this.navBarHeight - this.statusBarHeight - 50
			}
		},
		methods: {
			// 获取文章列表
			getArticleList() {
				if (this.page == 1) {
					uni.showLoading({
						title: '数据加载中'
					})
				}
				this.loadingStatus = 'loading'
				this.$request(this.$requestPath.getSingleArticle, "GET", {
					page: this.page,
					limit: this.limit,
					sort: this.sort
				}).then(res => {
					uni.hideLoading()
					if (res.status == 1) {
						if (this.page == 1) {
							this.list = []
						}
						this.list.push(...res.data)
						this.maxPage = Math.ceil(res.count / this.limit)
						if (this.maxPage == this.page) {
							this.loadingStatus = 'nomore'
						} else {
							this.loadingStatus = 'loadmore'
						}
					} else {
						this.$u.toast(res.msg)
					}

				}).catch(err => {
					this.$u.toast(err)
				})
			},
			// 加载更多
			loadmore() {
				if (this.page == this.maxPage) {
					this.$u.toast("没有更多了")
					return
				}
				this.page++
				this.getArticleList()
			},
			// 时间转换
			getTime(timestamp) {
				let date = new Date(timestamp);
				let Y = ""
				let M = ""
				let D = ""
				Y = date.getFullYear() + '-';
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
				const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes();
				const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); // 秒
				D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				return Y + M + D
			},
			goDetail() {
				uni.showModal({
					title: '提示',
					content: '因为文章代码解析的原因，H5端暂不支持查看博客详情，请在web端访问'
				})
			},
			changeCurrent(index) {
				this.current = index
				this.page = 1
				this.sort = this.current + 1
				this.getArticleList()
			}
		}
	}
</script>

<style>
</style>
