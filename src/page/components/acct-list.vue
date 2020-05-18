<template>
<div>
 
    <div class='cont-sides'>
        <p class="cont-item">应收款清单列表      
        </p>
        <img  v-if="itemShow" class="add-img" src="../../assets/icon_add.png"  @click="addReceives" />
    </div>
    <ul class="bgcf">
      <!-- <li v-for="(item,index) in acctList" :key='index' @click="toDetail(item.acctCode,'finance',item)"> -->
      <li class="bber" v-for="(item,index) in acctList" :key='index' @click="toDetail(item)">
        <div class="receivables-lib">
            <div class=" item-receivables-line1">
              <div>
                <p class="receivables-name ell2 word-break">{{item.draweeName}}</p>
                <p class="receivables-no">{{item.tradeContractNo}}</p>
              </div>
            </div>

            <div class="item-receivables-line2">
              <span class="receivables-amount">{{item.contractAmt}}</span>
            </div>
            <div class="item-receivables-line3">
              <!-- <span class="receivables-data">{{formatDay(item.paymentEndDate)}}</span> -->
              <span class="receivables-data">{{$utils.formatDay(item.paymentEndDate)}}</span>
            </div>
        </div>
      </li>
    </ul>
    <div v-if='tip' class="tip">暂无更多数据</div>

</div>
</template>

<script>
  import Divider from '@/components/Divider.vue'
    export default {
        components: {
          Divider,
        },
        props:['itemShow','acctList','tip'],
        computed: {},
        data() {
          return {
            // pageSize: 10, // 每页条数
            // pageIndex: 1, // 页码
            // receivesApplyList: [], // 请求数据
            // isDownLoading: false, // 下拉刷新
            // isUpLoading: false, // 上拉加载
            // upFinished: false, // 上拉加载完毕
            // offset: 100 // 滚动条与底部距离小于 offset 时触发load事件

          }
        },
        created() {
            //this.queryReceivesApplyList();
        },
        methods: {
          toDetail(item) {
            //this.$store.acctItem = item
            //this.$store.commit('setAcctItem',item)
            sessionStorage.setItem('acctItem',JSON.stringify(item))
            this.$router.push({
              path: this.$RM.ReceivablesDetail    
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
          addReceives(){
            this.$router.push({
              path: this.$RM.AddReceivables
            }) //
          },

        }
    }
</script>

<style scoped>
@import "../../css/common";

</style>
