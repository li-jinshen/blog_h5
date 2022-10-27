<template>
	<view class="list" @click="submit">
		<view class="justify-between flex items-center py-4 item" v-if="useSlot">
			<view class="text-base  title_desc" style="width: 90vw;" :style="{color:textColor,fontSize:fontSize+'rpx'}">
				{{title}}
			</view>
			<view>
				<slot></slot>
			</view>
			<view class="flex items-center">
				<u-icon name="arrow-right" size="32" color="#999999"></u-icon>
			</view>
		</view>
		<view class="flex justify-between items-center py-4 item" style="position: relative;" v-else
			:class="showBorder?'bottom_border':''">
			<view class="flex items-center ">
				<view class="flex justify-center items-center pr-2" v-if="icon!=''">
					<image :src="icon" mode="widthFix" :style="{width:iconWidth + 'rpx',height:'auto'}"></image>
				</view>
				<view class="title_desc" :style="{color:textColor,fontSize:fontSize+'rpx'}">{{title}}</view>
			</view>
			<view class="flex items-center">
				<view class="rounded bg-primary text-white text-center text-xs"
					style="padding: 2rpx 4rpx;top:0rpx;right: 10rpx;min-width: 40rpx;z-index: 100;" v-if="count>0">
					{{count}}
				</view>
				<u-icon name="arrow-right" size="32" color="#999999"></u-icon>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "list",
		props: {
			title: {
				type: String,
				required: true
			},
			icon: {
				type: String,
				default: ''
			},
			url: {
				type: String,
				required: false
			},
			type: {
				type: String,
				default: 'jump'
			},
			iconWidth: {
				type: Number,
				default: 40
			},
			useSlot: {
				type: Boolean,
				default: false
			},
			textColor: {
				type: String,
				default: ""
			},
			showBorder: {
				type: Boolean,
				default: false
			},
			fontSize: {
				type: [Number, String],
				default: 30
			},
			count: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {

			};
		},

		created() {

		},
		methods: {
			submit() {
				this.$emit("submit", this.url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bottom_border {
		border-bottom: 2rpx solid #E5E3E6;
	}

	.list:last-child .item {
		border: none;
	}
</style>
