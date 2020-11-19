<template>
	<view class="content">
		<view class="top">
			<view class="item_top">
				<image src="../../static/tuandui.png" mode=""></image>
				<text>团队人数：{{user.teamCount}}人</text>
				<!-- <view class="num">
					{{user.rakezong}}
				</view>
				<view class="text">
					返利总额(明细)
				</view> -->
			</view>
			<view class="item_top">
				<image src="../../static/liushui.png" mode="" class="top-img"></image>
				<text>今日流水：{{user.todayMoney}}钻石 </text>
				<!-- <view class="num">
					{{user.jihuo}}/{{user.pnum}}
				</view>
				<view class="text">
					团队激活/人数
				</view> -->
			</view>
			<view class="item_top">
				<image src="../../static/yingli1.png" mode="" class="top-imgs"></image>
				<text>昨日盈利：{{user.yesterdayIncome}} 钻石</text>
				<!-- <view class="num">
					{{user.jihuo}}/{{user.pnum}}
				</view>
				<view class="text">
					团队激活/人数
				</view> -->
			</view>
			<view class="item_top">
				<image src="../../static/yingli2.png" mode="" class="top-imgs"></image>
				<text>今日盈利：{{user.todayIncome}}钻石</text>
				<!-- <view class="num">
					{{user.jihuo}}/{{user.pnum}}
				</view>
				<view class="text">
					团队激活/人数
				</view> -->
			</view>
			<!-- 	<view class="item_top">
			1	<view class="num">
					{{user.jihuo_day}}/{{user.user_day}}
				</view>
				<view class="text">
					今日激活/新增
				</view>
			</view> -->
		</view>

		<view class="team-list">
			<view class="team-line" v-for="item in list" :key="item.id" >
				<view class="one-line" @click="openList(item.id)">
					<image :src="arrowdown" v-if="active==item.id" class="down" ></image>
					<image :src="arrowup" v-else></image>
					<text>{{item.username}}</text>
					<text>{{item.phone}}</text>
				</view>
				<view  class="changeRate" @click="open(item.id)">
					 <!-- @click="changeRate" -->
					更改费率
				</view>
			
				<view class="two-line">
					<text style="color:  #1331df;">昨日流水：{{item.yesterdayMoney}} 钻石 今日流水：{{item.todayMoney}} 钻石 昨日盈利:{{item.yesterdayIncome}}
						钻石 今日盈利 : {{item.todayIncome}} 钻石 个人流水: {{item.money}} 钻石 个人盈利: {{item.income}} 钻石 费率：{{item.rate}}</text>
				</view>



				<view class="low" v-show="active == item.id">
					<view v-if="ifshow" class="ifshow">
						 暂无下级
					</view>
					<view class="lower" v-for="item in lowMessage" :key="item.id">
						<text class="one">
							<text>
								{{item.username}}
							</text>
							 <text>
								 {{item.phone}}
							 </text>
							
						</text>
						<text class="two">
							今日流水：{{item.todayMoney}} 钻石 昨日流水：{{item.yesterdayMoney}} 钻石 	费率：{{item.rate}} 今日盈利：{{item.todayIncome}} 钻石 昨日盈利：{{item.yesterdayIncome}} 钻石
						</text>
						
					</view>
				</view>
			</view>
			<!-- <mix-tree :list="list" @treeItemClick="treeItemClick" ref="teamTree" ></mix-tree> -->



		</view>

     <uni-popup ref="popup" type="dialog">
         <uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm" title="修改费率" mode="input" placeholder="费率最高3000/万元"></uni-popup-dialog>
     </uni-popup>
		<!-- 		<view class="info">
			<view class="arrow_box" @click="typesChange">
				<image :src="arrowup" v-if="!types"></image>
				<image :src="arrowdown" v-if="types"></image>
			</view>
			<block v-if="types">
				<view class="item_info">
					聚合码返利:{{user.wx_lilv}}元/每万元
				</view>
				<view class="item_info">
					支付宝扫码返利:{{user.alipay_lilv1}}元/每万元
				</view>
				<view class="item_info">
					支付宝转账返利:{{user.alipay_lilv2}}元/每万元 
				</view>
				<view class="item_info">
					银行卡返利:{{user.bank_lilv}}元/每万元
				</view>
			</block>
		</view> -->


		<!-- <view class="subo" @click="urlTap('subordinate')"> -->
		<!-- 			<image src="../../static/xiaji.png" class="icon"></image>
			<text>我的下级</text>
			<image src="../../static/left_arrow.png" class="arrow"></image>
		</view>

		<view class="subo" @click="urlTap('achievement')">
			<image src="../../static/yeji.png" class="icon"></image>
			<text>业绩报表</text>
			<image src="../../static/left_arrow.png" class="arrow"></image>
		</view> -->



	</view>
</template>

<script>
	import mixTree from '@/components/tree/mix-tree';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			mixTree,
			uniPopup,
		    uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				id:'',
				ifshow:true,
				active: '',
				lowMessage: [],
				list: [],
				user: {

				},
				types: '',
				arrowup: "../../static/xiangyou.png",
				arrowdown: "../../static/xiangxia.png"
			}
		},
		onLoad() {
			this.info();
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: "addSub"
			})
		},
		methods: {
		
			 open(e){
					 this.id = e;
			         this.$refs.popup.open()
			      },
		      close(done){
		                // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
		                // ...
		                done()
		            },
		            /**
		             * 点击确认按钮触发
		             * @param {Object} done
		             * @param {Object} value
		             */
		            confirm(done,value){
		                // 输入框的值
		                console.log(value)
						let data = {
							pid:this.id,
							rate:value
						}
		                // TODO 做一些其他的事情，手动执行 done 才会关闭对话框
		                // ...
						this.getRequest('team/setfree',data).then(res=>{
							
								uni.showToast({
									title: res.data.msg,
									icon: "none",
									duration: 1000,
									mask: true
								})
						     
							 
							  setTimeout(()=>{
								     this.info()
							  },1500)
							 
							
						})
		                done()
		            },
			// changeRate(){
				
			// },
			info() {
				uni.showToast({
					title: '请求中...',
					icon: "loading",
					mask: true,
					duration: 1000
				})
				this.getRequest('team/setteam').then(res => {
					this.user = res.data.data;
					this.list = res.data.data.userList
				}, res => {
					console.log(res.data)
				})
			},
			// 打开列表
			async openList(e) {
				console.log(e);
				if (this.active == e) {
					this.active = '';
				} else {
					// console.log(this.types);
					// this.types = !this.types;
					this.active = e;
					let data = {
						uid: e
					}
					await this.getRequest('team/getTeamList', data).then(res => {
						 
						 if(res.data.data == ''){
							 this.ifshow = true
							 this.lowMessage = ''
						 }else {
							 this.ifshow = false ;
							 this.lowMessage = res.data.data
						 }
						
					})
				}
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
	.ifshow{
	
		display: flex;
		justify-content: center;
		align-items: center;
		color: gray;
	}
	.changeRate{
		padding-top: 5px;color:#1331df ;margin-left: 20px;font-size: 15px;
	}
	.mgleft {
		margin-left: 3px;
	}

	page {
		background-color: #f7f8f8;
	}

	.top {
		width: 100%;
		height: 320upx;
		background-color: #1331df;
		display: flex;
		flex-wrap: wrap;

		.item_top {
			width: 40%;
			height: 50%;
			margin-left: 20px;
			color: #fff;
			text-align: center;
			display: flex;
			justify-content: space-around;
			align-items: center;

			image {
				width: 64upx;
				height: 44upx;
			}

			.top-img {
				width: 40upx;
				height: 44upx;
			}

			.top-imgs {
				width: 46upx;
				height: 44upx;
			}

			// .num {
			// 	font-size: 40upx;
			// 	margin-top: 50upx;
			// 	margin-bottom: 10upx;
			// }

			text {
				font-size: 32upx;
				margin-left: 4upx;
			}
		}
	}

	.team-list {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;

		//点击显示隐藏的下级
		.low {
			margin-top: 10px;
			width: 100%;
			border-bottom: 1px solid skyblue;
			padding-bottom: 10px;
		}

		.one {
			color: #333;
			font-size: 32upx;
			margin: 0 20upx;
		}

		.two {
			color: #00BFFF;
			font-size: 26upx;
		}

		// box-sizing: border-box;
		// padding: 20upx;
		.team-line {
			width: 100%;
			// background-color: #00BFFF;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 30upx 20upx 0;

			.one-line {
				display: flex;
				align-items: center;

				image {
					width: 22upx;
					height: 32upx;
				}

				.down {
					width: 34upx;
					height: 26upx;
				}


				text:nth-of-type(1) {
					color: #333;
					font-size: 32upx;
					margin: 0 20upx;
				}

				text:nth-of-type(2) {
					color: #00BFFF;
					font-size: 26upx;
				}
			}

			.two-line {
				color: #1331df;
				max-lines: 1;
				padding-bottom: 10px;
				// border-bottom: 1px solid skyblue;

				text {
					color: #00BFFF;
					font-size: 26upx;
				}
			}
		}
	}

























	.info {
		width: 90%;
		// height: 300upx;
		margin: -20upx auto 0;
		border-bottom: 1px solid #eee;
		background-color: #fff;
		border-radius: 20upx;
		box-shadow: 0rpx 7rpx 11rpx 2rpx #999;
		// padding-bottom: 20upx;

		.item_info {
			width: 90%;
			margin: auto;
			font-size: 30upx;
			padding-bottom: 20upx;
		}
	}

	.subo {
		width: 90%;
		height: 120upx;
		margin: 40upx auto 0;
		border-radius: 20upx;
		box-shadow: 0rpx 7rpx 11rpx 2rpx #999;
		font-size: 32upx;
		display: flex;
		align-items: center;
		position: relative;

		.icon {
			width: 60upx;
			height: 60upx;
			margin: 0 20upx;
		}

		.arrow {
			width: 18upx;
			height: 32upx;
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			right: 40upx;
		}
	}

	.arrow_box {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 15upx 0;

		image {
			width: 30upx;
			height: 30upx;
		}
	}
</style>
