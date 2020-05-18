<template>
<div>
 
    <div class='cont-sides'>
        <p class="cont-item">提款信息      
        </p>
    </div>
    <ul class="bgcf">
      <li v-for="(item,index) in paymentList" :key='index' @click="toDetail(item)">
        <div class="receivables-lib">
            <div class=" item-receivables-line1">
              <div>
                <p class="receivables-name ell2 word-break">{{item.paymentNo}}</p>
                <p class="receivables-no">{{item.loanAmt}}</p>
              </div>
            </div>

            <div class="item-receivables-line2">
              <span class="receivables-amount">{{item.loanDate}}</span>
            </div>
            <div class="item-receivables-line3">
              <!-- <span class="receivables-data">{{formatDay(item.paymentEndDate)}}</span> -->
              <span class="receivables-data">{{item.paymentEndDate}}</span>
            </div>
        </div>
      </li>
    </ul>
    <div v-if='tipPayment' class="tip">暂无更多数据</div>

</div>
</template>

<script>
  // import Divider from '@/components/Divider.vue'
    export default {
        components: {
         // Divider,
        },
        props:['paymentList','tipPayment'],
        computed: {},
        data() {
          return {


          }
        },
        created() {
        
        },
        methods: {
          // toDetail(num) {
          //   this.$router.push({
          //     path: this.$RM.ReceivablesDetail,
          //     query:{id: num}        
          //   })
          // },
          toDetail(item) {
            //this.$store.paymentItem = item
            //this.$store.commit('setPaymentItem',item)
            sessionStorage.setItem('paymentItem',JSON.stringify(item))
            this.$router.push({
              path: this.$RM.LedgerPayment    
            })
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


  /* .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between; 

    position: relative;
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

  .receivables-lib {

    border-bottom: 1px solid #000;
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


</style>
