<template>
	<view class="content">
		<view class="main">
			<view class="title">
				{{main.title}}
			</view>
			<!-- <view class="time">
				2020-01-01 14:14:14
			</view> -->
			<view class="content">
				<uParse :content="main.content"  />
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				id: "",
				main: {}
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.info();
		},
		methods: {
			info() {
				this.getRequest('user/helpDetail', {
					help_id: this.id
				}).then(res => {
					console.log(res.data)
					this.main = res.data.data;
				}, res => {
					console.log(res.data)
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f5fd;
		padding-top: 20upx;
	}

	.main {
		width: 100%;
		background-color: #fff;
		padding: 20upx 0;

		.title {
			width: 90%;
			padding: 10upx 0;
			margin: auto;
			border-bottom: 1px solid #dbdbdb;
			font-size: 34upx;
		}

		.time {
			width: 90%;
			margin: auto;
			padding: 20upx 0 0;
			font-size: 28upx;
			color: #666;
			text-align: right;
		}

		.content {
			width: 90%;
			margin: auto;
			padding: 10upx;
			line-height: 50upx;
			white-space: pre-wrap;
		}
	}
</style>
