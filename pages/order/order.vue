<template>
	<view class="content">
		<view class="top">
			<view class="state_time">
				<view class="state">
					<text v-if="user.pageData.order_status == 1">待匹配</text>
					<text v-if="user.pageData.order_status == 2">已匹配</text>
					<text v-if="user.pageData.order_status == 3">订单完成</text>
					<text v-if="user.pageData.order_status == 4">订单超时</text>
					
				</view>

				<!-- <block v-if="user.pageData.order_status==4">
					<view class="time" v-if="user.remainingTime == 0">
						<image src="../../static/time.png" class="time_img"></image>
						<text>已超时</text>
					</view>
				</block> -->
				<block v-if="user.pageData.order_status==2">
					<view class="time" v-if="user.remainingTime != 0">
						<image src="../../static/time.png" class="time_img"></image>
						<text>{{minuteDE}}:{{secondDE}}</text>
						<!-- {{user.remainingTime}} -->
					</view>
				</block>

			</view>
			<view class="tips" v-if="user.pageData.order_status == 1 || user.pageData.order_status == 2">
				若已收到付款，请及时完成交易。
			</view>
			<view class="tips" v-else>
				本单收益：{{user.pageData.user_money?user.pageData.user_money:'0.00'}}
			</view>
		</view>

		<view class="main">
			<view class="peri"></view>
			<view class="main_title">
				订单信息
			</view>
			<view class="main_content">
				<view class="main_content_one">订单时间</view>
				<view class="main_content_two">{{user.pageData.create_time | timeStamp}}</view>
			</view>
			<view class="main_content">
				<view class="main_content_one">订单号</view>
				<view class="main_content_two">
					<text>{{user.pageData.order_number}}</text>
					<text class="copy" @click="copy" :data-num="user.pageData.order_number">复制</text>
				</view>
			</view>
			<view class="main_content">
				<view class="main_content_one">交易数量</view>
				<view class="main_content_two">{{user.pageData.order_money}} </view>
			</view>
			<view class="main_title main_title_top">
				收款信息
			</view>
			<view class="main_content">
				<view class="main_content_one">{{user.pageData.type}}</view>
				<view class="main_content_two">
					<text>{{user.pageData.true_name}}</text>
					<!-- <image src="../../static/left_arrow.png"></image> -->
				</view>
			</view>
			<view class="main_title main_title_top">
				<text v-if="user.pageData.order_status != 3 && user.pageData.order_status != 4 && user.pageData.order_status != 5">待收款</text>
				<text v-if="user.pageData.order_status == 3 || user.pageData.order_status == 4 || user.pageData.order_status == 5">已收款</text>
				<text class="money" v-if="user.pageData.order_status == 4 || user.pageData.order_status == 5">0.00</text>
				<text class="money" v-else>{{user.pageData.order_money}}</text>
			</view>
		</view>

		<view class="explain">
			<image src="../../static/gth.png" class="gth"></image>
			<view class="explain_text">
				如实际收款金额与订单金额不符，请及时联系客服
			</view>
		</view>

		<view class="explain">
			<image src="" class="gth"></image>
			<view class="explain_text text_two">
				恶意拖延放币将会遭到系统惩罚！
			</view>
		</view>

		<view class="but" @click="but" v-if="user.pageData.order_status == 2">
			订单确认
		</view>
		
		<block v-if="boxType">
			<view class="memb"></view>
			<view class="box">
				<view class="title">
					请确认金额
				</view>
				<view class="moneys">
					<text>{{user.pageData.order_money}}</text>
				</view>
				<view class="tishi">
					温馨提示：请一定仔细核对金额后确认！
				</view>
				<view class="box_but">
					<view class="quxiao" @click="but">
						取消
					</view>
					<view class="queding" @click="buts">
						确定
					</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	export default {
		
		data() {
			return {
                msg:'',
				create_time:'',
				id: "",
				user: {
					pageData: {
						order_status: ""
					},
					remainingTime: ""
				},
				time: "",
				minuteDE: "",
				secondDE: "",
				boxType: false
			}
		},
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
		onLoad(e) {
			this.id = e.id;
			this.info();
		},
		onShow() {
          
		},
		// onNavigationBarButtonTap() {
		// 	uni.navigateTo({
		// 		url: "../service/service"
		// 	})
		// },
		methods: {
			info() {
				let data = {
					order_id: this.id
				};
				this.getRequest('order/orderDetail', data).then(res => {					
				    this.msg = res.data.msg;
					this.user = res.data.data;
					console.log(this.user)
					
					
					if (this.user.remainingTime != 0) {
						this.minuteDE = Math.floor(this.user.remainingTime / 60);
						this.secondDE = Math.floor(this.user.remainingTime % 60);
						if (this.minuteDE < 10) {
							this.minuteDE = '0' + this.minuteDE;
						}
						if (this.secondDE < 10) {
							this.secondDE = '0' + this.secondDE;
						}
						// this.user.remainingTime = minu + ':' + second;
						this.time = setInterval(() => {
							if (this.user.remainingTime > 0) {
								this.user.remainingTime--;
								this.minuteDE = Math.floor(this.user.remainingTime / 60);
								this.secondDE = Math.floor(this.user.remainingTime % 60);
								if (this.minuteDE < 10) {
									this.minuteDE = '0' + this.minuteDE;
								}
								if (this.secondDE < 10) {
									this.secondDE = '0' + this.secondDE;
								}
							} else {
								clearInterval(this.time)
								this.info()
							}
						}, 1000);
					}
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
			//复制
			copy(e) {
				uni.setClipboardData({
					data: e.currentTarget.dataset.num,
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
				this.boxType = !this.boxType;
			},
			buts() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				let data = {
					order_id: this.id
				};
				this.getRequest('order/confirmOrder', data).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "../index/index"
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
	.top {
		width: 100%;
		height: 280upx;
		background-color: #1331df;

		.state_time {
			width: 90%;
			margin: auto;
			padding-top: 70upx;
			display: flex;
			justify-content: space-between;

			.state {
				color: #fff;
			}

			.time {
				color: #fff;
				display: flex;
				align-items: center;

				.time_img {
					margin-right: 20upx;
					width: 33upx;
					height: 33upx;
				}
			}
		}

		.tips {
			width: 90%;
			margin: 30upx auto 0;
			font-size: 28upx;
			color: #ffeb9d;
		}
	}

	.main {
		position: relative;

		.peri {
			width: 100%;
			height: 60upx;
			background-color: #fff;
			position: absolute;
			top: -60upx;
			border-top-left-radius: 50upx;
			border-top-right-radius: 50upx;
		}

		.main_title {
			width: 90%;
			margin: 0 auto 40upx;
			font-size: 32upx;
			color: #1331df;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.main_title_top {
			margin-top: 50upx;
		}

		.main_content {
			width: 90%;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30upx;
			color: #666;
			margin-top: 30upx;

			.main_content_two {
				display: flex;
				align-items: center;

				.copy {
					color: #3030e0;
					margin-left: 20upx;
				}

				image {
					width: 18upx;
					height: 32upx;
					margin-left: 20upx;
				}
			}
		}

		.money {
			color: #ff1b1b;
		}
	}

	.explain {
		width: 90%;
		margin: 50upx auto 0;
		display: flex;

		.gth {
			width: 27upx;
			height: 27upx;
			transform: translateY(8upx);
		}

		.explain_text {
			width: 640upx;
			color: #ff1b1b;
			font-size: 29upx;
			margin-left: 20upx;
		}

		.text_two {
			color: #3030e0;
		}
	}

	.but {
		width: 690upx;
		height: 90upx;
		background-color: #3030e0;
		border-radius: 10upx;
		color: #fff;
		line-height: 90upx;
		text-align: center;
		margin: 70upx auto 0;
		font-size: 30upx;
	}

	.memb {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		background-color: #000;
		opacity: .7;
	}

	.box {
		width: 90%;
		height: 400upx;
		background-color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		padding: 20upx 0 0;
		z-index: 200;
		border-radius: 20upx;
		overflow: hidden;

		.title {
			color: #3030e0;
			width: 90%;
			margin: auto;
			padding-top: 20upx;
		}

		.moneys {
			width: 90%;
			margin: 50upx auto 0;
			color: #3030e0;
			font-size: 50upx;
			border-bottom: 1px solid #dadada;
			padding-bottom: 20upx;

			text {
				color: #ff1b1b !important;
				font-size: 40upx;
				margin-left: 20upx;
			}
		}

		.tishi {
			width: 90%;
			margin: 20upx auto 0;
			color: #666666;
			font-size: 30upx;
		}

		.box_but {
			width: 100%;
			display: flex;
			margin-top: 50upx;

			view {
				width: 50%;
				height: 100upx;
				text-align: center;
				line-height: 82upx;
				color: #fff;
				font-size: 32upx;
			}

			.quxiao {
				background-color: #a2a2a2;
			}

			.queding {
				background-color: #3030e0;
			}
		}
	}
</style>
