<template>
	<view class="content">
		<view class="top">
			<view @click="chooseClick">
				<text>{{name}}</text>
				<image src="../../static/bottom_arrow.png"></image>
			</view>
		</view>
		<view class="membrane" v-if="chooseType"></view>
		<view class="chooseContent" v-if="chooseType">
			<view :class="['choose_item',cid==item.id?'choose_check':'']" :data-name="item.name" :id="item.id" @click="switchTap"
			 v-for="(item,index) in arr" :key="index">{{item.name}}</view>
		</view>
		<view class="fill"></view>

		<view class="main" v-for="(item,index) in list" :key="index">
			<view class="main_content">
				<text>{{item.memo}}</text> 
				<text>数量:{{item.num}}</text>
			</view>
			<view class="main_time">
				{{item.create_time | timeStamp}}
			</view>
		</view>

		<view class="loading">
			<text v-if="loadType">加载中……</text>
			<text v-else>暂无更多信息</text>
		</view>

	</view>
</template>

<script>
	export default {
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
		data() {
			return {
				chooseType: false,
				cid: 0,
				arr: [{
					id: 0,
					name: '全部'
				}, {
					id: 1,
					name: '充值'
				}, {
					id: 3,
					name: '收益'
				}, {
					id: 4,
					name: '接单'
				}],
				name: "全部",
				page: 0,
				list: [],
				loadType: false
			}
		},
		onLoad() {
			this.info();
		},
		onReachBottom() {
			this.loadType = true;
			this.page++;
			this.info();
		},
		methods: {
			info() {
				uni.showToast({
					title:'加载中...',
					icon:"loading",
					duration:1200,
					mask:true
				})
				let data = {
					page: this.page,
					from_type: this.cid
				};
				this.getRequest('user/balanceDetail', data).then(res => {
				   
					this.list = this.list.concat(res.data.data)
					if (res.data.data.length == 0) {
						this.loadType = false;
					}
				}, res => {
					console.log(res.data)
				})
			},
			chooseClick() {
				this.chooseType = !this.chooseType
			},
			switchTap(e) {
				this.cid = e.currentTarget.id;
				this.name = e.currentTarget.dataset.name;
				this.chooseType = false;
				this.page = 0;
				this.list = [];
				this.info();
			}
		}
	}
</script>

<style lang="scss">
	.top {
		width: 100%;
		height: 80upx;
		font-size: 30upx;
		margin: auto;
		background-color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 105;
		display: flex;
		align-items: center;

		view {
			display: flex;
			align-items: center;
			margin-left: 50upx;
		}

		image {
			width: 30upx;
			height: 30upx;
			margin-left: 10upx;
		}
	}

	.fill {
		width: 100%;
		height: 80upx;
	}

	.membrane {
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: .7;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}

	.chooseContent {
		width: 100%;
		height: 300upx;
		background-color: #fff;
		position: absolute;
		top: 80upx;
		left: 0;
		z-index: 105;

		.choose_item {
			display: inline-block;
			width: 33%;
			height: 50upx;
			font-size: 28upx;
			text-align: center;
			margin-bottom: 20upx;
		}

		.choose_check {
			color: #007AFF;
		}
	}

	.main {
		width: 95%;
		padding: 20upx 0;
		border-radius: 10upx;
		box-shadow: 1upx 5upx 15upx #dbdbdb;
		margin: 20upx auto 50upx;

		.main_content {
			width: 95%;
			margin: auto;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			font-size: 30upx;
		}

		.main_time {
			width: 95%;
			margin: 20upx auto 0;
			font-size: 30upx;
			text-align: right;
			font-size: 28upx;
			color: #666;
		}
	}

	.loading {
		width: 100%;
		text-align: center;
		font-size: 28upx;
		color: #666;
		margin-bottom: 50upx;
	}
</style>
