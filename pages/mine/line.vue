<template>
	<view class="content">
		<view class="box" v-for="(item,index) in list" :key="index" :id="item.id" @click="check">
			<text>{{item.name}}</text>
			<view class="bor_box" v-if="id == item.id">
				<view class="bor"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				id: ""
			}
		},
		onLoad() {
			this.info();
			this.lineInfo();
		},
		methods: {
			info() {
				uni.showToast({
					title: '请求中...',
					icon: "loading",
					duration: 1000,
					mask: true
				})
				this.getRequest('User/lineList').then(res => {
					this.list = res.data.data;
				}, res => {
					console.log(res.data)
				})
			},
			lineInfo() {
				this.getRequest('user/details').then(res => {
					console.log(res.data)
					this.id = res.data.data.line_id;
				}, res => {
					console.log(r0es)
				})
			},
			check(e) {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				let data = {
					line_id: e.currentTarget.id
				};
				this.getRequest('User/changeLine', data).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					this.id = e.currentTarget.id;
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f8f8;
	}

	.box {
		width: 100%;
		height: 100upx;
		font-size: 30upx;
		line-height: 80upx;
		border-bottom: 1px solid #dbdbdb;
		display: flex;
		align-items: center;
		justify-content: space-between;

		text {
			margin-left: 50upx;
		}

		.bor_box {
			width: 40upx;
			height: 40upx;
			border-radius: 50%;
			border: 1px solid #007AFF;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 50upx;

			.bor {
				width: 30upx;
				height: 30upx;
				border-radius: 50%;
				background-color: #007AFF;
			}
		}
	}
</style>
