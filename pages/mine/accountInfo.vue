<template>
	<view class="content">

		<view class="main_box">
			<view class="main">
				<view>订单号</view>
				<view>{{type}}</view>
			</view>
		</view>

		<view class="main_box">
			<view class="main">
				<view>数量</view>
				<view>{{id}}</view>
			</view>
		</view>

		<view class="main_box">
			<view class="main">
				<view>时间</view>
				<view>{{time}}</view>
			</view>
		</view>

		<view class="main_box">
			<view class="main">
				<view>状态</view>
				<view class="wsh" v-if="status == 0">未审核</view>
				<view class="cg" v-if="status == 1">成功</view>
				<view class="bh" v-if="status == 2">驳回</view>
			</view>
		</view>




	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				type: "",
				time:'',
				user: {}
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.type = e.num;
			this.time = e.time;
			this.status = e.status
			this.info()
		},
		methods: {
			info() {
				let data = {
					page:1
				};
				this.getRequest('user/balancelog', data).then(res => {
					console.log(res.data)
					res.data.data.forEach(item=>{
						
					})
					this.user = res.data.data;
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
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eee;
	}

	.main_box {
		width: 100%;
		padding: 25upx 0;
		margin-bottom: 20upx;
		font-size: 30upx;
		background-color: #fff;

		.main {
			width: 90%;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.wsh {
		color: #333;
	}

	.cg {
		color: #0066CC
	}

	.bh {
		color: #fb0000;
	}
</style>
