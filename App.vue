<script>
	export default {
		data() {
			return {
				time: ""
			}
		},
		onLaunch: function() {
			// console.log('-------------')

		},
		onShow: function() {
			// 在register forget login时不检测更新 和 token验证
			if (this.checShouldGoToLogin()) {
				console.log('--------IsOnReigstePage')
				return
			}


			console.log('check infos')
			if (uni.getStorageSync('token') != '') {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			} else {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			};

			clearTimeout(this.time)
			const https = "http://xzfapi.clscs.cn/api/";
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				uni.request({
					url: https + 'login/version',
					success: (res) => {
						var versions = res.data.data;
						var phoneVersion = widgetInfo.version;
						console.log(phoneVersion)
						if (versions != phoneVersion) {
							uni.showLoading({
								title: '已有新版本,升级中...',

								mask: true
							})
							uni.downloadFile({
								url: 'http://xzfapi.clscs.cn/download/update.wgt',
								success: (downloadResult) => {
									if (downloadResult.statusCode === 200) {
										plus.runtime.install(downloadResult.tempFilePath, {
											force: false
										}, function() {
											uni.hideLoading()
											plus.runtime.restart();
										}, function(e) {
											uni.showToast({
												title: "更新失败",
												icon: "none",
												duration: 1000,
												mask: true
											})
										});
									}
								}
							});
						}
					}
				});
			});
			// #endif  

		},
		onHide: function() {
			// this.time = setTimeout(() => {
			// 	this.getRequest('order/stopTakeOrders').then(res => {
			// 		var musics = uni.getBackgroundAudioManager();
			// 		musics.src = '../../static/music/stop.mp3';
			// 		musics.play();
			// 	}, res => {
			// 		console.log(res.data)
			// 		uni.showToast({
			// 			title: res.data.msg,
			// 			icon: "none",
			// 			duration: 1000,
			// 			mask: true
			// 		})
			// 	})
			// }, 120000)
			// this.time = setTimeout(() => {
			// 	this.getRequest('order/stopTakeOrders').then(res => {
			// 		var musics = uni.getBackgroundAudioManager();
			// 		musics.src = '../../static/music/stop.mp3';
			// 		musics.play();
			// 	}, res => {
			// 		console.log(res.data)
			// 		uni.showToast({
			// 			title: res.data.msg,
			// 			icon: "none",
			// 			duration: 1000,
			// 			mask: true
			// 		})
			// 	})
			// }, 120)
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/components/gaoyia-parse/parse.css");
</style>
