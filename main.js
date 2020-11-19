import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;
// 生产
Vue.prototype.apiUrl = 'http://xzfapi.clscs.cn/api/';
Vue.prototype.apiUrls = 'http://xzfapi.clscs.cn/';

const https = "http://xzfapi.clscs.cn/api/";

// 开发
// Vue.prototype.apiUrl = 'http://api.xinzhifu.czyhfs.cn/api/';
// Vue.prototype.apiUrls = 'http://api.xinzhifu.czyhfs.cn/';
// const https = "http://api.xinzhifu.czyhfs.cn/api/";



App.mpType = 'app'

Vue.prototype.checShouldGoToLogin = function(){
	let pages = getCurrentPages();
	if (pages.length != 0){
		let last = pages[pages.length -1].route
		//页面栈第一个是首页 最后一个元素是当前页面 
		console.log(last,typeof(last))
		//如果当前页面是有注册这个就返回true
		if (last.indexOf('pages/login/register') != -1){
			console.log('------------')
			return true
		} else if(last.indexOf('pages/login/forget') != -1){
			return true
		} else if(last.indexOf('pages/login/login') != -1){
			return true
		}
	}
	return false
} 
Vue.prototype.getRequest = function(apiUrl, datalist = {}, type = 'POST') {
    datalist.token = uni.getStorageSync('token');
	datalist.only = uni.getStorageSync('only');

	//  datalist.token = '98de630c00648bdcc3a7a0f7da32b905';
	// // //  // datalist.token = '14e1b600b1fd579f47433b88e8d85291';

	return new Promise(function(success, error) {
		uni.request({
			url: https + apiUrl,
			data: datalist,
			method: type,
			header: {
				'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			},
			success: (res) => {
				if (res.statusCode == 200) {
					if (res.data.code == 1) {
						success(res)
					} else {
						if (res.data.msg == '请登录') { 
							// if(!this.checShouldGoToLogin()){

								
							// }
							uni.setStorageSync('token', '')
							uni.setStorageSync('only', '')
								uni.reLaunch({
									url: '/pages/login/login'
								})
							// uni.showModal({
							// 	title: res.data.msg,
							// 	content: '请重新登录',
							// 	showCancel: false,
							// 	success(re) {
							// 		if (re.confirm) {
							// 			uni.setStorageSync('token', '')
							// 			uni.setStorageSync('only', '')
							// 		
							// 		}
							// 	}
							// })
							// uni.hideLoading()
							// return
						} else {
							error(res)
						}
					}
				} else {
					console.log(res.data)
					console.log(apiUrl)
					uni.showToast({
						title: "错误:" + res.statusCode,
						icon: "none",
						duration: 1000,
						mask: true
					})
				}
			}
		})
	})
};

Vue.prototype.getRequestGet = function(apiUrl, datalist = {}, type = 'GET') {
	datalist.token = uni.getStorageSync('token');
	datalist.only = uni.getStorageSync('only');
	// datalist.token = '3a2449ca7d96b8a70982ccc87dda4d671587631224';
	return new Promise(function(success, error) {
		uni.request({
			url: https + apiUrl,
			data: datalist,
			method: type,
			header: {
				'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			},
			success: (res) => {
				if (res.statusCode == 200) {
					if (res.data.code == 1) {
						success(res)
					} else {
						if (res.data.msg == '请登录') {
							uni.setStorageSync('token', '')
							uni.setStorageSync('only', '')
							uni.reLaunch({
								url: '/pages/login/login'
							})
							// uni.showModal({
							// 	title: res.data.msg,
							// 	content: '请重新登录',
							// 	showCancel: false,
							// 	success(re) {
							// 		if (re.confirm) {
							// 			uni.setStorageSync('token', '')
							// 			uni.setStorageSync('only', '')
							// 			uni.reLaunch({
							// 				url: '/pages/login/login'
							// 			})
							// 		}
							// 	}
							// })
							// uni.hideLoading()
							// return
						} else {
							error(res)
						}
					}
				} else {
					uni.showToast({
						title: "错误:" + res.statusCode,
						icon: "none",
						duration: 1000,
						mask: true
					})
				}
			}
		})
	})
};

Vue.prototype.getLogin = function(apiUrl, datalist = {}, type = 'POST') {
	return new Promise(function(success, error) {
		uni.request({
			url: https + apiUrl,
			data: datalist,
			method: type,
			success: (res) => {
				if (res.data.code == 1) {
					success(res)
				} else {
					error(res)
				}
			}
		})
	})
};


const app = new Vue({
	...App
})
app.$mount()
