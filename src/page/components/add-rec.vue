<template>
  <div>
    <ToolBar page_title="新增应收账款" :isWhile="false"> </ToolBar>

    <div class="content">
      <!--应收账款编号-->
      <div class='top'>
        <span class='inputLable'>应收账款编号</span>
        <input class='inputVal' type="text" ref="rAcctCode" v-model="vAcctCode" placeholder="请输入应收账款编号" />
        <img class='clearCss' v-show="false" @click="clear('vAcctCode')" src="../../assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>
      <!--付款人（买方）姓名-->
      <div class='top'>
        <span class='inputLable'>付款人（买方）姓名</span>
        <input class='inputVal' type="text" ref="rDraweeName" v-model="vDraweeName" placeholder="请输入姓名" />
        <img class='clearCss' v-show="false" @click="clear('vDraweeName')" src="../../assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!-- 引入组件 -->
      <new-affix :itemShow='true' :optDate='dataTypeOpt' :dataFileList='dataFileList'></new-affix>

      <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="saveData" borderRadius="6px"></LoginButton>
    </div>
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  import LoginButton from '@/components/LoginButton.vue'
  //import PopCont from './AddReceivablesPop'
  import NewAffix from '../components/new-affix'

  export default {
    components: {
      ToolBar,
      Divider,
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
        vPaymentEndDate: false,
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

        // vFileDesc:"",
        // vFileName:"",



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
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      },
      onConfirm1(date) {
        this.vPaymentEndDate = false;
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
            'paymentEndDate' : this.vPaymentEndDate ,
            'status' : this.vStatus ,
            'fileList' : this.dataFileList
        }
        console.log(acctList)
        this.$router.go(-1);


      },



    }

  }
</script>

<style scoped>
  .content {
    margin-top: 50px;
    position: relative;
    padding-bottom: 15px;
  }

  .item {
    padding: 8px;
    background-color: #FFC600;
    display: flex;
    text-align: center;
    flex-direction: column;
  }

  .item-box-dev {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 5px;
  }


  .item-line1 {
    letter-spacing: 1px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2 {
    letter-spacing: 1px;
    display: flex;
    padding-top: 5px;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2-div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .item-title {
    font-size: 17px;
    color: #ffffff;

  }

  .item-title2 {
    font-size: 17px;
    color: #ffffff;
  }

  .item-title3 {
    font-size: 17px;
    color: #ffffff;
  }

  .contract-name {
    color: #ffffff;
    font-weight: bolder;
    margin-left: 15px;
    font-size: 21px;
  }

  .contract-no {
    color: #ffffff;
    font-size: 14px;
  }

  .contract-amount {
    font-size: 15px;
    margin-left: 8px;
    color: #ffffff;
  }

  .top {
    display: flex;
    flex-direction: row;
    margin-left: 16px;
    margin-right: 16px;
    justify-content: space-between;
    /*background-color:burlywood;*/
    position: relative;
  }

  .dropdown {
    padding: 17px 0 10px;
  }



  .number {
    position: absolute;
    right: 0;
  }

  .inputLable {
    font-size: 0.4rem;
    line-height: 23px;
    border: none;
    padding:17px 0 10px;
  }

  .inputVal {
    font-size: 0.4rem;
    line-height: 23px;
    border: none;
    padding: 17px 0 10px;
    text-align: right;
  }

  .common {
    font-size: 0.4rem;
    line-height: 23px;
    border: none;
    padding: 17px 0 10px;
  }

  .clearCss {
    width: 10px;
    height: 10px;
    /*margin: 68px 30px 30px;*/
    position: absolute;
    right: 0px;
    top: 23px;
  }

  .add-img {
    width: 25px;
    height: 25px;
    margin-top: 15px;
  }
  .affix-lib {
    display: flex;
    align-items: center;
    justify-content: center;
     flex-direction: row;
    margin-left: 16px;
    margin-right: 16px;
    font-size: 15px;
    padding-bottom: 5px;
  }

  .affix-type {
      width: 30%;
  }

  .affix-name {
  width: 40%;
  }

  .affix-remark {
  width: 30%;
  }
</style>
