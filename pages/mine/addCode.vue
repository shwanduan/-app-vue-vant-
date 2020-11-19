<template>
	<view class="content">
		<view class="inputc">
			<view class="title">
				{{tid == 1?'微信昵称':''}}{{tid == 2?'支付宝支付昵称':''}}{{tid == 3?'支付宝账号':''}}
			</view>
			<view class="input_i">
				<input type="text" :placeholder="tid==3?'账号':'昵称'" v-model="user.nick" />
			</view>
		</view>

		<!-- 支付宝账号 -->
		<view class="inputc" v-if="tid == 3">
			<view class="title">
				账号名
			</view>
			<view class="input_i">
				<input type="text" placeholder="昵称" v-model="account_name" />
			</view>
		</view>

		<!-- 聚合码账号 二维码账号 -->
		<view class="inputc" v-if="tid != 3">
			<view class="title">
				{{tid == 1?'微信账号':''}}{{tid == 2?'支付宝账号':''}}
			</view>
			<view class="input_i">
				<input type="text" placeholder="账号" v-model="user.name" />
			</view>
		</view>

		<!-- 支付宝二维码 -->
		<view class="inputc" v-if="tid == 2 || tid == 3">
			<view class="title">
				UID
			</view>
			<view class="input_i">
				<input type="text" placeholder="UID" v-model="user.uid" />
			</view>
		</view>

		<view class="inputc" v-if="tid != 3">
			<view class="title">
				上传收款码
			</view>
			<view class="input_img" @click="chooseImg">
				<image src="../../static/sc.png" class="sc_img" v-if="codeImg == ''"></image>
				<image :src="codeImg" mode="aspectFit" v-if="codeImg != ''" class="code_img"></image>
			</view>
		</view>

		<view class="but" @click="add">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tid: "",
				codeImg: "",
				user: {
					picture: "",
					name: "",
					uid: "",
					qrcode_link: "",
					account: ""
				},
				account_name: "",
			}
		},
		onLoad(e) {
			this.tid = e.id;
			if (this.tid == 1) {
				uni.setNavigationBarTitle({
					title: '微信二维码'
				})
			} else if (this.tid == 2) {
				uni.setNavigationBarTitle({
					title: '支付宝二维码 '
				})
			} else if (this.tid == 3) {
				uni.setNavigationBarTitle({
					title: '支付宝账号'
				})
			}
		},
		methods: {
			chooseImg() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						this.codeImg = res.tempFilePaths[0];
						plus.barcode.scan(res.tempFilePaths[0], function(type, result) {
							that.user.qrcode_link = result;
						}, function(e) {
							console.log("Scan failed: " + JSON.stringify(e));
						});
						uni.showLoading({
							title: '上传中...',
							mask: true
						})
						uni.uploadFile({
							url: this.apiUrl + 'user/qrcode_upload', //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								// token:"08f045a48fd09db887a6bfd2d45fa8ea1587631220"
								token: uni.getStorageSync('token'),
								only: uni.getStorageSync('only')
							},
							success: fileRes => {
								fileRes = JSON.parse(fileRes.data);
								console.log(fileRes)
								if (fileRes.code == 1) {
									this.user.picture = fileRes.data.img;
								}
								uni.showToast({
									title: fileRes.message,
									icon: "none",
									duration: 1000,
									mask: true
								})
							}
						});
					}
				});
			},
			add() {

				let data = {};
				let url = "";
				if (this.tid == 3) {
					data.account = this.user.nick;
					data.account_name = this.account_name;
					data.UID = this.user.uid;
					data.uid = this.user.uid;
					url = "user/alipay_transfer";
				} else {
					this.user.type_id = this.tid;
					data = this.user;
					url = "user/qrcode_add";
				}
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				this.getRequest(url, data).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					this.user = {
						picture: "",
						name: "",
						uid: "",
						qrcode_link: "",
					};
					this.codeImg = "";
					this.account_name = "";
					uni.navigateBack({
						delta: 1
					})
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		padding-top: 20upx;
	}

	.inputc {
		width: 90%;
		margin: 0 auto 80upx;

		.title {
			font-size: 28upx;
		}

		.input_i {
			width: 100%;
			height: 30upx;
			margin-top: 20upx;
			padding-bottom: 20upx;
			border-bottom: 1px solid #999;

			input {
				font-size: 28upx;
			}
		}

		.input_img {
			width: 100%;
			height: 300upx;
			border: 1px dashed #999;
			margin-top: 20upx;
			background-color: #f7f8f7;
			position: relative;

			.sc_img {
				width: 100upx;
				height: 100upx;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
			}

			.code_img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.but {
		width: 90%;
		margin: auto;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: #fff;
		font-size: 28upx;
		border-radius: 10upx;
		background-color: #1331df;
	}
</style>
