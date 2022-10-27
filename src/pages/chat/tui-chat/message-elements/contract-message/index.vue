<template>
	<!-- 合约 -->
	<view class="py-2 flex justify-center">
		<view class="text-sm flex items-center" v-if="isApply">
			<view class="text-light">
				您收到了一份合约
			</view>
			<view class="text-primary" @click="goPage">
				【点击查看】
			</view>
		</view>
		<view class="text-light" v-else>
			您发送了一份合约
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState('tabbar', ['isApply'])
		},
		methods: {
			goPage() {
				uni.navigateTo({
					url: "/pages/business/management?index=0"
				})
			}
		}
	}
</script>

<style>
</style>
