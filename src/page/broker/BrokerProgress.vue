<template>
  <div class="bg">
    <van-nav-bar
      class="bar"
      title="ABS资产信息"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="navbar-tab">

      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有更多了......"
          @load="onLoadList">
             <ul class="cardBox">
                <li class="bber" v-for="(item,index) in brokerList" :key='index' @click="toDetail(item.assetsNo)">
                  <div class="item-list">
                    <div class=" item-line1 vam">
                        <span class="contract-name flex1">{{item.absName}}</span>
                        <span class="contract-no flex1">{{item.assetsNo}}</span>
                    </div>
                    <div class=" item-line1">
                        <span class="contract-flex">{{item.securitiesTrader}}</span>
                        <span class="contract-flex">{{item.creditRating}}</span>
                    </div>
                    <div class=" item-line1">
                        <span class="contract-flex">{{item.lawFirm}}</span>
                        <span class="contract-flex">{{item.accountingFirm}}</span>
                    </div>
                    <div class=" item-line1">
                        <span class="contract-flex">{{item.creditRatingOrg}}</span>
                        <span class="contract-flex">{{item.guaranteeOrg}}</span>
                    </div>
                  </div>
                </li>
              </ul>
        </van-list>
      </van-pull-refresh>
     
    </div>
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
        brokerList: [], // 请求数据
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
        this.queryBrokerList();
    },
    methods: {
      toDetail(num) {
        this.$router.push({
          path: this.$RM.BrokerProgressDetail,
          query:{id: num}        
        })
      },
      //获取列表
      queryBrokerList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_BROKER_LIST;
           const data = {
             "custNo":sessionStorage.getItem('custNo'),
             "pageNum":this.pageIndex,
             "pageLength":this.pageSize,
             "assetsBroker":{"absName":""}
           }
           console.log(data)
           this.$http.post(url,data)
           .then(function (res) {
               const data = JSON.parse(res.data);
               const records = data.records
               //console.log(records)
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
                this.brokerList = records
              } else {
                this.brokerList = this.brokerList.concat(records)
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
        this.queryBrokerList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryBrokerList()
      },
    }
  }
</script>

<style scoped>
@import "../../css/common";
  
  .item {
    margin-top: 5px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #ffffff;
    text-align: center;
    justify-content: space-between;
    flex-direction: row;
  }

  .contract-flex{
    flex: 1;
    font-size: 17px;
    margin-top: 5px;
    color: #666;
  }

  .vam{
     align-items: center;
  } 

</style>
