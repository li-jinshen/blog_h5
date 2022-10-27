<template>
	<view :class="'video-box ' + (isMine ? 'my-video' : '')" @click="playerHander">
		<image class="video-icon" :src="chatImages.video"></image>
	</view>
</template>

<script>
	import {
		chatImages
	} from "@/common/images.js"
	export default {
		data() {
			return {
				isPlay: false,
				chatImages
			};
		},

		components: {},
		props: {
			message: {
				type: Object,
				default: () => {}
			},
			isMine: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			message: {
				handler: function(newVal) {
					this.setData({
						message: newVal
					});
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			playerHander() {
				uni.$emit('videoPlayerHandler', {
					isPlay: true,
					message: this.message
				});
			},
			stopHander() {
				this.isPlay = false;
			}
		}
	};
</script>
<style>
	@import './index.css';
</style>
