<template>
	<!-- 有关黑名单的消息 -->
	<view class="flex justify-center py-2" style="padding: 20rpx 80rpx;" v-if="info.type">
		<view class="text-sm" v-if="info.type=='add'">
			<view class="text-light text-center" v-if="info.isApply ">
				{{userId == info.operationId ? '您已经将该用户拉入不感兴趣列表中':'您被对方拉入不感兴趣列表中，对方将不再接收您说发送的消息'}}
			</view>
			<view class="text-light text-center" v-else>
				{{userId == info.operationId ? '您已经将该用户拉入不合适列表中':'您被对方拉入不合适列表中，对方将不再接收您说发送的消息'}}
			</view>
		</view>
		<view class="text-light text-sm" v-if="info.type == 'remove'">
			<view class="text-light text-center" v-if="info.isApply ">
				{{userId == info.operationId ? '您已经将该用户从不感兴趣列表中移除':'对方已经将您从不感兴趣列表中移除，可以正常接收消息啦！'}}
			</view>
			<view class="text-light text-center" v-else>
				{{userId == info.operationId ? '您已经将该用户从不合适列表中移除':'对方已经将您从不合适列表中移除，可以正常接收消息啦！'}}
			</view>
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
				userId: "",
				info: {}
			}
		},
		props: {
			message: {
				type: Object,
				default: {}
			}
		},
		computed: {
			...mapState('tabbar', ['isApply'])
		},
		watch: {
			message: {
				handler: function(newVal) {
					this.info = Object.assign({}, JSON.parse(newVal.payload.extension))
				},
				immediate: true,
				deep: true
			}
		},
		created() {
			this.userId = uni.getStorageSync('timUserId')
		},
		methods: {
			submitFunc(type) {
				uni.$emit('wechatApplyOperation', {
					type,
					info: this.info
				})
			},
			copyFunc() {
				uni.setClipboardData({
					data: this.isApply ? this.info.replyWechat : this.info.applyWechat, // e是你要保存的内容
					success: () => {
						this.$u.toast("复制成功")
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item_tip {
		border: 2rpx solid $uni-color-warning;
		padding: 0rpx 10rpx;
	}

	.info_center {
		border-left: 4rpx solid #EDECED;
		border-right: 4rpx solid #EDECED;
	}

	.list_item:not(:last-child) {
		border-bottom: 4rpx solid $uni-border-light;
	}
</style>
