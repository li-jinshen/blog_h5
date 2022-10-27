<template>
	<view @click="handleTap" :class="[iosScroll ? 'pb_80' : 'pb-2']"
		class="flex flex-column w_100 h_100 kn_editor position-relative border-box rounded-radius-l ">
		<!-- <scroll-view scroll-y="true" class="scroll_style bg-gray-100" :style="{height:editorHeight+'px'}">
			<editor id="editor" class="editor_wrapper" :placeholder="placeholder" showImgSize showImgToolbar
				showImgResize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady"
				@focus="bindfocus" @blur="bindblur" @input="bindinput" :style="{height:editorHeight+'px'}"></editor>
		</scroll-view> -->
		<view class="px-1">
			<editor id="editor" class="editor_wrapper" :placeholder="placeholder" showImgSize showImgToolbar
				showImgResize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady"
				@focus="bindfocus" @blur="bindblur" @input="bindinput" :style="{height:editorHeight+'px'}"></editor>
		</view>
		<view v-if="showInsertImg" class="w_100 border-box flex justify-end">
			<view class="handle_bar justify-end flex align-center padding_box">
				<view class="mx-2 flex items-center" @click='clear'>
					<image src="/static/edit_icon/clear.png" mode="heightFix" style="width: auto;height: 62rpx;">
					</image>
				</view>
				<view hover-class="bg-hover" @click="insertImageEvent" v-for="(item, index) in handleList" :key="index"
					class="flex align-center flex-1">
					<image :src="item.icon" class="handle_icon" mode="heightFix" style="width: auto;height: 40rpx;">
					</image>
				</view>
			</view>
		</view>
		<view v-if="iosScroll" class="w-100" style="height: 80rpx; position: absolute; bottom: 0px; left: 0px;">
			<ken-ed-con :iosScroll="iosScroll" ref="control" @last="undo" @next="redo" :focus="focus"
				@keyChange="keyChange" @topLTap="topLTap" @secondHandle="secondHandle" :formats="formats"></ken-ed-con>
		</view>
		<ken-ed-con :pageScrollTop="pageScrollTop" v-else ref="control" @last="undo" @next="redo" :focus="focus"
			@keyChange="keyChange" @topLTap="topLTap" @secondHandle="secondHandle" :formats="formats"></ken-ed-con>
		<u-modal :show="showM" @confirm="clearContent" :title="'提示'" @cancel="showM = false"
			:content="'清空后可能无法恢复，确定要清空内容吗？'" showCancelButton></u-modal>
	</view>
</template>

<script>
	/**
	 * @author		前端小能手
	 * 富文本编辑主体
	 */
	import kenEdCon from '@/components/customEditor/kn_editor_control.vue'
	export default {
		components: {
			kenEdCon,
		},
		props: {
			readOnly: {
				type: Boolean,
				default: false,
			},
			value: {
				type: String,
				default: '',
			},
			iosScroll: {
				type: Boolean,
				default: false,
			},
			pageScrollTop: {
				type: Number,
				default: 0,
			},
			showInsertImg: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				editorCtx: {}, // 富文本对象
				placeholder: '请输入内容', // 文本提示 文字
				showM: false, // 显示清空警告
				formats: {}, // 当前文本样式
				focus: false, // 聚焦
				handleList: [{
					id: 'insertImageEvent',
					icon: '/static/edit_icon/upload.png',
				}],
				editorHeight: 200
			}
		},
		mounted() {
			this.editorHeightFunc(0)
		},
		methods: {
			handleTap() {},
			//编辑器初始化完成时触发
			onEditorReady() {
				this.$emit('onEditorReady') // 返回一个 SelectorQuery 对象实例。在自定义组件或包含自定义组件的页面中，应使用this.createSelectorQuery()来代替。
				uni
					.createSelectorQuery()
					.in(this)
					.select('#editor')
					.context((res) => {
						this.editorCtx = res.context
						let rtTxt = this.value
						// console.log(this.value, '怎么还有内容呢')
						this.setContents(rtTxt) //设置富文本内容
					})
					.exec()
			},
			// 计算内容区高度
			editorHeightFunc(height) {
				// 状态栏高度
				let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
				let e = uni.getSystemInfoSync();
				let navBarHeight = 45
				// #ifdef MP-WEIXIN
				//获取胶囊位置信息
				let menuBottonInfo = uni.getMenuButtonBoundingClientRect();
				// 胶囊底部 - 状态栏 + 胶囊顶部 - 状态栏 = 导航栏的高度（胶囊距离顶部的距离+胶囊距离底部距离+胶囊自身的高度）
				navBarHeight = menuBottonInfo.bottom - e.statusBarHeight + (menuBottonInfo.top - e.statusBarHeight);
				// #endif

				let screenHeight = uni.getSystemInfoSync().screenHeight // 页面高度

				this.editorHeight = screenHeight - navBarHeight - statusBarHeight - height - 80
				// console.log('editorHeight', this.editorHeight)
			},
			// 键盘变化
			keyChange(height) {
				// this.$emit('keyChange', height)
				this.editorHeightFunc(height)
			},
			//设置富文本内容
			setContents(rechtext) {
				this.editorCtx.setContents({
					html: rechtext,
					success: (res) => {},
				})
			},
			//编辑器聚焦时触发
			bindfocus(res) {
				this.focus = true
				this.$emit('bindfocus', {
					detail: {
						value: res,
					},
				})
			},
			//编辑器失去焦点时触发
			bindblur(res) {
				this.focus = false
				this.$emit('bindblur', {
					detail: {
						value: res,
					},
				})
			},
			topLTap() {
				this.editorCtx.format('fontFamily', '')
			},
			clear() {
				this.showM = true
			},

			//清空编辑器内容
			clearContent() {
				this.editorCtx.clear({
					success: (res) => {
						this.showM = false
						this.$emit('clearSuccess')
					},
				})
			},
			// 设置样式
			secondHandle(item) {
				const {
					key,
					val
				} = item
				console.log(item)
				this.editorCtx.format(key, val)
			},
			// 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
			onStatusChange(res) {
				// console.log(res.detail)
				const formats = res.detail
				this.formats = formats
			},
			//编辑器输入中时触发
			bindinput(res) {
				const val = res.detail.html
				this.$refs.control.handleInput()
				this.$emit('input', val)
				// this.$emit('bindinput', {
				// 	detail: {
				// 		value: res
				// 	}
				// });
			},
			//撤销
			undo() {
				this.editorCtx.undo()
				this.$emit('undo')
			},

			//恢复
			redo() {
				this.editorCtx.redo()
				this.$emit('restore')
			},
			save() {
				this.editorCtx.getContents({
					success: (res) => {
						this.$emit('getEditorContent', {
							detail: {
								value: res,
							},
						})
					},
				})
			},
			// 输入框控制
			handleItem(item) {
				console.log(item, item.id)
				this[item.id]()
			},
			// 选择图片
			insertImageEvent() {
				// let that = this
				this.$emit('uploadImgBefore')
				// uni.chooseImage({
				// 	count: 1,
				// 	success: (res) => {
				// 		this.$emit('uploadImgBefore', res.tempFiles[0])
				// 	},
				// })
			},
			// 插入图片
			insertImage(img) {
				this.editorCtx.insertImage({
					src: img
				});
			}
		},
	}
</script>

<style scoped>
	@import url("./common.css");

	.scroll_style {
		max-height: 600rpx;
	}

	.kn_editor {
		padding-bottom: 20rpx;
	}

	.editor_wrapper {
		height: auto;
	}

	#editor {
		// height: 100px;
	}

	.handle_bar {
		height: 60rpx;
		/* width: 60rpx; */
	}

	.handle_icon {
		height: 30rpx;
	}

	.pb_80 {
		padding-bottom: 80rpx;
	}
</style>
