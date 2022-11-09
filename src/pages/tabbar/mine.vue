<template>
	<view class="">
		<view class="bg-primary" style="width: 100%;height: 460rpx;">
			<view class="flex justify-center items-center pt-10">
				<view class="">
					<custom-image-box bg='#E2E3E8' :src='info.photo' width='150rpx' height='150rpx'
						roundedClass='rounded-full' errorImageWidth='70rpx'></custom-image-box>
					<view class="text-white font-bold text-center mt-2 text-base">
						{{info.userName}}
					</view>
				</view>

			</view>
			<view class="px-8">
				<view class="bg-white rounded  mt-4 p-4" style="box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.08);">
					<view class="text-gray-600 text-sm">
						<view class="">
							职业：前端工程师
						</view>
						<view class="py-2">
							年龄：90后
						</view>
						<view class="pb-2">
							所在地：惠州
						</view>
						<view class="">
							个性签名：我在观察人间
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="px-8" style="padding-top: 160rpx;">
			<view class="bg-white rounded  mt-4 p-4 flex justify-center"
				style="box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.08);">
				<view class="text-gray-500 text-sm">
					<view class="text-center">
						云烟深处
					</view>
					<view class="text-center py-2">
						版本：V2.0.0
					</view>
					<view class="text-center pb-2">
						总访问量：{{visit}}
					</view>
					<view class=" text-center">
						粤ICP备2022128053号
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				visit: 0
			}
		},
		onLoad() {
			this.getBlogInfo()
			this.getVisitorsRecord()
		},
		methods: {
			getBlogInfo() {
				this.$request(this.$requestPath.getBloggerProfile, "GET").then(res => {
					console.log("获取的信息", res)
					this.info = Object.assign({}, res)
				}).catch(err => {
					this.$u.toast(err)
				})
			},
			getVisitorsRecord() {
				this.$request(this.$requestPath.getVisitorsRecord, "GET").then(res => {
					console.log("获取的访问量", res)
					this.visit = res.count
				}).catch(err => {
					this.$u.toast(err)
				})
			}
		}
	}
</script>

<style>
</style>
