<template>
  <div class="bg pb40">
    <header class="header" @click='onUseInfo'>
      <img class="logo" src="../../assets/logo.png" />
      <span class="name" v-if='loginFlag'>请登录</span>
      <span class="name" v-else>{{userInfo}}</span>
    </header>
    <ul class="gridBox">
      <li class="item" @click="toPage(grid.gridPage)"  v-for="(grid,index) in gridList" :key='index'>
        <img class="img" :src="grid.src" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==grid.gridPage}">{{grid.title}}</span></li>
    </ul>
    <ul class="cellBox" >
      <li class="cell" @click="toPage(cell.toKey)" v-for="cell in cellList"  :key='cell.toKey'>
        <img  :src="cell.src" >
        <span > {{cell.title}}</span>
      </li>   
    </ul>
    <ul class="cellBox" v-if="!loginFlag">
      <li class="loginout" @click="loginout">       
         退出登录
      </li>
    </ul>
  </div>
</template>

<script>
import { Dialog } from 'vant';

  export default {
    components: {Dialog },
    data() {
      return {
          gridList:[
            {
                gridPage : 2,
                src : require('../../assets/iv_repayment_icon.png'),
                title : "还款测算"
            },
            {
                gridPage : 3,
                src : require('../../assets/iv_parameter_icon.png'),
                title : "台账管理"
            },
            {
                gridPage : 4,
                src : require('../../assets/iv_financing_progress.png'),
                title : "融资进度"
            }
          ],
          cellList:[
             {
                toKey : 'authenticateId',
                src : require('../../assets/iv_shenfenrenzheng.png'),
                title : '身份认证查询'
             },
             {
                toKey : 'htcx',
                src : require('../../assets/iv_contract_search_icon.png'),
                title : '合同查询'
             },
             {
                toKey : 'zcxx',
                src : require('../../assets/iv_assets_icon.png'),
                title : 'ABS资产信息列表查询'
             },
             {
                toKey : 'zbl',
                src : require('../../assets/iv_refactors_icon.png'),
                title : '再保理资产信息列表查询'
             },
             {
                toKey : 'setting',
                src : require('../../assets/iv_setting_icon.png'),
                title : '设置'
             },
             {
                toKey : 'about',
                src : require('../../assets/iv_about_icon.png'),
                title : '关于我们'
             }
          ],
          userInfo:'',
          loginFlag:false,//判断登录状态
         
      };
    },
    computed: {
    },
    mounted(){
        if(!sessionStorage.getItem("loginSession")){
            this.loginFlag = true
        }else{
            //const loginSession = JSON.parse(sessionStorage.getItem("loginSession"));
            this.userInfo = sessionStorage.getItem("loginid") ;
            this.loginFlag = false
        }
    },
    methods: {
      onUseInfo() {
        if(!sessionStorage.getItem("loginSession")){
            this.loginFlag = true;
            this.$router.push({
              path: this.$RM.LoginPage
            })
        }
      },
      toPage(msg) {
        if ('authenticateId' == msg) {
          this.$router.push({
            path: this.$RM.AuthenticateId
          })
        }
        if ('setting' == msg) {
          this.$router.push({
            path: this.$RM.SettingPage
          })
        }

        if ('htcx' == msg) {
          this.$router.push({
            path: this.$RM.ContractPage
          })
        }
        if ('about' == msg) {
          this.$router.push({
            path: this.$RM.AboutPage
          })
        }
        if ('zcxx' == msg) {
          this.$router.push({
            path: this.$RM.BrokerProgress
          })
        }
        if ('zbl' == msg) {
          this.$router.push({
            path: this.$RM.RefactoringProgress
          })
        }       
        if ('4' == msg) {
          this.$router.push({
            path: this.$RM.FinancingProgress
          })
        }

        if ('2' == msg) {
          this.$router.push({
            path: this.$RM.CalculateList
          })
        }
        if ('3' == msg) {
          this.$router.push({
            path: this.$RM.LedgerList
          })
        }
      },
      //退出登录
      loginout(){
        //this.showLoginout = true; 
        Dialog.confirm({
          title: '消息提示',
          message: '是否确定退出在线供应链金融服务平台?'
        }).then(() => {
            //登录时，sessionStorage setItem了多少，退出登录时，removeItem了多少
            sessionStorage.removeItem('loginSession')
            sessionStorage.removeItem('custNo')
            sessionStorage.removeItem('userId')
            sessionStorage.removeItem('loginid')
            sessionStorage.removeItem('mobile')
            sessionStorage.removeItem('email')
            this.userInfo = ''
            this.loginFlag = true;
        }).catch(() => {
        });
        
      },

    }
 
  }
</script>


<style scoped>
@import "../../css/common";

  .header {
    display: flex;
    flex-direction: column;
    height: 160px;
    justify-content: center;
    align-items: center;
    background-color: #FFC600;

  }

  .logo {
    background-color: #fafafa;
    border-radius: 50%;
    border: 1px;
    border-color: #ffffff;
    height: auto;
    width: 120px;
  }

  .name {
    margin-top: 10px;
    color: white;
    font-size: 16px;
  }

  /* 重置的css */
  .gridBox{
       background-color: #ffffff;
  }

  .pb40{
    padding-bottom: 20px;
  }


</style>
