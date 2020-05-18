<!--登录的页面-->
<template>

  <div class="bgc">

    <ToolBar isShowNav="false">登录
      <span slot="right" class="barRight" @click="toRegister">注册</span>
    </ToolBar>
    <div class="content">
      <div class="top">
        <!--绑定头部图片-->
        <img class='img ' alt="欢迎光临" :src=" antian ">
      </div>
      <div class="flex_space marginT40">
        <input class='login' type="number" ref="rUserPhone" v-model="vUserphone"
               min="0" inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number"
               oninput="if(value.length>11)value=value.slice(0,11)"
               placeholder="请输入手机号" @change="checkUserPhone">

        <img class='clearCss' v-show="vUserphone" @click="clearPhone()" src="/static/assets/clear.png"/>
      </div>
      <Divider></Divider>
      <div class='flex_space '>
        <input class='password' type="text" ref="rUserPwd" v-model="vUserPwd" @change="checkInputPwd"
               placeholder="请输入密码" v-if="ifSetDisplay" oninput="if(value.length>12)value=value.slice(0,12)"/>
        <input class='password' type="password" ref="rUserPwd" v-model="vUserPwd" @change="checkInputPwd"
               placeholder="请输入密码" v-else oninput="if(value.length>12)value=value.slice(0,12)"/>


        <img class='clearCss' v-show="vUserPwd" @click="clearPwd()" src="/static/assets/clear.png"/>

        <img v-show="!ifSetDisplay" @click="ifSetDisplay=!ifSetDisplay" class="eye" src="/static/assets/eye_close.png"/>
        <img v-show="ifSetDisplay" @click="ifSetDisplay=!ifSetDisplay" class="eye" src="/static/assets/eye_open.png"/>

      </div>
      <Divider></Divider>
      <LoginButton name="登录" :isInputNonEmpty="enable" @click.native="toLogin"></LoginButton>
      <div class='tips'>
        <span @click="toFinger">手势密码登录</span>
        <span class='v_line'>|</span>
        <span @click="toForgetPwd">忘记密码</span>
        <!--<span style="color: #fff" @click="kingCode">金手指</span>-->
      </div>
    </div>
  </div>

</template>

<script>
  import Divider from '../Divider.vue'
  import ToolBar from '../ToolBar.vue'
  import LoginButton from '../LoginButton.vue'
  var count = 0;//数字密码计数
  export default {
    components: {ToolBar, Divider, LoginButton},
    data () {
      return {
        enable: false,//发送验证码 按钮默认不可用
        antian: '/static/assets/antian.png',
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
      kingCode(){
        //测试专用，快速填写信息
        this.vUserphone = "17688987010";
        this.vUserPwd = "123456";

        sessionStorage.setItem("cacheInputPhone", this.vUserphone);
        sessionStorage.setItem("cachePhone", this.vUserphone);
      },
      //校验校验手机号码
      checkUserPhone: function () {
        sessionStorage.removeItem("cacheInputPhone");
        var that = this;
        //接收到，输入的传过来的手机号
        var userPhoneInput = that.$refs.rUserPhone.value;
        console.info('输入的手机号>>>' + userPhoneInput)
        if (userPhoneInput != null && userPhoneInput != '') {
          if (!that.$utils.checkPhone(userPhoneInput)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
          } else {
            that.vUserphone = userPhoneInput;
            sessionStorage.setItem("cacheInputPhone", userPhoneInput)//提供给忘记密码用
          }
        }
      },
      //校验输入的密码
      checkInputPwd: function () {
        var that = this;
        //接收到，输入的传过来的密码
        var rSetPwdInput = that.$refs.rUserPwd.value;
        console.info('输入的密码>>>' + rSetPwdInput)
        that.vUserPwd = rSetPwdInput;
      },
      //清除密码输入框数据
      clearPwd: function () {
        this.vUserPwd = '';
      },
      //清除手机号输入框数据
      clearPhone: function () {
        this.vUserphone = '';
      },
      test: function () {
        console.log('测试函数>>>>66666666 ')
      },
      //数字密码输入超过5次不正确，弹出提示框
      showResetPwd(){
        this.$dialog.alert("   ", that.$ERRCODE.STATIC_ERRORCDDE.LOGIN_PWD_ERROR_5);
        //还有给后台数据的 逻辑，判断怎么锁定用户

      },


      toRegister(){
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.toRegisterClick,
          "segmentation": {
            appId: window.appId,
          }
        });

        console.info("跳转去注册页面>>>>");
        this.$router.push({path: '/login/register'})

      },

      toForgetPwd(){
        console.info("跳转去忘记密码的页面>>>>");
        this.$router.push({name: this.$RM.ForgetPwd, params: {phone: this.vUserphone}})

      },
      toFinger(){
        console.info("跳转去手势密码的页面>>>>");
        if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
          this.$router.push({path: '/security/fingerLockView'});
        } else {
          if (sessionStorage.getItem("fingerPwdError") != '1') {
            this.$toast(
              "你未设置手势密码，请用手机账号密码登录"
            );
          } else {
            this.$toast(
              "密码输入错误5次，用户已冻结。您可通过忘记密码功能进行重置密码或24h后再次登录"
            );
          }
          // this.$dialog.alert("手势密码没有设置或者已关闭手势密码")
        }
        //this.$router.push({path:'/security/fingerLockView'})
      },

      //登录的表单
      toLogin() {
        var that = this;//复制对象
        console.info('>>>>>>>>登录>>>>>>>>start>>>>');
        // 获取手机号和密码的值
        var userPhone = that.$refs.rUserPhone.value;

        if (!that.$StringUtils.isEmpty(userPhone)) {
          sessionStorage.setItem("inputPhone", userPhone);
        }
        var userPwd = that.$refs.rUserPwd.value;

        // 如果为空，弹出提示框，返回。
        if (that.$StringUtils.isEmpty(userPhone)) {
          that.$toast('请输入手机号');
          return
        }
        if (that.$StringUtils.isEmpty(userPwd)) {
          that.$toast('请输入密码');
          return
        }
        if (!that.$StringUtils.isEmpty(userPhone)) {
          if (!that.$utils.checkPhone(userPhone)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
            return
          }

        }
        var publicKey = that.$utils.PUBLIC_KEY2;
        var encrypt_rsa = new that.$RSA.RSAKey();
        encrypt_rsa = that.$RSA.KEYUTIL.getKey(publicKey);
        var encStr = encrypt_rsa.encrypt(userPwd);
        encStr = that.$RSA.hex2b64(encStr);
        console.info('手机号>>>' + userPhone + '>>>密码>>>' + encStr);

        var timestamp = that.$utils.generateSignTime();
        var reqId = that.$utils.generateSignTime();
        var sign = that.$utils.generateSign(reqId, timestamp);
        console.log("sign>>>" + sign + "、timestamp>>>" + timestamp + ">>>reqId>>>" + reqId);
        //开始请求登录接口
        const url = that.$api.ROOT + '/app/operate.htm';
        that.$indicator.open("请稍候...");
        that.$http.post(url, {
          reqId: reqId,
          appId: window.appId,
          sign: sign,
          data: {phoneNo: userPhone, password: encStr, operType: '1'}//operType操作类型0.注册，1.登陆
        })
          .then(function (res) {

            console.log(res);
            if (res.data.ret === '0') {
              that.$indicator.close();
              console.info("登陆成功>>>>");

              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.LoginClick,
                "segmentation": {
                  appId: window.appId,
                }
              });


              var token = res.data.data.token;
              var first = res.data.data.first;

              //保留个登陆状态

              sessionStorage.setItem("loginSession", token);
              console.info("获取的token>>>" + token);
              that.$storeData.setSession(token)

              //把手机号再缓存一下
              sessionStorage.setItem('cachePhone', userPhone);

              if (window.appId === "IOS" || window.appId === "Andriod") {
                window.interfacePhone.saveSession(JSON.stringify({phone: userPhone, token: token}))
              }
              //跳转到首页
              console.log("是否第一次登录")
              console.log(first)
              if (first == 1) {
                that.$router.push({path: '/security/fingerLockView'})
              } else {
                that.$router.replace({name: that.$RM.Main, params: {selected: "借款"}})

              }
            }
            else if (res.data.ret === '300016') {//未注册
              that.$indicator.close();
              console.warn("您手机号码暂未注册，点击快速注册即可登录查询");
              that.$toast(that.$ERRCODE.getErrorCode(res.data.ret));
            }
            else if (res.data.ret === '000440') {
              that.$indicator.close();
              that.doLoginError(res, that);
            } else {
              that.$indicator.close();
//              if (res.data.ret === '000002') {
//                that.$dialog.alert("    ","登陆失效，请重新登陆");
//                that.getOpenApp();
//                return
//              }
              that.$toast(res.data.msg);
              console.warn("登陆失败!!!")
            }
          })
          .catch(function () {
            that.$indicator.close();
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
        console.info('>>>>>>>>登录>>>>end>>>>>>>>')
      },
      getOpenApp () {
//          跳转登陆失效的页面
        if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
          this.$router.replace({path: '/security/fingerLockView'})
        } else {
          this.$router.replace(this.$RM.Login)
        }
      },
      doLoginError(res, that){
        if (res.data.data && res.data.data.errorTime) {
          let errorTime = Number(res.data.data.errorTime);
          console.warn("账号密码不对!!!");
          if (errorTime == 5) {
            that.$dialog.alert("    ", '密码输入错误5次，用户已锁定。您可24小时后重新输入登录或者通过忘记密码重新设置密码。');
            that.$StringUtils.removeFingerLockPwd();
            that.$StringUtils.removeFingerLockType();
            if (window.appId == "IOS") {
              window.interfacePhone.removePwd()
            }
          } else {
            that.$dialog.alert("   ", '密码输入错误，请重新输入。您还可以输入' + (5 - errorTime) + '次');
          }
        }
      }
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
    justify-content: center;
  }

  .content {
    margin-top: 50px;
    color: #4F4F55;
    padding: 0 50px;
  }

  .img {
    width: 200px;
    height: 200px;
    margin: auto;
  }

  .tips {
    letter-spacing: 2px;
    color: #c9c9c9;
    margin-top: 42px;
    margin-bottom: 100px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .v_line {
    margin-left: 25px;
    margin-right: 25px;
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

  .margin_bottomm {
    margin_bottom: 1rem;
  }
</style>
