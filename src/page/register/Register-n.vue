<!--忘记密码的页面-->
<template>

  <div class="full-page">
    <!-- <ToolBar page_title="账号注册" :isWhile="true" imgUrl="static/assets/icon_black_back.png"> </ToolBar> -->
    <van-nav-bar
    class="reset-bar"
    title="账号注册"
    left-arrow
    fixed
    border='false'
    @click-left="$router.back(-1)"
  />

    <div class="content">
      <div class='top toph50'>

        <input  class='common' type="tel" ref="rUserPhone" v-model="vRegisterUserPhone "
               placeholder="请输入手机号" min="0" inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number"  @change="checkUserPhone"
               oninput="if(value.length>11)value=value.slice(0,11)"/>
        <img class='clearCss clearCss2' v-show="vRegisterUserPhone" @click="clearPhone()"  src="../../assets/clear.png"/>
      </div>

      <!--横线-->
      <Divider></Divider>
      <div class='flex_space '>
        <input class='password' type="text" ref="rRegisterPwd1" v-model="vRegisterPwd1" @change="checkInputPwd1"
               placeholder="请输入密码" v-if="ifSetDisplay1" oninput="if(value.length>12)value=value.slice(0,12)"/>
        <input class='password' type="password" ref="rRegisterPwd1" v-model="vRegisterPwd1" @change="checkInputPwd1"
               placeholder="请输入密码" v-else oninput="if(value.length>12)value=value.slice(0,12)"/>
        <img class='clearCss' v-show="vRegisterPwd1" @click="clear('vRegisterPwd1')" src="../../assets/clear.png"/>
        <img v-show="!ifSetDisplay1" @click="ifSetDisplay1=!ifSetDisplay1" class="eye" src="../../assets/eye_close.png"/>
        <img v-show="ifSetDisplay1" @click="ifSetDisplay1=!ifSetDisplay1" class="eye" src="../../assets/eye_open.png"/>
      </div>

      <!--横线-->
      <Divider></Divider>

      <div class='flex_space '>
        <input class='password' type="text" ref="rRegisterPwd2" v-model="vRegisterPwd2" @change="checkInputPwd2"
               placeholder="请再次输入密码" v-if="ifSetDisplay2" oninput="if(value.length>12)value=value.slice(0,12)"/>
        <input class='password' type="password" ref="rRegisterPwd2" v-model="vRegisterPwd2" @change="checkInputPwd2"
               placeholder="请再次输入密码" v-else oninput="if(value.length>12)value=value.slice(0,12)"/>
        <img class='clearCss' v-show="vRegisterPwd2" @click="clear('vRegisterPwd2')" src="../../assets/clear.png"/>
        <img v-show="!ifSetDisplay2" @click="ifSetDisplay2=!ifSetDisplay2" class="eye" src="../../assets/eye_close.png"/>
        <img v-show="ifSetDisplay2" @click="ifSetDisplay2=!ifSetDisplay2" class="eye" src="../../assets/eye_open.png"/>
      </div>

      <!--横线-->
      <Divider></Divider>

      <div class='top'>
        <input class='common' type="number" ref="rYanCode" v-model="vRegisterYanCode"
               placeholder="请输入验证码" oninput="if(value.length>6)value=value.slice(0,6)" />
        <img class='clearCss' v-show="vRegisterYanCode" @click="clearYanCode()"  src="../../assets/clear.png"/>
        <!--按钮-->
        <input type="button" class="btn999" :style="btnBackStyle" v-bind:disabled="disabled" :value="time"
               @click="getVerificationCode()"/>
      </div>
      <!--横线-->
      <Divider></Divider>

      <div class='protocol'>
          <!--导入复选框组件-->
          <Checkbox class="checkbox" @onCheckChange="onCheckChange"></Checkbox>
          <div class='tips'>请阅读并同意<span @click="toProcol" style="color:#FFC600">《中农网用户注册协议》</span></div>
      </div>
      <LoginButton name="注册" :isInputNonEmpty="enable" @click.native ="toRegister"></LoginButton>
    </div>
  </div>

</template>

<script>
// avascript:(function () { var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload = function () { eruda.init() } })()
  import Checkbox from '@/components/Checkbox'
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  import LoginButton from '@/components/LoginButton.vue'
  import Encrypt from '../../api/encrypt.js'
  import SM from '@/api/SessionManager.js'
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
        //vRegisterUserName:'', // 用户名
        vRegisterUserPhone: "",//手机输入框的值
        vRegisterYanCode: "",//验证码输入框的值
        btnBackStyle: ' ',//发送验证码样式
        disabled: false,//发送验证码 按钮默认可用
        //isNext:false, // 是否显示下一步
        vRegisterPwd1:'',
        vRegisterPwd2:'',
        error:"",

        ifSetDisplay1:false,
        ifSetDisplay2:false,

      }
    },
    methods: {
    // 下一步
      // toNext(){
      //   //this.$toast("请稍候...");
      //   this.isNext=true
      // },
      //清除密码输入框数据
      clear (str) {
        this[str] = '';
      },
      //校验校验手机号码
      checkUserPhone() {
          console.info('输入的手机号>>>' + this.vRegisterUserPhone)
          if (!this.$utils.checkPhone(this.vRegisterUserPhone)) {
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              return false
          }  
          return true
      },
      //校验输入的密码
      checkInputPwd1 () {       
        if (!this.$utils.checkPwd(this.vRegisterPwd1)) {
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.PWDINPUTERROR);
        }  
        if(this.vRegisterPwd2!=""&&this.vRegisterPwd1!=""){
            if( this.vRegisterPwd2 != this.vRegisterPwd1){
                this.$toast("两次密码输入不一致！")
            }
        }
      },
      //校验输入的密码
      checkInputPwd2 () {       
        //接收到，输入的传过来的密码
        if (!this.$utils.checkPwd(this.vRegisterPwd1)) {
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.PWDINPUTERROR);
        }  
        if(this.vRegisterPwd2!=""&&this.vRegisterPwd1!=""){
            if( this.vRegisterPwd2 != this.vRegisterPwd1){
                this.$toast("两次密码输入不一致！")
            }
        }
      },
      toProcol(){
        console.info("跳转个人协议....")
        this.$router.push({path: this.$RM.ReGisterProtocol})
      },
      //点击图片获取验证码
      getVerificationCode() {
        //获取验证码前，判断手机格式是否正确
        if(!this.checkUserPhone())return false
        console.info('现在的网络状态是>>>' + this.nonet)
        if (this.nonet) {
          this.$toast("网络异常，请重试")
          //跳转断网页面
          this.$router.push({path: '/components/error/Netbroken'})
        } else {
          //开始网络请求
          var reqId = this.$utils.generateSignTime();
          const  url=this.$api.ROOT +this.$Constants.APP_SENDCODE;
          this.$indicator.open("请稍候...");
          this.$http.post(url, {
           "telNo": this.vRegisterUserPhone, "type": '01'
          })
            .then(function (res) {
              console.info('成功请求到后台验证码接口>>>');
              console.log(res)
              console.info(res.data);
              const resData = JSON.parse(res.data);
              console.log(resData.respCode)
              if (resData.respCode === '000000') {
                  this.$indicator.close();     
                  this.$toast('验证码已发送');
              } else {
                  this.$indicator.close();                  
                  console.warn('发送验证码失败...');
                  console.log(res.data.respMsg)
              }
            })
            .catch(function (error) {
              this.$indicator.close();
              console.error(error);
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });
        }
      },
      getOpenApp () {
        // 跳转登陆失效的页面
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
      //校验验证码
      toCheckCode(){
        const url = this.$api.ROOT +this.$Constants.APP_CHECKCODE;
        this.$indicator.open("请稍候...");
        const  data = {"telNo":this.vRegisterUserPhone,"code":this.vRegisterYanCode}
        console.log(data)
        this.$http.post(url, data)
          .then(function (res) {
            console.log(res);
            const resDate = JSON.parse(res.data) ; 
            if (resDate.respCode == '000000') {
              this.$indicator.close();
              console.info("确认验证码成功...");
            }
            else {
              this.$indicator.close();
              console.warn("确认验证码失败!!!");
              this.$toast(resDate.respMsg);
              this.error = "1"
            }
          })
          .catch(function (error) {
            this.$indicator.close();
            console.error(error);
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_000010);
          });
        console.info('>>>>>>>>>>>>确认验证码>>>>end>>>>>>>>')
      },
      //立即注册
      toRegister: function () {
        this.enable = false;
        this.toCheckCode();
        sessionStorage.removeItem("cacheInputPhone");
        sessionStorage.setItem("cacheInputPhone", this.vRegisterUserPhone)//提供给忘记密码用
        console.info('>>>>>>>>>>>>注册>>>>start>>>>>>>>')
        if (!this.check) {
          this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.CHECKBOXSTU_REGISTER_ERROR);
          return
        }
        //校验验证码，验证码报错
        if(this.error){
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_000010);
            return 
        }
        if(!this.checkInputPwd1() && !this.checkInputPwd2() && !this.checkUserPhone()){
           this.$toast('数据有误，请检查！');
           return 
        }
        console.log(this.error)
        console.info('用户的手机号>>>' + this.vRegisterUserPhone + '>>>输入的验证码>>>' + this.vRegisterYanCode)
        //校验勾选框
        console.info('获取勾选的状态>>>' + this.check)
        if (!this.check) {
          //如果不正确
          this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.CHECKBOXSTU_REGISTER_ERROR);
          return;
        }
        //开始请求注册接口
        var reqId = this.$utils.generateSignTime();
        const url = this.$api.ROOT +this.$Constants.APP_REGISTER;
        this.$indicator.open("请稍候...");

        var encStr = Encrypt.msg_md5(this.vRegisterPwd1).toString();
        console.log(this.vRegisterPwd1)
        console.log(reqId)
        console.log(window.appId)
        //const  data = {"mobile": this.vRegisterUserPhone,"username":this.vRegisterUserName, "password": encStr,"loginid": this.vRegisterUserName}
        //把所有的用户名换为手机号
        const  data = {"mobile": this.vRegisterUserPhone,"username":this.vRegisterUserPhone, "password": encStr,"loginid": this.vRegisterUserPhone}
        console.log(data)

        this.$http.post(url, data)
          .then(function (res) {
            console.log(res);
            console.log(res.status)
            if (res.data.respCode == '000000') {
              this.$indicator.close();
              console.info("注册成功...");
              this.enable = false;    //设置按钮不可用，防止重复点击
              //把注册成功的手机号，存入缓存,这个十分重要！！！！！！！！！
              this.$StringUtils.setPhone(this.vRegisterUserPhone);
              console.info("注册成功，手机号缓存起来>>>" + this.vRegisterUserPhone);
              this.$router.go(-1)
            }
            else {
              this.$indicator.close();
              console.warn("注册失败!!!");
              //this.$toast(res.data.respMsg);
              this.$toast(JSON.parse(res.data.respMsg)['error_message'])
              this.enable = true;
            }
          })
          .catch(function (error) {
            this.$indicator.close();
            console.error(error);
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            this.enable = true;
          });
        console.info('>>>>>>>>>>>>注册>>>>end>>>>>>>>')
      },
      //清除手机号输入框数据
      clearPhone: function () {
        this.vRegisterUserPhone = '';
      },
      // 清除用户名
      // clearUserName: function () {
      //   this.vRegisterUserName = '';
      // },
      //清除验证码输入框数据
      clearYanCode: function () {
        this.vRegisterYanCode = '';
      },
      // 清除密码
      clearRegisterPwd(val){
        if(val=='vRegisterPwd1'){
          this.vRegisterPwd1=''
        }
        if(val=='vRegisterPwd2'){
          this.vRegisterPwd2=''
        }
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
      let cacheLoginId = sessionStorage.getItem("inputPhone");
      var tempPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!this.$StringUtils.isEmpty(cacheLoginId)) {
        // if (!tempPhone.test(cacheLoginId)) {
        //   this.vRegisterUserName = cacheLoginId
        // }else{
          this.vRegisterUserPhone = cacheLoginId
          console.info("用户在上一次登陆的缓存手机号>>>" + cacheLoginId)
        // }
   
      }
      else {
        let sessionManagePhone = sessionStorage.getItem(this.$sessionManager.Register + 'phone');
        if (!this.$StringUtils.isEmpty(sessionManagePhone)) {
             this.vRegisterUserPhone = sessionManagePhone;
        }

      }
      //this.vRegisterYanCode = sessionStorage.getItem(this.$sessionManager.Register + 'code')
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
<style>
.reset-bar .van-icon{
    color: #111111;
}

</style>
<style scoped>
.reset-bar .van-icon{
    color: #111111 !important;
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
    text-align: left;
  }

  .content {
    margin-top: 46px;
    color: #4F4F55;
    padding: 0 25px;
  }

  .common {
    font-size: 0.4rem;
    line-height: 23px;
    border: none;
    padding: 20px 0 10px;
    flex-grow: 1;
  }



  .btn999 {
    background: #ffffff;
    border: 1px solid #FFC600;
    box-shadow: 0 0 0 0 #FFC600;
    border-radius: 2px;
    padding: 5px 12px;
    font-size: 13px;
    margin: 23px 0 6px;
    color: #FFC600;
    text-align: center;
    line-height: 20px;
  }

  .protocol {
    display: flex;
    margin-top: 10px;

  }

  .protocol .checkbox {
    width: 15px;
    height: 15px;
    margin-top: -0.05rem;
  }

  .protocol .tips {
    letter-spacing: 1px;
    color: #c9c9c9;
    font-size: 13px;
    line-height: 15px;
    margin-left: 10px;
  }


  /* 密码 */
  .eye {
    width: 15px;
    height: 10px;
    margin: 34px 13px 15px;
  }

  input {
    font-size: 15px;
    border: 0;
  }

  .login {
    padding-top: 27px;
    padding-bottom: 10px;
    flex-grow: 1;
  }

  .password {
    padding-top: 27px;
    padding-bottom:10px;
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
    margin: 34px 15px 15px;
  }
   .clearCss2 {
       margin: 26px 15px 15px;
  }
  .toph50{
    height: 50px;
  }

</style>
