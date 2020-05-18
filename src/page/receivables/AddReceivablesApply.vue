<template>
  <div>
    <van-nav-bar
      class="bar"
      title="应收账款转让申请"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">

      <!--本次申请转让笔数-->
      <div class='top'>
        <span class='inputLable'>本次申请转让笔数</span>
        <input class='inputVal' type="text" ref="rTransferCount" v-model="vTransferCount" placeholder="请输入本次申请转让笔数" />
        <img class='clearCss' v-show="vTransferCount" @click="clear('vTransferCount')" src="../../assets/clear.png" />
      </div>

      <!--本次申请转让总金额-->
      <div class='top'>
        <span class='inputLable'>本次申请转让总金额(元)</span>
        <input class='inputVal' type="text" ref="rTransferAmt" v-model="vTransferAmt" placeholder="请输入本次申请转让总金额" />
        <img class='clearCss clearCss2' v-show="vTransferAmt" @click="clear('vTransferAmt')" src="../../assets/clear.png" />
      </div>

      <!--申请日期-->
      <div class='top'>
        <span class='common' >申请日期</span>
        <span  class='inputVal' @click="show1 = true" >{{date1}}</span>
           <van-calendar v-model="show1" @confirm="onConfirm1"  :show-confirm="false"/>
      </div>

      <!-- 引入组件 -->
      <add-receivables-list :itemShow='itemShow' :receivablesList='receivablesList'></add-receivables-list>

      <!-- 新增 -->
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
    components: {
      LoginButton,
      AddReceivablesList
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        enable: true, //立即注册 按钮默认不可用
        vTransferCount :'',
        vTransferAmt :'',
        date1: '请选择',
        show1: false,
        itemShow:true,
        receivablesList:[],
        creditContractNo:'',

      }
    },
    created(){
        if(!sessionStorage.getItem('custNo')){
          this.$toast('请先登录');          
          return
        }
        sessionStorage.setItem('addReceivales',0) //从应收账款跳转过去的
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

      //存数据
      submit(){
          //console.log('提交')
          //console.log(this.dateTime )
          this.creditContractNo = this.$route.query.id;
          //上传数据
          const url = this.$api.ROOT + this.$Constants.ADD_RECEIVABLES_APPLY;
          const data = {
              'creditContractNo' : this.creditContractNo ,
              'transferCount' : this.vTransferCount,
              'transferAmt' : this.vTransferAmt ,
              'applyDate' : this.dateTime ,
              'accountList' : this.$store.state.addReceivablesApplyList	            
          };
          //console.log(data)
          this.$http.post(url,{'custNo' :sessionStorage.getItem('custNo'),"fncInttApply":data})
          .then(function (res) {   
              //console.log(res)
              const resDate = JSON.parse(res.data);
              //console.log(resDate )   
              if (resDate.respCode === '000000') {
                  this.$store.state.addReceivablesApplyList = [];	 
                  this.$indicator.close();
                  this.$toast("应收账款转让申请成功！");
                  this.$router.go(-1)
              } else {
                  this.$indicator.close();
                  this.$toast(resDate.respMsg);
                  //console.warn("应收账款转让申请失败!!!")
              }
          })
          .catch(function () {
             //console.log('error')
             this.$indicator.close();
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
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
  .clearCss2 {
    top: 29px;
  }
</style>
