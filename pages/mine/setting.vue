<template>
	<view class="content">
		<view class="option">
			<view class="item">
				<text>版本号</text>
				<text>{{val}}</text>
			</view>
		</view>
		<view class="option" @click="urlTap('changePassWord')">
			<view class="item">
				<text>修改密码</text>
				<text></text>
			</view>
		</view>
		
		<view class="option" @click="urlTap('goTochangpassword')">
			<view class="item">
				<text>修改支付密码</text>
				<text></text>
			</view>
		</view>
		
		
		
		<!-- <view class="option" @click="urlTap('line')">
			<view class="item">
				<text>线路切换</text>
				<text></text>
			</view>
		</view> -->
		<view class="quit" @click="quit">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				val:""
			}
		},
		onLoad() {
			this.info()
		},
		methods: {
			info(){
				this.getRequest('login/version').then(res=>{
					this.val = res.data.data;
				},res=>{})
			},
			quit(){
				uni.removeStorageSync('token');
				uni.reLaunch({
					url:'../login/login'
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
	.option {
		width: 100%;
		border-bottom: 1px solid #dbdbdb;
		padding: 20upx 0;
		
		.item{
			width: 90%;
			padding: 20upx 0;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30upx;
			color:#333;
		}
	}
	
	.quit{
		width: 90%;
		height: 80upx;
		margin: auto;
		background-color: #1331df;
		text-align: center;
		line-height: 80upx;
		color: #fff;
		font-size: 30upx;
		position: fixed;
		bottom: 200upx;
		left: 0;
		right: 0;
		border-radius: 10upx;
	}
</style>
