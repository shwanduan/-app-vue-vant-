<template>
	<view class="content">
		<view class="pick_view">
			<picker :range="arr" @change="bindarr" range-key="names">
				<view>{{arr[index].names}}</view>
			</picker>
			<image src="../../static/left_arrow.png" class="arrow"></image>
		</view>
		<view class="exp">
			使用付款卡转账到下面的银行(转账成功自动到账)
		</view>
		<view class="exp blue">
			①打开网银APP→②转账到下面银行(使用已绑定的卡)
		</view>
		<view class="pick_view">
			<picker :range="array" @change="bindarrone" range-key="names">
				<view>{{array[five].names}}</view>
			</picker>
			<image src="../../static/left_arrow.png" class="arrow"></image>
		</view>
		<!-- <view class="info">
			<view class="title">
				{{user.bank_name}}
			</view>
			<view class="name">
				<view class="name_title">入款姓名:</view>
				<view class="name_name">{{user.true_name}}</view>
				<image src="../../static/copy.png" class="copy" :data-name="user.bank_name" @click="copy"></image>
			</view>
			<view class="name">
				<view class="name_title">银行账户:</view>
				<view class="name_name">{{user.card_num}}</view>
				<image src="../../static/copy.png" class="copy" :data-name="user.bank_card" @click="copy"></image>
			</view>
			<view class="name">
				<view class="name_title">支行名称:</view>
				<view class="name_name">{{user.bank_place}}</view>
				<image src="../../static/copy.png" class="copy" :data-name="user.bank_place" @click="copy"></image>
			</view>
			<view class="name">
				<view class="name_title">充值金额:</view>
				<view class="name_name">{{money}}</view>
				<image src="../../static/copy.png" class="copy" :data-name="money" @click="copy"></image>
			</view>
		</view> -->
		<view class="exp left">
			充值注意
		</view>
		<view class="exp_content">
			①：每次转账时请按照此页面显示的收款方式为准进行转账;
		</view>
		<view class="exp_content">
			②：务必使用此充值方式所绑定的银行卡进行转账;
		</view>
		<view class="exp_content">
			③：充值金额无上限,转账成功立即到账.
		</view>
		<view class="but" @click="but" v-if="code == 1">
			提交充值订单
		</view>
		<view class="but buts" v-if="code == 0">
			提交充值订单
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [{
					names: '选择个人银行卡',
					id: 0
				}],
				array:[{
					names:'选择平台银行卡',
					id:0
				}],
				index: 0,
				five:0,
				bid: "",
				
				money: "",
				code: 1
			}
		},
		onLoad(e) {
			this.money = e.money;
			 this.info();
			 this.bank();
		},
		methods: {
			bank(){
				let data = {
					num: this.money
				};
				//平台银行卡
				this.getRequest('user/blank', data).then(res => {
					res.data.data.forEach(item=>{
						item.names = item.true_name +'('+item.card_num.substr(-4)+')';
					})
					this.array = this.array.concat(res.data.data)
					this.code = 1;
				}, res => {
					console.log(res.data)
					this.code = 0;
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
			info() {
				//本人银行卡id
				this.getRequest('user/my_bank').then(res => {
					console.log(res.data)
					res.data.data.forEach((item, inex) => {
						item.names = item.bank_name + '(' +item.card_num.substr(-4) + ')';
					})
					this.arr = this.arr.concat(res.data.data)
				}, res => {
					console.log(res.data)
				})
			},
			bindarr(e) {
				this.index = e.detail.value;
			},
			bindarrone(e){
			   this.five = e.detail.value;	
			},
			copy(e) {
				uni.setClipboardData({
					data: e.currentTarget.dataset.name,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: "none",
							duration: 1000,
							mask: true
						})
					}
				});
			},
			but() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				let data = {
					bid: this.arr[this.index].id,
					money: this.money,
					mid: this.array[this.five].id,
				};
				this.getRequest('user/recharge', data).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					this.money = "";
					setTimeout(() => {
						uni.navigateBack({
							delta: 2
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
	page {
		padding-top: 20upx;
	}

	.pick_view {
		width: 90%;
		margin: auto;
		padding: 20upx 0;
		border: 1px solid #dbdbdb;
		border-radius: 20upx;
		display: flex;
		align-items: center;

		picker {
			width: 560upx;
			padding-left: 50upx;
		}

		.arrow {
			width: 18upx;
			height: 32upx;
		}
	}

	.exp {
		width: 90%;
		margin: 20upx auto 0;
		font-size: 30upx;
		color: #666;
		text-align: center;
	}

	.blue {
		color: #007AFF;
		text-align: left;
	}

	.money {
		width: 90%;
		margin: 10upx auto 0;
		font-size: 35upx;
	}

	.info {
		width: 90%;
		padding: 20upx 0;
		border: 1px solid #DBDBDB;
		margin: 20upx auto 0;
		border-radius: 20upx;

		.title {
			width: 100%;
			text-align: center;
			color: #007AFF;
			font-size: 30upx;
		}

		.name {
			width: 90%;
			margin: auto;
			display: flex;
			align-items: center;
			font-size: 32upx;
			color: #666;
			padding: 20upx 0;

			.name_title {
				width: 160upx;
			}

			.name_name {
				width: 400upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.copy {
				width: 50upx;
				height: 50upx;
			}
		}
	}

	.left {
		text-align: left;
	}

	.exp_content {
		font-size: 32upx;
		color: #f76a24;
		width: 86%;
		margin: auto;
		padding: 20upx 0;
	}

	.but {
		width: 90%;
		height: 100upx;
		background-color: #007AFF;
		color: #fff;
		font-size: 32upx;
		text-align: center;
		line-height: 100upx;
		margin: 10upx auto 0;
		border-radius: 20upx;
	}
	
	.buts{
		background-color: #999999;
	}
</style>
