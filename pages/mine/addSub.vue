<template>
	<view class="content">

		<view class="inputc">
			<view class="title">
				手机号
			</view>
			<view class="input_i">
				<input type="text" placeholder="手机号" v-model="user.phone" />
			</view>
		</view>

		<view class="inputc">
			<view class="title">
				设置密码
			</view>
			<view class="input_i">
				<input type="password" placeholder="设置密码" v-model="user.password" />
			</view>
		</view>
		<view class="inputc">
			<view class="title">
				银行卡利率({{myInfo.bank_lilv}}元/每万元)
			</view>
			<view class="input_i">
				<input type="number" placeholder="银行卡利率" v-model="user.rate" />
			</view>
		</view>

		<view class="but" @click="add">
			添加
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					phone: "",
					password: "",
					rate: ''
				},
				myInfo: {}
			}
		},
		onLoad() {
			this.info()
		},
		methods: {

			add() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				this.getRequest('team/subordinate', this.user).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					this.user = {
						phone: "",
						password: "",
						wx_lilv: "",
						alipay1_lilv: "",
						alipay2_lilv: "",
						bank_lilv: ""
					};
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
		padding-top: 20upx;
	}

	.inputc {
		width: 90%;
		margin: 0 auto 70upx;

		.title {
			font-size: 28upx;
		}

		.input_i {
			width: 100%;
			height: 30upx;
			margin-top: 20upx;
			padding-bottom: 20upx;
			border-bottom: 1px solid #999;

			input {
				font-size: 28upx;
			}
		}

		.input_img {
			width: 100%;
			height: 300upx;
			border: 1px dashed #999;
			margin-top: 20upx;
			background-color: #f7f8f7;
			position: relative;

			.sc_img {
				width: 100upx;
				height: 100upx;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
			}

			.code_img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.but {
		width: 90%;
		margin: auto;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: #fff;
		font-size: 28upx;
		border-radius: 10upx;
		background-color: #1331df;
	}
</style>
