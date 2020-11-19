<template>
	<view class="content">
		<view class="title">
			修改密码
		</view>
		<view class="auxi">
			验证手机号修改密码
		</view>
		<view class="main">
			<view class="inputc">
				<input type="password" placeholder="新密码" class="input_i" v-model="password" />
			</view>
			<view class="inputc">
				<input type="password" placeholder="确认新密码" class="input_i" v-model="passwords" />
			</view>
			<view class="but" @click="login">
				修改
			</view>
		</view>
		<view class="top">

		</view>
		<view class="bottom">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				passwords: ""
			}
		},
		onLoad() {

		},
		methods: {
			login() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				let data = {
					oldpassword: this.password,
					newpassword: this.passwords
				};
				this.getRequest('user/forget_password', data).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
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

	.title {
		padding-top: 250upx;
		text-align: center;
		font-size: 50upx;
		font-weight: 600;
		font-style: italic;
	}

	.auxi {
		text-align: center;
		font-size: 28upx;
		color: #999;
		margin-top: 20upx;
	}

	.main {
		width: 550upx;
		height: 400upx;
		margin: auto;
		border-radius: 10upx;
		box-shadow: 0rpx 7rpx 11rpx 2rpx #9696ed;
		margin-top: 70upx;
		padding-top: 20upx;
		position: relative;

		.inputc {
			width: 450upx;
			height: 60upx;
			margin: 50upx auto 0;
			border: 1px solid #cbcbcb;
			border-radius: 50upx;
			display: flex;
			align-items: center;
			color: #666;

			.input_i {
				width: 90%;
				margin: auto;
				font-size: 28upx;
			}

			.input_sms {
				width: 55%;
			}

			.getSms {
				width: 140upx;
				text-align: center;
				font-size: 28upx;
				margin-right: 20upx;
			}

		}

		.but {
			width: 450upx;
			height: 60upx;
			background-color: #3030e0;
			margin: auto;
			border-radius: 50upx;
			font-size: 28upx;
			color: #fff;
			text-align: center;
			line-height: 60upx;
			margin-top: 50upx;
		}
	}

	.top {
		width: 100%;
		height: 375upx;
		background-color: #3030e0;
		position: fixed;
		top: 0;
		border-radius: 0 0 375upx 375upx;
		transform: translateY(-150upx);
	}

	.bottom {
		width: 100%;
		height: 375upx;
		background-color: #3030e0;
		position: fixed;
		bottom: 0;
		border-radius: 375upx 375upx 0 0;
		transform: translateY(150upx);
	}
</style>
