<!--忘记密码的页面-->
<template>

  <div class="bgc">
    <ToolBar>快速注册</ToolBar>
    <div class="content">
      <!--与顶部保持距离-->
      <div class='top'>
        <input class='common' type="tel" ref="rUserPhone" v-model="vRegisterUserPhone "
               placeholder="请输入手机号" min="0" inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number"
               oninput="if(value.length>11)value=value.slice(0,11)"/>
        <img class='clearCss' v-show="vRegisterUserPhone" @click="clearPhone()" src="/static/assets/clear.png"/>
      </div>

      <!--横线-->
      <Divider></Divider>

      <div class='top'>
        <input class='common' type="number" ref="rYanCode" v-model="vRegisterYanCode"
               placeholder="请输入验证码" oninput="if(value.length>4)value=value.slice(0,4)"/>
        <img class='clearCss' v-show="vRegisterYanCode" @click="clearYanCode()" src="/static/assets/clear.png"/>
        <!--按钮-->
        <input type="button" class="btn999" :style="btnBackStyle" v-bind:disabled="disabled" :value="time"
               @click="getVerificationCode()"/>
      </div>

      <!--横线-->
      <Divider></Divider>

      <div class='protocol'>
        <!--导入复选框组件-->
        <Checkbox class="checkbox" @onCheckChange="onCheckChange"></Checkbox>
        <div class='tips'>请阅读并同意<span @click="toProcol" style="color:#ff6400">《安田用户注册协议》</span></div>
      </div>
      <LoginButton name="立即注册" :isInputNonEmpty="enable" @click.native="toRegister"></LoginButton>
    </div>
  </div>

</template>

<script>
  import Checkbox from '../Checkbox'
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import LoginButton from '../LoginButton.vue'
  import SM from '../../api/SessionManager.js'
  export default {
    name: SM.Register,
    components: {Checkbox, ToolBar, Divider, LoginButton},
    data () {
      return {
        check: false,
        time: '获取验证码', //倒计时
        nonet: false,//断网
        currentTime: 61,//发送验证码

        enable: false,//立即注册 按钮默认不可用
        vRegisterUserPhone: "",//手机输入框的值
        vRegisterYanCode: "",//验证码输入框的值
        btnBackStyle: ' ',//发送验证码样式
        disabled: false,//发送验证码 按钮默认可用

      }
    },
    methods: {
      toProcol(){
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.Service,
          "segmentation": {
            appId: window.appId,
          }
        });

        console.info("跳转个人协议....")
        this.$router.push({path: "/apply/registerProtocol"})
      },
      //点击图片获取验证码
      getVerificationCode() {
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
          if (that.$StringUtils.isEmpty(userPhone)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100007);
            return;
          } else {
            if (!that.$utils.checkPhone(userPhone)) {
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              return
            }
          }

          //开始网络请求
          var reqId = that.$utils.generateSignTime();
          const  url=that.$api.ROOT +that.$Constants.OPERATE;

          that.$indicator.open("请稍候...");
          that.$http.post(url, {
            reqId: reqId,
            appId: window.appId,
            data: {phoneNo: userPhone, operType: '8'}//operType操作类型0.注册，1.登陆，5.注册获取验证码，3.忘记密码，6设置密码 8先验证是否已经有注册
          })
            .then(function (res) {

              console.info('成功请求到后台验证码接口>>>');
              console.info(res.data);
              if (res.data.ret === '0') {
                that.$indicator.close();
                var yanCode = res.data.data.verificationCode;
                if (yanCode != null && yanCode != '') {
                  console.info('后台返回的手机验证码是>>>' + yanCode);
                  that.$toast('验证码已发送');
                  //倒计时1分钟，才可重新点击获取
                  that.disabled = ''//按钮不可用
                  that.getCode();
                }
              } else {
                that.$indicator.close();
                if (res.data.ret === '000002') {
                  that.$dialog.alert("    ",that.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
                  that.$StringUtils.loginOut();
                  return
                }

                console.warn('发送验证码失败...');
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
      getOpenApp () {
//          跳转登陆失效的页面
        if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
          this.$router.replace({path: '/security/fingerLockView'})
        } else {
          this.$router.replace(this.$RM.Login)
        }
      },
      //验证码倒计时
      getCode() {
        var interval = null; //倒计时函数
        var that = this;
        var currentTime = that.currentTime;
        interval = setInterval(function () {
            currentTime--;
            that.time = '(' + currentTime + ')重新获取';
            //按钮颜色置灰
            that.btnBackStyle = 'color:#999999;border:1px solid #e1e1e1; box-shadow:0 0 4px 0 rgba(193,193,193,0.40);'
            if (currentTime <= 0) {
              clearInterval(interval);
              that.time = '重新获取';
              that.currentTime = 61;
              that.disabled = false;//按钮可用
              that.btnBackStyle = "";//按钮颜色变亮
            }
          },
          1000
        )
      },
      //协议勾选状态判断
      onCheckChange: function (val) {
        this.check = val
        console.info("勾选框的状态>>>" + this.check)
        this.onBtnChange()
      },

      //立即注册
      toRegister: function () {
        var that = this;//复制对象
        console.info('>>>>>>>>>>>>注册>>>>start>>>>>>>>')
        if (!this.check) {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.CHECKBOXSTU_REGISTER_ERROR);
          return
        }
        //校验手机号
        if (that.vRegisterUserPhone == null || that.vRegisterUserPhone == '') {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201002);
          console.info('手机号为null...');
          return;
        }
        //校验手机号格式是否正确
        if (that.vRegisterUserPhone != null && that.vRegisterUserPhone != '') {
          if (!that.$utils.checkPhone(that.vRegisterUserPhone)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
            return
          }
        }
        //校验验证码
        if (that.vRegisterYanCode == null || that.vRegisterYanCode == '') {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_000439);
          console.info('验证码为null...');
          return;
        }
        console.info('用户的手机号>>>' + that.vRegisterUserPhone + '>>>输入的验证码>>>' + that.vRegisterYanCode)

        //校验勾选框
        console.info('获取勾选的状态>>>' + that.check)
        if (!that.check) {
          //如果不正确
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.CHECKBOXSTU_REGISTER_ERROR);
          return;
        }

        //开始请求注册接口
        var reqId = that.$utils.generateSignTime();
        const url = that.$api.ROOT +that.$Constants.OPERATE;
        that.$indicator.open("请稍候...");
        that.$http.post(url, {
          reqId: reqId,
          appId: window.appId,
          data: {phoneNo: that.vRegisterUserPhone, smsCode: that.vRegisterYanCode, operType: '0'}
        })
          .then(function (res) {

            console.log(res);
            if (res.data.ret == '0') {
              that.$indicator.close();
              console.info("注册成功...");
              that.enable = false;    //设置按钮不可用，防止重复点击
              //把注册成功的手机号，存入缓存,这个十分重要！！！！！！！！！
              that.$StringUtils.setPhone(that.vRegisterUserPhone);
              console.info("注册成功，手机号缓存起来>>>" + that.vRegisterUserPhone);

              that.$router.push({path: '/login/setpwd'});//跳转设置密码页面
            }
            else {


              that.$indicator.close();
              if (res.data.ret === '000002') {
                that.$dialog.alert("    ",that.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
                that.$StringUtils.loginOut();
                return
              }

              console.warn("注册失败!!!");
              that.$toast(res.data.msg);
            }
          })
          .catch(function (error) {
            that.$indicator.close();
            console.error(error);
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
        console.info('>>>>>>>>>>>>注册>>>>end>>>>>>>>')
      },
      //清除手机号输入框数据
      clearPhone: function () {
        this.vRegisterUserPhone = '';
      },
      //清除验证码输入框数据
      clearYanCode: function () {
        this.vRegisterYanCode = '';
      },
      onBtnChange(){
        this.$sessionManager.saveRegister(this, this.vRegisterYanCode, this.vRegisterUserPhone)
        if (!this.$StringUtils.isEmpty(this.vRegisterYanCode) && !this.$StringUtils.isEmpty(this.vRegisterUserPhone)) {
          this.enable = true//按钮可用
        } else {
          this.enable = false//按钮不可用
        }
      }
    }
    ,
    mounted(){

      //生命周期函数获取注册成功的手机号缓存
      let cacheUserPhone = sessionStorage.getItem("inputPhone");
      //如果登陆的手机号有缓存，显示出来bbb
      if (!this.$StringUtils.isEmpty(cacheUserPhone)) {
        this.vRegisterUserPhone = cacheUserPhone;
        console.info("用户在上一次登陆的缓存手机号>>>" + cacheUserPhone)
      }
      else {
        let sessionManagePhone = sessionStorage.getItem(this.$sessionManager.Register + 'phone');
        if (!this.$StringUtils.isEmpty(sessionManagePhone)) {
             this.vRegisterUserPhone = sessionManagePhone;
        }

      }
      this.vRegisterYanCode = sessionStorage.getItem(this.$sessionManager.Register + 'code')


    },
    watch: {
      //监听这两个值的改变，一改变样式也相对改变
      vRegisterUserPhone: {
        handler(){
          this.onBtnChange();
        }
      },
      vRegisterYanCode: {
        handler(){
          this.onBtnChange();
        }
      }
    }
  }


</script>

<style scoped>
  .top {
    display: flex;
    text-align: left;
  }

  .content {
    margin-top: 50px;
    color: #4F4F55;
    padding: 0 50px;
  }

  .common {
    font-size: 0.4rem;
    line-height: 45px;
    border: none;
    padding: 55px 0 20px;
    flex-grow: 1;
  }

  .clearCss {
    width: 21px;
    height: 21px;
    margin: 68px 30px 30px;
  }

  .btn999 {
    background: #ffffff;
    border: 1px solid #ff6400;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.30);
    border-radius: 4px;
    padding: 10px 25px;
    font-size: 26px;
    margin: 47px 0 12px;
    color: #ff6400;
    text-align: center;
    line-height: 40px;
  }

  .protocol {
    display: flex;
    margin-top: 20px;

  }

  .protocol .checkbox {
    width: 30px;
    height: 30px;
    margin-top: -0.05rem;
  }

  .protocol .tips {
    letter-spacing: 2px;
    color: #c9c9c9;
    font-size: 26px;
    line-height: 30px;
    margin-left: 20px;
  }

  .bgc {
    /*background-color: #ffffff;*/
    /*width: 100%;*/
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>

