<!--忘记密码的页面-->
<template>

  <div class="bgc">
    <ToolBar isShowNav="false">设置登录密码</ToolBar>
    <div class="content">
      <!--与顶部保持距离-->
      <div class='top'>
        <span class="section">设置密码</span>
        <!--密码显示或者隐藏-->
        <input class='inputPwd' type="text" ref="rSetPwd" v-model="vSetPwd"
               placeholder="6-12位，数字和字母" v-if="ifSetDisplay" oninput="if(value.length>12)value=value.slice(0,12)"/>
        <input class='inputPwd' type="password" ref="rSetPwd" v-model="vSetPwd"
               placeholder="6-12位，数字和字母" v-else oninput="if(value.length>12)value=value.slice(0,12)"/>

        <!--清除输入框内容-->
        <img class='clearCss' v-show="vSetPwd" @click="clearSetPwd()" src="/static/assets/clear.png"/>

        <!--图片显示或隐藏-->
        <img v-show="!ifSetDisplay" @click="ifSetDisplay=!ifSetDisplay" class="eye" src="/static/assets/eye_close.png"/>
        <img v-show="ifSetDisplay" @click="ifSetDisplay=!ifSetDisplay" class="eye" src="/static/assets/eye_open.png"/>

      </div>
      <!--横线-->
      <Divider></Divider>
      <div class='top'>
        <span class="section">确认密码</span>
        <input class='inputPwd' type="text" ref="rComfirmPwd" v-model="vComfirmPwd"
               placeholder="6-12位，数字和字母" v-if="ifDisplay" oninput="if(value.length>12)value=value.slice(0,12)"/>
        <input class='inputPwd' type="password" ref="rComfirmPwd" v-model="vComfirmPwd"
               placeholder="6-12位，数字和字母" v-else oninput="if(value.length>12)value=value.slice(0,12)"/>

        <img class='clearCss' v-show="vComfirmPwd" @click="clearPwd()" src="/static/assets/clear.png"/>
        <img v-show="!ifDisplay" @click="ifDisplay=!ifDisplay" class="eye" src="/static/assets/eye_close.png"/>
        <img v-show="ifDisplay" @click="ifDisplay=!ifDisplay" class="eye" src="/static/assets/eye_open.png"/>
      </div>
      <!--横线-->
      <Divider></Divider>

      <div class="redTips " v-show="rexTip">密码需为6-12位数，数字、字母，或者字母加数字，字母分大小写</div>
      <div class="redTips " v-show="errorRexTip">2次密码输入不一致</div>
      <LoginButton name="确认" :isInputNonEmpty="enable" @click.native="toSetPwd"></LoginButton>
    </div>

  </div>

</template>

<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import LoginButton from '../LoginButton.vue'
  export default {
    components: {ToolBar, Divider, LoginButton},
    data () {
      return {
        vUserPhone: null,//生命周期函数获取手机注册时的手机号
        vComfirmPwd: null,//确认密码输入框的值
        vSetPwd: null,//设置密码输入框的值

        enable: false,//发送验证码 按钮默认不可用
        rexTip: false,//设置密码报错提示
        errorRexTip: false,//确认密码报错提示
        ifSetDisplay: false,//显示隐藏
        ifDisplay: false,//显示隐藏
        newPwd: null,//新密码
      }
    },
    methods: {
      //清除设置密码输入框数据
      clearSetPwd: function () {
        this.vSetPwd = '';
      },
      //清除密码输入框数据
      clearPwd: function () {
        this.vComfirmPwd = '';
      },
      //校验输入的密码
      checkInputPwd: function () {
        var that = this;
        //接收到，输入的传过来的密码
        console.info('输入的密码>>>' + that.vSetPwd)
        if (!that.$utils.checkPwd(that.vSetPwd)) {
          that.enable = false//按钮不可用
          that.rexTip = true//提示语出现
          that.errorRexTip = false//提示语隐藏
        } else {
          that.checkComfirmPwd()
        }
      },
      //校验确认输入的密码
      checkComfirmPwd: function () {
        var that = this;
        //接收到，输入的传过来的密码
        console.info('输入的密码>>>' + that.vComfirmPwd)
        that.rexTip = false
        if (that.$StringUtils.isEmpty(that.vComfirmPwd)) {
          return
        }
        //在上面输入的密码格式正确的情况下
        if (that.vSetPwd != that.vComfirmPwd) {
          that.enable = false//按钮不可用
          that.errorRexTip = true//错误语提示
        } else {
          //点亮样式
          that.enable = true
          that.errorRexTip = false
          that.newPwd = that.vComfirmPwd//新密码赋值
        }
      },
      getOpenApp () {
//          跳转登陆失效的页面
        if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
          this.$router.replace({path: '/security/fingerLockView'})
        } else {
          this.$router.replace(this.$RM.Login)
        }
      },
      //设置密码
      toSetPwd: function () {
        console.info('>>>>>>>>>>>>设置密码>>>>start>>>>>>>>')

        var that = this;//复制对象


        //开始请求设置密码接口


        var cacheUserPhone = that.$StringUtils.getPhone();
        //获取注册页面，缓存下来的手机号
        if (cacheUserPhone == null || cacheUserPhone == '') {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.REGISTER_PHONE_NULL);
          return
        }
        if (that.rexTip || that.errorRexTip) {
          // 密码格式不正确或者两次密码不一致则不调用接口
          return
        }

        var publicKey = that.$utils.PUBLIC_KEY2
        var encrypt_rsa = new that.$RSA.RSAKey();
        encrypt_rsa = that.$RSA.KEYUTIL.getKey(publicKey);
        var encStr = encrypt_rsa.encrypt(that.newPwd)
        encStr = that.$RSA.hex2b64(encStr);
        console.info('>>>密码>>>' + encStr)

        var reqId = that.$utils.generateSignTime();
        const  url=that.$api.ROOT +that.$Constants.OPERATE;
        that.$indicator.open("请稍候...");
        that.$http.post(url, {
          reqId: reqId,
          appId: window.appId,
          data: {phoneNo: cacheUserPhone, password: encStr, operType: '6'}
        })
          .then(function (res) {
            console.log(res);
            if (res.data.ret == '0') {
              that.$indicator.close();
              if (appId === window.appId) {
                Countly.init({
                  app_key: "fac364a78f023a9e1d95e7a3d9be08a53144831b",
                  url: "http://10.0.18.37:32768", //your server goes here
                  debug: true,
                });
                Countly.track_sessions();
                Countly.track_pageview();
                Countly.add_event({
                  key: "SetPwdClick_two",
                  "segmentation": {
                    appId: window.appId,
                  }
                });
              }
              console.info("设置成功...");
              //设置按钮不可用，防止重复点击
              that.enable = false;
              that.$toast('密码设置成功');
              that.$sessionManager.clearRegister();
              //按钮变暗
              that.$router.push(that.$RM.Login);//跳转登陆页面
            }
            else {
              that.$indicator.close();
              if (res.data.ret === '000002') {
                that.$dialog.alert("    ",that.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
                that.$StringUtils.loginOut();
                return
              }
              console.warn("设置失败!!!");
              that.$toast(
                res.data.msg
              )
            }
          })
          .catch(function (error) {
            that.$indicator.close();
            console.error(error);
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
        console.info('>>>>>>>>设置密码>>>>end>>>>>>>>')
      }
    }
    ,
    mounted(){
      //生命周期函数


    },
    watch: {
      vSetPwd: {
        handler(){
          this.checkInputPwd()
        }
      },
      vComfirmPwd: {
        handler(){
          this.checkInputPwd()
        }
      }
    }
  }

</script>

<style scoped>

  .top {
    box-sizing: content-box;
    display: flex;
    flex-direction: row;
  }

  .content {
    margin-top: 50px;
    color: #4F4F55;
    padding: 0 50px;
  }

  .inputPwd {
    padding: 55px 0 22px;
    font-size: 28px;
    border: 0;
    line-height: 45px;
    flex-grow: 1;
    margin-left: 40px;
  }

  .eye {
    width: 29px;
    height: 21px;
    margin: 68px 27px 30px;
  }

  .section {
    font-size: 30px;
    padding: 55px 0 22px;
    color: #999999;
    white-space: nowrap;
    flex-basis: auto;
    text-align: justify;
    line-height: 42px;
  }

  .clearCss {
    width: 21px;
    height: 21px;
    margin: 68px 30px 30px;
  }

  .redTips {
    font-size: 24px;
    color: #ff4c4c;
    line-height: 36px;
  }

  .bgc {
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>

