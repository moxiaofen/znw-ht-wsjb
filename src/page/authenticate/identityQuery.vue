<template>
<div>
  <van-nav-bar
    class="bar"
    title="身份认证查询"
    left-arrow
    fixed
    border='false'
    @click-left="$router.back(-1)"
  />
  <div class="content" >
    <p class="cont-item">查询条件</p>
    <div class='top'>
      <span class='common'>认证类型</span>
      <van-dropdown-menu active-color="#FFC600" class="dropdown" >
        <van-dropdown-item v-model="vAuthType" :options="authTypeOpt" @change="authTypeChange"/>
      </van-dropdown-menu>
    </div>
    <div class='top'>
      <span class='common'>证件类型</span>
      <van-dropdown-menu active-color="#FFC600" class="dropdown">
        <van-dropdown-item v-model="vIdType" :options="idTypeOpt" />
      </van-dropdown-menu>
    </div>
    <div class='top'>
      <span class='inputLable'>证件号码</span>
      <input  class='inputVal' type="text" ref="rIdNo" v-model="vIdNo"
              placeholder="请输入证件号码"/>
      <img class='clearCss' v-show="vIdNo" @click="clear('vIdNo')" src="../../assets/clear.png"/>
    </div>
    <p class="cont-item">查询结果</p>
    <div class='item'>
      <span class='item-left'>认证结果</span>
      <span class='item-right'>{{formatStatus(resData.authStatus)}}</span>
    </div>
    <p class="cont-item" v-if='resData.authStatus=="01"'>身份认证操作</p>
    <van-cell v-if='resData.authStatus=="01"' title="进行身份认证操作" is-link to="/authenticate/identityAct" />
    <!-- <div class='item'>
      <span class='item-left'>认证结果</span>
      <span class='item-right'>{{formatStatus(resData.authentication) }}</span>
    </div> -->


    <div class="btn-box-fix">
        <LoginButton name="查询" :isInputNonEmpty="enable" @click.native="search" borderRadius="6px"></LoginButton>
    </div>

  
  </div>
</div>
</template>

<script>
// avascript:(function () { var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload = function () { eruda.init() } })()

  import LoginButton from '@/components/LoginButton.vue'
    export default {
        name: "identity",
        components: {
          LoginButton,
        },
        computed: {},
        data() {
            return {
              nonet: false,//断网
              enable: true,//立即注册 按钮默认不可用
              check: false,//勾选请阅读并同意《免责说明》
              vAuthType: '02',
              authTypeOpt: [
                { text: '个人客户', value: "02" },
                { text: '企业客户', value: "01" }
              ],
              vIdType :'01',
              idTypeOpt : [
                  { text: '身份证', value: "01" },
                  { text: '护照', value: "02" },
                  { text: '港澳通行证', value: "03" }
              ],
              vIdNo : '', 
              resData:{}, 
 
            }
        },
        mounted(){
            // if(!sessionStorage.getItem('custNo')){
            //   this.$toast('请先登录');          
            //   return
            // }
            // this.enable = true


        },
        methods: {
          //清除输入框数据
          clear (str) {
            this[str] = ''
          },
          //提交
          search(){
              // //数据校验
              //身份认证
              if(this.vIdType == '01'){
                 if (!this.$utils.checkIdcard(this.vIdNo)) {
                    this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201021);
                    return 
                 } 
              }else if(this.vIdType == '02'){
                 if (!this.$utils.checkPassportNo(this.vIdNo)) {
                    this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201022);
                    return 
                 } 
              }else if(this.vIdType == '03'){
                 if (!this.$utils.checkHKMPassNo(this.vIdNo)) {
                    this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201023);
                    return 
                 } 
              }  
              //传过去的数据
              const data = {
                'custNo':sessionStorage.getItem('custNo'),
                "authType":this.vAuthType,
                "idType":this.vIdType,
                "idNo":this.vIdNo                        
              }
              this.enable = false ; //设置按钮不可用，防止重复点击
              const url = this.$api.ROOT +this.$Constants.QUERY_AUTHENTY_RESULT;
              this.$indicator.open("请稍候...");   
              this.$http.post(url,{'authentication':data})
                .then(function (res) {
                  this.resData =JSON.parse(res.data) ;
                  console.log(this.resData)
                  this.$indicator.close();
                  this.enable = true;
                  //假数据
                  //this.resData.authStatus='01'
                  
                })
                .catch(function (error) {
                  this.$indicator.close();
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
                  this.enable = true;
                });            
          },
          formatStatus(num){
              switch(num) {
                  case "00":
                      return '认证处理中'
                      break;
                  case "01":
                      return '认证未通过'
                      break;  
                  case "02":
                      return '认证通过'
                      break;              
                  default:
                    return ''
              } 

          }

        },

    }
</script>

<style scoped>
@import "../../css/common";

  .content {
    margin-top: 46px;
    position: relative;
  }
  .content input{
    text-align: right;
  }
  
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    padding: 0 16px;

  }
    .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .btn-box{
    padding: 15px;
    background-color: #fff;
  }
   .btn-box .loginButton{
    margin-top:1px;
  }
  .top-dropdown{
    padding: 0 16px 0 6px;
  } 

</style>
