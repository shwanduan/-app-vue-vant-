<template>
	<view class="content">
		<view class="inputc">
			<view class="title">
				持卡人姓名
			</view>
			<view class="input_i">
				<input type="text" placeholder="姓名" v-model="user.bank_username" />
			</view>
		</view>

		<view class="inputc">
			<view class="title">
				银行卡卡号
			</view>
			<view class="input_i">
				<input type="text" placeholder="卡号" v-model="user.b_card" />
			</view>
		</view>

		<view class="inputc">
			<view class="title">
				银行名称
			</view>
			<view class="input_i">
				<input type="text" placeholder="所属银行" v-model="user.b_bank" />
			</view>
		</view>

		<view class="inputc">
			<view class="title">
				支行名称
			</view>
			<view class="input_i">
				<input type="text" placeholder="支行" v-model="user.b_place" />
			</view>
		</view>

		<view class="inputc">
			<view class="title">
				备注信息
			</view>
			<view class="input_i">
				<input type="text" placeholder="备注" v-model="user.remark" />
			</view>
		</view>

		<view class="but" @click="add">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					b_card: "", //银行卡账号
					bank_username: "", //持卡人姓名
					b_bank: "", //所属银行
					b_place: "", //开户行
					remark: "" //备注
				}
			}
		},
		onLoad() {

		},
		methods: {
			add() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				this.getRequest('user/add_bank', this.user).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					this.user = {
						b_card: "", //银行卡账号
						bank_username: "", //持卡人姓名
						b_bank: "", //所属银行
						b_place: "", //开户行
						remark: "" //备注
					}
					uni.navigateBack({
						delta:1
					})
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-top: 20upx;
	}

	.inputc {
		width: 90%;
		margin: 0 auto 80upx;

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
