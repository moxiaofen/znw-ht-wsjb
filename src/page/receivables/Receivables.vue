<template>
  <div class="bg">
      <van-nav-bar
        class="bar"
        title="业务办理"
        left-arrow
        fixed
        border='false'
        @click-left="$router.back(-1)"
      />
      <ul class="cellBox" >
        <li class="cell" @click="toPage(cell.toKey)" v-for="cell in cellList"  :key='cell.toKey'>
          <img  :src="cell.src" >
          <span > {{cell.title}}</span>
        </li>
      </ul>

  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
          cellList:[
             {
                toKey : 'businessApply',
                src : require('../../assets/iv_collection_icon.png'),
                title : '业务申请'
             },
             {
                toKey : 'EOI-dp',
                src : require('../../assets/iv_collection_icon.png'),
                title : '定/票保理融资申请'
             },
             {
                toKey : 'EOI-c',
                src : require('../../assets/iv_collection_icon.png'),
                title : '池保理融资申请'
             },
             {
                toKey : 'apply-dp',
                src : require('../../assets/iv_collection_icon.png'),
                title : '定/票保理应收账款转让'
             },
             {
                toKey : 'apply-c',
                src : require('../../assets/iv_collection_icon.png'),
                title : '池保理应收账款转让'
             },
             {
                toKey : 'search-dp',
                src : require('../../assets/iv_collection_icon.png'),
                title : '定保理应收账款转让查询'
             },
             {
                toKey : 'search-c',
                src : require('../../assets/iv_collection_icon.png'),
                title : '池保理应收账款转让查询'
             }
             
          ]
      }
    },
    methods: {
      toPage(msg){
        if("businessApply" == msg){
           this.$router.push({
            path: this.$RM.BusinessApply
          })
        }
        if("EOI-dp" == msg){
           this.$router.push({
            path: this.$RM.BusinessApply,
            query:{
              id: 'dp'
            }  
          })
        }
        if("EOI-c" == msg){
           this.$router.push({
            path: this.$RM.BusinessApply,
            query:{
              id: 'c'
            }  
          })
        }
        if("apply-dp" == msg){
           this.$router.push({
            path: this.$RM.ReceivesApplyList,
            query:{
              id: 'dp'
            }  
          })
        }
        if("apply-c" == msg){
           this.$router.push({
            path: this.$RM.ReceivesApplyList,
            query:{
              id: 'c'
            }  
          })
        }
        if("search-dp" == msg){
           this.$router.push({
            path: this.$RM.ReceivablesList,
            query:{
              id: 'dp'
            }  
          })
        }
        if("search-c" == msg){
           this.$router.push({
            path: this.$RM.ReceivablesList,
            query:{
              id: 'c'
            }  
          })
        }
        // if("search" == msg){
        //    this.$router.push({
        //     path: this.$RM.ReceivablesList
        //   })
        // }

        // if("apply" == msg){
        //   this.$router.push({
        //     path: this.$RM.ReceivesApplyList
        //   })
        // }
      }
    }
  }
</script>

<style scoped>
@import "../../css/common";
.cellBox {
    margin-top: 46px;
  }
 
</style>
