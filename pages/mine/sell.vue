<template>
	<view class="content">
		<view class="main">
			<view class="title">
				<text>银行卡</text>
			</view>

			<view class="inputc">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view>{{array[index].name}}</view>
				</picker>
			</view>


			<view class="title">
				数量
			</view>

			<view class="inputc">
				<input type="number" placeholder="请输入数量" v-model="money" />
				<text class="PPY">钻石</text>
			</view>

			<view class="but" @click="but">
				提交
			</view>

			<view class="bottom">
				<view class="bottom_title">
					说明
				</view>
				<view class="bottom_content">
					1.必须使用您选择的银行卡付款,非此卡付款将导致订单失败
				</view>
				<view class="bottom_content">
					2.系统将为您自动补充小数点后两位,付款时必须根据生成金额足额支付
				</view>
				<view class="bottom_content">
					3.转账时严禁填写任何备注信息,带备注信息的转账将导致订单失败
				</view>
			</view>



		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [{
					name: ""
				}],
				index: 0,
				money: "",
				bid: ""
			}
		},
		onLoad() {
			this.yhkInfo();
		},
		methods: {
			yhkInfo() {
				this.getRequest('user/my_bank').then(res => {
					console.log(res.data)
					res.data.data.forEach((item, index) => {
						item.name = item.b_bank + '(' + item.b_card.substr(-4) + ')';
					})
					this.array = res.data.data;
				}, res => {
					console.log(res.data)
					uni.showToast({
						title:res.data.msg,
						icon:"none",
						duration:1000,
						mask:true
					})
				})
			},
			bindPickerChange(e) {
				this.index = e.detail.value;
			},
			but(){
				uni.showLoading({
					title:'请求中...',
					mask:true
				})
				let data = {
					bank_id:this.array[this.index].bid,
					num:this.money
				};
				this.getRequest('user/withdrawal',data).then(res=>{
					uni.showToast({
						title:res.data.msg,
						icon:"none",
						duration:1000,
						mask:true
					})
					this.money = "";
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				},res=>{
					uni.showToast({
						title:res.data.msg,
						icon:"none",
						duration:1000,
						mask:true
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #1331df;
		padding-top: 70upx;
	}

	.content {
		height: 100%;
	}

	.main {
		width: 100%;
		height: 100%;
		background-color: #fff;
		border-top-left-radius: 50upx;
		border-top-right-radius: 50upx;
		padding-top: 30upx;

		.title {
			width: 90%;
			margin: 50upx auto 0;
			font-size: 28upx;
			color: #333;
			display: flex;
			align-items: center;
			justify-content: space-between;

			text:last-child {
				color: #999;
				font-size: 26upx;
			}
		}

		.inputc {
			width: 90%;
			height: 70upx;
			margin: auto;
			padding-bottom: 5upx;
			border-bottom: 1px solid #dbdbdb;
			display: flex;
			align-items: center;

			input {
				width: 80%;
				font-size: 30upx;
				color: #1331df;
			}

			picker {
				font-size: 30upx;
				color: #1331df;
			}

			.PPY {
				font-size: 28upx;
				margin-left: 66upx;
			}
		}

		.but {
			width: 90%;
			height: 80upx;
			background-color: #1331df;
			font-size: 26upx;
			color: #fff;
			text-align: center;
			line-height: 80upx;
			margin: 80upx auto 0;
			border-radius: 10upx;
		}

		.bottom {
			width: 90%;
			margin: 50upx auto 0;

			.bottom_title {
				font-size: 26upx;
				color: #999;
			}

			.bottom_content {
				font-size: 24upx;
				color: #999;
				margin-top: 15upx;
			}
		}
	}
</style>
