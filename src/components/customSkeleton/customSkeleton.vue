<!-- 骨架屏 -->
<template>
	<view style="margin: 0 30rpx;" class="rounded bg-gray-100 flex justify-center items-center"
		:style="{height: height}">
		<u-loading-icon text="加载中" :size="iconSize" :textSize='textSize'></u-loading-icon>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: "加载中"
			},
			iconSize: {
				type: [Number, String],
				default: 40
			},
			textSize:{
				type: [Number, String],
				default: 30
			},
			height: {
				type: String,
				default: '200rpx'
			}
		}
	}
</script>

<style>
</style>
