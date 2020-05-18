<template>
  <div>
    <van-nav-bar
      class="bar"
      title="回款信息"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <div class='item'>
        <span class='item-left'>入账流水号</span>
        <span class='item-right flex1 word-break'>{{resData.repaymentNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>回款金额（元）</span>
        <span class='item-right'>{{resData.repaymentAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>核销融资款（元）</span>
        <span class='item-right'>{{resData.canLoanAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>核销费用（元）</span>
        <span class='item-right'>{{resData.canFeeAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>回款日期</span>
        <span class='item-right'>{{$utils.formatDay(resData.repaymentDate)}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>退款金额（元）</span>
        <span class='item-right'>{{resData.backAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>退款日期</span>
        <span class='item-right'>{{$utils.formatDay(resData.backDate)}}</span>
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
        this.resData =JSON.parse(sessionStorage.getItem('repaymentItem'))     
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
