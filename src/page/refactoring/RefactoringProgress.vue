<template>
  <div class="bg">
    <van-nav-bar
      class="bar"
      title="再保理资产信息"
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
            <ul class="cardBox" >
              <li class="bber"  v-for="(item,index) in refactoringList" :key='index' @click="toDetail(item.assetsNo)">
                <div class="item">
                  <div class=" item-line1 vam">
                      <span class="contract-name flex1 word-break">{{item.custName}}</span>
                      <span class="contract-no flex1 word-break">{{item.contractNo}}</span>
                  </div>
                  <div class="item-line2">
                    <div class="item-line2-div">
                      <div class="item-box-dev">
                        <span class="item-title">再保理融资金额(元)</span>
                      </div>
                      <span class="item-title2">{{item.loanAmt}}</span>
                    </div>

                    <div class="item-line2-div">
                      <div class="item-box-dev">
                        <span class="item-title">再保理融资余额(元)</span>
                      </div>
                      <span class="item-title3">{{item.loanBal}}</span>
                    </div>
                  </div>
                  <div class=" item-line1">
                      <span class="contract-flex">{{$utils.formatDay(item.contractEndDate)}}</span>
                      <span class="contract-flex">{{formatStatus(item.status)}}</span>
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
        pageSize: 20, // 每页条数
        pageIndex: 1, // 页码
        refactoringList: [], // 请求数据
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
        this.queryFinancingList();
    },
    methods: {
      toDetail(num) {
        this.$router.push({
           path: this.$RM.RefactoringProgressDetail,
           query:{id: num}    
        })
      },
       //获取列表
      queryFinancingList() {
          const url = this.$api.ROOT + this.$Constants.QUERY_REFACTORING_LIST;
          const data = {
            "custNo":sessionStorage.getItem('custNo'),
            "pageNum":this.pageIndex,
            "pageLength":this.pageSize,
            "assetsRefactoring":{"custName":""}
          }
          console.log(data)
          this.$http.post(url,data)
           .then(function (res) {
                const data = JSON.parse(res.data);
                const records = data.records
                // console.log(records)
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
                  this.refactoringList = records
                } else {
                  this.refactoringList = this.refactoringList.concat(records)
                }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })

      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryFinancingList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryFinancingList()
      },
      formatStatus(num){
        switch(num) {
            case "01":
                return "未发起";
                break;
            case "02":
                return "退回修改";
                break;
            case "03":
                return "审批中";
                break;
            case "04":
                return "已通过";
                break;
            case "05":
                return "被否决";
                break;
            case "06":
                return "已归档";
                break;
            default:
              return ""
        } 
      },

    }
  }
</script>

<style scoped>
  .bar {
    background-color: #FFC600;
    color: #ffffff;
  }
  .content {
    margin-top: 46px;
    position: relative;
  }
  .navbar-tab {
    text-align: justify;
    padding-top: 46px;
  }

  .item {
    margin-top: 5px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #ffffff;
    display: flex;
    text-align: center;
    justify-content: space-between;
    flex-direction: row;
  }
  .item-right {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }

  .img-type {
    width: 60px;
    height: 60px;
  }

  .item-line1 {
    letter-spacing: 1px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line3 {
    display: flex;
    margin-top: 10px;
  }

  .contract-name {
    color: #1f1f1f;
    margin-left: 16px;
    font-size: 20px;
  }

  .contract-no {
    color: #969696;
    font-size: 16px;
  }

  .contract-data {
    margin-left: 16px;
    color: #343434;
    font-size: 16px;
  }

  .contract-amount {
    font-size: 24px;
    margin-left: 16px;
    color: #ff0000;
  }
.cardBox {
    margin-top: 5px;
  }

  .cardBox .item {
    margin-top: 5px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: #ffffff;
    display: flex;
    text-align: center;
    flex-direction: column;
  }

  .item-box-dev {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 5px;
  }

  .item-line1 {
    letter-spacing: 1px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2 {
    letter-spacing: 1px;
    display: flex;
    padding-top: 5px;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2-div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .item-img {
    height: 20px;
    width: 20px;
  }

  .item-title {
    margin-left: 8px;
    font-size: 17px;
    color: #343434;
  }

  .item-title2 {
    font-size: 17px;
    color: red;
  }

  .item-title3 {
    font-size: 17px;
    color: #006666;
  }

  .contract-name {
    color: #1f1f1f;
    font-weight: bolder;
    margin-left: 10px;
    font-size: 18px;
  }

  .contract-no {
    color: #969696;
    font-size: 13px;
  }

  .contract-amount {
    font-size: 15px;
    margin-left: 8px;
    color: #ff0000;
  }
  .contract-flex{
    flex: 1;
    font-size: 17px;
    margin-top: 5px;
    color: #666;
  }
  .flex1{
    flex: 1;
  }
  .vam{
     align-items: center;
  }
</style>
