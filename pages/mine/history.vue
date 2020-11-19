<template>
	<view class="content">
		<view class="top">
			<view @click="chooseClick">
				<text>{{name}}</text>
				<image src="../../static/bottom_arrow.png"></image>
			</view>
		</view>
		<view class="membrane" v-if="chooseType"></view>
		<view class="chooseContent" v-if="chooseType">
			<view :class="['choose_item',sid==item.id?'choose_check':'']" :data-name="item.name" :id="item.id" @click="switchTap"
			 v-for="(item,index) in arr">{{item.name}}</view>
		</view>
		<view class="fill"></view>



		<view class="main" @click="order(item.id)" v-for="(item,index) in list" :key="index" :id="item.order_status">
<!-- 			<image src="../../static/wxzf.png" class="main_icon" v-if="item.order_status == 1"></image>
			<image src="../../static/zfb.png" class="main_icon" v-if="item.order_status == 2 || item.order_status == 3"></image>
 -->			<image src="../../static/yhk.png" class="main_icon" ></image>
			<view class="main_order">
				
				<view class="order_money">
<!-- 					{{item.order_status == 1?'聚合码':""}}{{item.order_status == 2?'支付宝':""}}{{item.order_status == 3?'转账':""}}{{item.order_status == 4?'银行卡':""}}{{item.order_money}}
 -->				
                   银行卡 {{item.order_money}}
                     
                </view>
				<view class="order_number">
					订单号：{{item.order_number}}
				</view>
				<view class="order_number right">
					{{item.create_time | timeStamp}}
				</view>
			</view>
			<!-- <view class="main_state">
				<view class="state">
					等待对方打款
				</view>
				<view class="main_img_view">
					<image src="../../static/left_arrow.png" class="left_main"></image>
				</view>
			</view> -->
		</view>

	</view>
</template>

<script>
	export default {
		 filters: {
		 			timeStamp: function(value) {
		 				if (!value) return '';
		 				var now = new Date(value * 1000);
		 				console.log("time:" + JSON.stringify(now));
		 				var year = now.getFullYear();
		 				var month = now.getMonth() + 1;
		 				if (month < 10) {
		 					month = '0' + month
		 				}
		 				var date = now.getDate();
		 				
		 				if (date < 10) {
		 					date = '0' + date
		 				}
		 				var hour = now.getHours();
		 				if(hour < 10){
		 					hour = "0" +hour
		 				}
		 				var m = now.getMinutes();
		 				if(m<10){
		 					 m = "0"+ m
		 				}
		 				var s = now.getSeconds();
		 				if(s<10){
		 					s = "0" +s
		 				}
		 				return year + "-" + month + "-" + date +' ' +hour +':' +m +':' +s
		 			},
		 			},
		data() {
			return {
				chooseType: false,
				sid: 0,
				arr: [{
					id:0,
					name:'全部'
				},{
					id: 1,
					name: '待匹配'
				}, {
					id: 2,
					name: '已匹配'
				}, {
					id: 3,
					name: '已成功'
				},{
					id:4,
					name:'已超时'
				},{
					id:5,
					name:'补单'
				}
				],
				name: "全部",
				page: 1,
				list: []
			}
		},
		onLoad() {
			this.info();
		},
		onReachBottom() {
			this.page++;
			uni.showLoading({
				title: '请求中...',
				mask: true
			})
			let data = {
				page: this.page,
				sid: this.sid
			};
			this.getRequest('uorder/orderList').then(res => {
				console.log(res.data)
				// this.list = this.list.concat(res.data.data);
				uni.hideLoading()
			}, res => {
				console.log(res.data)
				uni.hideLoading()
			})
		},
		methods: {
			
			info() {
				this.list = [];
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				let data = {
					sid:this.sid
				}
				this.getRequest('uorder/orderList',data).then(res => {
					
					console.log( '切换时 穿的参数sid'+this.sid)
					this.list = res.data.data;
					// this.msg = res.data.msg
					uni.hideLoading()
				}, res => {
					console.log(res.data)
					uni.hideLoading()
				})
			},
			order(e) {
				uni.navigateTo({
					url: "../order/order?id=" + e
				})
			},
			chooseClick() {
				this.chooseType = !this.chooseType
			},
			switchTap(e) {
				console.log('切换时的sid'+e.currentTarget.id)
				this.sid = e.currentTarget.id;
				this.name = e.currentTarget.dataset.name;
				this.chooseType = false;
				this.page = 1;
				this.info();
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f5fd;
		padding-top: 20upx;
	}

	.top {
		width: 100%;
		height: 80upx;
		font-size: 30upx;
		margin: auto;
		background-color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 105;
		display: flex;
		align-items: center;

		view {
			display: flex;
			align-items: center;
			margin-left: 50upx;
		}

		image {
			width: 30upx;
			height: 30upx;
			margin-left: 10upx;
		}
	}

	.fill {
		width: 100%;
		height: 80upx;
	}

	.membrane {
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: .7;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}

	.chooseContent {
		width: 100%;
		height: 240upx;
		background-color: #fff;
		position: absolute;
		top: 80upx;
		left: 0;
		z-index: 105;

		.choose_item {
			display: inline-block;
			width: 33%;
			height: 50upx;
			font-size: 28upx;
			text-align: center;
			margin-top: 20upx;
			margin-bottom: 20upx;
		}

		.choose_check {
			color: #007AFF;
		}
	}

	.main {
		width: 95%;
		margin: 0 auto 30upx;
		background-color: #fff;
		padding: 30upx 0 10upx;
		display: flex;
		box-shadow: 0rpx 7rpx 11rpx 2rpx rgba(201, 201, 201, 0.35);
		border-radius: 10upx;
		position: relative;

		.main_icon {
			width: 70upx;
			height: 70upx;
			margin: 0 20upx;
		}

		.main_order {

			.order_money {
				font-size: 30upx;
				color: #333;
				transform: translateY(-5upx);
				margin-bottom: 15upx;
			}

			.order_number {
				font-size: 28upx;
				color: #999;
				transform: translateY(5upx);
				margin-bottom: 15upx;
			}

			.right {
				width: 580upx;
				text-align: right;
			}
		}

		.main_state {
			position: absolute;
			right: 20upx;
			top: 25upx;

			.state {
				color: #3030e0;
				font-size: 30upx;
			}

			.main_img_view {
				display: flex;
				flex-direction: row-reverse;
				align-items: center;
				margin-top: 15upx;

				.left_main {
					width: 18upx;
					height: 32upx;
				}
			}
		}
	}
</style>
