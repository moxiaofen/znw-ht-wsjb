<template>
  <div class="bg">
      <van-nav-bar
        class="bar"
        title="台账管理"
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
            <ul class="navbar-tab">
                <li  v-for="(item,index) in ledgerList" :key='index' @click="toDetail(item.contractNo)">
                <div class="item">
                  <div class="item-left flex1">
                    <div class=" item-line1">
                      <div>
                        <p class="contract-name ell2">{{item.projectName}}</p>
                        <p class="contract-no ell2">{{item.businessType}}</p>
                      </div>
                    </div>
                    <div class="item-line2">
                      <span class="contract-amount">{{item.loanAmt}}</span>
                    </div>
                    <div class="item-line3">
                      <span class="contract-data">{{$utils.formatDay(item.endDate)}}</span>
                    </div>
                  </div>
                  <div class="item-right item-right-cont">
                    <span>{{item.lnState}}</span>
                  </div>
                </div>
              </li>
              
            </ul>
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
  export default {
    name: "LedgerList",
    components: {
    },
    data() {
      return {
        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        ledgerList: [], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100 // 滚动条与底部距离小于 offset 时触发load事件
      }
    },
    mounted() {
        if(!sessionStorage.getItem('custNo')){
          this.$toast('请先登录');          
          return
        }
        if(!JSON.parse(sessionStorage.getItem('loginSession')).factoringCustNo ){
          this.$toast('此客户还没认证');          
          return
        }
        this.queryLedgerList();
    },
    methods: {
      toDetail(num){
        this.$router.push({
          path: this.$RM.LedgerDetail,
          query:{id: num}   
        })
      },
      //获取列表
      queryLedgerList() {
           this.ledgerList = []
           const url = this.$api.ROOT + this.$Constants.QUERY_LEDGER_LIST;
           const data = {
              "custNo":sessionStorage.getItem('custNo'),
              "pageNum":this.pageIndex,
              "pageLength":this.pageSize
           }
           this.$http.post(url,{"contract":data})
           .then(function (res) {
               console.log(res)
               const data = JSON.parse(res.data);
               const records = data.records
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
                this.ledgerList = records
              } else {
                this.ledgerList = this.ledgerList.concat(records)
              }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryLedgerList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryLedgerList()
      },


    }
  }
</script>

<style scoped>
 @import "../../css/common";

    .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  } 
    .item-right{
      display: flex;
       color: red;
      margin-right: 16px;
  }

.item-left{
  font-weight: normal;
}
.contract-no{
      font-size: 14px;
}
.item-line2{
  margin: 6px 0;
}

</style>
