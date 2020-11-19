<template>
	<view>
		<view class="box_one">
			<text>输入新密码:</text>
			<input type="number" placeholder="请输入旧密码" v-model="oldpassword" maxlength="7">
		</view>
		<view class="box_one">
			<text>重新输入密码:</text>
			<input type="number" placeholder="请输入旧密码" v-model="newpassword" maxlength="7">
		</view>

		<view class="btn">
			<button type="primary" @click="changeOld">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpassword: '',
				newpassword: ''
			};
		},
		methods:{
			 changeOld(){
			 	 let data = {
			 		 oldpassword:this.oldpassword,
			 		 newpassword:this.newpassword
			 	 }
			 	 this.getRequest('user/editPayPwd',data).then(res=>{
			 		 console.log(res)
					 uni.showToast({
					 	title:res.data.msg,
					    icon:"none",
						duration:1500,
						mask:true
					 })
			 	 })
			 }
		}
		
	}
</script>

<style lang="scss">
	page {
		padding: 0 20px
	}

	.btn {
		margin-top: 200px;
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
</style>
