<template>
	<view class="content">
		<view class="box">
			<!-- <view class="code_box">
				<view class="code">{{code}}</view>
				<view class="yqm">邀请码</view>
			</view> -->
			<view class="invite">
				<tki-qrcode ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :iconSize="iconsize" :onval="onval"
				 :loadMake="loadMake" />
			</view>
			<view class="bot-text">
				邀请码：{{codes}}
			</view>
		</view>

		<view class="bottom">
			<!-- <view class="bottom_copy" @click="copy">
				复制邀请码
			</view> -->
			<view class="bottom_copy" @click="copy">
				马上邀请
			</view>
			<view class="bottom_save" @click="saveImg">
				保存海报邀请
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				code: "",
				codes: '',
				val: '', // 要生成的二维码值
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				background: '#ffffff', // 背景色
				pdground: '#000000', // 角标色
				iconsize: 40, // 二维码图标大小
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		onLoad() {
			this.getRequest('user/my_yqm').then(res => {
				console.log(res.data)
				this.val = res.data.data.url;
				this.codes = res.data.data.yqm;
			}, res => {
				console.log(res.data)
			})
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: this.val,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: "none",
							duration: 1000
						})
					},
					fail() {
						uni.showToast({
							title: '复制失败',
							icon: "none",
							duration: 1000
						})
					}
				});
			},
			saveImg() {
				// this.$refs.qrcode._saveCode()
				// save() {
				var that = this;
				// that.nosave = false;
				setTimeout(() => {
					var pages = getCurrentPages();
					var page = pages[pages.length - 1];
					// console.log(pages);
					var bitmap = null;
					var currentWebview = page.$getAppWebview();
					bitmap = new plus.nativeObj.Bitmap('amway_img');
					// 将webview内容绘制到Bitmap对象中
					currentWebview.draw(bitmap, function() {
						console.log('截屏绘制图片成功');
						bitmap.save("_doc/a.jpg", {}, function(i) {
							console.log('保存图片成功：' + JSON.stringify(i));
							// that.target = i.target
							uni.saveImageToPhotosAlbum({
								filePath: i.target,
								success: function() {
									that.target = i.target;
									bitmap.clear(); //销毁Bitmap图片
									uni.showToast({
										title: '保存图片成功',
										icon: 'none',
										mask: true
									});
									that.nosave = true;
								}
							});
						}, function(e) {
							console.log('保存图片失败：' + JSON.stringify(e));
						});
					}, function(e) {
						console.log('截屏绘制图片失败：' + JSON.stringify(e));
					});
				}, 300);
				// that.nosave = true;
				//currentWebview.append(amway_bit);

				// }, 
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-image: url('../../static/yqy.png');
		background-size: 100%;
		padding-bottom: 20upx;
	}

	.code_box {
		color: #000c83;
		text-align: center;
		margin: 20upx 0;

		.code {
			font-size: 40upx;
		}

		.yqm {
			font-size: 30upx;
		}
	}

	.box {
		width: 620upx;
		height: 600upx;
		border-radius: 20upx;
		background: rgba(255, 255, 255, .7);
		opacity: 1;
		position: absolute;
		top: 500upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.invite {
		width: 400upx;
		height: 400upx;
		margin: 15% auto 0;
	}

	.bot-text {
		text-align: center;
		width: 100%;
		margin-top: 10upx;
	}

	.bottom {
		width: 100%;
		height: 100upx;
		position: fixed;
		bottom: 0;
		display: flex;

		view {
			width: 50%;
			height: 100%;
			text-align: center;
			line-height: 100upx;
		}

		.bottom_copy {
			background-color: #fff;
			color: #3030e0;
		}

		.bottom_save {
			background-color: #3030e0;
			color: #fff;
		}
	}
</style>
