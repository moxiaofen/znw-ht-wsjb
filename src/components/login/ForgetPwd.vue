<!--忘记密码的页面-->
<template>

  <div class="bgc">
    <ToolBar >忘记密码</ToolBar>


    <!--<ToolBar isShowNav="false">登录-->
      <!--<span slot="right" class="barRight" @click="toRegister">注册</span>-->
    <!--</ToolBar>-->
    <div class="content">
      <!--与顶部保持距离-->
      <div class='top'>
        <input class='inputPwd' type="tel" ref="rUserPhone" v-model="vUserPhone"
               placeholder="请输入注册所用手机号码" oninput="if(value.length>11)value=value.slice(0,11)"/>
        <img class='clearCss' v-show="vUserPhone" @click="clearPhone()" src="/static/assets/clear.png"/>

      </div>
      <!--横线-->
      <Divider></Divider>
      <div class='top'>
        <input class='inputPwd' type="text" ref="rSetPwd" v-model="vSetPwd"
               placeholder="请设置登录密码" v-if="ifDisplay" oninput="if(value.length>12)value=value.slice(0,12)"/>
        <input class='inputPwd' type="password" ref="rSetPwd" v-model="vSetPwd"
               placeholder="请设置登录密码" v-else oninput="if(value.length>12)value=value.slice(0,12)"/>

        <img class='clearCss' v-show="vSetPwd" @click="clearPwd()" src="/static/assets/clear.png"/>

        <img v-show="!ifDisplay" @click="ifDisplay=!ifDisplay" class="eye" src="/static/assets/eye_close.png"/>
        <img v-show="ifDisplay" @click="ifDisplay=!ifDisplay" class="eye" src="/static/assets/eye_open.png"/>
      </div>
      <!--横线-->
      <Divider></Divider>

      <div class='top'>
        <input class='inputPwd' type="number" ref="rYanCode" v-model="vYanCode"
               placeholder="请输入短信验证码" oninput="if(value.length>4)value=value.slice(0,4)"/>
        <img class='clearCss' v-show="vYanCode" @click="clearYanCode()" src="/static/assets/clear.png"/>

        <!-- 获取验证码 按钮-->
        <input type="button" class="btn999" :style="btnVertBackStyle" v-bind:disabled="vertDisabled" :value="time"
               @click="getVerificationCode()"/>
      </div>
      <!--横线-->
      <Divider></Divider>
      <div class="redTips " v-show="rexTip">密码需为6-12位数，数字、字母，或者字母加数字，字母分大小写</div>

      <LoginButton name="确定" :isInputNonEmpty="enable" @click.native="toForgetPwd"></LoginButton>
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

        time: '获取验证码', //倒计时
        vertDisabled: false,//按钮可用
        nonet: false,//网络状态
        currentTime: 61,//倒计时
        vYanCode: null,//验证码输入框的值
        vUserPhone: null,//手机号输入框的值
        btnVertBackStyle: '',//发送验证码样式置灰
        enable: false,//按钮不可用
        rexTip: false,//输入错误提示语
        vSetPwd: null,//密码输入框的值
        ifSetDisplay: false,//显示隐藏
        ifDisplay: false,//显示隐藏
        tempYanCode: null//验证码临时变量，提供给提交时校验使用
      }
    },
    methods: {
      //清除密码输入框数据
      clearPwd: function () {
        this.vSetPwd = '';
      },
      //清除验证码输入框数据
      clearYanCode: function () {
        this.vYanCode = '';
      },
      //清除密码输入框数据
      clearPhone: function () {
        this.vUserPhone = '';
      },
      //点击图片获取验证码
      getVerificationCode() {
        console.info("点击图片获取验证码>>>")
        var that = this;
        console.info('现在的网络状态是>>>' + that.nonet)
        if (that.nonet) {
          that.$toast("网络异常，请重试")
          //跳转断网页面
          that.$router.push({path: '/components/error/Netbroken'})
        } else {
          // 获取手机号
          var userPhone = that.$refs.rUserPhone.value;
          console.info("输入的手机号>>>" + userPhone)
          //校验手机号为空
          if (userPhone == null || userPhone == '') {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100007);
            return;
          }
          //校验手机号格式是否正确
          if (!that.$utils.checkPhone(userPhone)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
            return
          }

          var reqId = that.$utils.generateSignTime();
          const  url=that.$api.ROOT +that.$Constants.OPERATE;
          that.$indicator.open("请稍候...");
          that.$http.post(url, {
            reqId: reqId,
            appId:window.appId,
            data: {phoneNo: userPhone, operType: '5'}//operType操作类型0.注册，1.登陆，5.注册获取验证码，3.忘记密码
          })
            .then(function (res) {

              console.info('成功请求到后台验证码接口>>>');
              console.info(res.data)
              if (res.data.ret == '0') {
                that.$indicator.close();
                var yanCode = res.data.data.verificationCode;
                if (yanCode != null && yanCode != '') {
                  that.tempYanCode = yanCode;//放入临时变量，给提交前校验使用
                  console.info('后台返回的手机验证码是>>>' + yanCode)
                  //倒计时1分钟，才可重新点击获取
                  that.$toast('验证码已发送')
                  //倒计时1分钟，才可重新点击获取
                  that.getCode();

                  that.vertDisabled = ''//按钮不可用
                }
              } else {
                that.$indicator.close();
                if (res.data.ret === '000002') {
                  that.$dialog.alert("    ",that.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
                  that.$StringUtils.loginOut();
                  return
                }
                console.info('发送验证码失败...');
                that.$toast(res.data.msg);
              }
            })
            .catch(function (error) {
              that.$indicator.close();
              console.error(error);
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });
        }

      },
      //验证码倒计时
      getCode() {
        var interval = null //倒计时函数
        var that = this;

        var currentTime = that.currentTime
        interval = setInterval(function () {
            currentTime--;
            that.time = '(' + currentTime + ')重新获取';
            //发送验证码样式变亮
            that.btnVertBackStyle = 'color:#999999;border:1px solid #e1e1e1; box-shadow:0 0 4px 0 rgba(193,193,193,0.40);'
            if (currentTime <= 0) {
              clearInterval(interval);
              that.time = '重新获取';
              that.currentTime = 61;
              that.vertDisabled = false;//按钮可用
              that.btnVertBackStyle = "";//样式置灰
            }
          },
          1000
        )
      },
      isBtnEnable(){
        if (this.$utils.checkPwd(this.vSetPwd) && !this.$StringUtils.isEmpty(this.vUserPhone)
          && !this.$StringUtils.isEmpty(this.vYanCode)) {
          this.enable = true//按钮可用
        } else {
          this.enable = false//按钮不可用
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
      toForgetPwd: function () {
        var that = this;//复制对象

        if (!that.$utils.checkPhone(that.$refs.rUserPhone.value)) {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
          return
        }

        //开始请求 忘记密码接口
        var reqId = that.$utils.generateSignTime();

        var publicKey = that.$utils.PUBLIC_KEY2
        var encrypt_rsa = new that.$RSA.RSAKey();
        encrypt_rsa = that.$RSA.KEYUTIL.getKey(publicKey);
        var encStr = encrypt_rsa.encrypt(that.vSetPwd)
        encStr = that.$RSA.hex2b64(encStr);
        console.info('>>>密码>>>' + encStr)

        const  url=that.$api.ROOT +that.$Constants.OPERATE;
        that.$indicator.open("请稍候...");

        that.$http.post(url, {
          reqId: reqId,
          appId:window.appId,
          data: {phoneNo: that.$refs.rUserPhone.value, operType: '3', smsCode: that.vYanCode, password: encStr}//operType操作类型0.注册，1.登陆，5.注册获取验证码，3.忘记密码，6设置密码
        })
          .then(function (res) {

            console.log(res);
            if (res.data.ret == '0') {
              that.$indicator.close();
              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.ForgetClick,
                "segmentation": {
                  appId: window.appId,
                }
              });

              that.enable = false ; //设置按钮不可用，防止重复点击
              that.$toast(
                '密码修改成功！下次请用新密码登录'
              );
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
              that.$toast(res.data.msg);
            }
          })
          .catch(function (error) {
            that.$indicator.close();
            console.error(error);
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
        console.info('>>>>>>>>>忘记密码>>>>end>>>>')
      }
    }
    ,
    mounted(){
      //生命周期函数
      if (this.$route && this.$route.params) {
        this.vUserPhone = this.$route.params.phone
      }
    },
    watch: {
      //监听这3个值的改变，一改变样式也相对改变
      vUserPhone: {
        handler(){
          this.isBtnEnable()
        }
      },
      vSetPwd: {
        handler(){
          if (!this.$utils.checkPwd(this.vSetPwd)) {
            this.rexTip = true//提示语出现
          } else {
            this.rexTip = false
          }
          this.isBtnEnable()
        }
      },
      vYanCode: {
        handler(){
          this.isBtnEnable()
        }
      }
    }
  }

</script>
<style scoped>
  .btn999 {
    background: #ffffff;
    border: 1px solid #ff6400;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.30);
    border-radius: 4px;
    padding: 10px 25px;
    margin: 40px 0 20px;
    font-size: 26px;
    color: #ff6400;
    text-align: center;
    line-height: 40px;
  }

  .top {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .content {
    margin-top: 50px;
    color: #4F4F55;
    padding: 0 50px;
  }

  .inputPwd {
    padding: 55px 0 22px;
    line-height: 45px;
    flex-grow: 1;
    font-size: 30px;
    border: none;
  }

  .eye {
    width: 29px;
    height: 21px;
    margin: 68px 27px 30px;
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
    /*background-color: #ffffff;*/
    /*width: 100%;*/
    overflow-x: hidden;
    overflow-y: hidden;

  }
</style>

