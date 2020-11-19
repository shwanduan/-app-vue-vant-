<template>
	<view>
		<view class="box_one">
			<text>转账金额:</text>
			<input type="number" placeholder="请输入金额" v-model="num" maxlength="7">
		</view>
		<view>	
			<text class="box_two" v-show="show">
				手续费：{{fee}}
			</text>
		</view>
		<view class="box_one">
			<text>交易密码</text>
			<input type="password" placeholder="请输入密码" v-model="pay_password" maxlength="12">
		</view>

		<view class="btn">
			<button type="primary" @click="submitMoney()">提交</button>
		</view>
		
		<!-- <view class="changePassword" @click="trap('goTochangpassword')">
			<text>修改支付密码</text>
		</view> -->

	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.to_uid = e.id
		    this.gerFee();	
		},
		data() {
			return {
				num: '',
				pay_password: '',
				fee:'',
				show:true,
				to_uid:''
			};
		},
		methods:{
			trap(name){
				uni.navigateTo({
					url:name
				})
				
			},
			 gerFee(){
			 	this.getRequest('user/gerFee').then(res=>{	
			 	   this.fee = res.data.data
			 		if(this.fee == 0){
			 			this.show = false
						
			 		}else {
							this.show = true
					}
			 	})
			 },
			 
			 submitMoney:function() {
				 console.log(this);
				 uni.showLoading({
				 	
				 })
				 let data = {
					 to_uid : this.to_uid,
					 num : this.num,
					 pay_password : this.pay_password
				 }
				   this.getRequest('user/transfer',data).then(res=>{
					   console.log(res.data.msg)
						uni.hideLoading();
						uni.showModal({
							content:res.data.msg,
							showCancel: false,
							success() {
								uni.navigateBack({
								  		delta: 1
								  	})
							}
						})
					  //   uni.showToast({
					  //   	title: res.data.msg,
					  //   	icon: "none",
					  //   	duration: 1500,
							// mask:true
					  //   })   
					 
					
					//   setTimeout(() => {
					//   	uni.navigateBack({
					//   		delta: 1
					//   	})
					//   }, 2000)
					
					  
				   },res=>{
					  this.num = '';
					  this.pay_password = ''
				   })
			 }
		}
		
	}
</script>

<style lang="scss" scoped>
	.changePassword{
		color: gray;
		font-size: 18px;
		display: flex;
		justify-content: flex-end;
		margin-top: 10px;
	}
	page {
		padding: 0 10px;
		background-color: #f2f5fd;
		.btn {
			margin-top: 200px;
         

		}

		.box_two {
			color: red;
			font-size: 15px;
		}

		.box_one {
			font-size: 17px;
			height: 50px;
			display: flex;
			border-bottom: 1px solid #d6d7d8;
			display: flex;
			justify-content: space-between;
			align-items: center;

			text {
				// background: blue;
			}

			input {
				// border:1px solid black;
				//     background: pink;
				height: 50px;
			}
		}

	}

	input {}
</style>
