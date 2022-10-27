<template>
	<view class="container bg-white" style="overflow: hidden;" :style="{height:pageHeight + 'px',transtion:'500ms'}">
		<view class="top  w-full bg-white" style="position:;">
			<view class="w-full" :style="{height:statusBarHeight + 'px'}"></view>
			<view class="w-full padding_box flex justify-center items-center relative"
				:style="{height: navBarHeight+ 'px'}">
				<view class="custom_title">
					聊天
				</view>
				<view class="absolute flex justify-center items-center top-0 h-full" style="left: 20rpx;"
					@click="goback">
					<u-icon name="arrow-left" size="40"></u-icon>
				</view>
			</view>
		</view>
		<view class="message-list" @tap="" style="background-color: #F5F5F5;" catchtouchmove='false'>
			<TUI-message-list id="message-list" ref="messageList" :conversation="conversation"
				:scrollHeight='scrollHeight' />
		</view>
		<view v-if="videoPlay" class="container-box" @tap.stop="stopVideoHander">
			<video v-if="videoPlay" class="video-message" :src="videoMessage.payload.videoUrl"
				:poster="videoMessage.payload.thumbUrl" object-fit="cover" error="videoError" autoplay="true"
				direction="0" />
		</view>
		<!-- 底部 -->
		<!-- :style="{bottom:isShow? '0rpx' :'-'+menuCategoryHeight[menuType]+'rpx'}" -->
		<!-- {{menuType}} -->
		<view class="fixed bottom_box bg-white" style="z-index: 10;left:0;right:0"
			:class="isShow ? 'show_menu': menuType == 'emoji' ?'emoji_hidden':'menu_hidden' ">
			<bottom @openMenu="openMenu" id="message-input" :menuIsShow='isShow' ref="messageInput"
				:conversation="conversation" @sendMessage="" :isOs='isOs' :paddingBottom='paddingBottom'
				:menuCategoryHeight='menuCategoryHeight'>
			</bottom>
		</view>
		<u-action-sheet :list="sheetList" v-model="showSheet" @click="sheetClick"></u-action-sheet>
	</view>
</template>

<script>
	import {
		APPLY,
		RECRUITMENT
	} from "@/common/constant.js"
	import {
		mapGetters,
		mapState
	} from "vuex"
	import {
		commomImages,
	} from "@/common/images.js"

	import Bottom from "./components/bottom.vue"
	import TUIMessageList from './tui-chat/message-list/index';
	export default {
		data() {
			return {
				menuType: "emoji", // 底部菜单类型
				menuCategoryHeight: { // 底部菜单分类对应的高度值
					emoji: 560,
					menu: 400
				},
				commomImages,
				isAnimation: false, // 是否执行动画
				scrollHeight: 0,
				scrollTop: 0,
				scrollAnimation: false,

				pageTpe: "", // 页面跳转类型  other:其他页面  tabbar:tabbar页面

				conversationName: '',
				conversation: {},
				messageList: [],
				isShow: false,
				showChat: true,
				videoPlay: false,
				videoMessage: {},
				config: {
					sdkAppID: '',
					userID: '',
					userSig: '',
					type: 1,
					tim: null
				},
				userInfo: {},
				pageHeight: 750,
				baseHeight: 0, // 基础高度
				weChat: "",
				showSheet: false,
				sheetList: [{
					text: '复制'
				}],
				longpressInfo: {},
				isOs: false,
				paddingBottom: 20,
				navBarHeight: 0,
				statusBarHeight: 0,

			}
		},
		computed: {

		},
		components: {
			Bottom,
			TUIMessageList
		},
		created() {

		},
		onLoad(options) {
			this.navBarHeight = getApp().globalData.navBarHeight
			this.statusBarHeight = getApp().globalData.statusBarHeight
			let e = uni.getSystemInfoSync()
			this.baseHeight = e.screenHeight - this.statusBarHeight - this.navBarHeight
			this.isOs = this.$u.os() == 'ios'
			uni.onKeyboardHeightChange(res => {
				this.calculatePageHeight(res.height)
				this.calculateScrollHeight('Keyboard', res.height)
			})
			this.calculatePageHeight()
			this.calculateScrollHeight()
			this.pageTpe = options.type
		},
		watch: {
			isShow: function() {
				this.calculateScrollHeight()
			},
		},
		methods: {
			goback() {
				if (this.zoneId && !this.flag) {
					this.zoneId = ''
					this.visitZone()
					return
				}
				this.$navigateBack()
			},
			sheetClick(index) {
				console.log("index", index)
				switch (index) {
					case 0:
						uni.setClipboardData({
							data: this.longpressInfo.payload.text, // e是你要保存的内容
							success: () => {
								this.$u.toast("复制成功")
							}
						})
						break;
				}
			},
			stopVideoHander() {
				this.videoPlay = false;
			},

			goBack() {
				uni.navigateBack()
			},
			calculateScrollHeight(type = 'menu', height = 0, time = 500) {
				let scrollHeight = 0
				if (type == 'menu') {
					if (this.isShow) {
						scrollHeight = this.baseHeight - this.menuCategoryHeight[this.menuType] / 2 - 60
						console.log("scrollHeight", scrollHeight, this.menuCategoryHeight[this.menuType])
						setTimeout(() => {
							this.scrollHeight = scrollHeight
							this.$nextTick(() => {
								this.$refs.messageList ? this.$refs.messageList.scrollToButtom() : ""
							});
						}, time)
					} else {
						if (this.isOs) {
							this.scrollHeight = this.baseHeight - 60 - this.paddingBottom
						} else {
							this.scrollHeight = this.baseHeight - 60
						}
					}
				} else {
					if (this.isOs) {
						this.scrollHeight = this.baseHeight - height - 60 - this.paddingBottom
					} else {
						this.scrollHeight = this.baseHeight - height - 60
					}
					if (height) {
						setTimeout(() => {
							this.$nextTick(() => {
								this.$refs.messageList ? this.$refs.messageList.scrollToButtom() : ""
							});
						}, time)
					} else {
						this.calculateScrollHeight()
					}
				}
			},
			calculatePageHeight(keyboardHeight) {
				let e = uni.getSystemInfoSync()
				this.pageHeight = e.screenHeight - keyboardHeight
			},
			openMenu(type) {
				this.isAnimation = true
				let oldMenuType = this.menuType
				this.menuType = type
				if(oldMenuType == type){
					this.isShow = !this.isShow 
				}else{
					this.isShow = true
					this.calculateScrollHeight('menu', 0, 0)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.used {
		width: 120rpx;
		height: 80rpx;
		background: #E5EBF5;
	}

	.top_menu {
		border-bottom: 2rpx solid $uni-border-light;
	}

	.input_box {
		background: #E5EBF5;
	}

	.bottom_box {
		transition: .5s;
	}

	.show_menu {
		bottom: 0rpx;

	}

	.hidden_menu {
		bottom: -400rpx;
	}

	.emoji_hidden {
		bottom: -560rpx;
	}

	.menu_hidden {
		bottom: -400rpx;
	}

	.used_item {
		border-bottom: 2rpx solid $uni-border-light;
	}

	.used_btn {
		border-top: 2rpx solid $uni-border-color;
	}

	.info_line {
		height: 26rpx;
		width: 4rpx;
		background: $uni-border-color;
	}

	.tip {
		border: 2rpx solid $uni-color-primary;
		padding: 0rpx 8rpx;
		color: $uni-color-primary;
	}

	.hiring_tip {
		padding: 0rpx 8rpx;
		border: 2rpx solid $uni-color-warning;
		color: $uni-color-warning;
	}

	.tag {
		background: #EDEDED;
		padding: 2rpx 10rpx;
	}

	.tag:not(:last-child) {
		margin-right: 20rpx;
	}
</style>
