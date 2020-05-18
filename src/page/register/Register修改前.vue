<!--忘记密码的页面-->
<template>

  <div class="full-page">
    <van-nav-bar
    class="reset-bar"
    title="账号注册"
    left-arrow
    fixed
    border='false'
    @click-left="$router.back(-1)"
  />
    <div class="content">
      <div class='top toph50 bber'>
        <input  class='common' type="tel" ref="rUserPhone" v-model="vRegisterUserPhone "
               placeholder="请输入手机号" min="0" inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number"  
               oninput="if(value.length>11)value=value.slice(0,11)"/>
        <img class='clearCss clearCss2' v-show="vRegisterUserPhone" @click="clear('vRegisterUserPhone')"  src="../../assets/clear.png"/>
      </div>

   
      <div class='flex_space bber'>
        <input class='password' type="text" ref="rRegisterPwd1" v-model="vRegisterPwd1" 
               placeholder="请输入密码" v-if="ifSetDisplay1" oninput="if(value.length>12)value=value.slice(0,12)"/>
        <input class='password' type="password" ref="rRegisterPwd1" v-model="vRegisterPwd1" 
               placeholder="请输入密码" v-else oninput="if(value.length>12)value=value.slice(0,12)"/>
        <img class='clearCss' v-show="vRegisterPwd1" @click="clear('vRegisterPwd1')" src="../../assets/clear.png"/>

        <img v-show="!ifSetDisplay1" @click="ifSetDisplay1=!ifSetDisplay1" class="eye" src="../../assets/eye_close.png"/>
        <img v-show="ifSetDisplay1" @click="ifSetDisplay1=!ifSetDisplay1" class="eye" src="../../assets/eye_open.png"/>
      </div>

      <div class='flex_space bber'>
        <input class='password' type="text" ref="rRegisterPwd2" v-model="vRegisterPwd2" 
               placeholder="请再次输入密码" v-if="ifSetDisplay2" oninput="if(value.length>12)value=value.slice(0,12)"/>
        <input class='password' type="password" ref="rRegisterPwd2" v-model="vRegisterPwd2" 
               placeholder="请再次输入密码" v-else oninput="if(value.length>12)value=value.slice(0,12)"/>
        <img class='clearCss' v-show="vRegisterPwd2" @click="clear('vRegisterPwd2')" src="../../assets/clear.png"/>

        <img v-show="!ifSetDisplay2" @click="ifSetDisplay2=!ifSetDisplay2" class="eye" src="../../assets/eye_close.png"/>
        <img v-show="ifSetDisplay2" @click="ifSetDisplay2=!ifSetDisplay2" class="eye" src="../../assets/eye_open.png"/>
      </div>

      <div class='top bber' >
        <input class='common' type="number" ref="rYanCode" v-model="vRegisterYanCode"
               placeholder="请输入验证码" oninput="if(value.length>6)value=value.slice(0,6)" />
        <img class='clearCss' v-show="vRegisterYanCode" @click="clear('vRegisterYanCode')"  src="../../assets/clear.png"/>
        <!--按钮-->
        <input type="button" class="btn999" :style="btnBackStyle" v-bind:disabled="disabled" :value="time"
               @click="getVerificationCode()"/>
      </div>


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
  import LoginButton from '@/components/LoginButton.vue'
  import Encrypt from '../../api/encrypt.js'
  import SM from '@/api/SessionManager.js'
  export default {
    name: SM.Register,
    components: {Checkbox, LoginButton},
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
        vRegisterPwd1:'',
        vRegisterPwd2:'',
        error:"",

        ifSetDisplay1:false,
        ifSetDisplay2:false,

      }
    },
    methods: {
      //清除密码输入框数据
      clear (str) {
        this[str] = '';
      },
      toProcol(){
        //console.info("跳转个人协议....")
        this.$router.push({path: this.$RM.ReGisterProtocol})
      },
      //点击图片获取验证码
      getVerificationCode() {
          //获取验证码前，判断手机格式是否正确
          if (!this.$utils.checkPhone(this.vRegisterUserPhone)) {
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              return 
          }  
          const  url=this.$api.ROOT +this.$Constants.APP_SENDCODE;
          this.$indicator.open("请稍候...");
          this.$http.post(url, {
           "telNo": this.vRegisterUserPhone, "type": '01'
          })
            .then(function (res) {
              const resData = JSON.parse(res.data);
              //console.log(resData.respCode)
              if (resData.respCode === '000000') {
                  this.$indicator.close();     
                  this.$toast('验证码已发送');
                  this.disabled = ''//按钮不可用
                  this.getCode();
              } else {
                  this.$indicator.close();                  
                  //console.warn('发送验证码失败...');
                  this.$toast(resData.respMsg)
              }
            })
            .catch(function (error) {
              this.$indicator.close();
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });
        // }
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
        //var that = this;
        var currentTime = this.currentTime;
        interval = setInterval(function () {
            currentTime--;
            this.time = '(' + currentTime + ')重新获取';
            //按钮颜色置灰
            this.btnBackStyle = 'color:#999999;border:1px solid #e1e1e1; box-shadow:0 0 4px 0 rgba(193,193,193,0.40);'
            if (currentTime <= 0) {
              clearInterval(interval);
              this.time = '重新获取';
              this.currentTime = 61;
              this.disabled = false;//按钮可用
              this.btnBackStyle = "";//按钮颜色变亮
            }
          },
          1000
        )
      },
      //协议勾选状态判断
      onCheckChange: function (val) {
        this.check = val
        //console.info("勾选框的状态>>>" + this.check)
        this.onBtnChange()
      },
      //校验验证码
      toCheckCode(){
        const url = this.$api.ROOT +this.$Constants.APP_CHECKCODE;
        this.$indicator.open("请稍候...");
        const  data = {"telNo":this.vRegisterUserPhone,"code":this.vRegisterYanCode}
        //console.log(data)
        this.$http.post(url, data)
          .then(function (res) {
            //console.log(res);
            const resDate = JSON.parse(res.data) ; 
            if (resDate.respCode == '000000') {
              this.$indicator.close();
              //console.info("确认验证码成功...");
            }
            else {
              this.$indicator.close();
              //console.warn("确认验证码失败!!!");
              this.$toast(resDate.respMsg);
              this.error = "1"
            }
          })
          .catch(function (error) {
            this.$indicator.close();
            //console.error(error);
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_000010);
          });
        //console.info('>>>>>>>>>>>>确认验证码>>>>end>>>>>>>>')
      },
      //立即注册
      toRegister: function () {
        //验证手机号
        if (!this.$utils.checkPhone(this.vRegisterUserPhone)) {
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              return 
        }  
        //校验密码1
        if (!this.$utils.checkPwd(this.vRegisterPwd1)) {
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.PWDINPUTERROR);
            return 
        }  
        //校验密码2
        if (!this.$utils.checkPwd(this.vRegisterPwd2)) {
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.PWDINPUTERROR);
            return 
        } 
        //校验2个密码输入是否一样
        if(this.vRegisterPwd2!=""&&this.vRegisterPwd1!=""){
            if( this.vRegisterPwd2 != this.vRegisterPwd1){
                this.$toast("两次密码输入不一致！")
                return 
            }
        }
        //校验勾选框
        if (!this.check) {
          this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.CHECKBOXSTU_REGISTER_ERROR);
          return
        }

        this.enable = false;//设置按钮不可用，防止重复点击
        this.toCheckCode();
        sessionStorage.removeItem("cacheInputPhone");
        sessionStorage.setItem("cacheInputPhone", this.vRegisterUserPhone)//提供给忘记密码用
        console.info('>>>>>>>>>>>>注册>>>>start>>>>>>>>')
  
        //开始请求注册接口
        var reqId = this.$utils.generateSignTime();
        const url = this.$api.ROOT +this.$Constants.APP_REGISTER;
        this.$indicator.open("请稍候...");

        var encStr = Encrypt.msg_md5(this.vRegisterPwd1).toString();
        //把所有的用户名换为手机号
        const  data = {
          "mobile": this.vRegisterUserPhone,
          "username":this.vRegisterUserPhone, 
          "password": encStr,
          "loginid": this.vRegisterUserPhone
        }
        //console.log(data)
        this.$http.post(url, data)
          .then(function (res) {
            // console.log(res);
            // console.log(res.status)
            if (res.data.respCode == '000000') {
              this.$indicator.close();
              this.$toast('注册成功!')
              //console.info("注册成功...");
              this.enable = true;    
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
         //console.info('>>>>>>>>>>>>注册>>>>end>>>>>>>>')
      },
      
     
      onBtnChange(){
        this.$sessionManager.saveRegister(this, this.vRegisterYanCode, this.vRegisterUserPhone)
        if (!this.$StringUtils.isEmpty(this.vRegisterYanCode) && !this.$StringUtils.isEmpty(this.vRegisterUserPhone)) {
          this.enable = true//按钮可用
        } else {
          this.enable = false//按钮不可用
        }  
      }
    },
    mounted(){
      //生命周期函数获取注册成功的手机号缓存
      const cacheLoginId = sessionStorage.getItem("inputPhone");
      var tempPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!this.$StringUtils.isEmpty(cacheLoginId)) {
          if(!tempPhone.test(cacheLoginId)){
              this.vRegisterUserPhone = ''           
          }else{
             this.vRegisterUserPhone = cacheLoginId
             console.info("用户在上一次登陆的缓存手机号>>>" + cacheLoginId)         
          }
      }
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

.bber,.bter{position: relative;}
.bber:after,.bter:before{position:absolute;left:0;width:100%;height:1px;background:#ddd;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5)}
.bter:before{top:0}
.bber:after{bottom:0}
</style>
