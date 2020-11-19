<template>
	<view class="content">
		<block v-if="tid == 1">
			<view class="wx_box" v-for="(item,index) in list" :key="index">
				<image src="../../static/ljx.png" class="ljx" :id="item.qid" @click="del"></image>
				<view class="wx_title">
					{{item.q_name}}
				</view>
				<view class="wx_item">
					添加时间:<view class="wx_info">{{item.q_createtime}}</view>
				</view>
				<!-- <view class="wx_item">
					UID:<view class="wx_info">{{item.PID}}</view>
				</view> -->
				<!-- <view class="wx_item">
					链接:<view class="wx_info">{{item.qrcode_link}}</view>
				</view> -->
				<!-- <view class="wx_item"> -->
					<!-- 二维码: -->
					<!-- <text class="wx_info">55201</text> -->
				<!-- </view> -->
				<!-- <view class="wx_item_img"> -->
					<!-- 备注:<text class="wx_info">备注</text> -->
					<!-- <image :src="item.q_picture" mode="aspectFit" :data-url="item.q_picture" @click="bigImg"></image> -->
				<!-- </view> -->
			</view>
			<view class="wx_but" @click="urlTap">
				+添加
			</view>
		</block>
		<block v-if="tid == 2">
			<view class="wx_box zfb_box" v-for="(item,index) in list" :key="index">
				<image src="../../static/ljx.png" class="ljx" :id="item.qid" @click="del"></image>
				<view class="wx_title">
					{{item.q_name}}
				</view>
				<view class="wx_item">
					添加时间:<view class="wx_info">{{item.q_createtime}}</view>
				</view>
				<view class="wx_item">
					UID:<view class="wx_info">{{item.PID}}</view>
				</view>
				<!-- <view class="wx_item">
					链接:<view class="wx_info">{{item.qrcode_link}}</view>
				</view> -->
				<!-- <view class="wx_item"> -->
					<!-- 二维码: -->
					<!-- <text class="wx_info">55201</text> -->
				<!-- </view> -->
				<!-- <view class="wx_item_img"> -->
					<!-- 备注:<text class="wx_info">备注</text> -->
					<!-- <image :src="item.q_picture" mode="aspectFit" :data-url="item.q_picture" @click="bigImg"></image> -->
				<!-- </view> -->
			</view>
			<view class="zfb_but" @click="urlTap">
				+添加
			</view>
		</block>
		<block v-if="tid == 3">
			<view class="wx_box zfb_box" v-for="(item,index) in list" :key="index">
				<image src="../../static/ljx.png" class="ljx" :id="item.id" @click="del"></image>
				<view class="wx_title zfb_a">
					账号:{{item.account}}
				</view>
				<view class="wx_title zfb_a">
					账号名:{{item.account_name}}
				</view>
				<view class="wx_title zfb_a">
					UID:{{item.PID}}
				</view>
			</view>
			<view class="zfb_but" @click="urlTap">
				+添加
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tid: "",
				list: []
			}
		},
		onLoad(e) {
			this.tid = e.id;
			if (this.tid == 1) {
				uni.setNavigationBarTitle({
					title: '聚合码'
				})
			} else if (this.tid == 2) {
				uni.setNavigationBarTitle({
					title: '支付宝收款码'
				})
			} else if (this.tid == 3) {
				uni.setNavigationBarTitle({
					title: '支付宝账号'
				})
			}
		},
		onShow() {
			this.info()
		},
		methods: {
			info() {
				uni.showToast({
					title: '请求中...',
					icon: "loading",
					mask: true,
					duration: 1000
				})
				let data = {
					type_id: this.tid
				};
				let url = '';
				if (this.tid == 3) {
					url = 'user/alipaylist';
				} else {
					url = 'user/qrcode_list';
				}
				this.getRequest(url, data).then(res => {
					console.log(res.data)
					this.list = res.data.data;
				}, res => {
					console.log(res.data)
					this.list = [];
				})
			},
			del(e) {
				uni.showModal({
					title: '删除',
					content: "是否删除该信息",
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								title: '请求中...',
								mask: true
							})
							let data;
							let url;
							if (this.tid == 3) {
								data = {
									id: e.currentTarget.id
								};
								url = 'user/alipaydel';
							} else {
								data = {
									qid: e.currentTarget.id
								};
								url = 'user/qrcode_del';
							}
							this.getRequest(url, data).then(res => {
								uni.showToast({
									title: res.data.msg,
									icon: "none",
									duration: 1000,
									mask: true
								})
								setTimeout(()=>{
									this.info();
								},1000)
							}, res => {
								uni.showToast({
									title: res.data.msg,
									icon: "none",
									duration: 1000,
									mask: true
								})
							})
						}
					}
				})
			},
			bigImg(e) {
				uni.previewImage({
					urls: [e.currentTarget.dataset.url],
				});
			},
			urlTap() {
				uni.navigateTo({
					url: "addCode?id=" + this.tid
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f8f8;
		padding-top: 20upx;
	}

	.wx_box {
		width: 90%;
		background-color: #1296db;
		border-radius: 20upx;
		margin: 0 auto 30upx;
		padding: 20upx 0 40upx;
		position: relative;

		.ljx {
			position: absolute;
			right: 20upx;
			width: 60upx;
			height: 60upx;
		}

		.wx_title {
			margin-left: 30upx;
			color: #fff;
			font-size: 32upx;
		}

		.wx_item {
			color: #fff;
			font-size: 24upx;
			margin-left: 30upx;
			margin-top: 20upx;
			display: flex;

			.wx_info {
				margin-left: 10upx;
				width: 500upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.wx_item_img {
			width: 90%;
			margin: 20upx auto 0;
			height: 300upx;
			border: 1px dashed #fff;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.wx_but {
		width: 90%;
		height: 70upx;
		border: 1px solid #1296db;
		border-radius: 10upx;
		color: #1296db;
		font-size: 28upx;
		text-align: center;
		line-height: 70upx;
		margin: 20upx auto 0;
	}




	.zfb_box {
		background-color: #3030e0;

		.zfb_a {
			margin-bottom: 15upx;
		}
	}

	.zfb_but {
		width: 90%;
		height: 70upx;
		border: 1px solid #3030e0;
		border-radius: 10upx;
		color: #3030e0;
		font-size: 28upx;
		text-align: center;
		line-height: 70upx;
		margin: 20upx auto 0;
	}




	.yhk_box {
		width: 90%;
		height: 190upx;
		background-color: #1b6c0b;
		border-radius: 20upx;
		margin: auto;
		padding: 20upx 0 40upx;

		.yhk_title {
			margin-left: 30upx;
			color: #fff;
			font-size: 32upx;
		}

		.yhk_item {
			color: #fff;
			font-size: 24upx;
			margin-left: 30upx;
			margin-top: 20upx;

			.yhk_info {
				margin-left: 10upx;
			}
		}
	}

	.yhk_but {
		width: 90%;
		height: 70upx;
		border: 1px solid #1b6c0b;
		border-radius: 10upx;
		color: #1b6c0b;
		font-size: 28upx;
		text-align: center;
		line-height: 70upx;
		margin: 20upx auto 0;
	}
</style>
