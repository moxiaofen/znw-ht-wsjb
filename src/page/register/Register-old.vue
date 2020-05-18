<!--忘记密码的页面-->
<template>

  <div class="bgc">
    <ToolBar page_title="账号注册" :isWhile="true" imgUrl="static/assets/icon_black_back.png"> </ToolBar>

    <div class="content" v-if="isNext==false">
      <div class='top'>

        <input  class='common' type="text" ref="rUserName" v-model="vRegisterUserName"
                placeholder="请输入用户名"
                >
        <img class='clearCss' v-show="vRegisterUserName" @click="clearUserName()" src="/static/assets/clear.png"/>
      </div>

      <!--横线-->
      <Divider></Divider>
      <!--与顶部保持距离-->
      <div class='top'>

        <input  class='common' type="tel" ref="rUserPhone" v-model="vRegisterUserPhone "
               placeholder="请输入手机号" min="0" inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number"  @change="checkUserPhone"
               oninput="if(value.length>11)value=value.slice(0,11)"/>
        <img class='clearCss' v-show="vRegisterUserPhone" @click="clearPhone()" src="/static/assets/clear.png"/>
      </div>

      <!--横线-->
      <Divider></Divider>

      <div class='top'>
        <input class='common' type="number" ref="rYanCode" v-model="vRegisterYanCode"
               placeholder="请输入验证码" oninput="if(value.length>6)value=value.slice(0,6)"  @change="toCheckCode"/>
        <img class='clearCss' v-show="vRegisterYanCode" @click="clearYanCode()" src="/static/assets/clear.png"/>
        <!--按钮-->
        <input type="button" class="btn999" :style="btnBackStyle" v-bind:disabled="disabled" :value="time"
               @click="getVerificationCode()"/>
      </div>

      <!--横线-->
      <Divider></Divider>

      <LoginButton name="下一步" :isInputNonEmpty="enable" @click.native="toNext"></LoginButton>
    </div>
    <!--下一步-->
    <div class="content" v-if="isNext==true">
      <div class='top'>

        <input  class='common' type="text" ref="rUserPwd1" v-model="vRegisterPwd1"  @change="checkInputPwd1"
                placeholder="请输入密码"  oninput="if(value.length>12)value=value.slice(0,12)"
        >
        <img class='clearCss' v-show="vRegisterPwd1" @click="clearRegisterPwd('vRegisterPwd1')" src="/static/assets/clear.png"/>
      </div>

      <!--横线-->
      <Divider></Divider>
      <!--与顶部保持距离-->
      <div class='top'>

        <input  class='common' type="tel" ref="rUserPwd2" v-model="vRegisterPwd2"  @change="checkInputPwd2"
                placeholder="请确认密码"  oninput="if(value.length>12)value=value.slice(0,12)"
              />
        <img class='clearCss' v-show="vRegisterPwd2" @click="clearRegisterPwd('vRegisterPwd2')" src="/static/assets/clear.png"/>
      </div>

      <!--横线-->
      <Divider></Divider>


      <!--横线-->
      <Divider></Divider>
       <div class='protocol'>
              <!--导入复选框组件-->
              <Checkbox class="checkbox" @onCheckChange="onCheckChange"></Checkbox>
              <div class='tips'>请阅读并同意<span @click="toProcol" style="color:#FFC600">《中农网用户注册协议》</span></div>
            </div>
      <LoginButton name="注册" :isInputNonEmpty="enable" @click.native="toRegister"></LoginButton>
    </div>
  </div>

</template>

<script>
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
        vRegisterUserName:'', // 用户名
        vRegisterUserPhone: "",//手机输入框的值
        vRegisterYanCode: "",//验证码输入框的值
        btnBackStyle: ' ',//发送验证码样式
        disabled: false,//发送验证码 按钮默认可用
        isNext:false, // 是否显示下一步
        vRegisterPwd1:'',
        vRegisterPwd2:'',
        error:"",

      }
    },
    methods: {
    // 下一步
      toNext(){
        this.isNext=true
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
                  this.$toast(res.data.respMsg);
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

        const  data = {"mobile": this.vRegisterUserPhone,"username":this.vRegisterUserName, "password": encStr,"loginid": this.vRegisterUserName}
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
              this.$toast(res.data.respMsg);
            }
          })
          .catch(function (error) {
            this.$indicator.close();
            console.error(error);
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
        console.info('>>>>>>>>>>>>注册>>>>end>>>>>>>>')
      },
      //清除手机号输入框数据
      clearPhone: function () {
        this.vRegisterUserPhone = '';
      },
      // 清除用户名
      clearUserName: function () {
        this.vRegisterUserName = '';
      },
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
        if (!tempPhone.test(cacheLoginId)) {
          this.vRegisterUserName = cacheLoginId
        }else{
          this.vRegisterUserPhone = cacheLoginId
          console.info("用户在上一次登陆的缓存手机号>>>" + cacheLoginId)
        }
   
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

<style scoped>
  .top {
    display: flex;
    text-align: left;
  }

  .content {
    margin-top: 100px;
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
    border: 1px solid #FFC600;
    box-shadow: 0 0 0 0 #FFC600;
    border-radius: 4px;
    padding: 10px 25px;
    font-size: 26px;
    margin: 47px 0 12px;
    color: #FFC600;
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
