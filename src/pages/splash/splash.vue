<template>
	<view class="flex justify-center items-center" style="height: 100vh;width: 100%;">
		<view class="">
			<view class="flex justify-center mb-12">
				<!-- <view class="">
					<image :src="splashImages.yun" mode="widthFix" style="width: 80rpx;height: auto;"></image>
					<image :src="splashImages.yan" mode="widthFix" style="width: 80rpx;height: auto;"></image>
					<image :src="splashImages.shen" mode="widthFix" style="width: 80rpx;height: auto;"></image>
					<image :src="splashImages.chu" mode="widthFix" style="width: 80rpx;height: auto;"></image>
				</view> -->
				<loading></loading>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		splashImages
	} from "@/common/images.js"
	import Loading from "./components/loading.vue"
	export default {
		data() {
			return {
				splashImages,

			}
		},
		components:{
			Loading
		}
	}
</script>

<style>
</style>
