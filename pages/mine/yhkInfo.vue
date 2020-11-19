<template>
	<view class="content">
		
		<view class="info" v-for="(item,index) in list" :key="index" :id="item.id" @touchmove="delBank">
			<view class="name">
				<view class="yhmc">{{item.bank_name}}</view>
				<view class="zhmc">{{item.bank_place}}</view>
			</view>
			<view class="list">
				账户:<text class="main">{{item.card_num}}</text>
			</view>
			<view class="list">
				姓名:<text class="main">{{item.true_name}}</text>
			</view>
			<view class="list">
				备注:<text class="main">{{item.remark}}</text>
			</view>
		</view>
		
		<view class="but" @click="urlTap('addyhk')">
			+添加
		</view>
		
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				list:[],
				
			}
		},
		onShow() {
			this.info();
		},
		methods: {
			info(){
				uni.showToast({
					title:'请求中...',
					icon:"loading",
					duration:1000,
					mask:true
				})
				this.getRequest('user/my_bank').then(res=>{
					this.list = res.data.data;
					// res.data.data.forEach(item=>{
				 	
					res.data.data.forEach(item=>{
					   item.card_num = '************' + item.card_num.substr(-4)	
					})
				},res=>{
					console.log(res.data)
				})
			},
			delBank(e){
				uni.showModal({
					title:'删除',
					content:'是否删除该银行卡',
					success:res=>{
						if(res.confirm){
							uni.showLoading({
								title:"请求中...",
								mask:true
							})
							this.getRequest('user/bank_del',{bank_id:e.currentTarget.id}).then(res=>{
								console.log(e.currentTarget.id)
								uni.showToast({
									title:res.data.msg,
									icon:"none",
									duration:1000,
									mask:true
								})
								this.info();
							},res=>{
								uni.showToast({
									title:res.data.msg,
									icon:"none",
									duration:1000,
									mask:true
								})
							})
						}
					}
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
	page{
		padding-top: 30upx;
	}
	
	.info {
		width: 90%;
		margin:0 auto 30upx;
		border-radius: 20upx;
		border: 1px solid #dbdbdb;
		box-shadow: 5upx 5upx 10upx #dbdbdb;
		padding-bottom: 20upx;
		
		.name{
			display: flex;
			align-items: center;
			font-size: 30upx;
			margin-left: 30upx;
			margin-top: 20upx;
			
			.yhmc{
				margin-right: 20upx;
				width: 300upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			
			.zhmc{
				width: 300upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		
		.list{
			width: 90%;
			margin: 20upx auto 0;
			font-size: 28upx;
			color: #999;
			
			.main{
				margin-left: 10upx;
			}
		}
	}
	
	.but{
		width: 90%;
		height: 80upx;
		background-color: #1331df;
		color: #fff;
		text-align: center;
		line-height: 80upx;
		border-radius: 10upx;
		margin: 20upx auto 0;
		font-size: 30upx;
	}
</style>
