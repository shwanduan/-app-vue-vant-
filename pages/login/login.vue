<template>
	<view class="content">
		<view class="title">
			鑫支付
		</view>
		<view class="auxi">
			高效便捷
		</view>
		<view class="main">
			<view class="inputc">
				<!-- #ifdef APP-PLUS -->
				<input type="text" placeholder="手机号" class="input_i" v-model="phone" />
				<!-- #endif -->
				<!-- #ifdef H5 || MP-WEIXIN -->
				<input type="text" placeholder="手机号" class="input_i" v-model="phone" />
				<!-- #endif -->
			</view>
			<view class="inputc">
				<!-- #ifdef APP-PLUS -->
				<input type="password" placeholder="密码" class="input_i" v-model="password" />
				<!-- #endif -->
				<!-- #ifdef H5 || MP-WEIXIN -->
				<input type="password" placeholder="密码" class="input_i" v-model="password" />
				<!-- #endif -->
			</view>
			<view class="inputc">
				<!-- #ifdef APP-PLUS -->
				<input type="text" placeholder="验证码" class="input_i input_code" v-model="code" />
				<!-- #endif -->
				<!-- #ifdef H5 || MP-WEIXIN -->
				<input type="text" placeholder="验证码" class="input_i input_code" v-model="code"  />
				<!-- #endif -->
				<view class="sms_view" @click="getSms">
					{{sms_text}}
				</view>
			</view>
			<view class="but" @click="login">
				登录
			</view>
		</view>
		<view class="option">
			<text @click="register">立即注册</text>
			<view class="line"></view>
			<text @click="forget">找回密码</text>
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
				sms_text: '获取验证码',
				code: "",
				phone: "",
				password: "",
			}
		},
		onLoad() {
			if (uni.getStorageSync('token')) {
				uni.reLaunch({
					url: "../index/index"
				})
			}
		},
		methods: {
			login() {
				// uni.reLaunch({
				// 	url: '../index/index'
				// })
				// return
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				let data = {
					phone: this.phone,
					password: this.password,
					code: this.code
				};
				this.getLogin('login/index', data).then(res => {
					console.log(res.data)
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					uni.setStorageSync('token', res.data.data)
					uni.setStorageSync('only', res.data.data.only)
					setTimeout(() => {
						uni.reLaunch({
							url: '../index/index'
						})
					}, 1000)
				}, res => {
					console.log(res.data)
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
			getSms() {
				if (this.sms_text == '获取验证码') {
					uni.showLoading({
						title: '请求中...',
						mask: true
					})
					if (this.phone == '') {
						uni.showToast({
							title: '请填写手机号',
							icon: "none",
							duration: 1000,
							mask: true
						})
						return
					}
					let data = {
						phone: this.phone
					};
					this.getLogin('login/SendSms', data).then(res => {
						console.log(res.data);
						uni.showToast({
							title: res.data.msg,
							icon: "none",
							duration: 1000,
							mask: true
						})
						this.sms_text = 60;
						let time = setInterval(() => {
							if (this.sms_text <= 0) {
								clearInterval(time)
								this.sms_text = '获取验证码';
							} else {
								this.sms_text--;
							}
						}, 1000)
					}, res => {
						uni.showToast({
							title: res.data.msg,
							icon: "none",
							duration: 1000,
							mask: true
						})
					})
				}
			},
			register() {
				uni.navigateTo({
					url: "./register"
				})
			},
			forget() {
				uni.navigateTo({
					url: "./forget"
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
		/*#ifdef H5 || MP-WEIXIN*/
		padding-top: 220upx;
		/*#endif*/
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
		height: 500upx;
		margin: auto;
		border-radius: 10upx;
		box-shadow: 0rpx 7rpx 11rpx 2rpx #9696ed;
		margin-top: 70upx;
		/*#ifdef H5 || MP-WEIXIN*/
		margin-top: 10upx;
		/*#endif*/
		padding-top: 10upx;
		position: relative;
		background-color: #fff;
		z-index: 100;

		.inputc {
			width: 450upx;
			height: 60upx;
			margin: 50upx auto 0;
			border: 1px solid #cbcbcb;
			border-radius: 50upx;
			display: flex;
			align-items: center;

			.input_i {
				width: 90%;
				margin-left: 20upx;
				font-size: 28upx;
			}

			.input_code {
				width: 250upx;
			}

			.sms_view {
				width: 150upx;
				text-align: center;
				font-size: 28upx;
				color: #666;
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

	.option {
		width: 550upx;
		height: 40upx;
		margin: 50upx auto;
		font-size: 28upx;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;

		.line {
			width: 1px;
			height: 40upx;
			background-color: #999;
			margin: 0 50upx;
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
