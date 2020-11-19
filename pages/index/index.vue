<template>
	<view class="content">
		<view class="top">
			<view class="top_box">
				<!-- <view class="address_view" @click="urlTap('address')">
					<image src="../../static/dingwei.png" class="img_dingwei" v-if="address_name == ''"></image>
					<text class="address" v-else>{{address_name}}</text>
				</view> -->
				<view class="top_title">
					<view :class="id==0?'top_title_check':''" id='0' @click="switchTap">
						OTC接单
						<view class="top_check" v-if="id==0"></view>
					</view>
					<view :class="id==1?'top_title_check':''" id='1' @click="switchTap">
						进行中
						<view class="top_check" v-if="id==1"></view>
					</view>
				</view>
				<!-- <image src="../../static/index_kf.png" class="img_kefu" @click="urlTap('../service/service')"></image> -->
			</view>
		</view>

		<swiper :indicator-dots="false" :autoplay="false" :duration="500" :current="id" @change="currentChange">
			<swiper-item>
				<view class="main">
					<view class="person_main" @click="urlTap('../mine/mine')">
						<view class="person_photo">
							<image src="../../static/head.png"></image>
							<view class="person_status">
								您已在线
							</view>
						</view>
						<view class="person_id">
							<view>{{user.u_phone}}</view>
							<view v-if="user.username">姓名: {{user.username}}</view>
						</view>
						<view class="left_arrow">
							<image src="../../static/tiaozhuan1.png"></image>
						</view>
					</view>

					<view class="number_main">
						<block v-if="!start">
							<view class="number">
								<view>{{user.available_money}}  <text style="font-size: 20px;margin-left:5px ;"> 钻石</text></view>
								<view>当前</view>
							</view>
							<view class="mai" @click="urlTap('../mine/account')">
								一键买币
							</view>
						</block>
						<block v-if="start">
							<view class="number_exp">
								今日接单:{{String(orderInfo.order_success)}}/{{String(orderInfo.order_sum)}}
							</view>
							<view class="number_exp">
								成功率:{{String(orderInfo.success_rate)}}%
							</view>
						</block>
					</view>

					<view class="number_details">
						<view class="number_details_s">
							<view>{{user.available_money}} 钻石</view>
							<view>可用</view>
						</view>
						<view class="number_details_s">
							<view>{{user.y_money}} 钻石</view>
							<view>冻结金额</view>
						</view>
					</view>
				</view>

				<view class="info">
					<view class="info_item dd" @click="urlTap('../mine/history')">
						<view class="info_item_title">
							今日接单
						</view>
						
						<view class="info_item_num num_dd">
							{{user.today_order}}
						</view>
					</view>
					<view class="info_item ls" @click="urlTap('flowDetails')">
						<view class="info_item_title">
							今日流水
						</view>
						
						<view class="info_item_num num_ls">
							{{user.today_order_money}}
						</view>
					</view>
					<view class="info_item lr" @click="urlTap('flowDetails')">
						<view class="info_item_title">
							今日盈利
						</view>
						
						<view class="info_item_num num_lr">
							{{user.today_profit}}
						</view>
					</view>
				</view>

				<block v-if="!start">

					<view class="notice_icon">
						<view class="title">
							<image src="../../static/index_tz.png"></image>
							<text>系统公告</text>
						</view>
						<view class="all" @click="urlTap('notice')">
							查看全部>>
						</view>
					</view>

					<view class="notice_info" @click="details" :id="user.ad.id">
						<image src="../../static/index_tzbig.png" class="tz_icon"></image>
						<view class="contents">
							<view>{{user.ad.title}}</view>
							<view>{{user.ad.content}}</view>
						</view>
						<image src="../../static/left_arrow.png" class="left_arrow"></image>
					</view>

					<view class="bottom">
						<view class="bottom_item bottom_code" @click="urlTap('paymentCode')">
							<text>收款方式</text>
							<!-- <image src="../../static/index_code.png"></image> -->
						</view>
						<view class="bottom_item bottom_start" @click="startFn">
							开始接单
						</view>
					</view>
				</block>

				<block v-if="start">
					
						<!-- <view class="switch_item">
							<text>抢单模式</text>
							<switch @change="rob" :checked='rob_num == 1?true:false' />
						</view> -->
						<!-- <view class="start_view">
							<view class="start_title">
								卖币
							</view>
						<view class="switch_item">
							<text>轮询模式</text>
							<switch @change="pol" :checked="que_num == 1?true:false" />
						</view>
						</view> -->
						<!-- <view class="user_read">
							用户必读!
						</view> -->
					

					<view class="start_bottom">
						<view class="item item_one">
							<!-- <view class="item_s">
								<text>买币</text>
								<switch />
							</view>
							<view class="item_a">
								回收WCG
							</view> -->
						</view>
						<view class="item item_two">
							<view class="item_z">
								正在接单中……
							</view>
							<view class="item_stop" @click="endFn">
								<image src="../../static/index_stop.png"></image>
								<text>停止接单</text>
							</view>
						</view>
					</view>
				</block> 
			</swiper-item>
			
			<swiper-item>

				<scroll-view scroll-y="true" @scroll="scroll" class="scroll">
					<text class="empty" v-if="empty">暂无订单</text>
					<view class="mains" @click="urlTap('../order/order?id=' + item.id)" v-for="(item,index) in listIng" :key="index"
					 :id="item.id">
						<!-- <image src="../../static/zfb.png" class="main_icon"></image> -->
						<!-- <image src="" class="main_icon"></image> -->
						<view class="main_order">
							<view class="order_money">
								{{item.type}}{{item.order_money}}
							</view>
							<view class="order_number">
								订单号：{{item.order_number}}
							</view>
						</view>
						<view class="main_state">
							<view class="state">
								{{item.status}} 
							</view>
							<view class="main_img_view">
								<image src="../../static/left_arrow.png" class="left_main"></image>
							</view>
						</view>
					</view>
				</scroll-view>

			</swiper-item>
		</swiper>

		<!-- <block v-if="id == 1">
			
		</block>

		<block v-if="id == 2">
			
		</block> -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				address_name: "",
				empty:true,
				address_id: 0,
				start: false,
				user: {
					ad: {},
					current_money: 0,
					available_money: 0,
					y_money: 0,
					today_order: 0,
					today_order_money: 0,
					today_profit: 0
				},
				rob_num: 0,
				que_num: 0,
				listIng: [],
				scrollTop: 0,
				orderInfo: {}
			}
		},
		onLoad(e) {
			console.log(uni.getStorageSync('token'));
			this.showModal();
		},
		onShow() {
			this.address_name = uni.getStorageSync('address_name');
			this.orderType();
			this.orderIng();
		},
		methods: {
			//socket
			socket(uid) {
				let that = this;
				uni.connectSocket({
					url: 'ws://154.211.21.190:3130'
				});
				// '{"type":"init","uid":' + uid + '}'
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接已打开！');
					uni.sendSocketMessage({
						data: String(uid)
					});
					setInterval(function() {
						uni.sendSocketMessage({
							data: String(uid)
						});
					}, 5000)
				});
				uni.onSocketError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
				});
				uni.onSocketClose(function(res) {
					console.log('WebSocket连接已断开！')
				})
				uni.onSocketMessage(function(res) {
					// console.log(res);
					console.log(res.data)
					if (res.data != '测试socket连接成功') {
						uni.showModal({
							title: '提示',
							content: res.data,
							showCancel: false,
							success: r => {
								console.log(res);
								if (res.data == '您已接单，请及时处理') {
									that.getRequest('index/orderInProgress').then(res => {
										uni.navigateTo({
											url: "../order/order?id=" + res.data.data[0].id
										})
										uni.hideLoading();
									}, res => {
										console.log(res.data)
										uni.showToast({
											title: res.data.msg,
											icon: "none",
											duration: 1000,
											mask: true
										})
										// uni.hideLoading();
									})
								}
							}
						});
						if (res.data == '您已接单，请及时处理') {
							var musics = uni.getBackgroundAudioManager();
							musics.src = '../../static/music/alert.mp3';
							musics.play();
						} else {
							var musics = uni.getBackgroundAudioManager();
							musics.src = '../../static/music/alert1.mp3';
							musics.play();
						}
						// #ifdef APP-PLUS
						plus.push.createMessage(res.data);
						plus.push.setAutoNotification(true);
						plus.push.addEventListener("click", function(msg) {
							uni.reLaunch({
								url: "/pages/index/index"
							})
							if (res.data == '您已接单，请及时处理') {
								that.getRequest('index/orderInProgress').then(res => {
									uni.navigateTo({
										url: "../order/order?id=" + res.data.data[0].id
									})
									uni.hideLoading();
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
						}, false);
						// #endif
					}
				});
			},
			//接单状态
			orderType() {
				this.getRequest('user/takeOrderStatus').then(res => {
					this.start = true
					this.orders();
				}, res => {
					if (res.data.code == 0) {
						this.start = false
					}
					this.orders();
				})
			},
			//信息
			info() {
				// uni.showLoading({
				// 	title: '请求中...',
				// 	mask: true
				// })
				this.getRequest('index/index_page').then(res => {
					console.log(res.data)
					if (!res.data.data.ad) {
						res.data.data.ad = {
							id: 0
						};
					}
					this.user = res.data.data;
					this.socket(this.user.uid)
					uni.hideLoading();
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
			//公告详情
			details(e) {
				if (e.currentTarget.id == 0) {
					return
				}
				uni.navigateTo({
					url: "noticeInfo?id=" + e.currentTarget.id
				})
			},
			//抢单页
			orders() {
				this.getRequest('order/takeOrdersPage').then(res => {
					console.log(res.data)
					this.user.u_phone = res.data.data.phone;
					this.rob_num = res.data.data.rob_status;
					this.que_num = res.data.data.auto_queue;
					// this.user.available_money = res.data.data.usable_money;
					// this.user.y_money = res.data.data.freeze_money;
					this.orderInfo = res.data.data;
					// this.socket(this.user.uid)
					this.info();
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
			//系统公告
			showModal() {
				this.getRequest('index/showAd').then(res => {
					console.log(res.data);
					uni.showModal({
						title: res.data.data.title,
						content: res.data.data.content,
						showCancel: false,
						success: res => {
							this.modalType = true;
						}
					});
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
			//进行中订单
			orderIng() {
				// uni.showLoading({
				// 	title: '请求中...',
				// 	mask: true
				// })
				this.getRequest('index/orderInProgress').then(res => {
					console.log(res.data)
					if(res.data.data==''){
						this.empty = true;
					}else{
						this.empty = false;
						this.listIng = res.data.data;
						uni.hideLoading();
					}
					
				}, res => {
					console.log(res.data)
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					// uni.hideLoading();
				})
			},
			//开始接单
			startFn() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				this.getRequest('order/takeOrders').then(res => {
					console.log(res.data);
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = '../../static/music/start.mp3';
					this.start = !this.start;
					this.orders();
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
			//结束接单
			endFn() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				this.getRequest('order/stopTakeOrders').then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = '../../static/music/stop.mp3';
					this.start = !this.start;
					this.info();
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
			//抢单模式
			rob(e) {
				//1开启  0关闭
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				let data = {
					rob_status: Number(e.detail.value)
				};
				this.getRequest('order/editRob', data).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
			//轮询模式
			pol(e) {
				let num;
				//1开启  2关闭
				if (e.detail.value) {
					num = 1;
				} else {
					num = 2;
				}
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				let data = {
					auto_queue: num
				};
				this.getRequest('order/editAutoQueue', data).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
			switchTap(e) {
				this.id = e.currentTarget.id;
				if (this.id == 0) {
					this.orderType();
				} else {
					this.orderIng();
				}
			},
			currentChange(e) {
				this.id = e.detail.current;
				if (this.id == 0) {
					this.orderType();
				} else {
					this.orderIng();
				}
			},
			scroll(e) {
				this.scrollTop = e.detail.scrollTop
			},
			urlTap(name) {
				uni.navigateTo({
					url: name
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f5fd;
		height: 100%;
		/*  #ifdef  H5 */
		// height: auto;
		// padding-bottom: 150upx;
		/*  #endif  */
	}

	.content {
		height: 100%;
		/*  #ifdef  H5 */
		// height: auto;
		padding-bottom: 150upx;
		/*  #endif  */
	}

	swiper {
		width: 100%;
		height: calc(100% - 75px);
		// height: 100%;
	}

	swiper-item {
		position: relative;
	}

	.scroll {
		height: 95%;
	}

	.top {
		width: 100%;
		height: 80upx;
		padding-top: 35upx;
		box-shadow: 0px 3px 6px 1px rgba(164, 190, 255, 0.35);
		background-color: #fff;
		position: relative;
		z-index: 100;

		.top_box {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 90%;
			height: 100%;
			margin: auto;
			display: flex;
			align-items: center;
			// justify-content: space-between;

			.address_view {
				width: 140upx;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.img_dingwei {
					width: 30upx;
					height: 43upx;
					transform: translateY(10upx);
				}

				.address {
					font-size: 26upx;
				}
			}

			.top_title {
				
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #666;
				font-size: 34upx;
				margin-left: 50upx;
				margin-right: 90upx;

				view {
					width: 160upx;
					height: 100%;
					text-align: center;
					line-height: 88upx;
					position: relative;
				}

				.top_title_check {
					color: #3030e0;
				}

				.top_check {
					width: 60%;
					height: 7upx;
					background-color: #3030e0;
					border-radius: 20upx;
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
				}
			}

			.img_kefu {
				width: 43upx;
				height: 45upx;
				transform: translateY(6upx);
			}
		}
	}

	.main {
		width: 690upx;
		height: 450upx;
		background-image: url('../../static/index_bg.png');
		background-size: 100%;
		margin: 20upx auto 0;
		color: #fff;
		border-radius: 20upx;
		box-shadow: 1upx 7upx 16upx 13upx rgba(0, 62, 204, 0.35);

		.person_main {
			width: 90%;
			margin: auto;
			display: flex;
			align-items: center;
			padding-top: 30upx;
			position: relative;

			.person_photo {
				position: relative;

				image {
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
				}

				.person_status {
					width: 100%;
					height: 34upx;
					background-color: #2DA84A;
					color: #fff;
					font-size: 24upx;
					border-radius: 10upx;
					text-align: center;
					position: absolute;
					bottom: 0;
				}
			}

			.person_id {
				margin-left: 20upx;

				view:first-child {
					font-size: 32upx;
					font-weight: 600;
					transform: translateY(-10upx);
				}

				view:last-child {
					font-size: 28upx;
					color: #a0b4ff;
				}
			}

			.left_arrow {
				position: absolute;
				right: 20upx;

				image {
					width: 54upx;
					height: 32upx;
				}
			}
		}

		.number_main {
			width: 90%;
			margin: 20upx auto 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.number {
				font-size: 42upx;
				font-weight: 600;

				view:last-child {
					font-size: 28upx;
					color: #a0b4ff;
					font-weight: normal;
				}
			}

			.number_exp {
				font-size: 30upx;
				color: #e3f56b;
				height: 92upx;
			}

			.mai {
				width: 180upx;
				height: 70upx;
				background-color: #eebe00;
				font-size: 30upx;
				text-align: center;
				line-height: 70upx;
				border-radius: 50upx;
			}
		}

		.number_details {
			width: 67%;
			display: flex;
			justify-content: space-between;
			margin-top: 50upx;
			margin-left: 20px;

			.number_details_s {
				font-size: 30upx;

				view:last-child {
					font-size: 30upx;
					color: #a0b4ff;
				}
			}
		}
	}

	.start_view {
		width: 690upx;
		margin: 50upx auto 0;
		display: flex;
		align-items: center;

		.start_title {
			font-size: 32upx;
			transform: translateY(-5upx);
		}

		.switch_item {
			font-size: 28upx;
			display: flex;
			align-items: center;
			margin-left: 20upx;

			switch {
				transform: scale(0.6);
			}
		}

		.user_read {
			font-size: 28upx;
			color: #999;
		}
	}

	.start_bottom {
		width: 100%;
		height: 202upx;
		background-color: #fff;
		position: fixed;
		bottom: 0;

		.item {
			width: 100%;
			height: 100upx;
		}

		.item_one {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #eee;
			font-size: 32upx;

			.item_s {
				display: flex;
				align-items: center;

				text {
					margin-left: 30upx;
				}

				switch {
					transform: scale(0.7) translateY(5upx);
				}
			}

			.item_a {
				color: #999;
				font-size: 30upx;
				margin-right: 30upx;
			}
		}

		.item_two {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item_z {
				color: #d0af3b;
				font-size: 30upx;
				margin-left: 30upx;
			}

			.item_stop {
				width: 400upx;
				height: 70upx;
				border: 1px solid #3c3c9c;
				border-radius: 10upx;
				font-size: 30upx;
				color: #3c3c9c;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 30upx;

				image {
					width: 40upx;
					height: 40upx;
					margin-right: 20upx;
				}
			}
		}
	}

	.info {
		
		width: 90%;
		margin: 40upx auto 0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.info_item {
			width: 210upx;
			height: 300upx;
			border-radius: 20upx;
			background-size: 100%;

			.info_item_title {
				font-size: 35upx;
				color: #3030e0;
				text-align: center;
				margin-top: 20upx;
			}

			.unit {
				margin-top: 0;
			}

			.info_item_num {
				font-size: 42upx;
				text-align: center;
				margin-top: 60upx;
			}

			.num_dd {
				color: #3030e0;
			}

			.num_ls {
				color: #e07b30;
			}

			.num_lr {
				color: #196a00;
			}
		}

		.dd {
			background-image: url('../../static/index_dd.png');
		}

		.ls {
			background-image: url('../../static/index_ls.png');
		}

		.lr {
			background-image: url('../../static/index_lr.png');
		}
	}

	.notice_icon {
		width: 90%;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 30upx;

		.title {
			display: flex;
			align-items: center;
			font-size: 30upx;
			color: #333;

			image {
				width: 30upx;
				height: 30upx;
				margin-right: 20upx;
			}
		}

		.all {
			font-size: 30upx;
			color: #999;
		}
	}

	.notice_info {
		width: 90%;
		height: 120upx;
		background-color: #fff;
		border-radius: 20upx;
		margin: 20upx auto 0;
		box-shadow: 0px 7px 11px 2px rgba(201, 201, 201, 0.35);
		display: flex;
		align-items: center;
		position: relative;
		/*  #ifdef  H5 */
		margin-bottom: 150upx;
		/*  #endif  */

		.tz_icon {
			width: 80upx;
			height: 80upx;
			margin: 0 30upx;
		}

		.contents {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			view:first-child {
				font-size: 30upx;
				margin-bottom: 10upx;
			}

			view:last-child {
				font-size: 28upx;
				color: #999999;
			}
		}

		.left_arrow {
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			right: 20upx;
			width: 18upx;
			height: 32upx;
		}
	}

	.bottom {
		width: 100%;
		height: 100upx;
		background-color: #f2f5fd;
		position: absolute;
		bottom: 0;
		z-index: 100;
		color: #fff;
		font-size: 28upx;
		display: flex;
		align-items: center;
		margin-top: 20upx;

		.bottom_item {
			height: 80upx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10upx;
			margin-left: 28upx;
		}

		.bottom_code {
			width: 300upx;
			background-color: #3f91e4;

			image {
				width: 30upx;
				height: 30upx;
				margin-left: 20upx;
				transform: translateY(4upx);
			}
		}

		.bottom_start {
			width: 350upx;
			background-color: #3030e0;
		}
	}
	.empty{
		color: #333;
		font-size: 35upx;
	    width: 200px;
		padding-top: 20px;
		margin: 300upx;
	}
	.mains {
		width: 95%;
		margin: 0 auto 30upx;
		background-color: #fff;
		padding: 30upx 0;
		display: flex;
		box-shadow: 0rpx 7rpx 11rpx 2rpx rgba(201, 201, 201, 0.35);
		border-radius: 10upx;
		position: relative;
		margin-top: 50upx;

		.main_icon {
			width: 70upx;
			height: 70upx;
			margin: 0 20upx;
		}

		.main_order {
			margin-left: 30upx;

			.order_money {
				font-size: 30upx;
				color: #333;
				transform: translateY(-5upx);
			}

			.order_number {
				font-size: 28upx;
				color: #999;
				transform: translateY(5upx);
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

	// .membrane{
	// 	width: 100%;
	// 	height: 100%;
	// 	background-color: #000;
	// 	opacity: .7;
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	z-index: 500;
	// }

	// .popup{
	// 	width: 90%;
	// 	height: 500upx;
	// 	background-color: #fff;
	// 	position: absolute;
	// 	left: 0;
	// 	right: 0;
	// 	top: 0;
	// 	bottom: 0;
	// 	margin: auto;
	// 	z-index: 600;
	// 	border-radius: 10upx;
	// }
</style>
