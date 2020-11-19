<template>
	<view class="content">
		<swiper class="qdy" :indicator-dots="indicatorDots" :autoplay="autoplay" :duration="duration" easing-function="linear">
			<swiper-item class="qdy one" v-if="type != 1">
			</swiper-item>
			<swiper-item class="qdy two" v-if="type != 1">
			</swiper-item>
			<swiper-item class="qdy three">
				<view class="but" @click="but">
					立即体验
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: false,
				autoplay: false,
				duration: 300,
				type: ""
			}
		},
		onLoad() {
			this.type = uni.getStorageSync('qdy');
		},
		methods: {
			but() {
				uni.setStorageSync('qdy', '1')
				if (uni.getStorageSync('token') != "") {
					uni.reLaunch({
						url: 'index'
					})
				} else {
					uni.reLaunch({
						url: '../login/login'
					})
				}
			},
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		overflow: hidden;
	}

	.qdy {
		width: 100%;
		height: 100%;
	}

	/* .one {
		background-image: url('../../static/qdy_1.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.two {
		background-image: url('../../static/qdy_2.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.three {
		background-image: url('../../static/qdy_3.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
 */
	.but {
		width: 300upx;
		height: 80upx;
		font-size: 28upx;
		color: #fff;
		border: 2px solid #fff;
		text-align: center;
		line-height: 80upx;
		border-radius: 50upx;
		position: fixed;
		bottom: 80upx;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>
