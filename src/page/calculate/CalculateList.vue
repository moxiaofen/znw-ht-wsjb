<template>
  <div class="bg">
    <van-nav-bar
      class="bar"
      title="还款测算"
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
          <ul class="content">
            <li  v-for="(item,index) in CalculateList" :key='index' @click="toDetail(item.loanNo)">
              <div class="item">
                <div class=" item-line1">
                  <div class="item-headline">
                    <span class="contract-name">合同编号</span>
                    <span class="contract-no">{{item.contractNo}}</span>
                  </div>
                </div>
                <div class="item-line2">
                  <div class="item-line2-div">
                    <div class="item-box-dev">
                      <span class="item-title">融资金额</span>
                    </div>
                    <span class="item-title2">{{item.loanAmt}}</span>
                  </div>
                  <div class="item-line2-div">
                    <div class="item-box-dev">
                      <span class="item-title">融资余额</span>
                    </div>
                    <span class="item-title3">{{item.loanBal}}</span>
                  </div>
                </div>
                <div class="item-line3">
                  <span>经理 {{item.projectManager}}</span>
                  <span>期限 {{item.loanTerm}}</span>
                    <span>{{$utils.formatDay(item.loanDate)}}</span>
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
    name: "CalculateList",
    components: {
    },
    computed: {},
    data() {
      return {
        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        CalculateList: [], // 请求数据
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
        this.queryCalculateList();
    },
    methods: {
      toDetail(num) {
        this.$router.push({
          path: this.$RM.CalculateDetail,
          query:{id: num}        
        })
      },
      //获取列表
      queryCalculateList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_CALCULATE_LIST;
           const data = {
              "custNo":sessionStorage.getItem('custNo'),
              "pageNum":this.pageIndex,
              "pageLength":this.pageSize
           }
           this.$http.post(url,{"contract":data})       
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
                this.CalculateList = records
              } else {
                this.CalculateList = this.CalculateList.concat(records)
              }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryCalculateList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryCalculateList()
      },
    },

  }
</script>


<style scoped>
  .bg{
    background-color: #fafafa;
  }
  .bar {
    background-color: #FFC600;
    color: #ffffff;
  }
  .content {
    margin-top: 46px;
  }

  .content .item {
    margin-top: 3px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #ffffff;
    display: flex;
    text-align: center;
    flex-direction: column;
  }
.item-headline{
  text-align: left;
  padding:0 16px;
}
  .item-box-dev {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 5px;
  }


  .item-line1 {
    letter-spacing: 1px;
    color: #c9c9c9;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2 {
    letter-spacing: 1px;
    color: #c9c9c9;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line3 {
    font-size:13px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .item-line3 span {
    font-size: 13px;
    margin-top: 3px;
    margin-bottom: 3px;
    width: 33%;
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
    margin-left: 4px;
    font-size: 15px;
    color: #343434;

  }

  .item-title2 {
    margin-left: 4px;
    font-size: 15px;
    color: red;
  }

  .item-title3 {
    margin-left: 4px;
    font-size: 15px;
    color: #006666;
  }

  .contract-name {
    color: #1f1f1f;
    font-weight: bolder;
    font-size: 15px;
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

</style>
