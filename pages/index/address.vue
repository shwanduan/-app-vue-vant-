<template>
	<view class="content">
		<view class="top">
			<view class="see">
				<input type="text" placeholder="搜索" class="input_see" v-model="name" />
			</view>
			<text class="find" @click="find">搜索</text>
		</view>

		<view v-for="(item,index,i) in obj" :key="i">
			<view class="title">
				<text>{{index}}</text>
			</view>
			<view class="main" v-for="(items,indexs) in item" :key="indexs" :data-name="items" @click="choose">
				<text>{{items}}</text>
			</view>
		</view>

		<view class="letter">
			<view v-for="(item,index,i) in obj" :key="i" @click="scroll(i)">{{index}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {},
				arr: [0],
				name:""
			}
		},
		onLoad() {
			this.info();
		},
		methods: {
			info() {
				uni.showToast({
					title: '请求中...',
					mask: true,
					duration: 1000,
					icon: "loading"
				})
				let data = {
					name:this.name
				};
				this.getRequest('Region/region_name',data).then(res => {
					this.obj = res.data.data;
					var heightSearch = 40;
					for(var key in this.obj){
						var height = 36;
						for(var i = 0;i<this.obj[key].length;i++){
							height = height + 60
						}
						heightSearch = heightSearch + height;
						this.arr.push(heightSearch)
					}
				}, res => {
					console.log(res.data)
				})
			},
			scroll(i){
				uni.pageScrollTo({
					scrollTop: this.arr[i],
					duration: 100
				});
			},
			choose(e) {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				this.getRequest('Region/update_region', {
					name: e.currentTarget.dataset.name
				}).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
					uni.setStorageSync('address_name', e.currentTarget.dataset.name);
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				}, res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
						duration: 1000,
						mask: true
					})
				})
			},
			find(){
				uni.showToast({
					title: '请求中...',
					mask: true,
					duration: 1000,
					icon: "loading"
				})
				let data = {
					name:this.name
				};
				this.getRequest('Region/region_name',data).then(res => {
					console.log(res.data)
					this.obj = res.data.data;
				}, res => {
					console.log(res.data)
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f5fd;
	}

	.top {
		width: 100%;
		height: 80upx;
		background-color: #F1F1F1;
		display: flex;
		align-items: center;

		.see {
			width: 80%;
			height: 60upx;
			border-radius: 50upx;
			background-color: #eaeaea;
			display: flex;
			align-items: center;
			margin-left: 40upx;

			.input_see {
				width: 500upx;
				font-size: 30upx;
				margin-left: 50upx;
			}
		}

		.find {
			font-size: 30upx;
			color: #007AFF;
			margin-left: 20upx;
		}
	}

	.title {
		width: 100%;
		height: 50upx;
		background-color: #F1F1F1;
		font-size: 30upx;
		line-height: 50upx;
		border-bottom: 1px solid #eee;
		padding: 10upx 0;

		text {
			margin-left: 20upx;
		}
	}

	.main {
		width: 100%;
		height: 70upx;
		line-height: 70upx;
		font-size: 30upx;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		padding: 24upx 0;

		text {
			margin-left: 20upx;
		}
	}

	.letter {
		width: 50upx;
		position: fixed;
		top: 120upx;
		right: 0;
		padding: 20upx 0;
		background-color: #fff;
		font-size: 28upx;

		view {
			width: 100%;
			height: 50upx;
			line-height: 50upx;
			text-align: center;
		}
	}
</style>
