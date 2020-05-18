<template>
  <div class="bg por">
    <van-nav-bar
      class="bar"
      title="合同管理"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="navbar-tab">
      <van-tabs v-model="active" sticky @click="changeTab" class="reset reset-fix">
        <van-tab v-for="(item,index) in tabsList" :title="item.title" :key="index"> 
          <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
              <van-list
                    v-model="isUpLoading"
                    :finished="upFinished"
                    :immediate-check="false"
                    :offset="10"
                    finished-text="没有更多了......"
                    @load="onLoadList">
                  <ul>
                    <li v-for="(item,index) in contractList" :key='index' @click="toDetail(item)">
                      <div class="item">
                        <div class=" item-line1">
                          <div class="flex1">
                            <p class="contract-name ell2">{{item.contractName}}</p>
                            <p class="contract-no">{{item.contractCode}}</p>
                          </div>
                          <span class=" contract-type">{{formatStatus(item.signStatus)}}</span>
                        </div>
                        <div class="item-line2" v-if='item.signDate'>
                          <span class="contract-data">签约日期：{{$utils.formatDay(item.signDate)}}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
              </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Contract",
    components: {
    },
    data() {
      return {
        tabsList: [
            {
              id:"00",
              title:'待签约合同'
            },
            {
              id:"01",
              title:"已签约合同"
            }
        ],        
        queryType:"00",
        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        contractList: [], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
        active:'0',//tab的active
      }
    },
    mounted() {
        this.queryContractList(0);
    },
    methods: {
      toDetail(num) {
        sessionStorage.setItem('pdfData',JSON.stringify(num) )       
        //this.$store.commit('setPdfData',num) ;//通过vuex存取数据
        this.$router.push({
          path: this.$RM.ContractPdf,
          query:{
            tab: this.active 
          }        
        })
      },
      //获取列表
      queryContractList(tabIndex) {
           if(!sessionStorage.getItem('custNo')){
              this.$toast('请先登录');          
              return
           }
           if(!JSON.parse(sessionStorage.getItem('loginSession')).factoringCustNo ){
              this.$toast('此客户还没认证');          
              return
           } 
           this.queryType = tabIndex == '0' ?  "00": "01";
           console.log(this.queryType)        
           const url = this.$api.ROOT + this.$Constants.GET_CONTRACT_LIST;
           this.contractList = [];
           const data = {
             "queryType":this.queryType,
             "custNo":sessionStorage.getItem('custNo'),
             "pageNum":this.pageIndex,
             "pageLength":this.pageSize
           }
           //console.log(data)
           this.$http.post(url,{"contract":data})
           .then(function (res) {
               const data = JSON.parse(res.data);
               const records = data.records
               console.log(res)
               console.log(records)
              if (records == null || records.length === 0) {
                // 加载结束
                this.upFinished = true
                return
              }
              if (records.length < this.pageSize) {
                // 最后一页不足10条的情况
                this.upFinished = true
              }
              // 处理数据
              if (this.pageIndex === 1) {
                this.contractList = records
              } else {
                this.contractList = this.contractList.concat(records)
              }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          }).finally(() => {
             this.isDownLoading = false
             this.isUpLoading = false
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryContractList(this.active) // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryContractList(this.active)
      },
      changeTab() {
        this.pageIndex = 1; //tab切换时，pageIndex重设为1 
        this.queryContractList(this.active)       
      },
      //格式化签约状态
      formatStatus(num){
        switch(num) {
            case "01":
                return "待签约" 
                break;
            case "03":
                return "已确认,签约中" 
                break;
            default:
                return "已签约"  
        } 
      },   
    },
  }
</script>

<style>
.reset .van-tabs__line{
   background-color:#FFC600;
}
.reset .van-tab{
   font-size: 18px ;
   font-weight: 600;
}
.reset .van-tab--active{
    color: #FFC600;
} 

.reset-fix>div:first-child{
    position: fixed;
    width: 100%;
    left: 0;
    top: 45px;
    z-index: 1;
}
.reset-fix .van-tabs__content{
  margin-top: 40px;
}


</style>

<style scoped>
@import "../../css/common";
.item-line1{
      align-items: baseline;
} 
.contract-type{
    width: 54px;
    display: inline-block;
    margin-left: 5px
} 
.bar{
  z-index: 111;
}


</style>
