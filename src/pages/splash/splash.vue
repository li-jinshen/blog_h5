<template>
	<view class="flex justify-center items-center" style="height: 100vh;width: 100%;">
		<view class="">
			<view class="text-primary text-center">
				H5端正在开发中，敬请期待
			</view>
			<view class="flex justify-center mt-12">
				<view class="">
					<image :src="splashImages.yun" mode="widthFix" style="width: 80rpx;height: auto;"></image>
					<image :src="splashImages.yan" mode="widthFix" style="width: 80rpx;height: auto;"></image>
					<image :src="splashImages.shen" mode="widthFix" style="width: 80rpx;height: auto;"></image>
					<image :src="splashImages.chu" mode="widthFix" style="width: 80rpx;height: auto;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		splashImages
	} from "@/common/images.js"
	export default {
		data() {
			return {
				splashImages,
			}
		}
	}
</script>

<style>
</style>
