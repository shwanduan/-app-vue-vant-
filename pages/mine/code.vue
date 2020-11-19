<template>
	<view class="content">
		<view class="list" id="1" @click="urlTap">
			<view class="item">
				<image src="../../static/wxzf.png" class="icon"></image>
				<text>聚合码</text>
			</view>
			<view class="item">
				<text class="num"></text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
		</view>
		
		<view class="list" id="2" @click="urlTap">
			<view class="item">
				<image src="../../static/zfb.png" class="icon"></image>
				<text>支付宝收款码</text>
			</view>
			<view class="item">
				<text class="num"></text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
		</view>
		
		<view class="list" id="3" @click="urlTap">
			<view class="item">
				<image src="../../static/zfb.png" class="icon"></image>
				<text>支付宝转账</text>
			</view>
			<view class="item">
				<text class="num"></text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
		</view>
		
		<!-- <view class="list">
			<view class="item" id="3" @click="urlTap">
				<image src="../../static/yhk.png" class="icon"></image>
				<text>银行卡管理</text>
			</view>
			<view class="item">
				<text class="num"></text>
				<image src="../../static/left_arrow.png" class="left_arrow"></image>
			</view>
		</view> -->
		
		<view class="explain">
			如同一收款方式保存多个收款码,系统将自动切换收款码,实现轮询收款
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// this.info();
		},
		methods: {
			info(){
				this.getRequest('qrcode/qrcodelist').then(res=>{
					console.log(res.data)
				},res=>{
					console.log(res.data)
				})
			},
			urlTap(e){
				uni.navigateTo({
					url:"codeInfo?id=" + e.currentTarget.id
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f8f8;
	}

	.list {
		width: 90%;
		height: 100upx;
		margin: auto;
		border-bottom: 1px solid #dbdbdb;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10upx 0;

		.item {
			display: flex;
			align-items: center;
			font-size: 30upx;
			
			.icon {
				width: 50upx;
				height: 50upx;
				margin:0 20upx;
			}
			
			.left_arrow{
				width: 18upx;
				height: 32upx;
				margin-left: 20upx;
				margin-right: 10upx;
			}
			
			.num{
				color: #1331df;
			}
		}
	}
	
	.explain{
		width: 100%;
		margin: 50upx auto 0;
		font-size: 24upx;
		text-align: center;
		color: #666;
	}
</style>
