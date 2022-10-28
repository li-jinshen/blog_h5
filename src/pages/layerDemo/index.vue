<template>
	<layer title="layer示例页面" position="left" :showBack="true" @leftfunc="goback" :showBorder="true" :showBottom="false"
		:useScroll="true" bgcolor="">
		<!--position为标题位置  left:左侧  center:中间
		 useScroll 是否启用滚动条  为ture时slot为content  为false时slot为normal  
		-->
		<template slot='content'>
			<view class="padding_box">
				<view class="" v-for="item in 40" :key='item'>
					{{item}}
				</view>
			</view>
		</template>
	</layer>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goback() {
				this.$navigateBack()
			}
		}
	}
</script>

<style>
</style>
