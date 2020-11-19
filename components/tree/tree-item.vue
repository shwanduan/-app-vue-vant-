<template>  
    <view>  
    <view class="tree-ul" v-for="(item,i) in data" :key="item.code+i">  
        <view class="isTrue" v-if="item.children">                
            <view class="tree-item">  
               <!-- 向下 -->
                <span v-if="!opends[i]" @tap="onOpends(item,i,true)">&or;</span>  
                <span v-if="opends[i]"  @tap="onOpends(item,i,false)">&and;</span>  
				 <label>{{item.name}}</label>  
            </view>  
            <tree-item class="children-box" :data="item.children" v-show="opends[i]"></tree-item>  
        </view>  
        <view class="tree-item isTrue"  v-if="!item.children">  
            <label>{{item.name}}</label>  
        </view>  
    </view></view>  
</template>  

<script>  
    export default {  
        name: "tree-item",  
        props:{  
            data: {  
                type: Array,  
                default: function(e) {  
                    return []  
                }  
            }  
        },  
        data() {  
            return {  
                opends: [],  
            };  
        },  
        onLoad() {  
            console.log("tree-item onLoad")
        },  
        methods:{  
            onOpends(item,i,boolean){  
				// if(boolean){
				  this.$emit('treeItemClick', item);	
				  
				// }
                this.$nextTick(function(){
                    this.$set(this.opends,i,!this.opends[i])  
                })  
            }  
        }  
    }  
</script>  

<style>  
    .tree-box{  
        display: inline-block;  
        width: 220px;  
        border: 1px solid #eee;  
        overflow: hidden;  
        border-radius: 4px;  
    }  
	.tree-item.isTrue{
		margin-left: 30upx;
	}
    .tree-item{  
        display: flex;  
        overflow: hidden;  
        height: 32px;  
        border-bottom: 1px solid #eee;  
    }  
    .tree-item>label{  
        flex: 1;  
        line-height: 32px;  
        font-size: 14px;  
        overflow: hidden;  
        text-overflow: ellipsis;  
        white-space: nowrap;  
    }  
    .tree-item>span{  
        width: 32px;  
        height: 32px;  
        text-align: center;  
        line-height: 32px;  
    }  
    .isTrue{  
        padding-left: 15px;  
    }  
</style>  