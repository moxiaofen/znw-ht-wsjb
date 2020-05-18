<template>
  <div>
    <van-nav-bar
      class="bar"
      title="再保理基础资产信息"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <!--与顶部保持距离-->
      <div class='item'>
        <span class='item-left'>客户名称</span>
        <span class='item-right flex1  word-break' >{{resData.custName}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>保理合同号</span>
        <span class='item-right flex1 word-break'>{{resData.contractNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>合同生效日</span>
        <span class='item-right' >{{$utils.formatDay(resData.contractStartDate)}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>合同到日期</span>
        <span class='item-right' >{{$utils.formatDay(resData.contractEndDate)}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>应收账款金额（元）</span>
        <span class='item-right' >{{resData.acctAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>应收账款余额（元）</span>
        <span class='item-right' >{{resData.acctBal}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>融资比例（%）</span>
        <span class='item-right' >{{resData.loanRate}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>融资金额（元）</span>
        <span class='item-right' >{{resData.loanBal}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>融资余额（元）</span>
        <span class='item-right' >{{resData.status}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>状态</span>
        <span class='item-right' >{{resData.loanAmt}}</span>
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
        nonet: false, //断网
        resData:{},   
      }
    },   
    created() {
        this.resData =JSON.parse(sessionStorage.getItem('refactoringItem'))
    },
    methods: {     
    },

  }
</script>

<style scoped>
@import "../../css/common";
  .content {
    margin-top: 46px;
  }
    .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
</style>
