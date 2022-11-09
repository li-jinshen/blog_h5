<template>
	<view>
		<view class="border_bottom">
			<view class="w-full " :style="{height:statusBarHeight + 'px'}">

			</view>
			<view class="w-full  padding_box title_font flex items-center border_bottom font-bold"
				:style="{height:navBarHeight + 'px'}">
				工具
			</view>
		</view>
		<view class="flex items-center " style="height: 80rpx;">
			<custom-tabs :tabData="list" :activeIndex="current" @tabClick='tabClick' ref='tabs'></custom-tabs>
		</view>
		<swiper class="swiper" :autoplay="false" :style="{height:contentHeight + 'px'}" @change='change' :current='current'>
			<swiper-item v-for="swiper in list" :key='swiper._id'  >
				<scroll-view scroll-y="true" :style="{height:contentHeight + 'px'}" class="bg-gray-100">
					<view>
						<view class="">
							<template class="" v-if="cateData[swiper._id].list.length>0">
								<template v-if="cateData[swiper._id].style=='square'">
									<view
										class="flex justify-between py-3 padding_box flex flex-wrap items-center w-full">
										<view v-for="(item,index) in cateData[swiper._id].list" :key='item.id'>
											<square :info="item" :index='index'></square>
										</view>
									</view>
								</template>
								<template v-else>
									<view class="py-3">
										<view v-for="(item,index) in cateData[swiper._id].list" :key='item.id'>
											<rectangle :info='item'></rectangle>
										</view>
									</view>
								</template>

							</template>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import Rectangle from "./components/rectangle.vue"
	import Square from "./components/square.vue"
	export default {
		data() {
			return {
				list: [],
				current: 0,
				cateId: "",
				cateData: {},
				cateIdList: [],
				navBarHeight: 0,
				statusBarHeight: 0,
			}
		},
		onLoad() {
			this.navBarHeight = getApp().globalData.navBarHeight
			this.statusBarHeight = getApp().globalData.statusBarHeight
			this.getModel()
		},
		computed: {
			contentHeight: function() {
				return getApp().globalData.screenHeight - this.navBarHeight - this.statusBarHeight - 50 - 40
			}
		},
		components: {
			Rectangle,
			Square
		},
		methods: {
			change(e){
				this.$refs.tabs.tabClick(e.detail.current)
				// this.tabClick(e.detail.current)
			},
			tabClick(e) {
				this.current = e
				this.cateId = this.list[this.current]._id
				let target = this.cateData[this.cateId]
				if (target.list.length == 0) {
					let data = {
						id: this.cateId
					}
					this.getModelList(data)
				}
			},
			getModel() {
				this.$request(this.$requestPath.getModel, "GET", {}).then(res => {
					console.log("获取的模块", res)
					if (res.status) {
						this.list = []
						res.data.forEach(item => {
							let obj = {
								list: [],
								showEmpty: false,
								style: ""
							}
							this.$set(this.cateData, item._id, obj)

						})
						res.data.sort(function(a, b) {
							return a.sort - b.sort
						});
						this.list.push(...res.data)
						if (this.list.length > 0) {
							this.cateId = this.list[0]._id
							let data = {
								id: this.cateId
							}
							this.getModelList(data)
						}
					}
				})
			},
			getModelList(data) {
				let {
					id
				} = data
				uni.showLoading({
					title: '数据加载中'
				})
				this.$request(this.$requestPath.getModelList, 'GET', data).then(res => {
					uni.hideLoading()
					if (res.status) {
						let {
							modelList,
							style
						} = res.data
						modelList.sort(function(a, b) {
							return a.sort - b.sort
						});
						this.cateData[id].list.push(...modelList)
						this.cateData[id].style = style
					} else {
						this.$u.toast(res.msg)
					}
				}).catch(err => {
					uni.hideLoading()
					this.$u.toast(err)
				})
			}
		}
	}
</script>

<style>
</style>
