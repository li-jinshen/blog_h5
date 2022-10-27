<template>
	<view class="TUI-ImageMessage">
		<image @load="imgLoad" @tap="previewImage" 
			:class="'image-message ' + (isMine ? 'my-image' : '')" mode="widthFix" :src="renderDom[0].src"></image>
	</view>
</template>

<script>
	import {
		parseImage
	} from '../../../base/message-facade';

	export default {
		data() {
			return {
				renderDom: [],
				percent: 0
			};
		},

		components: {},
		props: {
			message: {
				type: Object,
				default: ''
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
						renderDom: parseImage(newVal),
						percent: newVal.percent
					});
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			previewImage() {
				uni.previewImage({
					current: this.renderDom[0].src,
					// 当前显示图片的http链接
					urls: [this.renderDom[0].src]
				});
			},
			imgLoad() {
				this.$emit('imgLoad')
			}
		}
	};
</script>
<style>
	@import './index.css';
</style>
