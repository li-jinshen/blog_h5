<template>
	<!-- :refresher-enabled="true" @refresherrefresh="refresh" -->
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" :height="scrollHeight+'px'" :up="upOption"
		:down="downOption">
		<view v-if="isCompleted" class="msg-end text-center text-sm text-light py-2">没有更多消息了</view>
		<view v-for="(item,index) in messageList" :key="item.ID" class="t-message" :id="item.VIEW_ID">
			<view v-if="conversation.type !== '@TIM#SYSTEM'" :id="item.ID">
				<view class="t-message-item">
					<TUI-TipMessage v-if="item.type === 'TIMGroupTipElem'" :message="item"></TUI-TipMessage>

					<view
						v-if="item.type !== 'TIMGroupTipElem' && item.payload.data != 'resume'&& item.payload.data != 'position'&&item.payload.data != 'invitation'&&item.payload.data != 'contract'&&item.payload.data != 'wechat'&&item.payload.data != 'blackList'"
						:class="item.flow === 'out' ? 't-self-message' : 't-recieve-message'">
						<image class="t-message-avatar" v-if="item.flow === 'in'"
							:src="item.avatar || 'https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png'">
						</image>
						<view class="read-receipts" v-if="conversation.type === 'C2C' && item.flow === 'out'">
							<view v-if="item.isPeerRead">已读</view>
							<view v-else>未读</view>
						</view>
						<view>
							<TUI-TextMessage v-if="item.type === 'TIMTextElem'" :message="item"
								:isMine="item.flow === 'out'"></TUI-TextMessage>
							<TUI-ImageMessage v-if="item.type === 'TIMImageElem'" :message="item"
								:isMine="item.flow === 'out'" @imgLoad='imgLoad'></TUI-ImageMessage>
							<TUI-VideoMessage v-if="item.type === 'TIMVideoFileElem'" :message="item"
								:isMine="item.flow === 'out'"></TUI-VideoMessage>
							<TUI-AudioMessage v-if="item.type === 'TIMSoundElem'" :message="item"
								:isMine="item.flow === 'out'"></TUI-AudioMessage>
							<TUI-CustomMessage v-if="item.type === 'TIMCustomElem'&&item.payload.data != 'file'"
								:message="item" :isMine="item.flow === 'out'"></TUI-CustomMessage>
							<TUI-FaceMessage v-if="item.type === 'TIMFaceElem'" :message="item"
								:isMine="item.flow === 'out'"></TUI-FaceMessage>
							<TUI-FileMessage v-if="item.type === 'TIMFileElem'" :message="item"
								:isMine="item.flow === 'out'"></TUI-FileMessage>

							<CoustomFileMessage v-if="item.type === 'TIMCustomElem'&&item.payload.data == 'file'"
								:message="item" :isMine="item.flow === 'out'"></CoustomFileMessage>

							<LocationMessage v-if="item.type === 'TIMLocationElem'" :message="item"
								:isMine="item.flow === 'out'"></LocationMessage>

						</view>
						<image class="t-message-avatar" v-if="item.flow === 'out'"
							:src="item.avatar || 'https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png'">
						</image>
					</view>



				</view>
			</view>
			<view v-else :id="item.ID" :data-value="item.ID">
				<TUI-SystemMessage :message="item"></TUI-SystemMessage>
			</view>
		</view>


	</mescroll-uni>

</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";

	import TUITextMessage from '../message-elements/text-message/index';
	import TUIImageMessage from '../message-elements/image-message/index';
	import TUIVideoMessage from '../message-elements/video-message/index';
	import TUIAudioMessage from '../message-elements/audio-message/index';
	import TUICustomMessage from '../message-elements/custom-message/index';
	import TUITipMessage from '../message-elements/tip-message/index';
	import TUISystemMessage from '../message-elements/system-message/index';
	import TUIFaceMessage from '../message-elements/face-message/index';
	import TUIFileMessage from '../message-elements/file-message/index';
	export default {
		data() {
			return {
				avatar: '',
				userID: '',
				// 当前会话
				messageList: [],
				// 自己的 ID 用于区分历史消息中，哪部分是自己发出的
				scrollView: '',
				scrollTop: 0,
				triggered: false,
				nextReqMessageID: '',
				// 下一条消息标志
				isCompleted: false, // 当前会话消息是否已经请求完毕
				isRefresh: false, // 是否是下拉加载消息
				pageSize: 15,
				downOption: {
					auto: false
				},
				upOption: {
					use: false,
					auto: false,
					toTop: {
						src: '' // 不显示回到顶部按钮
					}
				},

			};
		},
		mixins: [MescrollMixin], // 使用mixin
		components: {
			TUITextMessage,
			TUIImageMessage,
			TUIVideoMessage,
			TUIAudioMessage,
			TUICustomMessage,
			TUITipMessage,
			TUISystemMessage,
			TUIFaceMessage,
			TUIFileMessage,
		},
		props: {
			conversation: {
				type: Object,
				default: () => {}
			},
			scrollHeight: {
				type: Number,
				default: 400
			}
		},
		watch: {
			// messageList: function() {
			// 	console.log("改变了。。。。。。。。")
			// }
			// conversation: {
			// 	handler: function(newVal) {
			// 		console.log('newVal', newVal)
			// 		if (!newVal.conversationID) return;
			// 		this.setData({
			// 				conversation: newVal
			// 			},
			// 			() => {
			// 				this.getMessageList(newVal);
			// 			}
			// 		);
			// 	},
			// 	immediate: true,
			// 	deep: true
			// }
		},
		mounted() {

		},

		destroyed() {

		},
		methods: {
			testFunc(index) {
				console.log(index)
			},
			scrollToButtom() {
				if (this.isRefresh) {
					this.isRefresh = false
					return
				}
				// this.scrollTop = this.scrollTop > 1 ? this.scrollTop - 1 : 0
				// const query = uni.createSelectorQuery().in(this);
				// let nodesRef = query.select('#message-scroll');
				// nodesRef
				// 	.boundingClientRect(res => {
				// 		this.$nextTick(() => {
				// 			//进入页面滚动到底部
				// 			this.mescroll.scrollTo(99999)
				// 		});
				// 	})
				// 	.exec();
				this.mescroll.scrollTo(99999, 0)
			},


			imgLoad() {
				console.log("tupain")
				this.$u.throttle(this.scrollToButtom, 600)
			}
		}
	};
</script>
<style>
	@import './index.css';
</style>
