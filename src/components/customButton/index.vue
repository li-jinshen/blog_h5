<template>
	<view :class="loading?'filter':''" class="duration-500" :style="{height:height,width:width}">
		<view class="flex justify-center items-center rounded w-full h-full"
			:style="{fontSize:fontSize,padding:width?'':'0rpx 20rpx'}"
			:class="[type == 'primary'?'primary':'default',roundedClass]" @click="sumit">
			<u-loading-icon :size='size' style='margin-top: 2rpx;' :color="type=='primary'?'white':'#FE6033'"
				class='mr-2' :show='loading'></u-loading-icon>
			<slot name='prefix'></slot> <!-- 前置插槽 -->
			{{text}}
			<slot name='suffix'></slot><!-- 后置插槽 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				primaryColor: ""
			}
		},
		props: {
			text: {
				type: String,
				default: "确定"
			},
			type: {
				validator(value) {
					return ['primary', 'default'].indexOf(value) !== -1;
				}
			},
			height: {
				type: String,
				default: '76rpx'
			},
			width: {
				type: String,
				default: '100%'
			},
			fontSize: {
				type: String,
				default: "30rpx"
			},
			size: {
				type: Number,
				default: 34
			},
			loading: {
				type: Boolean,
				default: false
			},
			roundedClass: { // 设置圆角
				type: String,
				default: "rounded"
			}
		},
		onLoad() {
			this.primaryColor = getApp().globalData.primaryColor
		},
		methods: {
			sumit() {
				if (this.loading) {
					return
				}
				this.$emit('submit')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.primary {
		background-color: $uni-color-primary;
		color: white;
	}

	.default {
		border: 4rpx solid $uni-color-primary;
		color: $uni-color-primary;
	}

	.filter {
		opacity: .6;
	}
</style>
