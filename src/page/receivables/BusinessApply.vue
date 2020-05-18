<template>
  <div>
    <van-nav-bar
      class="bar"
      title="业务申请"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />

    <div class="content">
     <div class="item">
        <span class="hide">{{routeData.projectType}}</span>
        <div class=" item-line1">
          <div>
            <span class="contract-name">{{routeData.projectName}}</span>
            <span class="contract-no">{{routeData.projectNo}}</span>
          </div>
        </div>
        <div class="item-line2">
          <div class="item-line2-div">
            <div class="item-box-dev">
              <span class="item-title">授信总额度</span>
            </div>
            <span class="item-title2">{{routeData.creditLimitAmt}}</span>
          </div>

          <div class="item-line2-div">
            <div class="item-box-dev">
              <span class="item-title">剩余额度</span>
            </div>
            <span class="item-title3">{{routeData.creditlimitBal}}</span>
          </div>
        </div>
      </div>

      <!--本次融资申请金额-->
      <div class='top'>
        <span class='inputLable'>本次融资申请金额</span>
        <input class='inputVal' type="text" ref="rApplyAmt" v-model="vApplyAmt" placeholder="请输入融资金额" />
        <img class='clearCss' v-show="vApplyAmt" @click="clear('vApplyAmt')" src="../../assets/clear.png" />
      </div>

      <!--最大可融资金额-->
      <div class='top'>
        <span class='inputLable'>最大可融资金额</span>
        <input class='inputVal' type="text" ref="rAmt" v-model="vAmt" placeholder="" readonly/>   
      </div>

      <!--融资比例-->
      <div class='top'>
        <span class='inputLable'>融资比例</span>
        <input class='inputVal' type="text" ref="rPercentage" v-model="vPercentage" placeholder="" value=" 90%" readonly/>     
      </div>

      <!--初始保证金金额-->
      <div class='top'>
        <span class='inputLable'>初始保证金金额</span>
        <input class='inputVal' type="text" ref="rBondAmt" v-model="vBondAmt" placeholder="请输入初始保证金金额" />
        <img class='clearCss' v-show="vBondAmt" @click="clear('vBondAmt')" src="../../assets/clear.png" />
      </div>

      <!--放款账号-->
      <div class='top'>
        <span class='inputLable'>放款账号</span>
        <input class='inputVal' type="text" ref="rPaymentAcctNo" v-model="vPaymentAcctNo" placeholder="请输入放款账号" />
        <img class='clearCss' v-show="vPaymentAcctNo" @click="clear('vPaymentAcctNo')" src="../../assets/clear.png" />
      </div>

      <!--授信合同编号-->
      <div class='top'>
        <span class='inputLable'>授信合同编号</span>
        <input class='inputVal' type="text" ref="rCreditContractNo" v-model="vCreditContractNo" placeholder="请输入授信合同编号" />
        <img class='clearCss' v-show="vCreditContractNo" @click="clear('vCreditContractNo')" src="../../assets/clear.png" />
      </div>
      
      <!--回款账号-->
      <div class='top'>
        <span class='inputLable'>回款账号</span>
        <input class='inputVal' type="text" ref="rBackAcctNo" v-model="vBackAcctNo" placeholder="请输入回款账号" />
        <img class='clearCss' v-show="vBackAcctNo" @click="clear('vBackAcctNo')" src="../../assets/clear.png" />
      </div>

      <!--融资期限-->
      <div class='top'>
        <span class='inputLable'>融资期限（天）</span>
        <input class='inputVal' type="text" ref="rLoanTerm" v-model="vLoanTerm" placeholder="请输入回款账号" />
        <img class='clearCss' v-show="false" @click="clear('vLoanTerm')" src="../../assets/clear.png" />
      </div>

      <!--申请日期-->
      <div class='top'>
        <span class='common' >申请日期  </span>
        <span  class='inputVal' @click="showApplyDate = true" >{{dateApplyDate}}</span>
           <van-calendar v-model="showApplyDate" @confirm="onConfirm"  :show-confirm="false"/>
      </div>

      <div class='top'>
        <span class='common'>保理模型</span>
        <van-dropdown-menu active-color="#FFC600" class="dropdown">
          <van-dropdown-item v-model="vFactoringProdType" :options="factoringProdTypeOpt" />
        </van-dropdown-menu>
      </div>

      <!-- 应收款清单列表 -->
      <add-receivables-list :itemShow='true' :receivablesList='receivablesList'></add-receivables-list>

      <div class="btn-box-fix">
        <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="submit" borderRadius="6px"></LoginButton>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginButton from '@/components/LoginButton.vue'
  import AddReceivablesList from '../components/add-receivables-list'

  export default {
    name: "FianancingApply",
    components: {
      LoginButton,
      AddReceivablesList
    },
    data() {
      return {
        nonet: false, //断网
        enable: true, //立即注册 按钮默认不可用

        receivablesList:[],//跳转页面的数据
        routeData:{},
        vApplyAmt :'',
        vBondAmt :'',
        vBackAcctNo :'',
        vLoanTerm :'',
        vFactoringProdType :'01',
        factoringProdTypeOpt:[
            {
              text: '正向保理',
              value: '01'
            },
            {
              text: '反向保理',
              value: '02'
            } 
        ],
        vPaymentAcctNo:'',
        showApplyDate:false,
        dateApplyDate:'请选择',
        dateTime:'',
        vPercentage : '90%' ,
        vAmt:'',

      }
    },
    mounted() {
        //this.getRouteDate();
        if(!sessionStorage.getItem('custNo')){
          this.$toast('请先登录');          
          return
        }
        this.routeData =JSON.parse(sessionStorage.getItem('FianancingApply'))
        sessionStorage.setItem('addReceivales',1) //不是从应收账款跳转过去的
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
      onConfirm(data) {
        this.showApplyDate = false;
        this.dateApplyDate = this.formatDate(data);
      },
      submit(){
          //上传数据
          const url = this.$api.ROOT + this.$Constants.APP_FINANCING_APPLY;
          const data = {
              'custNo' : sessionStorage.getItem('custNo'),
              'type' : this.routeData.projectType,
              'projectNo' : this.routeData.projectNo ,
              'applyDate' : this.dateTime ,
              'applyAmt' : this.vApplyAmt ,
              'loanTerm' : this.vLoanTerm ,
              'bondAmt' : this.vBondAmt ,
              'backAcctNo' : this.vBackAcctNo ,
              'paymentAcctNo' : this.vPaymentAcctNo ,
              'creditContractNo' : this.creditContractNo ,
              'factoringProdType' : this.vFactoringProdType ,
              'acctList' : this.$store.state.addReceivablesList	            
          };
          //console.log(data)
          this.$http.post(url,{"factoringApply":data})
          .then(function (res) {   
              const resDate = JSON.parse(JSON.parse(res.data));
              //console.log(resDate )   
              if (resDate.respCode === '000000') {
                  this.$store.state.addReceivablesList = [];	 
                  this.$indicator.close();
                  this.$toast("融资申请成功！");
                  this.$router.go(-1)
                } else {
                  this.$indicator.close();
                  this.$toast(resDate.respMsg);
                  //console.warn("融资申请失败!!!")
              }
          })
          .catch(function () {
             this.$indicator.close();
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
      }
    },    
    watch: {
        vApplyAmt(){
            this.vAmt = parseFloat(this.vPercentage)*parseFloat(this.vApplyAmt)/100
        }
    }

  }
</script>

<style scoped>
@import "../../css/common";
  .content {
    margin-top: 46px;
    position: relative;
    padding-bottom: 15px;
    margin-bottom: 70px;
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
    margin-left:15px;
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
 
  
</style>
