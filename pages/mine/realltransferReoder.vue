<template>
	<view>
		<view class="box" v-for="item in array" :key = "item.id">
			 <view class="box_one">
				 <text>
					  <text>{{item.username}}</text>
					  <text style="padding-left: 10px;">{{item.phone}}</text>
				 </text>
			 
			 	<text style="color: red;font-size:20px">+{{item.num}}</text>
			 </view>
			 <view class="box_two">
			 	<text>{{item.create_time | timeStamp}}</text>
			 	<text>手续费:{{item.fee}}</text>
			 	<text>订单号：{{item.order_num}}</text>
			 </view>
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
						// var s = now.getSeconds();
						// if(s<10){
						// 	s = "0" +s
						// }
						return year + "-" + month + "-" + date +' ' +hour +':' +m 
					},
					},
		onLoad() {
			this.getlist()
		},
		data() {
			return {
				 array:[]
			};
		},
		methods:{
		   getlist(){
			   this.getRequest('user/transferLog').then(res=>{
				    console.log(res)
					this.array = res.data.data
			   })
		   }
		}
	}
</script>

<style lang="scss" scoped>
    page{
		background-color: #f2f5fd;
		padding: 0 20px;
		.box{
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			height:50px;
			border-bottom:1px solid #d6d7d8;
			.box_one{
				width:100%;
				font-size: 16px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.box_two{
				width: 100%;
				font-size: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>
