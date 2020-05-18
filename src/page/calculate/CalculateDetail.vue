<template>
  <div>
    <van-nav-bar
      class="bar"
      title="还款测算详情"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">

      <div class='item'>
        <span class='item-left'>合同编号</span>
        <span class='item-right flex1 word-break'>{{resData.contractNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>提款编号</span>
        <span class='item-right flex1 word-break'>{{resData.loanNo}}</span>
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
        <span class='item-left'>出账日</span>
        <span class='item-right'>{{$utils.formatDay(resData.loanDate)}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>融资期限</span>
        <span class='item-right'>{{resData.loanTerm}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>保理融资款（元）</span>
        <span class='item-right'>{{resData.factoringLoanAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>保理服务费（元）</span>
        <span class='item-right'>{{resData.factoringServiceFee}}</span>
      </div>

      <div class='item' v-if='resData.repaymentBreakAmt'>
        <span class='item-left'>提前还款违约金</span>
        <span class='item-right'>{{resData.repaymentBreakAmt}}</span>
      </div>

      <div class='item' v-if='resData.acctManagerAmt'>
        <span class='item-left'>账户管理费</span>
        <span class='item-right'>{{resData.acctManagerAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>还款总额（元）</span>
        <span class='item-right'>{{resData.repaymentTotalAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>项目经理</span>
        <span class='item-right'>{{resData.projectManager}}</span>
      </div>

    </div>
  </div>
</template>

<script>
  import LoginButton from '@/components/LoginButton.vue'
  export default {
    name: "CalculateDetail",
    components: {
      LoginButton
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网        
        id:"",
        resData:{},     
      }
    },
    created() {
        this.queryCalculateDetail();
    },
    methods: {
      //获取详情
      queryCalculateDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_CALCULATE_DETAIL;
          this.$http.post(url,{"loanNo": this.id})
              .then(function (res) {
                  this.resData = JSON.parse(res.data); 
                  //console.log(this.resData)               
              })
              .catch(function () {
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
              });
      },
    },

  }
</script>

<style scoped>
@import "../../css/common";
  .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .content {
    margin-top: 46px;
    position: relative;
  }
</style>
