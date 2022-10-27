<template>
	<!-- 交换微信的消息 -->
	<view class="flex justify-center py-2" style="padding: 20rpx 0rpx;" v-if="info.type">
		<view class="text-sm" v-if="info.type=='apply'">
			<view class="text-light">
				{{isApply ? '您发送了一个交换微信的申请':'您收到了一个交换微信的申请'}}
			</view>
			<view class=" flex items-center justify-center pt-1" v-if="!isApply">
				<view class="flex items-center">
					<view class="pr-2 text-primary" @click="submitFunc('agree')">
						【同意】
					</view>
					<view class="text-invitation" @click="submitFunc('refused')">
						【拒绝】
					</view>
				</view>
			</view>
		</view>
		<view class="text-light text-sm" v-if="info.type == 'refused'">
			{{isApply?'对方拒绝了您的微信交换申请':'您拒绝了对方的微信交换申请'}}
		</view>
		<view class="text-light text-sm" v-if="info.type == 'agree'">
			<view class="">
				{{isApply?'对方同意了您的微信交换申请':'您同意了对方的微信交换申请'}}
			</view>
			<view class="text-center">
				微信号:<text class="text-primary pl-1"
					@click="copyFunc">{{isApply?info.replyWechat:info.applyWechat}}</text>
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
