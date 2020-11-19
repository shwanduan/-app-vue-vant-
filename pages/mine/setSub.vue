<template>
	<view class="content">

		<view class="inputc">
			<view class="title">
				聚合码利率({{myInfo.wx_lilv}}元/每万元)
			</view>
			<view class="input_i">
				<input type="number" placeholder="聚合码利率" v-model="user.wx_lilv" />
			</view>
		</view>

		<view class="inputc">
			<view class="title">
				支付宝扫码利率({{myInfo.alipay_lilv1}}元/每万元)
			</view>
			<view class="input_i">
				<input type="number" placeholder="支付宝扫码利率" v-model="user.alipay1_lilv" />
			</view>
		</view>

		<view class="inputc">
			<view class="title">
				支付宝账号利率({{myInfo.alipay_lilv2}}元/每万元)
			</view>
			<view class="input_i">
				<input type="number" placeholder="支付宝转账利率" v-model="user.alipay2_lilv" />
			</view>
		</view>

		<view class="inputc">
			<view class="title">
				银行卡利率({{myInfo.bank_lilv}}元/每万元)
			</view>
			<view class="input_i">
				<input type="number" placeholder="银行卡利率" v-model="user.bank_lilv" />
			</view>
		</view>

		<view class="but" @click="add">
			设置
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					wx_lilv: "",
					alipay1_lilv: "",
					alipay2_lilv: "",
					bank_lilv: "",
					pid: ""
				},
				myInfo: {}
			}
		},
		onLoad(e) {
			this.user.pid = e.id;
			this.info();
		},
		methods: {
			info() {
				this.getRequest('user/details').then(res => {
					console.log(res.data)
					this.myInfo = res.data.data;
				}, res => {
					console.log(res.data)
				})
			},
			add() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				for (let key in this.user) {
					if (key != 'pid') {
						if (this.user[key] < 1) {
							uni.showToast({
								title: '利率设置不能小于1',
								icon: "none",
								duration: 1000
							})
							return
							break;
						}
					}
				}
				this.getRequest('team/setfree', this.user).then(res => {
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
