<template>
  <div>
    <!-- <ToolBar page_title="应收账款详细信息" :isWhile="false"></ToolBar> -->
    <van-nav-bar
      class="bar"
      title="应收账款详细信息"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <div class='item'>
        <span class='item-left'>付款人（买方）姓名</span>
        <span class='item-right flex1'>{{resData.draweeName}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>合同金额</span>
        <span class='item-right'>{{resData.contractAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>购销合同号</span>
        <span class='item-right flex1 word-break'>{{resData.tradeContractNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>已付款金额</span>
        <span class='item-right'>{{resData.paidAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>发票号</span>
        <span class='item-right flex1 word-break'>{{resData.invoiceNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>佣金及折让金额</span>
        <span class='item-right'>{{resData.allowanceAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>应收账款金额</span>
        <span class='item-right'>{{resData.acctAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>应收账款余额</span>
        <span class='item-right'>{{resData.acctBal}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>预付款金额</span>
        <span class='item-right'>{{resData.advanceAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>付款账号</span>
        <span class='item-right flex1 word-break'>{{resData.paymentAcctNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>合同付款方式</span>
        <span class='item-right'>{{resData.contractPayType}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>付款到期日</span>
        <span class='item-right'>{{$utils.formatDay(resData.paymentEndDate)}}</span>
      </div>
      
      <div class='item'>
        <span class='item-left'>凭证状态</span>
        <span class='item-right'>{{formatStatus(resData.status)}}</span>
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

        id:"",
        resData:{}, 
      }
    },
    created() {
        this.queryReceivablesDetail();
    },
    methods: {
      //获取详情
      queryReceivablesDetail() {
          this.id = this.$route.query.id;
          const type = this.$route.query.type;
          if(type!='new'){
              this.resData = JSON.parse(sessionStorage.getItem('acctItem'));
          }else{
              const url = this.$api.ROOT + this.$Constants.QUERY_RECEIVABLES_DETAIL;
              this.$http.post(url,{"acctCode": this.id})
              //this.$http.post(url,{"acctCode": "AARI2019061100000141"})//有数据
                  .then(function (res) {
                      this.resData = JSON.parse(res.data); 
                      console.log(this.resData)               
                  })
                  .catch(function () {
                      this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
                  });
          }
      },
      formatStatus(num){
        switch(num) {
            case "00":
                return "未提交";
                break;
            case "01":
                return "审批中";
                break;
            case "02":
                return "退回修改";
                break;
            case "03":
                return "已通过";
                break;
            default:
              return "已否决"
        } 
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
