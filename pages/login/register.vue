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
				<input type="text" placeholder="姓名" class="input_i" v-model="user.username" />
				<!-- #endif -->
				<!-- #ifdef H5 || MP-WEIXIN -->
				<input type="text" placeholder="姓名" class="input_i" v-model="user.username" />
				<!-- #endif -->
			</view>
			<view class="inputc">
				<!-- #ifdef APP-PLUS -->
				<input type="text" placeholder="手机号" class="input_i" v-model="user.phone" />
				<!-- #endif -->
				<!-- #ifdef H5 || MP-WEIXIN -->
				<input type="text" placeholder="手机号" class="input_i" v-model="user.phone" />
				<!-- #endif -->
			</view>
			<view class="inputc">
				<!-- #ifdef APP-PLUS -->
				<input type="password" placeholder="密码" class="input_i" v-model="user.password" />
				<!-- #endif -->
				<!-- #ifdef H5 || MP-WEIXIN -->
				<input type="password" placeholder="密码" class="input_i" v-model="user.password" />
				<!-- #endif -->
			</view>
			<view class="inputc">
				<!-- #ifdef APP-PLUS -->
				<input type="text" placeholder="验证码" class="input_i input_code" v-model="user.code" />
				<!-- #endif -->
				<!-- #ifdef H5 || MP-WEIXIN -->
				<input type="text" placeholder="验证码" class="input_i input_code" v-model="user.code" />
				<!-- #endif -->
				<view class="sms_view" @click="getSms">
					{{sms_text}}
				</view>
			</view>
			<!-- <view class="inputc">
				<input type="text" placeholder="确认密码" class="input_i" v-model="passwords" />
			</view> -->
			<view class="inputc">
				<!-- #ifdef APP-PLUS -->
				<input type="text" placeholder="邀请码" class="input_i" v-model="user.yqm" />
				<!-- #endif -->
				<!-- #ifdef H5 || MP-WEIXIN -->
				<input type="text" placeholder="邀请码" class="input_i" v-model="user.yqm" />
				<!-- #endif -->
			</view>
			<view class="but" @click="register">
				注册
			</view>
			<view class="banben">
				版本号{{banben}}
			</view>
		</view>
		<view class="top" >

		</view>
		<view class="bottom">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sms_text: "获取验证码",
				// passwords: "",
				user: {
					username:'',
					phone: "",
					code: "",
					password: "",
					yqm: "",
				},
				banben:''
			}
		},
		onLoad() {
           this.getBanben()
		},
		methods: {
			getBanben(){
				this.getRequest('login/version').then(res=>{
					console.log(res.data.data)
					this.banben = res.data.data;
				})
			},
			getSms() {
				if (this.sms_text == '获取验证码') {
					uni.showLoading({
						title: '请求中...',
						mask: true
					})
					if (this.user.phone == '') {
						uni.showToast({
							title: '请填写手机号',
							icon: "none",
							duration: 1000,
							mask: true
						})
						return
					}
					let data = {
						phone: this.user.phone
					};
					this.getLogin('login/SendSms', data).then(res => {
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
						console.log(res.data)
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
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				this.getLogin('login/user_add', this.user).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					this.user = {};
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
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
		}
	}
</script>

<style lang="scss">
    .banben{
		margin-top: 10px;
		display: flex;
		justify-content: center;
		font-size: 15px;
		color: gray;
	}
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
		height: 600upx;
		margin: auto;
		border-radius: 10upx;
		box-shadow: 0rpx 7rpx 11rpx 2rpx #9696ed;
		margin-top: 20upx;
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

	.top {
		width: 100%;
		height: 375upx;
		background-color: #3030e0;
		position: fixed;
		top: 0;
		border-radius: 0 0 375upx 375upx;
		transform: translateY(-150upx);
		/*#ifdef H5 || MP-WEIXIN*/
		transform: translateY(-200upx);
		/*#endif*/
	}

	.bottom {
		width: 100%;
		height: 375upx;
		background-color: #3030e0;
		position: fixed;
		bottom: 0;
		border-radius: 375upx 375upx 0 0;
		transform: translateY(150upx);
		/*#ifdef H5 || MP-WEIXIN*/
		transform: translateY(200upx);
		/*#endif*/
	}
</style>
