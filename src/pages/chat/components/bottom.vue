<template>
	<view class="">
		<!-- 输入框等 -->
		<view style="min-height: 120rpx;" class="flex top_menu items-end py-3 padding_box">
			<view class="flex items-center" style="padding: 0rpx 20rpx;">
				<view style="min-height: 70rpx;" :style="{width:inputText.length == 0 ?'500rpx':'460rpx'}"
					class="input_box rounded p-2 duration-500">
					<textarea auto-height="true" v-model="inputText" @focus="textareaFocus" style="width: 100%;"
						@confirm="sendTextMessage('')" confirm-type="send" />
				</view>
			</view>
			<view class="flex items-center">
				<view class="flex justify-center items-center h-full" style="padding-right: 20rpx;height: 70rpx;"
					@click="openMenu('emoji')">
					<image :src="chattingImage.icon1" mode="widthFix" style="width: 60rpx;height: atuo;"></image>
				</view>
				<view class="flex justify-center items-center h-full" @click="openMenu('menu')" style="height: 70rpx;"
					v-if="inputText.length == 0">
					<image :src="chattingImage.icon2" mode="widthFix" style="width: 60rpx;height: atuo;"></image>
				</view>
				<view v-else style="height: 70rpx;width: 100rpx;"
					class="bg-primary text-white text-sm flex justify-center items-center rounded"
					@touchend.prevent="sendTextMessage('')">
					发送
				</view>
			</view>
		</view>

		<!-- ios底部适配 -->
		<view class="w-full duration-500" :style="{height:isOs&&!menuIsShow? paddingBottom + 'px' :'0px'}"></view>

		<!-- 底部菜单，表情 -->
		<view style="background: #F6F6F6;" :style="{height:menuCategoryHeight[menuType] + 'rpx'}">
			<view class="relative" style="" v-show="menuType == 'emoji'">
				<view class="absolute z-50" style="right: 60rpx;top: 478rpx;background: #F6F6F6;">
					<image :src="emojiUrl +'emoji_13@2x.png'" mode="widthFix" style="width: 9vw;height: auto;"></image>
				</view>
				<view class="flex padding_box items-center" style="height: 80rpx;background: rgba(255,255,255,.8);">
					<view class="h-full flex items-center" @click="emojiCate = 1">
						<image :src="chattingImage.icon1" mode="widthFix" style="width: 46rpx;height: atuo;"></image>
					</view>
					<view class="ml-3 h-full flex items-center" @click="emojiCate = 2">
						<image :src="chattingImage.collection" mode="widthFix" style="width: 46rpx;height: atuo;">
						</image>
					</view>
				</view>
				<scroll-view scroll-y="true" :style="{height:(menuCategoryHeight.emoji  - 80) + 'rpx'  }">
					<view class="emoji_box padding_box py-2 ">
						<template v-if="emojiCate == 1">
							<view v-for="(em,eid) in emojiList" :key="eid" @tap="addEmoji(em)">
								<image mode="widthFix" :src="emojiUrl + em.url"></image>
							</view>
						</template>
						<template v-if="emojiCate == 2">
							<view style="width: 100% !important;">收藏的表情</view>
						</template>
						<!-- ios底部适配 -->
						<view class="w-full duration-500"
							:style="{height:isOs&&!menuIsShow? paddingBottom + 'px' :'0px'}"></view>
					</view>
				</scroll-view>

			</view>
			<view style="padding-top: 20rpx;" v-show="menuType == 'menu'" class="padding_box">
				<view class="">
					<view v-for="(item,index) in list" :key="index" class="flex justify-between items-center">
						<view style="margin-bottom: 40rpx;" class="flex justify-center items-center"
							v-for="(children) in item" :key="children.icon">
							<view style="width: 120rpx;" @click="handleCall(children.tilte)">
								<view class="flex justify-center items-center">
									<image :src="children.icon" mode="heightFix" style="height: 110rpx;width: auto;">
									</image>
								</view>
								<view class=" text-light text-center" style="font-size: 24rpx;margin-top: 8rpx;">
									{{children.tilte}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="record-modal" v-if="popupToggle" @longpress="handleLongPress" @touchmove="handleTouchMove"
			@touchend="handleTouchEnd">
			<view class="wrapper">
				<view class="modal-loading"></view>
			</view>
			<view class="modal-title">{{ title }}</view>
		</view>
	</view>
</template>

<script>
	import {
		chattingImage,
		faceImages,
	} from "@/common/images.js"
	import {
		emojiMap,
		emojiUrl
	} from "../base/emojiMap.js"
	import {
		mapState,
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				value: '',
				type: 'textarea',
				border: false,
				height: 60,
				autoHeight: true,
				menuType: "emoji",
				chattingImage,
				faceImages,
				list: [{
						icon: chattingImage.menu2,
						tilte: "图片",
					},
					{
						icon: chattingImage.menu5,
						tilte: "语音",
					},
					{
						icon: chattingImage.menu6,
						tilte: "语音通话",
					},
					{
						icon: chattingImage.menu3,
						tilte: "商城",
					},
					{
						icon: chattingImage.menu4,
						tilte: "通话",
					}
				],
				//表情定义
				hideEmoji: true,
				emojiList: [],
				emojiUrl,
				textMsg: "",
				emojiCate: 1, // 展示的表情类型

				inputText: '',
				sendMessageBtn: false,
				displayFlag: '',
				popupToggle: false,
			}
		},
		props: {
			menuIsShow: {
				type: Boolean
			},
			isOs: {
				type: Boolean,
				defalut: false
			},
			paddingBottom: {
				type: Number,
				defalut: 0
			},
			menuCategoryHeight: {
				type: Object,
				default: () => {
					return {
						emoji: 560,
						menu: 400
					}
				}
			}
		},
		computed: {

		},
		created() {
			let list = this.dealArray([...this.list])
			this.list = []
			this.list.push(...list)


			this.initFaceList()
		},
		methods: {
			initFaceList() {
				// 静态表情包
				let emojiList = []
				Object.keys(emojiMap).forEach(key => {
					emojiList.push({
						url: emojiMap[key],
						alt: key
					})
				})
				this.emojiList = []
				this.emojiList.push(...emojiList)
				console.log(this.emojiList)
			},
			handleEmoji() {
				let targetFlag = 'emoji';

				if (this.displayFlag === 'emoji') {
					targetFlag = '';
				}

				this.setData({
					displayFlag: targetFlag
				});
			},
			appendMessage(e) {
				this.setData({
					inputText: this.inputText + e.detail.message,
					sendMessageBtn: true
				});
			},
			// 将一维数组转为指定长度的二维数组（用于渲染菜单栏）
			dealArray(data) {
				let productData = [];
				let num = Math.ceil(data.length / 4);
				for (let i = 0; i < num; i++) {
					productData.push(data.slice(i * 4, i * 4 + 4))
				}
				return productData
			},
			openMenu(type) {
				this.menuType = type
				this.$emit("openMenu", type)
			},
			goPage(url) {
				uni.navigateTo({
					url
				})
			},
			//添加表情
			addEmoji(em) {
				if (em.alt == '删除') {
					this.inputText = this.inputText.substring(0, this.inputText.length - 1)
					return
				}
				this.inputText += `[${em.alt}]`;
			},
			// 输入框获取焦点时
			textareaFocus() {
				if (this.menuType && this.menuIsShow) {
					this.$emit("openMenu", this.menuType)
					this.menuType = ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './index.css';

	.used {
		width: 120rpx;
		height: 70rpx;
	}


	.input_box {
		background: #F5F5F5;
	}

	.bottom_box {
		transition: .5s;
	}

	.show_menu {
		bottom: 0rpx;
		left: 0;
		right: 0;
	}

	.hidden_menu {
		bottom: -400rpx;
		left: 0;
		right: 0;
	}

	.used_item {
		font-size: 28rpx;
	}

	.used_item:not(:last-child) {
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

	.emoji-swiper {
		height: 40vw;

		swiper-item {
			display: flex;
			align-content: flex-start;
			flex-wrap: wrap;

			view {
				width: 13vw;
				height: 10vw;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 7vw;
					height: auto;
				}
			}
		}
	}

	.emoji_box {
		display: flex;
		align-content: flex-start;
		flex-wrap: wrap;

		view {
			width: 13vw;
			height: 10vw;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 7vw;
				height: auto;
			}
		}
	}
</style>
