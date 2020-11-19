<template>
	<view class="content">
		<view class="main">
			<view class="explain">
				当前
			</view>
			<view class="number">
				<text class="number_num">{{available_money}}</text>
			</view>
			<view class="number_details">
				<view class="number_details_item">
					<view>{{available_money}}</view>
					<view>可用</view>
				</view>
				<view class="number_details_item">
					<view>{{y_money}}</view>
					<view>冻结</view>
				</view>
			</view>
		</view>
		
		<view class="buy_all">
			<view class="buy mai" @click="urlTap('buy')">
				买币
			</view>
			
			<!-- <view class="buy mais" @click="urlTap('sell')">
				卖币
			</view> -->
		</view>

		<view class="title">
			充值记录
		</view>

		<view class="list_box" v-for="(item,index) in balist" :key="index" @click="details" :id="item.num" :data-type="item.c_number" :data-time="item.createtime" :data-status = "item.status">
			<view class="list">
				<view class="list_one">
					<view>{{item.cwtype==1?'充值':'提现'}}:<text class="list_num">{{item.num}}</text></view>
					<text v-if="item.status==0" class="wsh">未审核</text>
					<text v-if="item.status==1" class="cg">成功</text>
					<text v-if="item.status==2" class="bh">驳回</text>
				</view>
				<view>{{item.createtime}}</view>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				y_money:'',
				available_money:'',
				user: "",
				page: 1,
				balist:[]
			}
		},
		onShow() {
			this.page = 1;
			this.balist = [];
			this.info();
			this.balancelog();
		},
		onReachBottom(){
			this.page ++;
			this.balancelog();
		},
		methods: {
			info() {
				uni.showToast({
					title: '请求中...',
					icon: "loading",
					duration: 1000,
					mask: true
				})
				
				this.getRequest('index/index_page').then(res => {
					// this.user = res.data.data;
					this.available_money = res.data.data.available_money;
					this.y_money = res.data.data.y_money
					
				}, res => {
					console.log(res.data)
				})
			},
			balancelog() {
				let data = {
					page: this.page
				};
				this.getRequest('user/balancelog', data).then(res => {
					this.balist = this.balist.concat(res.data.data);
				}, res => {
					console.log(res.data)
				})
			},
			urlTap(name) {
				uni.navigateTo({
					url: name
				})
			},
			details(e){
				uni.navigateTo({
					url:"accountInfo?id="+e.currentTarget.id+ '&num='+ e.currentTarget.dataset.type +'&time='+e.currentTarget.dataset.time +'&status='+e.currentTarget.dataset.status
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f8f8;
	}

	.main {
		width: 100%;
		height: 280upx;
		background-color: #1331df;

		.explain {
			width: 90%;
			margin: auto;
			font-size: 28upx;
			color: #dbdbdb;
			padding-top: 30upx;
		}

		.number {
			width: 90%;
			font-size: 45upx;
			color: #fff;
			margin: auto;
			padding-top: 10upx;

			.number_num {
				margin-right: 30upx;
			}
		}

		.number_details {
			width: 90%;
			margin: 30upx auto 0;
			display: flex;

			.number_details_item view:first-child {
				font-size: 30upx;
				color: #fff;
				margin-right: 100upx;
			}

			.number_details_item view:last-child {
				font-size: 28upx;
				color: #dbdbdb;
			}
		}
	}
	
	.buy_all{
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		justify-content: center;
	}

	.buy {
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		border-radius: 10upx;
		margin: 20upx 0 0;
		font-size: 30upx;
	}

	.mai {
		color: #fff;
		background-color: #1331df;
		width: 55%;
	}

	.mais {
		width: 40%;
		color: #1331df;
		border: 1px solid #1331df;
	}

	.title {
		width: 90%;
		margin: 20upx auto 0;
		font-size: 30upx;
	}

	.list_box {
		width: 100%;
		background-color: #fff;
		padding: 15upx 0;
		margin-top: 15upx;

		.list {
			font-size: 30upx;
			width: 90%;
			margin: auto;
			
			.list_one{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20upx 0;
				
				.wsh{
					color: #333;
				}
				
				.cg{
					color:#0066CC
				}
				
				.bh{
					color: #fb0000;
				}
				
				.list_num{
					margin-left: 10upx;
				}
			}
			
			view:last-child{
				text-align: right;
				font-size: 28upx;
				color: #666;
			}
		}
	}
</style>
