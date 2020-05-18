<template>
  <div>
    <ToolBar>身份验证
    </ToolBar>
    <Divider></Divider>
    <div class="check">
      <span class="centerText">请输入登录密码,完成身份验证</span>
    </div>
    <div class="accessGroup">
      <div class="accessInfo">
      <input class ="inputPwd" :type="inputType" ref="userPwd" maxlength="16" placeholder="请输入登录密码" v-model="inputInfo">
      </div>
      <img class="clearimgSyle" v-if="clearType" v-on:click="closClick(inputInfo)" src="/static/assets/clearInput.png">
        <img class="imgSyle"  v-on:click="btnClick()"  :src="imgurl">
     </div>

        <span class="forgetbutton" v-on:click="forgetClick()">忘记密码?</span>

      <div class="loginbuttonStyle">
      <button class="loginbutton" v-bind:class="{active:isActive}" @click="changeClick()">下一步</button>
      </div>

  </div>

</template>

<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'

  export default{
    components: {ToolBar, Divider},
    data(){
      return {
        inputType:"password",
        inputInfo: "",
        isActive:false,
        imgType:false,
        imgurl:"/static/assets/eye_close.png",
        clearType:false,

      }
    },
    mounted(){
      //15分钟之后失效，强制登陆
      this.$storeData.fetchSession();
    },
    methods:
    {
      forgetClick:function () {

      // window.location.href="/static/fingerLock/fingerLock.html"

        this.$router.push(this.$RM.ForgetPwd,)
      },
      changeClick:function () {
        let that = this
        console.log(this.$StringUtils.getPhone())
        if(!this.$utils.checkPwd(this.inputInfo)){
          this.$dialog.alert("   ",
            "密码需为6-12位数，数字、字母，或者字母加数字，字母分大小写"
          );
          return
        }
        var publicKey = this.$utils.PUBLIC_KEY2
        var encrypt_rsa = new this.$RSA.RSAKey();
        encrypt_rsa = this.$RSA.KEYUTIL.getKey(publicKey);
        var encStr = encrypt_rsa.encrypt(this.inputInfo)
        encStr = this.$RSA.hex2b64(encStr);

        this.$api.post(this.$Constants.UPDATE_PASSWORD, {
          "appId": window.appId,
          "reqId": this.$utils.generateSignTime(),
          "data": {
            "phoneNo": this.$StringUtils.getPhone(),
            "operType": "10",
            "openId": this.$StringUtils.getOpenId(),
            "password": encStr,
            "mac": "",
          }
        },
         function (result) {
          console.log(result.ret)
          if (result && result.ret == '0') {

            this.$router.push({path:'/security/changerFingerView'})

          }else if(result.ret != '0') {
            let errorTime = Number(result.data.errorTime);
            if (errorTime == 5) {
              that.$dialog.alert("  ",'密码输入错误5次，用户已锁定。您可24小时后重新输入登录或者通过忘记密码重新设置密码。')
            } else {
              that.$dialog.alert("  ",'密码输入错误，请重新输入。您还可以输入' + (5 - errorTime) + '次')
            }

          }
        }.bind(this))
      },

      btnClick:function () {

        if(!this.imgType){
          this.imgurl="/static/assets/eye_open.png"
          this.imgType=true;
          this.inputType="text"
        }else {
          this.imgurl="/static/assets/eye_close.png"
          this.imgType=false;
          this.inputType="password"
        }
      },
      closClick:function(){
        //清空密码
        this.clearType = false
        console.log(this.clearType)
        this.inputInfo=""
        this.isActive=false
        this.clearType = false


      }
    },
    watch: {
      //监听x按钮的状态
      inputInfo: {
        handler: function (val, oldValue) {
          console.log("watch")
          if(val.length>0){
            this.clearType = true;
            this.isActive=true;
            if(val.length>12) {
              this.inputInfo=val.slice(0,12);
            }
          }else{
            this.clearType = false;
            this.isActive=false;
          }

        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .check{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }
  .centerText {
    margin-top: 1rem;
    font-size: 30px;
    color: #666666;
    margin-bottom: 0.3rem;
    text-align: center;

  }

  .inputPwd{

    width: 70%;
    height: 1.3rem;
    text-align: left;
    border: none;
    font-size: 30px;
    color:#999999;


  }
  .loginbuttonStyle{
    margin-top: 1.3rem;
    display: flex;

  }
  .loginbutton {
    margin: auto;
    background-color: #e1e1e1;
    width: 8.7rem;
    height: 1.3rem;
    text-align: center;
    font-size: 30px;
    color: #999999;
    border: none;
    border-radius: 5px;
  }
  .active{
    background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);
    color: white;
  }

  .forgetbutton{
    position: fixed;
    width: 100%;
    margin-left: -0.3rem;
    font-size: 26px;
    color: cornflowerblue;
    text-align: right;
    background-color: white;
    border: none;

  }
  .clearimgSyle{
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.3rem;



  }
  .imgSyle{
    width: 36px;
    height: 20px;
    margin-right: 0.1rem;

  }


  .accessGroup {
    background: #ffffff;
    box-shadow: 0 0 0.04rem 0 rgba(255, 100, 0, 0.08), 0 0.04rem 0.12rem 0 rgba(0, 0, 0, 0.10);
    border-radius: 0.08rem;
    height: 100px;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    margin-bottom: 0.3rem;
    margin-top: 0.2rem;
    padding-left: 0.35rem;
    padding-right: 0.35rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .accessGroup .accessInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
    height-line: 100px;
  }
</style>
