<template>
  <div class="bg">
    <van-nav-bar
      class="bar"
      title="应收账款查询"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有更多了......"
          @load="onLoadList">
          <div class="navbar-tab">
             <ul class="cardBox">
                <li  v-for="(item,index) in receivablesList" :key='index' @click="toDetail(item.acctCode,'new')">    
                  <div class="item">
                    <div class="item-left">
                      <div class=" item-line1">
                        <div>
                          <p class="contract-name ell2">{{item.draweeName}}</p>
                          <p class="contract-no ell2 word-break">{{item.tradeContractNo}}</p>
                        </div>
                      </div>
                      <div class="item-line2">
                        <span class="contract-amount">{{item.contractAmt}}</span>
                      </div>
                      <div class="item-line3">
                        <span class="contract-data">{{$utils.formatDay(item.paymentEndDate)}}</span>
                      </div>
                    </div>
                  </div>
                </li>
            </ul>
          </div>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        receivablesList: [], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100 // 滚动条与底部距离小于 offset 时触发load事件
      }
    },
    created() {
        if(!sessionStorage.getItem('custNo')){
          this.$toast('请先登录');          
          return
        }
        if(!JSON.parse(sessionStorage.getItem('loginSession')).factoringCustNo ){
          this.$toast('此客户还没认证');          
          return
        }
        this.queryReceivablesList();
    },
    methods: {
      toDetail(num,type) {
        this.$router.push({
          path: this.$RM.ReceivablesDetail,
          query:{id: num,type:type}        
        })
      },
      //获取列表
      queryReceivablesList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_RECEIVABLES_LIST;
           const data = {
              "custNo":sessionStorage.getItem('custNo'),
              "account":{
                "draweeName":"",
                "status":"02,03,04",
                "pageNum":this.pageIndex,
                "pageLength":this.pageSize
              }
           }
           this.$http.post(url,data)
           .then(function (res) {
               const data = JSON.parse(res.data);
               if(data.respCode == '999999'){
                  this.$toast(data.respMsg)
               }else{
                  const records = data.account;
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
                    this.receivablesList = records
                  } else {
                    this.receivablesList = this.receivablesList.concat(records)
                  }
               }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryReceivablesList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryReceivablesList()
      },
      formatDay(num){
        if(num){
            var fnum = ''+num.slice(0,4)+'-'+num.slice(4,6)+'-'+num.slice(6,8)
            return fnum;
        }
      }
      
    },


  }
</script>

<style scoped>
@import "../../css/common";
.item-left{
  font-weight: normal;
}
.item-line2{
  margin: 10px 0;
}
</style>
