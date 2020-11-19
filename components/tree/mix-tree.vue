<template>
    <view class="content">
        <view class="mix-tree-list">
            <block v-for="(item, index) in treeList" :key="index">
				 <!--  -->
                <view 
                    class="mix-tree-item "
                    :style="[{
                            paddingLeft: item.rank*15 + 'px',
                            zIndex: item.rank*-1 +50
                        }]"
                    :class="{
                            border: treeParams.border === true,
							show: item.show,
                            last: item.lastRank,
                            showchild: item.showChild
                        }"
                    @click.stop="treeItemTap(item, index)"
                >
                    <image class="mix-tree-icon" :src="item.iseffective<1 ? treeParams.lastIcon : item.showChild ? treeParams.currentIcon : treeParams.defaultIcon"></image>
                   <view class="acea-row row-column-around" style=" border-bottom:1upx solid #FFFFFF ;height: 100%; flex: 1; flex-wrap: nowrap;">
                   <view class="acea-row">
                   	<text space="nbsp">id: {{item.id}} 电话: {{item.phone}}</text>
                   </view>
				   <view class="acea-row">
				   <text space="nbsp">{{item.create_time}} {{item.is_yx}}</text>
				   </view>
                   </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array,
                default(){
                    return [];
                }
            },
            params: {
                type: Object,
                default(){
                    return {}
                }
            }
        },
        data() {
            return {
                treeList: [],
                treeParams: {
                    defaultIcon: '/static/img/rightIcon.png',
                    currentIcon: '/static/img/bottomIcon.png',
                    lastIcon: '',
                    border: false
                },
				clickId:'',
            }
        },
        watch: {
            list(list){
                
                this.treeParams = Object.assign(this.treeParams, this.params);
                // console.log(this.treeParams, this.params);
                this.renderTreeList(list);
            }
        },
        onLoad() {  
            console.log("mix-tree onLoad")
        }, 
        methods: {
            //扁平化树结构
			
			async  test(list){
				let n =await this.renderTreeList(list);
				var clickItem;
				
				for(var i  in this.treeList){
					if(this.treeList[i].id == this.clickId){
						clickItem = this.treeList[i];
					}
				}
				// console.log(this.treeList);
				// console.log(clickItem);
				if(clickItem)this.treeItemTap(clickItem);
				
				// if(select(clickItem,this.treeList))
				// this.treeList.forEach(
				// )
			},
			
			
            renderTreeList(list=[], rank=0, parentId=[]){
				let copyList
				if(rank==0){
					copyList = JSON.parse(JSON.stringify(this.treeList));
					console.log(this.treeList);
					console.log(this.list);
					console.log(copyList);
					this.treeList=[];
				}
				// console.log(list);
                list.forEach(item=>{
					// // console.log(item);
					// var set = 1; 
					
					// if(set==1){
						// console.log(item);
						let selected = this.select(item,copyList);
						if(selected){
						
						console.log(selected);
						this.treeList.push(selected);
						
						// console.log(this.treeList);
						// selected[children].forEach(setItem=>{
						// 	set
						// }
						// )
						
						}else{
						// var isShow	
						// if(rank == 0){
						// 	isShow=true;
						// } ;
							
							this.treeList.push({
							    id: item.id,
							    phone: item.phone,
							    is_yx: item.is_yx,
							    create_time: item.create_time,
							    parentId,  // 父级id数组
							    rank,  // 层级
							    showChild: true,  //子级是否显示
							    show: true,// 自身是否显示
								iseffective:item.iseffective //是否由下级
							})
						}
						
						
								
					// }
					if(Array.isArray(item.children) && item.children.length > 0){
					    let parents = [...parentId];
					    parents.push(item.id);
						console.log(parents);
					    this.renderTreeList(item.children, rank+1, parents);
					}else{
						// console.log(this.treeList);
					    this.treeList[this.treeList.length-1].lastRank = true;
					}			
                   
                 
                })
			
            },
			select(item,copyList){
				for( let i in copyList){
					if(copyList[i].id == item.id){
						// this.treeList.push(copyList[i]);
						// console.log(i);
						return copyList[i];
						
					}
				}
			},
            // 点击
            treeItemTap(item){
                let list = this.treeList;
                let id = item.id;
				console.log(id);
				this.clickId  = id;
                if(item.lastRank === true){
                    //点击最后一级时触发事件
					if(item.iseffective>0){
						item.lastRank =false;
						item.showChild = true;
						this.$emit('treeItemClick', item,this.treeList);
					}
                    return;
                }
                item.showChild = !item.showChild;
                list.forEach(childItem=>{
                    if(item.showChild === false){
                        //隐藏所有子级
                        if(!childItem.parentId.includes(id)){
                            return;
                        }
                        if(childItem.lastRank !== true){
                            childItem.showChild = false;
                        }
						console.log();
                        childItem.show = false;
                    }else{
                        if(childItem.parentId[childItem.parentId.length-1] === id){
                            childItem.show = true;
                        }
                    }
                })
            }
        }
    }
</script>

<style>
    .mix-tree-list{
        display: flex;
        flex-direction: column;
        padding-left: 30upx;
    }
    .mix-tree-item{
        display: flex;
        align-items: center;
        font-size: 30upx;
        color: #FFFFFF;
        height: 0;
        opacity: 0;
        transition: .2s;
        position: relative;
    }
    .mix-tree-item.border{
        border-bottom: 1px solid #eee;
    }
    .mix-tree-item.show{
        height: 108upx;
        opacity: 1;
    }
    .mix-tree-icon{
        width: 26upx;
        height: 26upx;
        margin-right: 8upx;
        opacity: .9;
    }
    
    .mix-tree-item.showchild:before{
        transform: rotate(90deg);
    }
    .mix-tree-item.last:before{
        opacity: 0;
    }
</style>
