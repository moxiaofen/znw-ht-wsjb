<!--登录的页面-->
<template>
  <div class="full-page">
    <van-nav-bar
    class="reset-bar"
    title="登录"
    left-arrow
    fixed
    border='false'
    @click-left="$router.back(-1)"
  />
    <div class="content">
      <div class="top ">
        <!--绑定头部图片-->
        <img class='img ' alt="欢迎光临" :src=" logo ">
      </div>
      <div class="flex_space bber marginT40">
        <input class='login' type="text" ref="rUserPhone" v-model="vUserphone"
               min="0" inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number"
               placeholder="请输入用户名/手机号">
        <img class='clearCss' v-show="vUserphone" @click="clearPhone()" src="../../assets/clear.png"/>
      </div>
      <div class='flex_space bber'>
        <input class='password' type="text" ref="rUserPwd" v-model="vUserPwd" @change="checkInputPwd"
               placeholder="请输入密码" v-if="ifSetDisplay" oninput="if(value.length>12)value=value.slice(0,12)"/>
        <input class='password' type="password" ref="rUserPwd" v-model="vUserPwd" @change="checkInputPwd"
               placeholder="请输入密码" v-else oninput="if(value.length>12)value=value.slice(0,12)"/>
        <img class='clearCss' v-show="vUserPwd" @click="clearPwd()" src="../../assets/clear.png"/>

        <img v-show="!ifSetDisplay" @click="ifSetDisplay=!ifSetDisplay" class="eye" src="../../assets/eye_close.png"/>
        <img v-show="ifSetDisplay" @click="ifSetDisplay=!ifSetDisplay" class="eye" src="../../assets/eye_open.png"/>

      </div>
      <LoginButton name="登录" :isInputNonEmpty="enable" @click.native="toLogin"></LoginButton>
      <div class='tips'>
        <span @click="toRegister">手机快速注册</span>
        <span @click="toForgetPwd">忘记密码</span>
      </div>
    </div>
  </div>

</template>

<script>
  import LoginButton from '@/components/LoginButton.vue'
  import Encrypt from '../../api/encrypt.js'
  var count = 0;//数字密码计数
  export default {
    components: { LoginButton},
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
        //console.info("用户在上一次登陆的缓存手机号>>>" + cacheUserPhone)
      }

    },

    methods: {
      //校验校验手机号码---也有可能是用户名
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

      //数字密码输入超过5次不正确，弹出提示框
      showResetPwd(){
        this.$dialog.alert("   ", this.$ERRCODE.STATIC_ERRORCDDE.LOGIN_PWD_ERROR_5);
        //还有给后台数据的 逻辑，判断怎么锁定用户
      },
      toForgetPwd(){
        //console.info("跳转去忘记密码的页面>>>>");
        this.$router.replace({name: this.$RM.ForgetPwdPage, params: {phone: this.vUserphone}})
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
             //console.log(res);
             //console.log(res.data.respCode)
            if (res.data.respCode === '000000') {
                //缓存数据
                var token = res.data ;
                //console.log(token)
                //console.log(token.custNo)
                this.$indicator.close();
                sessionStorage.setItem("loginSession",JSON.stringify(token));
                sessionStorage.setItem("custNo",token.custNo);
                sessionStorage.setItem("userId",token.userId);
                sessionStorage.setItem("loginid",token.loginid);
                sessionStorage.setItem("mobile",token.mobile);
                sessionStorage.setItem("email",token.email);
                if(!token.custNo){
                    this.$router.push({path: this.$RM.AuthenticateId})
                }else{
                    //console.info("登陆成功>>>>");
                    this.$router.go(-1)
                }
              } else {
                this.$indicator.close();
                this.$toast(res.data.respMsg);
                //console.warn("登陆失败!!!")
             }
            })
          .catch(function () {
             this.$indicator.close();
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
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
<style>
.reset-bar .van-icon{
    color: #111111 !important;
}

</style>

<style scoped>
.reset-bar .van-icon{
    color: #111111;
}

.full-page{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
}
  .top {
    display: flex;
    margin-top: 50px;
    justify-content: center;
  }
  .content {
    margin-top: 80px;
    color: #4F4F55;
    padding: 0 25px;
  }
  .img {
    width: 60px;
    height: 60px;
    margin: auto;
  }
  .tips {
    letter-spacing: 1px;
    color: #c9c9c9;
    margin-top: 21px;
    margin-bottom: 50px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .eye {
    width: 15px;
    height: 10px;
    margin: 30px 13px 15px;
  }
  input {
    font-size: 15px;
    border: 0;
  }
  .login {
    padding-top: 26px;
    padding-bottom: 12px;
    flex-grow: 1;
  }
  .password {
    padding-top: 27px;
    padding-bottom: 10px;
    flex-grow: 1;
  }
  .marginT40 {
    margin-top: 20px;
  }
  .flex_space {
    display: flex;
  }
   .clearCss {
    width: 10px;
    height: 10px;
    margin: 30px 15px 15px;
  }
  .register {
    position: absolute;
    margin-right: 0.4rem;
    right: 0;
    font-weight: normal;
  }
  .barRight {
    font-size: 15px;
    color: #111111;
    line-height: 24px;
    position: absolute;
    top: 10px;
    right: 15px;
  }


.bber,.bter{position: relative;}
.bber:after,.bter:before{position:absolute;left:0;width:100%;height:1px;background:#ddd;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5)}
.bter:before{top:0}
.bber:after{bottom:0}

</style>
