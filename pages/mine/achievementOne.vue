<template>
	<view class="content">
		<view class="pick_view">
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				{{date}}
			</picker>
			<image src="../../static/bottom_arrow.png" class="bottom_arrow"></image>
		</view>

		<view class="myInfo">
			<view class="myInfo_title">
				{{phone}}业绩:
			</view>
		</view>
		<view class="myInfo_main">
			<view class="myInfo_main_box">
				<view>
					团队业绩:{{user.res.tmoney}}
				</view>
				<view>
					个人流水:{{user.res.fluid}}
				</view>
			</view>
		</view>
		<view class="myInfo">
			<view class="myInfo_title">
				直属下级业绩
			</view>
		</view>

		<view class="main" v-for="(item,index) in user.subpid" :id="item.uid" :key="index" @click="urlTap" :data-phone="item.u_phone">
			<view class="main_flex">
				<view class="main_item">
					用户ID:{{item.uid}}
				</view>
				<view class="main_item">
					{{item.u_phone}}
				</view>
			</view>
			<view class="main_flex">
				<view class="main_item">
					团队业绩: {{item.subtmoney}}
				</view>
				<view class="main_item">
					个人流水: {{item.subfluid}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: "",
				page: 1,
				user: {
					res: {
						tmoney: 0,
						fluid: 0
					},
					subpid: []
				},
				id:"",
				phone:""
			}
		},
		onLoad(e) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			this.date = `${year}-${month}-${day}`;
			this.id = e.id;
			this.phone = e.phone;
			this.info();
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			info() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				let data = {
					page: this.page,
					date: this.date,
					pid:this.id
				};
				this.getRequest('team/performance', data).then(res => {
					console.log(res.data)
					this.user = res.data.data;
					uni.hideLoading()
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1200,
						mask: true
					})
				})
			},
			bindDateChange: function(e) {
				this.user = {
					res: {
						tmoney: 0,
						fluid: 0
					},
					subpid: []
				};
				this.date = e.target.value;
				this.info();
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			urlTap(e) {
				uni.navigateTo({
					url: "achievementTwo?id=" + e.currentTarget.id + '&phone=' + e.currentTarget.dataset.phone
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f8f8;
	}

	.pick_view {
		width: 90%;
		margin: auto;
		padding: 20upx 0;
		font-size: 32upx;
		color: #333;
		display: flex;
		align-items: center;

		.bottom_arrow {
			width: 40upx;
			height: 40upx;
			margin-left: 10upx;
		}
	}

	.myInfo {
		width: 90%;
		margin: auto;

		.myInfo_title {
			font-size: 28upx;
			color: #666;
		}
	}

	.myInfo_main {
		width: 100%;
		height: 100upx;
		background-color: #fff;
		margin-top: 20upx;
		font-size: 26upx;
		color: #333;
		margin-bottom: 30upx;

		.myInfo_main_box {
			width: 90%;
			height: 100%;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.main {
		width: 100%;
		background-color: #fff;
		padding: 10upx 0;
		margin-top: 30upx;
		font-size: 30upx;

		.main_flex {
			display: flex;
			justify-content: space-between;

			.main_item {
				padding: 10upx 0;
				margin: 0 20upx;
			}
		}
	}
</style>
