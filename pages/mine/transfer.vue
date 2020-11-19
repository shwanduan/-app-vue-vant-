<template>
	<view>
		<view class="box" v-for="item in arr" :key= "item.id" :id="item.id" @click="goreall($event)" :data-money = 'item.money'>
			<text class="text_one">{{item.username}}</text>
			<text class="text_two"> {{item.phone}}</text>
			<text class="text_three">￥{{item.money}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getList();
			this.one()
		},
		data() {
			return {
				phone:'',
				 arr:[
					 // {id:1,name:'蜡笔小新111',phone:'17805428614',money:'999'},
					 // {id:2,name:'蜡笔小新222',phone:'13698621358',money:'888'},
					 // {id:4,name:'蜡笔小新333',phone:'18265418399',money:'111'}, 
				 ] 
			};
		},
		onNavigationBarSearchInputChanged(e){
			 this.phone = e.text
		},
		methods:{
			one(){
				console.log(this.text)
			},
			goreall(e){
			    uni.navigateTo({
			    	url: "transferRecord?id=" + e.currentTarget.id +'&money=' +e.currentTarget.dataset.money
					// url: "realltransferReoder?money=" + e.currentTarget.dataset.money
			    })
			},
			getList(){
				let data ={
				   phone: this.phone
				}
				this.getRequest('user/searchUserList').then(res=>{
					 console.log(res.data)
					 this.arr = res.data.data
				})
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: "realltransferReoder"
			})
		},
	}
</script>

<style lang="scss">
  page{
	  background:#f2f5fd ;
	  padding:0 20px;
	  .box{
		  height: 70px;
		  border-bottom:1px solid #d6d7d8;
		  padding:0 20px;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  .text_two{
			  font-size: 16px;
		  }
		  .text_three{
			  color:red
		  }
		  .text_one{
			 font-size: 17px;
			 font-weight: bolder;
		  }
	  }
  }
</style>
