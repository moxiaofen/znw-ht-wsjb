<!--登录的页面-->
<template>

  <div class="bgc">
    <ToolBar page_title="登录" :isWhile="true" imgUrl="static/assets/icon_black_back.png"> </ToolBar>

    <div class="content">
      <div class="top">
        <!--绑定头部图片-->
        <img class='img ' alt="欢迎光临" :src=" logo ">
      </div>
      <div class="flex_space marginT40">
        <input class='login' type="text" ref="rUserPhone" v-model="vUserphone"
               min="0" inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number"
               placeholder="请输入手机号或用户名" @change="checkUserPhone">

        <img class='clearCss' v-show="vUserphone" @click="clearPhone()" src="../../assets/clear.png"/>
      </div>
      <Divider></Divider>
      <div class='flex_space '>
        <input class='password' type="text" ref="rUserPwd" v-model="vUserPwd" @change="checkInputPwd"
               placeholder="请输入密码" v-if="ifSetDisplay" />
        <input class='password' type="password" ref="rUserPwd" v-model="vUserPwd" @change="checkInputPwd"
               placeholder="请输入密码" v-else oninput="if(value.length>12)value=value.slice(0,12)"/>


        <img class='clearCss' v-show="vUserPwd" @click="clearPwd()" src="../../assets/clear.png"/>

        <img v-show="!ifSetDisplay" @click="ifSetDisplay=!ifSetDisplay" class="eye" src="../../assets/eye_close.png"/>
        <img v-show="ifSetDisplay" @click="ifSetDisplay=!ifSetDisplay" class="eye" src="../../assets/eye_open.png"/>

      </div>
      <Divider></Divider>
      <LoginButton name="登录" :isInputNonEmpty="enable" @click.native="toLogin"></LoginButton>
      <div class='tips'>
        <span @click="toRegister">手机快速注册</span>
        <span @click="toForgetPwd">忘记密码</span>
        <!--<span style="color: #fff" @click="kingCode">金手指</span>-->
      </div>
    </div>
  </div>

</template>

<script>
  import Divider from '@/components/Divider.vue'
  import ToolBar from '@/components/ToolBar2.vue'
  import LoginButton from '@/components/LoginButton.vue'
  import Encrypt from '../../api/encrypt.js'
  var count = 0;//数字密码计数
  export default {
    components: {ToolBar, Divider, LoginButton},
    data () {
      return {
        enable: false,//发送验证码 按钮默认不可用
        logo: require('../../assets/head_potraits.png'),
        vUserPwd: "",//密码输入框的值
        vUserphone: '',//手机输入框的值
        ifDisplay: false,//显示隐藏
        ifSetDisplay: false
      }
    },

    mounted(){
      let cacheUserPhone = sessionStorage.getItem("inputPhone");
      //如果登陆的手机号有缓存，显示出来
      if (!this.$StringUtils.isEmpty(cacheUserPhone)) {
        this.vUserphone = cacheUserPhone;
        console.info("用户在上一次登陆的缓存手机号>>>" + cacheUserPhone)
      }

    },

    methods: {
      //校验校验手机号码
      checkUserPhone () {
        if (!this.$utils.checkPhone(this.vUserphone)) {
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
        }  
      },
      //校验输入的密码
      checkInputPwd () {
        if (!this.$utils.checkPwd(this.vUserPwd)) {
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.PWDINPUTERROR);
        }  
      },

      //清除密码输入框数据
      clearPwd () {
        this.vUserPwd = '';
      },
      //清除手机号输入框数据
      clearPhone () {
        this.vUserphone = '';
      },
      test () {
        console.log('测试函数>>>>66666666 ')
      },
      //数字密码输入超过5次不正确，弹出提示框
      showResetPwd(){
        this.$dialog.alert("   ", that.$ERRCODE.STATIC_ERRORCDDE.LOGIN_PWD_ERROR_5);
        //还有给后台数据的 逻辑，判断怎么锁定用户

      },


      toForgetPwd(){
        console.info("跳转去忘记密码的页面>>>>");
        this.$router.push({name: this.$RM.ForgetPwdPage, params: {phone: this.vUserphone}})

      },
      toRegister(){

        this.$router.replace({path:this.$RM.RegisterPage})
      },

      //登录的表单
      toLogin() {
          sessionStorage.removeItem("cacheInputPhone");
          sessionStorage.setItem("cacheInputPhone", this.vUserphone)//提供给忘记密码用
          sessionStorage.setItem("inputPhone", this.vUserphone);
          var encStr = Encrypt.msg_md5(this.vUserPwd).toString();      
          console.info('手机号>>>' + this.vUserphone + '>>>密码>>>' + encStr);
          //开始请求登录接口
          const url = this.$api.ROOT + this.$Constants.APP_LOGIN;
          this.$indicator.open("请稍候...");
          this.$http.post(url,{"loginid": this.vUserphone, "password": encStr})
            .then(function (res) {
             console.log(res);
             console.log(res.data.respCode)
            if (res.data.respCode === '000000') {
              //缓存数据
              var token = res.data ;
              console.log(token)
               sessionStorage.setItem("loginSession",JSON.stringify(token));
               sessionStorage.setItem("custNo",token.custNo);
                this.$indicator.close();
                console.info("登陆成功>>>>");
                this.$router.go(-1)
              } else {
               this.$indicator.close();
               this.$toast(res.data.respMsg);
                console.warn("登陆失败!!!")
             }
            })
          .catch(function () {
            this.$indicator.close();
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });
         console.info('>>>>>>>>登录>>>>end>>>>>>>>')
      },
    },
    watch: {
      //监听这两个值的改变，一改变样式也相对改变
      vUserphone: {
        handler(){
          if (this.vUserPwd != null && this.vUserPwd != "" && this.vUserphone != null && this.vUserphone != "") {
            this.enable = true//按钮可用
          }
          if (this.vUserphone == null || this.vUserphone == "") {
            this.enable = false//按钮不可用
          }
        }
      },
      vUserPwd: {
        handler(){
          if (this.vUserPwd != null && this.vUserPwd != "" && this.vUserphone != null && this.vUserphone != "") {
            this.enable = true//按钮可用
          }
          if (this.vUserPwd == null || this.vUserPwd == "") {
            this.enable = false//按钮不可用
          }
        }
      }
    }
  }

</script>
<style scoped>
  .top {
    display: flex;
    margin-top: 100px;
    justify-content: center;
  }



  .content {
    margin-top: 160px;
    color: #4F4F55;
    padding: 0 50px;
  }

  .img {
    width: 120px;
    height: 120px;
    margin: auto;
  }

  .tips {
    letter-spacing: 2px;
    color: #c9c9c9;
    margin-top: 42px;
    margin-bottom: 100px;
    font-size: 24px;
    display: flex;
   justify-content: space-between;
    flex-direction: row;
  }

  .eye {
    width: 29px;
    height: 21px;
    margin: 68px 27px 30px;
  }

  input {
    font-size: 30px;
    border: 0;
  }

  .login {
    padding-top: 54px;
    padding-bottom: 21px;
    flex-grow: 1;
  }

  .password {
    padding-top: 54px;
    padding-bottom: 21px;
    flex-grow: 1;
  }

  .marginT40 {
    margin-top: 40px;
  }

  .flex_space {
    display: flex;
  }

  .clearCss {
    width: 21px;
    height: 21px;
    margin: 68px 30px 30px;
  }

  .register {
    /*line-height: 0.94rem;*/
    position: absolute;
    margin-right: 0.4rem;
    right: 0;
    font-weight: normal;
    /*float: right;*/
  }

  .barRight {
    font-size: 30px;
    color: #111111;
    line-height: 48px;
    position: absolute;
    top: 20px;
    right: 30px;
  }

  .bgc {
    background-color: #ffffff;
    /*width: 10rem;*/
    overflow-x: hidden;
    overflow-y: hidden;
    /*width: 100%;*/
    height: 100%;
    /*position: absolute;*/
    /*top: 0;*/
  }

  /* .margin_bottomm {
    margin_bottom: 1rem;
  } */
</style>
