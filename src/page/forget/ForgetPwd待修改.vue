<!--忘记密码的页面-->
<template>

  <div class="full-page">
    <van-nav-bar
    class="reset-bar"
    title="忘记密码"
    left-arrow
    fixed
    border='false'
    @click-left="$router.back(-1)"
  />
    <div class="content">
      <!--与顶部保持距离-->
      <div class='top bber toph50'>
        <input class='inputPwd' type="tel" ref="rUserPhone" v-model="vUserPhone"
               placeholder="请输入注册所用手机号码" oninput="if(value.length>11)value=value.slice(0,11)"  @change="toComfirmAccount"/>
        <img class='clearCss clearCss2' v-show="vUserPhone" @click="clear('vUserPhone')" src="../../assets/clear.png"/>

      </div>
      <!--新密码-->
      <div class='top bber'>
        <input class='inputPwd' type="text" ref="rSetPwd" v-model="vSetPwd1"
               placeholder="请设置登录密码" v-if="ifDisplay1" oninput="if(value.length>12)value=value.slice(0,12)"/>
        <input class='inputPwd' type="password" ref="rSetPwd" v-model="vSetPwd1"
               placeholder="请设置登录密码" v-else oninput="if(value.length>12)value=value.slice(0,12)" />

        <img class='clearCss' v-show="vSetPwd1" @click="clear('vSetPwd1')" src="../../assets/clear.png"/>

        <img v-show="!ifDisplay1" @click="ifDisplay1=!ifDisplay1" class="eye"  src="../../assets/eye_close.png"/>
        <img v-show="ifDisplay1" @click="ifDisplay1=!ifDisplay1" class="eye" src="../../assets/eye_open.png"/>
      </div>

      <!--确认新密码-->
      <div class='top bber'>
        <input class='inputPwd' type="text" ref="rSetPwd2" v-model="vSetPwd2"
               placeholder="请设置登录密码" v-if="ifDisplay2" oninput="if(value.length>12)value=value.slice(0,12)" />
        <input class='inputPwd' type="password" ref="rSetPwd2" v-model="vSetPwd2"
               placeholder="请确认登录密码" v-else oninput="if(value.length>12)value=value.slice(0,12)" />

        <img class='clearCss' v-show="vSetPwd2" @click="clear('vSetPwd2')" src="../../assets/clear.png"/>

        <img v-show="!ifDisplay2" @click="ifDisplay2=!ifDisplay2" class="eye"  src="../../assets/eye_close.png"/>
        <img v-show="ifDisplay2" @click="ifDisplay2=!ifDisplay2" class="eye" src="../../assets/eye_open.png"/>
      </div>

      <!--验证码-->
      <div class='top bber'>
        <input class='inputPwd' type="number" ref="rYanCode" v-model="vYanCode"
               placeholder="请输入短信验证码"  oninput="if(value.length>6)value=value.slice(0,6)" @blur.native="toSafeCertify" />
        <img class='clearCss' v-show="vYanCode" @click="clear('vYanCode')" src="../../assets/clear.png"/>

        <!-- 获取验证码 按钮-->
        <input type="button" class="btn999" :style="btnVertBackStyle" v-bind:disabled="vertDisabled" :value="time"
               @click="getVerificationCode()"/>
      </div>
      <div class="redTips " v-show="rexTip">密码需为6-12位数，数字、字母，或者字母加数字，字母分大小写</div>
      <LoginButton name="确定" :isInputNonEmpty="enable" @click.native="toForgetPwd"></LoginButton>
    </div>
  </div>

</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  import LoginButton from '@/components/LoginButton.vue'
  import Encrypt from '../../api/encrypt.js'
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
        //vSetPwd: null,//密码输入框的值
        vSetPwd1:"",
        vSetPwd2:"",
        ifDisplay1: false,//显示隐藏
        ifDisplay2: false,//显示隐藏
        tempYanCode: null,//验证码临时变量，提供给提交时校验使用
        sessionID :"",
        error:"",
      }
    },
    methods: {
      //清除密码输入框数据
      clear (str) {
        this[str] = '';
      },
     
      //点击图片获取验证码
      getVerificationCode() {

          console.log('验证码')
          //获取验证码前，判断手机格式是否正确
          if (!this.$utils.checkPhone(this.vUserPhone)) {
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              return 
          } 
          const  url = this.$api.ROOT + this.$Constants.APP_SENDCODE;
          this.$indicator.open("请稍候...");
          this.$http.post(url, {
           "telNo": this.vUserPhone, "type": '01'
          })          
            .then(function (res) {
              // console.info('成功请求到后台验证码接口>>>');
              // console.info(res.data)
              const resDate = JSON.parse(res.data)
              if (resDate.respCode == '000000') {
                this.$indicator.close();
                this.$toast('验证码已发送')
              } else {
                this.$indicator.close();
                //console.info('发送验证码失败...');
                this.$toast(resDate.respMsg);
              }
            })
            .catch(function (error) {
              this.$indicator.close();
              //console.error(error);
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });

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
        if (this.$utils.checkPwd(this.vSetPwd1) && this.$utils.checkPwd(this.vSetPwd2) && !this.$StringUtils.isEmpty(this.vUserPhone)
          && !this.$StringUtils.isEmpty(this.vYanCode)) {
          this.enable = true//按钮可用
        } else {
          this.enable = false//按钮不可用
        }
      },
      getOpenApp () {
      //  跳转登陆失效的页面
        if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
          this.$router.replace({path: '/security/fingerLockView'})
        } else {
          this.$router.replace(this.$RM.Login)
        }
      },
      // 确认账号 toComfirmAccount 
      toComfirmAccount(){
        console.log('确认账号')
        //确认账号前，判断手机格式是否正确
        if (!this.$utils.checkPhone(this.vUserPhone)) {
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              return 
        }  
        const url = this.$api.ROOT +this.$Constants.APP_FORGETPSWA;
        this.$indicator.open("请稍候...");       
        const data = {"mobilePhone":this.vUserPhone}
        console.log(data)
        this.$http.post(url, data)
          .then(function (res) {
            console.log(res);
            const resDate = JSON.parse(res.data) ; 
            if (resDate.respCode == '000000') {
              this.$indicator.close();
              console.info("确认账号成功...");
              sessionStorage.removeItem("cacheForgetPhone");
              sessionStorage.setItem("cacheForgetPhone", this.vUserPhone)//提供给忘记密码用
              this.sessionID = resDate.sessionID;
              console.log(this.sessionID)
            }
            else {
              this.$indicator.close();
              console.warn("此手机号还没注册!!!");
              this.$toast(resDate.respMsg);
              
              return
            }
          })
          .catch(function (error) {
            this.$indicator.close();
            //console.error(error);
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
        console.info('>>>>>>>>>>>>确认账号>>>>end>>>>>>>>')
  
      },
      //校验验证码
      toCheckCode(){      
        const url = this.$api.ROOT +this.$Constants.APP_CHECKCODE;
        this.$indicator.open("请稍候...");
        const  data = {"telNo":this.vUserPhone,"code":this.vYanCode}
        console.log(data)
        this.$http.post(url, data)
          .then(function (res) {
            console.log(res);
            const resDate = JSON.parse(res.data) ; 
            if (resDate.respCode == '000000') {
              this.$indicator.close();
              console.info("确认验证码成功...");
              this.error = ""
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
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
        console.info('>>>>>>>>>>>>确认验证码>>>>end>>>>>>>>')
      },
      //安全认证 toSafeCertify 
      toSafeCertify(){
        //先确认验证码
        console.log('安全认证')
        this.toCheckCode();
        const url = this.$api.ROOT +this.$Constants.APP_FORGETPSWB;
        this.$indicator.open("请稍候...");
        const  data = {"mobilePhone": this.vUserPhone,"imgCode":this.vYanCode,"sessionID":this.sessionID}
        console.log(data)
        this.$http.post(url, data)
          .then(function (res) {
            console.log(res);
            const resDate = JSON.parse(res.data) ; 
            if (resDate.respCode == '000000') {
              this.$indicator.close();
              console.info("确认账号成功...");
            }
            else {
              this.$indicator.close();
              console.warn("确认账号失败!!!");
              this.$toast(resDate.respMsg);
            }
          })
          .catch(function (error) {
            this.$indicator.close();
            console.error(error);
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
        console.info('>>>>>>>>>>>>安全认证>>>>end>>>>>>>>')
  
      },
      //设置密码
      toForgetPwd: function () {
        //验证手机号
        if (!this.$utils.checkPhone(this.vUserPhone)) {
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              return 
        }  
        //校验密码1
        if (!this.$utils.checkPwd(this.vSetPwd1)) {
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.PWDINPUTERROR);
            return 
        }  
        //校验密码2
        if (!this.$utils.checkPwd(this.vSetPwd2)) {
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.PWDINPUTERROR);
            return 
        } 
        //校验2个密码输入是否一样
        if(this.vSetPwd2!=""&&this.vSetPwd1!=""){
            if( this.vSetPwd2 != this.vSetPwd1){
                this.$toast("两次密码输入不一致！")
                return 
            }
        }

      var p1 = new Promise((resolve, reject) => {
        const url = this.$api.ROOT +this.$Constants.APP_FORGETPSWB;
        this.$indicator.open("请稍候...");
        const  data = {"mobilePhone": this.vUserPhone,"imgCode":this.vYanCode,"sessionID":this.sessionID}
        this.$http.post(url, data)
          .then(function (res) {
             console.log('11111');
          })
          .catch(function (error) {
            this.$indicator.close();
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
         
      });

      var p2 = new Promise((resolve,reject)=>{         

        this.enable = false ; //设置按钮不可用，防止重复点击
        var that = this;//复制对象
        //开始请求 忘记密码接口
        var reqId = this.$utils.generateSignTime();
        var encStr = Encrypt.msg_md5(this.vSetPwd1).toString();
        const  url=this.$api.ROOT +this.$Constants.APP_FORGETPSWC;
        this.$indicator.open("请稍候...");

        const  data = {"mobile": this.vUserPhone, "password": encStr,"loginid": this.vUserPhone,"sessionID":this.sessionID}
        console.log(data)
         this.$http.post(url, data)
          .then(function (res) {

            console.log(res);
            const resData = JSON.parse(res.data) ;
            if (resData.respCode == '000000') {
              this.$indicator.close();
              this.enable = false ; //设置按钮不可用，防止重复点击
              this.$toast(
                '密码修改成功！下次请用新密码登录'
              );
              //that.$router.push(that.$RM.Login);//跳转登陆页面
              this.$router.go(-1)
            }
            else {
              this.$indicator.close();
              console.warn("设置失败!!!");
              this.$toast(resData.respMsg);
              this.enable = true;
            }
          })
          .catch(function (error) {
            this.$indicator.close();
            console.error(error);
            this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            this.enable = true;
          });
      })
 
    // 调用Promise.all().then(res=>{})
      Promise.all([p2,p1]).then(res=>{
          console.log(res);
 
      })





        // this.enable = false ; //设置按钮不可用，防止重复点击
        // var that = this;//复制对象
        // //开始请求 忘记密码接口
        // var reqId = this.$utils.generateSignTime();
        // var encStr = Encrypt.msg_md5(this.vSetPwd1).toString();
        // console.log(this.vSetPwd1)
        // console.info('>>>密码>>>' + encStr)

        // console.log(this.error)

        // const  url=this.$api.ROOT +this.$Constants.APP_FORGETPSWC;
        // this.$indicator.open("请稍候...");

        // const  data = {"mobile": this.vUserPhone, "password": encStr,"loginid": this.vUserPhone,"sessionID":this.sessionID}
        // console.log(data)
        //  this.$http.post(url, data)
        //   .then(function (res) {

        //     console.log(res);
        //     const resData = JSON.parse(res.data) ;
        //     if (resData.respCode == '000000') {
        //       this.$indicator.close();
        //       this.enable = false ; //设置按钮不可用，防止重复点击
        //       this.$toast(
        //         '密码修改成功！下次请用新密码登录'
        //       );
        //       //that.$router.push(that.$RM.Login);//跳转登陆页面
        //       this.$router.go(-1)
        //     }
        //     else {
        //       this.$indicator.close();
        //       console.warn("设置失败!!!");
        //       this.$toast(resData.respMsg);
        //       this.enable = true;
        //     }
        //   })
        //   .catch(function (error) {
        //     this.$indicator.close();
        //     console.error(error);
        //     this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
        //     this.enable = true;
        //   });
        // console.info('>>>>>>>>>忘记密码>>>>end>>>>')
        
      }
    },
    mounted(){
      let cacheLoginPhone = sessionStorage.getItem("inputPhone");
      let cacheForgetPhone = "";
      if(cacheLoginPhone){
          cacheForgetPhone = cacheLoginPhone
      }else{
          cacheForgetPhone = sessionStorage.getItem("cacheForgetPhone");
      }
      var tempPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!this.$StringUtils.isEmpty(cacheForgetPhone)) {
        if (tempPhone.test(cacheForgetPhone)) {
          this.vUserPhone = cacheForgetPhone
          console.info("用户在上一次登陆的缓存手机号>>>" + cacheForgetPhone)
          this.toComfirmAccount()
        }   
      }   
    },
    watch: {
      //监听这3个值的改变，一改变样式也相对改变
      vUserPhone: {
        handler(){
          this.isBtnEnable()
        }
      },
      vSetPwd1: {
        handler(){
          if (!this.$utils.checkPwd(this.vSetPwd1)) {
            this.rexTip = true//提示语出现
          } else {
            this.rexTip = false
          }
          this.isBtnEnable()
        }
      },
      vSetPwd2: {
        handler(){
          if (!this.$utils.checkPwd(this.vSetPwd2)) {
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

  .btn999 {
    background: #ffffff;
    border: 1px solid #FFC600;
    box-shadow: 0 0 0 0 #FFC600;
    border-radius: 2px;
    padding: 5px 12px;
    margin: 20px 0 10px;
    font-size: 13px;
    color: #FFC600;
    text-align: center;
    line-height: 20px;
  }

  .top {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .content {
    margin-top: 46px;
    color: #4F4F55;
    padding: 0 25px;
  }

  .inputPwd {
    padding: 20px 0 10px;
    line-height: 23px;
    flex-grow: 1;
    font-size: 15px;
    border: none;
  }

  .eye {
    width: 15px;
    height: 10px;
    margin: 34px 13px 15px;
  }

  .clearCss {
    width: 10px;
    height: 10px;
    margin: 34px 15px 15px;
  }
   .clearCss2 {
       margin: 26px 15px 15px;
  }
  .redTips {
    font-size: 12px;
    color: #ff4c4c;
    line-height: 18px;
  }

  .bgc {
    background-color: #ffffff;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;

  }
  .toph50{
    height: 50px;
  }
  .bber,.bter{position: relative;}
  .bber:after,.bter:before{position:absolute;left:0;width:100%;height:1px;background:#ddd;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5)}
  .bter:before{top:0}
  .bber:after{bottom:0}

</style>
