<template>
	<web-view :src="url" @message="handleMessage"></web-view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				url: "http://b0701-uploadfile.demo.huizhouyiren.com"
			}
		},
		computed: {
			...mapState('thirdParty', ['qiniuData'])
		},
		onLoad(options) {
			if (options.downloadUrl) {
				let url = `${this.url}?downloadUrl=${options.downloadUrl}`
				this.url = encodeURI(encodeURI(url))
			} else {
				this.url = `${this.url}?accessToken=${this.qiniuData.accessToken}&domain=${this.qiniuData.domain}`
			}

		},
		methods: {
			handleMessage(evt) {
				console.log('接收到的消息：' + JSON.stringify(evt.detail.data));
				uni.setStorageSync('uploadFile', evt.detail.data)
			},
		}
	}
</script>

<style>
</style>
