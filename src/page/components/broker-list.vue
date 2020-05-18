<template>
<div>
 
    <div class='cont-sides'>
        <p class="cont-item">基础资产信息      
        </p>
    </div>
    <ul  class="bgcf">
      <li v-for="(item,index) in brokerList" :key='index' @click="toDetail(item)">
        <div class="receivables-lib bber">
            <div class=" item-receivables-line1">
              <div>
                <p class="receivables-name  ell2 word-break">{{item.custName}}</p>
                <p class="receivables-no">{{item.ABSNo}}</p>
              </div>
            </div>

            <div class="item-receivables-line2">
              <span class="receivables-amount">{{item.businessType}}</span>
            </div>
            <div class="item-receivables-line3">
              <span class="receivables-data">{{item.loanAmt}}</span>
            </div>
        </div>
      </li>
    </ul>
    <div v-if='tip' class="tip">暂无更多数据</div>






</div>
</template>

<script>
  //import Divider from '@/components/Divider.vue'
    export default {
        components: {
          //Divider,
        },
        props:['tip','brokerList'],
        computed: {},
        data() {
          return {
            //tipShow:false,
            // pageSize: 10, // 每页条数
            // pageIndex: 1, // 页码
            // receivesApplyList: [], // 请求数据
            // isDownLoading: false, // 下拉刷新
            // isUpLoading: false, // 上拉加载
            // upFinished: false, // 上拉加载完毕
            // offset: 100 // 滚动条与底部距离小于 offset 时触发load事件

          }
        },
        mounted() {
        },
        methods: {
          toDetail(item) {
            //this.$store.acctItem = item
            //this.$store.commit('setBrokerItem',item)
            sessionStorage.setItem('brokerItem',JSON.stringify(item))
            this.$router.push({
              path: this.$RM.BrokerDetail,
              //query:{data:JSON.stringify(num)}        
            })
          },
          //获取列表
          queryReceivesApplyList() {
              // const url = this.$api.ROOT + this.$Constants.QUERY_RECEIVESAPPLY_LIST;
              // //this.$http.post(url,{"custNo":"C000210","accountTransfer":{"pageNo":this.pageIndex,"pageSize":this.pageSize}})
              // this.$http.post(url,{"custNo":"C000257","accountTransfer":{"status":"00","pageNo":this.pageIndex,"pageSize":this.pageSize}})
              // .then(function (res) {
              //     const data = JSON.parse(res.data);
              //     const records = data.records
              //     console.log(records)
              //     if (records == null || records.length === 0) {
              //       // 加载结束
              //       this.upFinished = true
              //       return
              //     }
              //     if (records.length < this.pageSize) {
              //       // 最后一页不足10条的情况
              //       this.upFinished = true
              //     }
              //     // 处理数据
              //     if (this.pageIndex === 1) {
              //       this.receivesApplyList = records
              //     } else {
              //       this.receivesApplyList = this.receivesApplyList.concat(records)
              //     }
              // }).catch(function () {
              //   this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
              // })
          },
          onDownRefresh() {
            // this.pageIndex = 1
            // this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
            // this.queryReceivesApplyList() // 加载数据
          },
          // 上拉加载请求方法
          onLoadList() {
            // this.pageIndex++
            // this.queryReceivesApplyList()
          },
          formatDay(num){
            if(num){
                var fnum = ''+num.slice(0,4)+'-'+num.slice(4,6)+'-'+num.slice(6,8)
                return fnum;
            }
          }

        }
    }
</script>

<style scoped>
@import "../../css/common";
/* .receivables-lib {
  padding: 8px 0;
} */
  /* .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;  */
    /*background-color:burlywood;*/
    /* position: relative;
    padding: 0 16px;
  }


  .add-img {
    width: 25px;
    height: 25px;
    padding: 10px 15px 9px
  } 
  .cont-sides{
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fafafa;
  }

  .receivables-lib { */
    /* margin-top: 5px; */
    /* border-bottom: 1px solid #000;
  }

  .img-type {
    width: 40px;
    height: 40px;
  }

  .item-receivables-line1 {
    letter-spacing: 1px;
    color: #c9c9c9;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-receivables-line2 {
    display: flex;
  }

  .item-receivables-line3 {
    display: flex;
    margin-top: 5px;
  }

  .receivables-name {
    color: #1f1f1f;
    margin-left: 16px;
    font-size: 18px;
  }


  .receivables-no {
    color: #969696;
    font-size: 12px;
  }



  .receivables-data {
    margin-left: 16px;
    color: #343434;
    font-size: 13px;
  }

  .receivables-amount {
    font-size: 19px;
    margin-left: 16px;
    color: #ff0000;
  } */

/* .receivables-lib {
     border-bottom: 1px solid #000;
  } */
/* 
  .img-type {
    width: 40px;
    height: 40px;
  } */

  /* .item-receivables-line1 {
    letter-spacing: 1px;
    color: #c9c9c9;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-receivables-line2 {
    display: flex;
  }

  .item-receivables-line3 {
    display: flex;
    margin-top: 5px;
  } */

</style>
