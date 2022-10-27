<template>
	<view class="w-full page" :style="{'background':pageColor}">
		<view class="navbar" :class="showBorder ?'show_border':''" :style="{'padding-top':statusBar +
			'px','background':background}" style="box-sizing: border-box;">

			<view class="title flex flex-row   justify-center items-center relative"
				:style="{'height':navBarHeight+'px','color':color}">
				<view v-if="showBack" class="h-full flex flex-row justify-center items-center"
					style="width: 80rpx;" @click="goback">
					<u-icon name="arrow-left" size="40" :color='iconColor'></u-icon>
				</view>
				<view class="title_font title_desc" style="flex:1;padding: 0rpx 0rpx;"
					:class="position == 'center'?'text-center':'text-left'">
					{{title}}
				</view>
				<view class=" h-full flex flex-row justify-center items-center">
					<slot name='suffix'></slot>
				</view>
			</view>
			<!-- <view class="title title_left" style="font-size:36rpx;" v-else
				:style="{'height':navBarHeight+'px','color':color}">{{title}}</view> -->
		</view>

		<scroll-view v-if="useScroll" scroll-y="true"
			:style="{height:showBottom ?contentHeight2 + 'px' : contentHeight + 'px',background:bgcolor,paddingBottom:isOs&&showBottom == false ? paddingBottom +'px':''}"
			@scrolltolower="scrolltolower">
			<slot name="content"></slot>
		</scroll-view>
		<view class="content" v-else
			:style="{height:showBottom ?contentHeight2 + 'px' : contentHeight + 'px',background:bgcolor,paddingBottom:isOs&&showBottom == false ? paddingBottom +'px':''}">
			<slot name="normal"></slot>
		</view>
		<view class="bottom w-full" :style="{paddingBottom:isOs ? paddingBottom+'px' : '0px',background:bottomColor}"
			v-if="showBottom" :class="showBottomShadow?'bottom_shadow':''">
			<slot name="bottom"></slot>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isOs: false,
				paddingBottom: 20, // 40
			}
		},
		props: {
			// 页面颜色
			pageColor: {
				type: String,
				default: "white"
			},
			// 内容背景颜色
			bgcolor: {
				type: String,
				default: "white"
			},
			// 标题字体颜色
			color: {
				type: String,
				default: "black",
				validator: function(value) {
					// 这个值必须匹配下列字符串中的一个
					return ['black', 'white'].indexOf(value) !== -1
				}
			},
			// 标题背景颜色
			background: {
				type: String,
			},
			// 标题
			title: {
				type: String,
				required: true
			},
			// 标题的位置
			position: {
				type: String,
				default: "center",
				validator: function(value) {
					// 这个值必须匹配下列字符串中的一个
					return ['left', 'center'].indexOf(value) !== -1
				}
			},
			// 是否显示底部栏
			showBottom: {
				type: Boolean,
				default: false
			},
			// 是否显示返回按钮
			showBack: {
				type: Boolean,
				default: true
			},
			// 是否展示navbar的下边框
			showBorder: {
				type: Boolean,
				default: false
			},
			// 是否使用  scrollview 插槽
			useScroll: {
				type: Boolean,
				default: true
			},
			// 是否显示底部栏的上部阴影
			showBottomShadow: {
				type: Boolean,
				default: false
			},
			// 图标颜色
			iconColor: {
				type: String,
				default: "black"
			},
			// 底部框颜色
			bottomColor: {
				type: String,
				default: "white"
			}
		},
		created() {
			this.isOs = this.$u.os() == 'ios'
			// this.$u.toast(this.isOs)
		},
		computed: {
			statusBar() {
				const e = uni.getSystemInfoSync();
				return e.statusBarHeight;
			},
			navBarHeight() {
				const e = uni.getSystemInfoSync();
				let navBarHeight = 45
				// #ifdef MP-WEIXIN
				//获取胶囊位置信息
				let menuBottonInfo = uni.getMenuButtonBoundingClientRect();
				// 胶囊底部 - 状态栏 + 胶囊顶部 - 状态栏 = 导航栏的高度（胶囊距离顶部的距离+胶囊距离底部距离+胶囊自身的高度）
				navBarHeight = menuBottonInfo.bottom - e.statusBarHeight + (menuBottonInfo.top - e.statusBarHeight);
				// #endif
				return navBarHeight
			},
			contentHeight() {
				const e = uni.getSystemInfoSync();
				const height = e.screenHeight
				let navBarHeight = 45
				// #ifdef MP-WEIXIN
				//获取胶囊位置信息
				let menuBottonInfo = uni.getMenuButtonBoundingClientRect();
				// 胶囊底部 - 状态栏 + 胶囊顶部 - 状态栏 = 导航栏的高度（胶囊距离顶部的距离+胶囊距离底部距离+胶囊自身的高度）
				navBarHeight = menuBottonInfo.bottom - e.statusBarHeight + (menuBottonInfo.top - e.statusBarHeight);
				// #endif
				let result = height - navBarHeight - e.statusBarHeight
				if (this.isOs && this.showBottom) {
					result = result - this.paddingBottom
				}
				return result
			},
			contentHeight2() {
				const e = uni.getSystemInfoSync();
				const height = e.screenHeight
				let navBarHeight = 45
				// #ifdef MP-WEIXIN
				//获取胶囊位置信息
				let menuBottonInfo = uni.getMenuButtonBoundingClientRect();
				// 胶囊底部 - 状态栏 + 胶囊顶部 - 状态栏 = 导航栏的高度（胶囊距离顶部的距离+胶囊距离底部距离+胶囊自身的高度）
				navBarHeight = menuBottonInfo.bottom - e.statusBarHeight + (menuBottonInfo.top - e.statusBarHeight);
				// #endif
				let result = height - navBarHeight - e.statusBarHeight - 50
				if (this.isOs && this.showBottom) {
					result = result - this.paddingBottom
				}
				return result
			}

		},
		methods: {
			// 点击返回键触发的事件
			goback() {
				this.$emit("leftfunc")
			},
			// scroll-view 滚到底部触发的事件
			scrolltolower() {
				this.$emit("scrolltolower")
			}
		}
	}
</script>
<style scoped>
	.page {
		height: 100vh;
		overflow: hidden;
	}

	.bottom {
		height: 110rpx;
		box-sizing: content-box;
	}

	.show_border {
		border-bottom: 2rpx solid #E0E1E6;
	}

	.content {
		overflow: hidden;
	}

	.bottom_shadow {
		box-shadow: 0rpx 0rpx 24rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.title_desc {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
