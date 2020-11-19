<template>
	<view class="content">
		<view v-if="url != ''">
			<web-view :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ""
			}
		},
		onLoad() {
			this.getRequest('index/index').then(res => {
				this.url = '/hybrid/html/local.html?uid=' + res.data.data.uid + '&phone=' + res.data.data.u_phone + '&type=1';
			}, (res) => {
				console.log(res.data)
			})
		},
		onShow() {
		},
		methods: {

		}
	}
</script>

<style>

</style>