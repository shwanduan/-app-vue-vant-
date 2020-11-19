<template>
	<view class="content">
		<view class="info">
			<image src="../../static/head.png" class="head"></image>
			<view class="info_num">
				<view class="phone">{{user.u_phone}}</view>
				<view class="id" v-if="user.uid">姓名: {{user.username}}</view>
			</view>
		</view>

		<view class="main">
			<view class="list lists" @click="urlTap('account')">
				<view class="item_1">
					<image src="../../static/zh.png" class="img_list"></image>
					<text>账号</text>
				</view>
				<view class="item_2">
					{{user.available_money}} 钻石
				</view>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
		<!-- 	<view class="list" @click="urlTap('code')">
				<image src="../../static/skm.png" class="img_list"></image>
				<text>收款码</text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view> -->
			<view class="list" @click="urlTap('yhkInfo')">
				<image src="../../static/yhk.png" class="img_list"></image>
				<text>银行卡</text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
			<view class="list" @click="urlTap('transfer')">
				<image src="../../static/zz.png" class="img_list"></image>
				<text>转账</text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
			<view class="list" @click="urlTap('history')">
				<image src="../../static/lsqd.png" class="img_list"></image>
				<text>历史抢单</text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
			<view class="list" @click="urlTap('invitation')">
				<image src="../../static/yq.png" class="img_list"></image>
				<text>邀请有奖</text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
			<view class="list" @click="urlTap('team')">
				<image src="../../static/td.png" class="img_list"></image>
				<text>我的团队</text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
			<view class="list" @click="urlTap('question')">
				<image src="../../static/wt.png" class="img_list"></image>
				<text>常见问题</text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
			<!-- <view class="list" @click="urlTap('../service/service')">
				<image src="../../static/kf.png" class="img_list"></image>
				<text>联系客服</text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:""
			}
		},
		onLoad() {

		},
		onShow(){
			this.info();
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:'setting'
			})
		},
		methods: {
			info(){
				this.getRequest('index/index_page').then(res=>{
					console.log(res.data)
					this.user = res.data.data;
				},res=>{
					console.log(res.data)
				})
			},
			urlTap(name){
				uni.navigateTo({
					url:name
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f5fd;
	}

	.info {
		width: 100%;
		height: 200upx;
		background-color: #1331df;
		display: flex;
		align-items: center;

		.head {
			width: 120upx;
			height: 120upx;
			margin: 0 30upx;
			border-radius: 50%;
		}

		.info_num {
			.phone {
				color: #fff;
				margin-bottom: 10upx;
			}

			.id {
				color: #ffeb9d;
				font-size: 30upx;
			}
		}
	}

	.main {
		margin-top: 20upx;

		.list {
			width: 100%;
			height: 100upx;
			background-color: #fff;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #f2f5fd;
			font-size: 32upx;
			position: relative;
			
			.img_list {
				width: 60upx;
				height: 60upx;
				margin: 0 30upx;
			}
			
			.left_arrow{
				width: 18upx;
				height: 30upx;
				position: absolute;
				right: 40upx;
				top: 0;
				bottom: 0;
				margin: auto;
			}
		}
		
		.lists{
			justify-content: space-between;
			
			.item_1{
				display: flex;
				align-items: center;
			}
			
			.item_2{
				margin-right: 80upx;
				color: #3030e0;
			}
		}
	}
</style>
