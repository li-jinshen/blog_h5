<template>
	<view class="mb-3">
		<view class="p-4 rounded bg-white" style="box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.0600);" @click="goPage">
			<custom-image-box :src='info.picture' width='270rpx' height='270rpx' roundedClass='rounded'
				errorImageWidth='70rpx'></custom-image-box>
			<view class="mt-2 text-light flex items-center justify-center  text-center text-sm content_desc">
				{{info.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				}
			},
			index: {
				type: [Number, String],
				default: 0,
			}
		},
		data() {
			return {

			}
		},
		methods:{
			goPage(){
				console.log("this.info.type",this.info.type)
				if(this.info.type == 'link'){
					// #ifdef H5
					window.location.href = this.info.link
					// #endif
				}
			}
		}
	}
</script>

<style>
</style>
