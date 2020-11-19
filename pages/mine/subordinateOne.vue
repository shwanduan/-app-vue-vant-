<template>
	<view class="content">
		<view class="top">
			<view class="find">
				<image src="../../static/sousuo.png" mode=""></image>
				<input type="number" placeholder="请输入会员手机号" v-model="phone" />
			</view>
			<view class="sousuo" @click="find">
				搜索
			</view>
		</view>

		<view class="main" v-for="(item,index) in list" :key="index" :id="item.uid" @click="urlTap">
			<view class="main_item uid">
				下级手机号:{{item.u_phone}}
			</view>
			<view class="main_flex_between">
				<view class="main_item">
					聚合码利率:{{item.wx_lilv}}元/每万元
				</view>
				<view class="main_item">
					银行卡利率:{{item.bank_lilv}}元/每万元
				</view>
			</view>
			<view class="main_flex_between">
				<view class="main_item">
					支付宝扫码利率:{{item.alipay_lilv1}}元/每万元
				</view>
				<view class="main_item">
					支付宝转账利率:{{item.alipay_lilv2}}元/每万元
				</view>
			</view>
			<!-- <view class="set" @click="setFn" :id="item.uid">
				<text>设置利率</text>
			</view> -->
			<view class="main_flex_between">
				<view class="main_item">
					下级人数:{{item.subnum}}
				</view>
				<view class="main_item">
					今日流水:{{item.fluid}}
				</view>
			</view>
			<view class="main_flex_around">
				<view class="main_item main_item_s">
					<view>{{item.regday}}</view>
					<view>直属今日注册</view>
				</view>
				<view class="main_item main_item_s">
					<view>{{item.regdayall}}</view>
					<view>直属累计注册</view>
				</view>
			</view>
			<view class="main_flex_around">
				<view class="main_item main_item_s">
					<view>{{item.teamday}}</view>
					<view>团队今日注册</view>
				</view>
				<view class="main_item main_item_s">
					<view>{{item.teamdayall}}</view>
					<view>团队累计注册</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				list: [],
				phone:"",
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.info();
		},
		methods: {
			info() {
				uni.showLoading({
					title:'请求中...',
					mask:true
				})
				let data = {
					pid: this.id,
					phone:this.phone,
				};
				this.getRequest('team/subordList', data).then(res => {
					console.log(res.data)
					this.list = res.data.data;
					uni.hideLoading()
				}, res => {
					console.log(res.data)
					uni.showToast({
						title: res.data.msg,
						icon:"none",
						duration:1000
					});
				})
			},
			find(){
				this.info()
			},
			urlTap(e){
				uni.navigateTo({
					url: 'subordinateTwo?id=' + e.currentTarget.id
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		padding-top: 20upx;
	}

	.top {
		display: flex;
		align-items: center;

		.find {
			width: 80%;
			height: 42upx;
			margin-left: 30upx;
			background-color: #eee;
			border-radius: 50upx;
			display: flex;
			align-items: center;
			padding: 10upx 0;

			image {
				width: 30upx;
				height: 30upx;
				margin-left: 20upx;
			}

			input {
				font-size: 28upx;
				margin-left: 20upx;
				width: 470upx;
				color: #666;
			}
		}

		.sousuo {
			margin-left: 30upx;
			font-size: 30upx;
			color: #999;
			transform: translateY(-5upx);
		}
	}

	.main {
		width: 100%;
		padding: 10upx 0;
		border-bottom: 15px solid #eee;
		font-size: 28upx;

		.main_flex_between {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.main_flex_around {
			display: flex;
			align-items: center;
			justify-content: space-around;
		}

		.uid {
			color: #000 !important;
			font-size: 30upx !important;
		}

		.main_item {
			margin: 0 20upx;
			padding: 10upx 0;
			color: #333;
			font-size: 26upx;
		}

		.main_item_s {
			text-align: center;
			line-height: 50upx;
		}

		.set {
			width: 100%;
			text-align: right;
			font-size: 28upx;
			color: #0066CC;
			padding: 10upx 0;

			text {
				margin-right: 20upx;
			}
		}
	}
</style>
