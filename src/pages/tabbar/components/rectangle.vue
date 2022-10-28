<template>
	<view class="flex justify-between padding_box" style="width: 100vw;">
		<view class="mb-3 bg-white w-full rounded" style="box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.0600);">
			<view class="p-3 rounded  flex">
				<custom-image-box bg='#E2E3E8' :src='info.picture' width='200rpx' height='200rpx' roundedClass='rounded'
					errorImageWidth='70rpx'></custom-image-box>
				<view class="pl-4" style="flex:1">
					<view class="">
						{{info.name}}
					</view>
					<view class="text-sm text-gray-400 content_desc">
						{{info.describe}}
					</view>
				</view>
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
		}
	}
</script>

<style>
</style>
