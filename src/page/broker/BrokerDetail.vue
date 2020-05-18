<template>
  <div>
    <van-nav-bar
      class="bar"
      title="ABS基础资产信息"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <!--与顶部保持距离-->
      <div class='item'>
        <span class='item-left'>ABS批次号</span>
        <span class='item-right'>{{resData.ABSNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>客户名称</span>
        <span class='item-right'>{{resData.custName}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>保理合同号</span>
        <span class='item-right'>{{resData.contractNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>保理品种</span>
        <span class='item-right'>{{resData.businessType}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>基础资产类型</span>
        <span class='item-right'>{{resData.assetsType}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>基础资产净额（元）</span>
        <span class='item-right'>{{resData.assetsAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>融资金额（元）</span>
        <span class='item-right'>{{resData.loanAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>融资余额（元）</span>
        <span class='item-right'>{{resData.loanBal}}</span>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        nonet: false, //断网

        data:"",
        resData:{}, 
           
      }
    },
    created() {
        this.resData =JSON.parse(sessionStorage.getItem('brokerItem'))
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
