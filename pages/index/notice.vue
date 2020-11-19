<template>
	<view class="content">


		<view class="notice_info" v-for="(item,index) in list" :key="index" :id="item.id" @click="details">
			<image src="../../static/index_tzbig.png" class="tz_icon"></image>
			<view class="content">
				<view>{{item.title}}</view>
				<view>{{item.content}}</view>
			</view>
			<image src="../../static/left_arrow.png" class="left_arrow"></image>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.info()
		},
		methods: {
			info() {
				this.getRequest('user/comment').then(res => {
					this.list = res.data.data;
				}, res => {
					console.log(res.data)
				})
			},
			details(e) {
				uni.navigateTo({
					url: "noticeInfo?id=" + e.currentTarget.id
				})
			},
		}
	}
</script>

<style lang="scss">
	.notice_info {
		width: 90%;
		height: 120upx;
		background-color: #fff;
		border-radius: 20upx;
		margin: 20upx auto 50upx;
		box-shadow: 0px 7px 11px 2px #dbdbdb;
		display: flex;
		align-items: center;
		position: relative;

		.tz_icon {
			width: 80upx;
			height: 80upx;
			margin: 0 30upx;
		}

		.content {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			view:first-child {
				font-size: 30upx;
				margin-bottom: 10upx;
			}

			view:last-child {
				font-size: 28upx;
				color: #999999;
			}
		}

		.left_arrow {
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			right: 20upx;
			width: 18upx;
			height: 32upx;
		}
	}
</style>
