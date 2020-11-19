<template>
	<view class="content">
		<view class="main" @click="detail" v-for="(item,index) in arr" :key="index" :id="item.id">
			<view class="main_title">
				{{item.title}}
			</view>
			
			<!-- <view class="main_time">
				2020-01-01 14:14:14
			</view> -->
		</view>
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {
				// id: ""
				arr:[],
				
			}
		},
		onLoad(e) {
			this.info();
			// this.id = e.id;
			// if (this.tid == 1) {
			// 	uni.setNavigationBarTitle({
			// 		title: '公告列表'
			// 	})
			// } else if (this.tid == 2) {
			// 	uni.setNavigationBarTitle({
			// 		title: '常见问题'
			// 	})
			// }
		},
		methods: {
			info(){
				this.getRequest('user/help').then(res=>{
					this.arr = res.data.data;
				
				},res=>{
					console.log(res.data)
				})
			},
			detail(e) {
				uni.navigateTo({
					url: "questionInfo?id="+e.currentTarget.id
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f5fd;
		padding-top: 20upx;
	}

	.main {
		width: 100%;
		background-color: #fff;
		margin-bottom: 40upx;

		.main_title {
			width: 90%;
			margin: auto;
			font-size: 32upx;
			padding: 20upx 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: #333;
		}

		.main_content {
			width: 90%;
			height: 110upx;
			margin: auto;
			font-size: 30upx;
			padding: 10upx;
			color: #666;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
		}

		.main_time {
			width: 90%;
			margin: 10upx auto 0;
			text-align: right;
			font-size: 27upx;
			color: #999;
		}
	}
</style>
