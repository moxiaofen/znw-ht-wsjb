<template>
  <div>
    <van-nav-bar
      class="bar"
      title="提款信息"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <div class='item'>
        <span class='item-left'>提款编号</span>
        <span class='item-right flex1 word-break'>{{resData.paymentNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>融资金额（元）</span>
        <span class='item-right'>{{resData.loanAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>融资余额（元）</span>
        <span class='item-right'>{{resData.loanBal}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>保理服务费率（%）</span>
        <span class='item-right'>{{resData.factoringServiceFeeRate}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>放款日期</span>
        <span class='item-right'>{{$utils.formatDay(resData.loanDate)}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>到期日期</span>
        <span class='item-right'>{{$utils.formatDay(resData.endDate)}}</span>
      </div>
   
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    computed: {},


    data() {
      return {

      }
    },
    created() {
        this.resData =JSON.parse(sessionStorage.getItem('paymentItem'))
    },
    methods: {
    },
  }
</script>

<style scoped>

@import "../../css/common";
  .content {
    margin-top: 46px;
    position: relative;
  }
    .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
</style>
