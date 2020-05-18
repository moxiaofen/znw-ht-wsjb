<template>
  <div>
    <van-nav-bar
      class="bar"
      title="新增应收账款"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content pb70">
      <!--应收账款编号-->
      <div class='top'>
        <span class='inputLable'>应收账款编号</span>
        <input class='inputVal' type="text" ref="rAcctCode" v-model="vAcctCode" placeholder="请输入应收账款编号" />
        <img class='clearCss' v-show="vAcctCode" @click="clear('vAcctCode')" src="../../assets/clear.png" />
      </div>

      <!--付款人（买方）姓名-->
      <div class='top'>
        <span class='inputLable'>付款人（买方）姓名</span>
        <input class='inputVal' type="text" ref="rDraweeName" v-model="vDraweeName" placeholder="请输入姓名" />
        <img class='clearCss' v-show="vDraweeName" @click="clear('vDraweeName')" src="../../assets/clear.png" />
      </div>

      <!--合同金额-->
      <div class='top'>
        <span class='inputLable'>合同金额(元)</span>
        <input class='inputVal' type="text" ref="rContractAmt" v-model="vContractAmt" placeholder="请输入合同金额" />
        <img class='clearCss' v-show="vContractAmt" @click="clear('vContractAmt')" src="../../assets/clear.png" />
      </div>

      <!--购销合同号-->
      <div class='top'>
        <span class='inputLable'>购销合同号</span>
        <input class='inputVal' type="text" ref="rTradeContractNo" v-model="vTradeContractNo" placeholder="请输入购销合同号" />
        <img class='clearCss' v-show="vTradeContractNo" @click="clear('vTradeContractNo')" src="../../assets/clear.png" />
      </div>

      <!--已付款金额-->
      <div class='top'>
        <span class='inputLable'>已付款金额(元)</span>
        <input class='inputVal' type="text" ref="rPaidAmt" v-model="vPaidAmt" placeholder="请输入已付款金额" />
        <img class='clearCss' v-show="vPaidAmt" @click="clear('vPaidAmt')" src="../../assets/clear.png" />
      </div>

      <!--发票号-->
      <div class='top'>
        <span class='inputLable'>发票号</span>
        <input class='inputVal' type="text" ref="rInvoiceNo" v-model="vInvoiceNo" placeholder="请输入发票号" />
        <img class='clearCss' v-show="vInvoiceNo" @click="clear('vInvoiceNo')" src="../../assets/clear.png" />
      </div>

      <!--佣金及折让金额-->
      <div class='top'>
        <span class='inputLable'>佣金及折让金额(元)</span>
        <input class='inputVal' type="text" ref="vAllowanceAmt" v-model="vAllowanceAmt" placeholder="请输入佣金及折让金额" />
        <img class='clearCss' v-show="vAllowanceAmt" @click="clear('vAllowanceAmt')" src="../../assets/clear.png" />
      </div>

      <!--应收账款金额-->
      <div class='top'>
        <span class='inputLable'>应收账款金额(元)</span>
        <input class='inputVal' type="text" ref="rAcctAmt" v-model="vAcctAmt" placeholder="请输入应收账款金额" />
        <img class='clearCss' v-show="vAcctAmt" @click="clear('vAcctAmt')" src="../../assets/clear.png" />
      </div>

      <!--应收账款余额-->
      <div class='top'>
        <span class='inputLable'>应收账款余额(元)</span>
        <input class='inputVal' type="text" ref="rAcctBal" v-model="vAcctBal" placeholder="请输入应收账款余额" />
        <img class='clearCss' v-show="vAcctBal" @click="clear('vAcctBal')" src="../../assets/clear.png" />
      </div>

      <!--预付款金额-->
      <div class='top'>
        <span class='inputLable'>预付款金额(元)</span>
        <input class='inputVal' type="text" ref="rAdvanceAmt" v-model="vAdvanceAmt" placeholder="请输入预付款金额" />
        <img class='clearCss' v-show="vAdvanceAmt" @click="clear('vAdvanceAmt')" src="../../assets/clear.png" />
      </div>

      <!--付款账号-->
      <div class='top'>
        <span class='inputLable'>付款账号</span>
        <input class='inputVal' type="text" ref="rPaymentAcctNo" v-model="vPaymentAcctNo" placeholder="付款账号" />
        <img class='clearCss' v-show="vPaymentAcctNo" @click="clear('vPaymentAcctNo')" src="../../assets/clear.png" />
      </div>

      <!--合同付款方式-->
      <div class='top'>
        <span class='common'>合同付款方式</span>
        <van-dropdown-menu active-color="#FFC600" class="dropdown">
          <van-dropdown-item v-model="vContractPayType" :options="contractPayTypeOpt" />
        </van-dropdown-menu>
      </div>

      <!--付款到期日期-->
      <div class='top'>
        <span class='common' >付款到期日期</span>
        <span  class='inputVal' @click="show1 = true" >{{date1}}</span>
           <van-calendar v-model="show1" @confirm="onConfirm1"  :show-confirm="false"/>
      </div>

      <!--应收账款付款日期-->
      <!-- <div class='top'>
        <span class='common' >应收账款付款日期</span>
        <span  class='inputVal' @click="show2 = true" >{{date2}}</span>
           <van-calendar v-model="show2" @confirm="onConfirm2"  :show-confirm="false"/>
      </div> -->

      <!--备注-->
      <div class='top'>
        <span class='inputLable'>备注</span>
        <textarea  class='inputVal' name="" id="" cols="32" rows="4" ref="rRemark" v-model="vRemark" placeholder="请输入备注" ></textarea>
        <img class='clearCss' v-show="vRemark" @click="clear('vRemark')" src="../../assets/clear.png" />
      </div>

      <!-- 引入组件 -->
      <new-affix :itemShow='true' :optDate='dataTypeOpt' :dataFileList='dataFileList'></new-affix>

      <div class="btn-box-fix">
         <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="saveData" borderRadius="6px"></LoginButton>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginButton from '@/components/LoginButton.vue'
  import NewAffix from '../components/new-affix'

  export default {
    components: {
      LoginButton,
      NewAffix
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        enable: true, //立即注册 按钮默认不可用

        date1: '请选择',
        //date2: '请选择',
        show1: false,
        //show2:false,
        show: false,//测试时为true
        popShow : true ,
        fileList: [],
        vContractPayType:"01",//合同付款方式
        contractPayTypeOpt:[
            {
              text: '现金支付',
              value: "01"
            },
            {
              text: '票据支付',
              value: "02"
            },
            {
              text: '电汇支付',
              value: "03"
            }
        ],
        vAcctCode : '',
        vDraweeName : '',
        vTradeContractNo : '',
        vContractAmt : '',
        vInvoiceNo : '',
        vPaidAmt : '',
        vAdvanceAmt : '',
        vAllowanceAmt : '',
        vAcctAmt : '',
        vAcctBal : '',
        //vContractPayType : '',
        vPaymentAcctNo : '',
        //vPaymentEndDate : '',
        vStatus : '',

        //vDataType : "",//资料类型
        dataTypeOpt:[
          {
            text: '合同',
            value: "01"
          },
          {
            text: '发票',
            value: "02"
          },
          {
            text: '出库单',
            value: "03"
          },
          {
            text: '货运单',
            value: "04"
          },
          {
            text: '提货单',
            value: "05"
          },
          {
            text: '仓单',
            value: "06"
          },
          {
            text: '质检单',
            value: "07"
          },
          {
            text: '中登网查询证明',
            value: "08"
          },
          {
            text: '中登网登记证明',
            value: "09"
          }
        ],
        dataFileList:[],//附件
        dateTime:'',
      }
    },
    created(){
        this.vDataType = this.dataTypeOpt[0].value;
    },
    methods: {
      //清除输入框数据
      clear(str) {       
          this[str] = '';  
      },
      formatDate(date) {
        var month = date.getMonth() + 1
        if(month<10){
          month =''+'0'+month
        }
        this.dateTime=`${date.getFullYear()}${month}${date.getDate()}`
        console.log(this.dateTime)
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      },
      onConfirm1(date) {
        this.show1 = false;
        this.date1 = this.formatDate(date);

      },
      // onConfirm2(date) {
      //   this.show2 = false;
      //   this.date2 = this.formatDate(date);

      // },
      //存数据
      saveData(){
        var acctList = {};
        acctList = {            
            'acctCode': this.vAcctCode ,
            'draweeName' : this.vDraweeName ,
            //'draweeName' : '深圳市有棵树电子商务有限公司' ,
            'tradeContractNo' : this.vTradeContractNo ,
            'contractAmt' : this.vContractAmt ,
            'invoiceNo' : this.vInvoiceNo ,
            'paidAmt' : this.vPaidAmt ,
            'advanceAmt' : this.vAdvanceAmt ,
            'allowanceAmt' : this.vAllowanceAmt ,
            'acctAmt' : this.vAcctAmt ,
            'acctBal' : this.vAcctBal ,
            'contractPayType' : this.vContractPayType ,
            'paymentAcctNo' : this.vPaymentAcctNo ,
            'paymentEndDate' : this.dateTime,
            'remark' : this.vRemark ,
            'fileList' : this.dataFileList
        }
        console.log(acctList)
        if(sessionStorage.getItem('addReceivales')=='0'){//从应收账款转让跳转过来的
          this.$store.state.addReceivablesApplyList.push(acctList) ;
          this.$router.go(-1);
        }else{
          //sessionStorage.setItem('FianancingApplyTypt',1)
          this.$store.state.addReceivablesList.push(acctList) ;
          this.$router.go(-1);
        }
      },
    }
  }
</script>

<style scoped>
@import "../../css/common";
  .content {
    margin-top: 46px;
    position: relative;
    padding-bottom: 15px;
  }
  .pb70{
    padding-bottom: 70px;
  }
</style>
