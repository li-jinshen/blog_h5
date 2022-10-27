<template>
	<!-- 如需更换 loadging 样式 可以查看  
	https://blog.csdn.net/weixin_39415598/article/details/121695277
	http://k21vin.gitee.io/front-end-data-visualization/#/native/pureCSS/loading （纯css实现117个Loading效果）
	-->
	<div class="com__box" :style='{background:bgColor}'>
		<!-- loading -->
		<div class="loading"></div>
	</div>
</template>
<script>
	export default {
		props: {
			bgColor: { // loading背景
				type: String,
				default: "#f6f6f6"
			}
		},
		data() {
			return {}
		}
	}
</script>
<style lang="scss" scoped>
	.com__box {
		position: absolute;
		z-index: 20;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading {
		width: 25px;
		height: 25px;
		display: inline-block;
		padding: 0px;
		border-radius: 100%;
		border: 5px solid;
		border-top-color: rgba(254, 168, 23, 0.65);
		border-bottom-color: rgba(57, 154, 219, 0.65);
		border-left-color: rgba(188, 84, 93, 0.95);
		border-right-color: rgba(137, 188, 79, 0.95);
		animation: loading-animation 2.5s ease-in-out infinite alternate;
	}

	@keyframes loading-animation {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(720deg);
		}
	}
</style>
