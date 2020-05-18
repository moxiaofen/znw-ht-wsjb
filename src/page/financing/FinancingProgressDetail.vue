<template>
  <div>
    <van-nav-bar
      class="bar"
      title="融资申请进度详情"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <!--与顶部保持距离-->
      <div class='item'>
        <span class='item-left'>融资申请编号</span>
        <span class='item-right flex1 word-break'>{{resData.applyNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>产品名称</span>
        <span class='item-right flex1 word-break'>{{resData.projectName}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>保理合同编号</span>
        <span class='item-right flex1 word-break'>{{resData.creditContractNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>授信总额度</span>
        <span class='item-right'>{{resData.creditLimitAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>剩余授信额度</span>
        <span class='item-right'>{{resData.creditlimitBal}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>最大可融资金额</span>
        <span class='item-right'>{{resData.loanAmtMax}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>本次融资申请金额</span>
        <span class='item-right'>{{resData.applyAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>初始保证金金额</span>
        <span class='item-right'>{{resData.bondAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>申请日期</span>
        <span class='item-right'>{{$utils.formatDay(resData.applyDate)}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>融资期限（天）</span>
        <span class='item-right'>{{resData.loanTerm}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>回款账号</span>
        <span class='item-right flex1 word-break'>{{resData.backAcctNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>审批状态</span>
        <span class='item-right'>{{resData.approveStatus}}</span>
      </div>
      <!-- 应收款清单列表 -->
      <acct-list :tip='tip' :itemShow='false' :acctList='acctList'></acct-list>

    </div>
  </div>
</template>

<script>
  import LoginButton from '@/components/LoginButton.vue'
  import AcctList from '../components/acct-list'
  export default {
    name: "FinancingProgressDetail",
    components: {
      LoginButton,
      AcctList
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        id:"",
        resData:{}, 
        acctList:[],
        tip:false,
      }
    },
    created() {
        this.queryFinancingDetail();
    },
    methods: {
      //获取详情---待处理，后台返回的数据格式有误
      queryFinancingDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_FINANCING_DETAIL;
          this.$http.post(url,{"applyNo": this.id})
          //this.$http.post(url,{"applyNo": 'LA2019082000000255'})
              .then(function (res) {
                  const data = JSON.parse(res.data);
                  this.resData = JSON.parse(data);        
                  this.acctList = this.resData.acctList ; 
                  this.tip = (this.acctList.length<1) ? true:false;         
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
  .content {
    margin-top: 46px;
    position: relative;
  }
  .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .content {
    margin-top: 50px;
    position: relative;
  }

</style>
