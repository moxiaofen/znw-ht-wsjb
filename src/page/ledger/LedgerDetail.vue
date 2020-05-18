<template>
  <div>
    <van-nav-bar
      class="bar"
      title="台账对账详情"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <!--与顶部保持距离-->
      <p class="cont-item">合同信息</p>
      <div>
        <div class='item'>
            <span class='item-left'>合同编号</span>
            <span class='item-right flex1 word-break'>{{resData.contractNo}}</span>
        </div>

        <div class='item'>
            <span class='item-left'>合同名称</span>
            <span class='item-right flex1 word-break'>{{resData.contractName}}</span>
        </div>

        <div class='item'>
            <span class='item-left'>签订日期</span>
            <span class='item-right'>{{$utils.formatDay(resData.signDate)}}</span>
        </div>

        <div class='item'>
            <span class='item-left'>融资金额（元）</span>
            <span class='item-right'>{{resData.loanAmt}}</span>
        </div>

      </div>

      <p class="cont-item">额度信息</p>
      <div>
        <div class='item'>
            <span class='item-left'>授信编号</span>
            <span class='item-right flex1 word-break'>{{resData.creditNo}}</span>
        </div>

        <div class='item'>
            <span class='item-left'>授信额度</span>
            <span class='item-right'>{{resData.creditLimitAmt}}</span>
        </div>

        <div class='item'>
            <span class='item-left'>额度生效日</span>
            <span class='item-right'>{{$utils.formatDay(resData.creditStartDate)}}</span>
        </div>

        <div class='item'>
            <span class='item-left'>剩余可用额度</span>
            <span class='item-right'>{{resData.creditLimitbal}}</span>
        </div>

        <div class='item'>
            <span class='item-left'>授信期限(月)</span>
            <span class='item-right'>{{resData.creditTerm}}</span>
        </div>

        <div class='item'>
            <span class='item-left'>是否可循环</span>
            <span class='item-right'>{{resData.loopFlag}}</span>
        </div>

      </div>
    
      <!-- 应收款清单列表 -->
      <acct-list :tip='tip' :itemShow='false' :acctList='acctList'></acct-list>

      <payment-list :tipPayment='tipPayment' :paymentList='paymentList'></payment-list>

      <repayment-list :tipRepayment='tipRepayment' :repaymentList='repaymentList'></repayment-list>

      <!-- <p class="cont-item">对账信息</p>
      <div> -->
        <!--对账结果-->
        <!-- <div class='item'>
            <span class='item-left'>对账结果</span>
            <van-dropdown-menu active-color="#FFC600" class="dropdown">
            <van-dropdown-item v-model="vCheckFlag" :options="checkFlagOpt" />
            </van-dropdown-menu>
        </div> -->
        <!--横线-->
        <!-- <Divider></Divider> -->

        <!--异议声明-->
        <!-- <div class='item'>
            <span class='item-left'>异议声明</span>
            <textarea class="item-right text-right" name="" id="" cols="32" rows="5"  v-model="vErrorDesc" placeholder="请输入异议声明" maxlength="100"></textarea>
        </div> -->
        <!--横线-->
        <!-- <Divider></Divider>

      </div> -->

      <!-- <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="submit" borderRadius="6px"></LoginButton> -->

    </div>
  </div>

</template>

<script>
  import LoginButton from '@/components/LoginButton.vue'
  import AcctList from '../components/acct-list'
  import PaymentList from '../components/payment-list'
  import RepaymentList from '../components/repayment-list'

  export default {
    name: "LedgerDetail",
    components: {
      LoginButton,
      AcctList,
      PaymentList,
      RepaymentList,
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        enable:true,
        id:"",
        resData:{},  
        acctList:[],
        paymentList:[],
        vCheckFlag:'1',
        // checkFlagOpt:[
        //     { text: '确认无误', value: "1" },
        //     { text: '确认有误', value: "2" }
        // ],
        // contractNo:'',//定义合同号，对账直接用
        tip:false,
        tipPayment:false,
        tipRepayment:false,
         
      }
    },
    created() {
        this.queryLedgerDetail();
    },
    methods: {
      //获取详情
      queryLedgerDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_LEDGER_DETAIL;
          //this.$http.post(url,{"contractNo": '001' })
          this.$http.post(url,{"contractNo": this.id})
              .then(function (res) {
                  this.resData = JSON.parse(res.data); 
                  console.log(this.resData) 
                  this.acctList = this.resData.acctList  
                   console.log(this.acctList)  
                  this.tip = (this.acctList.length<1) ? true:false;
                  this.paymentList = this.resData.paymentList 
                  this.tipPayment = (this.paymentList.length<1) ? true:false;
                  this.repaymentList = this.resData.repaymentList 
                  this.tipRepayment = (this.repaymentList.length<1) ? true:false;
                  //this.contractNo = this.resData.contractNo  
                                                
              })
              .catch(function () {
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
              });
      },
      //对账
      //submit(){
          // console.log(111)
          // console.log(this.contractNo,this.vCheckFlag,this.vErrorDesc)
          // const url = this.$api.ROOT + this.$Constants.LEDGER_CONFIRM;
          // this.$http.post(url,{"ledgerInfo":{"contractNo":this.contractNo,"checkFlag":this.vCheckFlag,"errorDesc":this.vErrorDesc}})
          //     .then(function (res) {
          //       console.log(res)
          //         if (JSON.parse(res.data).respCode === '000000') {
          //             this.$indicator.close();
          //             this.$toast("对账成功");
          //             this.$router.go(-1)
          //         } else {
          //             this.$indicator.close();
          //             this.$toast(res.data.msg);
          //             console.warn("对账失败!!!")
          //         }
          //     })
          //     .catch(function () {
          //         this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          //     });
      //}
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
