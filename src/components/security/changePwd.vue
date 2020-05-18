<template>
  <div>
  <ToolBar>修改密码
  </ToolBar>
    <Divider></Divider>
    <ul>
      <li v-for="(item,index) in items" :key="item.index">
        <div class="changePwd">
          <span class="itemText">{{item.text}}</span>
          <input class="inputPwd" :class="{inputWith:item.isInputWith}" :type="item.pswType" maxlength="16" :placeholder="item.placeholder" v-model="item.inputInfo" v-on:change="change(item.index,item.inputInfo)" oninput="if(value.length>12)value=value.slice(0,12)">

          <div style="display: flex;flex-direction: row;justify-content: flex-end;align-items: center; flex-grow: 1;margin-right:30px;">
            <img class="clearimgSyle" v-if="item.clearType" v-on:click="closClick(item.inputInfo,item.index)" src="/static/assets/clearInput.png">
            <img class="imgSyle"  v-on:click="btnClick(item.index)"  :src="item.imgurl">
          </div>

        </div>
        <div class="line"  v-if="item.index <2"></div>
      </li>
    </ul>
    <Divider></Divider>
    <span class="pwdStateStyle">{{pwdState}}</span>
    <div class="loginTyle">
    <button class="button"  v-bind:class="{active:isActive}"  v-on:click="loginClick()" >修改登录密码</button>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  export default{
    components: {ToolBar, Divider},
    data(){
      return {
        isActive:false,//点击修改按钮颜色改变
        oldpwd:"",    //原密码
        npwd:"",      //新密码
        nnPwd:"",     //新密码
        key:Number,
        pwdState:"",
        btnRegister: 'color:#999999 ; background-color: #e1e1e1',//下一步样式
        items:[
          {text:"原登录密码",index:0,inputInfo:"",isInputWith:true,imgurl:"/static/assets/eye_close.png",clearType:false,imgType:false,pswType:"password",placeholder:"6-12位，数字和字母"},
          {text:"新登录密码",index:1,inputInfo:"",isInputWith:true,imgurl:"/static/assets/eye_close.png",clearType:false,imgType:false,pswType:"password",placeholder:"6-12位，数字和字母"},
          {text:"确认登录密码",index:2,inputInfo:"",isInputWith:false,imgurl:"/static/assets/eye_close.png",clearType:false,imgType:false,pswType:"password",placeholder:"6-12位，数字和字母"},
        ]

      }
    },
    mounted(){
      //15分钟之后失效，强制登陆
      this.$storeData.fetchSession();
    },
    methods:
      {
        change:function(index,inputInfo){

          if(index==0){
            console.log("0")
            this.items[index].clearType = true
            this.oldpwd=inputInfo
            if(!this.$utils.checkPwd(this.npwd)){

              this.pwdState="密码需为6-12位数，数字、字母，或者字母加数字，字母分大小写"
              this.isActive=false
              return
            }
            if((this.npwd== this.nnPwd) && !this.$StringUtils.isEmpty(this.oldpwd)){
              this.isActive=true

            }
          }
          else  if(index==1){
            console.log("1")
            this.npwd = inputInfo
            this.items[index].clearType = true
            if(this.$utils.checkPwd(this.npwd)){

              this.pwdState=""
              this.isActive=false
            }else{
              this.pwdState="密码需为6-12位数，数字、字母，或者字母加数字，字母分大小写"
              this.isActive=false
              return
            }
            if(this.nnPwd !=this.npwd){

              this.pwdState="2次密码输入不一致"
              this.isActive=false
              return
            }
            if((this.npwd== this.nnPwd) && !this.$StringUtils.isEmpty(this.oldpwd )){
              this.isActive=true
              return

            }

          }else if(index==2){
            console.log("2")
            this.nnPwd = inputInfo
            this.items[index].clearType = true
            if(!this.$utils.checkPwd(this.nnPwd)){

              this.pwdState="密码需为6-12位数，数字、字母，或者字母加数字，字母分大小写"
              this.isActive=false
              return
            }
            if(this.nnPwd !=this.npwd){

              this.pwdState="2次密码输入不一致"
              this.isActive=false
              return
            }else{
              if(this.oldpwd==this.nnPwd){
                this.$dialog.alert("当前密码和新密码一致,请重新输入", "提示")
                this.pwdState=""
                this.isActive=false
                return
              }

              if((this.npwd== this.nnPwd) && !this.$StringUtils.isEmpty(this.oldpwd)){
                this.isActive=true
                this.pwdState=""

              }

            }

          }

        },
        loginClick: function () {
          console.log("")
          if(this.isActive) {
            var publicKey = this.$utils.PUBLIC_KEY2
            var encrypt_rsa = new this.$RSA.RSAKey();
            encrypt_rsa = this.$RSA.KEYUTIL.getKey(publicKey);
            var oldEncStr = encrypt_rsa.encrypt(this.oldpwd)
            oldEncStr = this.$RSA.hex2b64(oldEncStr);
            var newEncStr = encrypt_rsa.encrypt(this.npwd)
            newEncStr = this.$RSA.hex2b64(newEncStr);
            console.info('>>>老密码>>>' + oldEncStr+'>>>新密码>>>' + newEncStr)
            this.$api.post(this.$Constants.UPDATE_PASSWORD, {
              "appId": window.appId,
              "reqId": this.$utils.generateSignTime(),
              "data": {
                "phoneNo": this.$StringUtils.getPhone(),
                "operType": "7",
                "openId": this.$StringUtils.getOpenId(),
                "password": oldEncStr,
                "newpassword": newEncStr,
                "mac": "",
              }
            }, function (result) {

              if (result && result.ret) {
                if(result.ret == 0){
                  Countly.init({
                    app_key: this.$Constants.APPKEY,
                    url: this.$Constants.ROOTMAI, //your server goes here
                    debug: true,
                  })
                  Countly.track_sessions();
                  Countly.track_pageview();
                  Countly.add_event({
                    key: this.$Constants.SetPwdClick_two,
                    "segmentation": {
                      appId: window.appId,
                    }
                  });
                  console.log(result.data)
                  this.$toast(
                    result.msg,
                  );
                  this.$router.go(-1)
                }else{
                  this.$toast(
                    result.msg,
                  );
                }
              }
            }.bind(this))
          }
        },

        btnClick:function (index) {

          if(!this.items[index].imgType){
            this.items[index].imgurl="/static/assets/eye_open.png"
            this.items[index].imgType=true;
            this.items[index].pswType="text"
          }else {
            this.items[index].imgurl="/static/assets/eye_close.png"
            this.items[index].imgType=false;
            this.items[index].pswType="password"
          }
        },
        closClick:function(info,index){
          //清空密码
          this.items[index].inputInfo=""
          this.isActive=false
          this.items[index].clearType = false
      }


      },
    watch: {

//      oldpwd: {
//        handler(){
//
//          if (this.$StringUtils.isEmpty(this.oldpwd)) {
//            this.btnRegister = 'color:#999999 ; background-color: #e1e1e1';//暗色
//
//          }
//          if(!this.$StringUtils.isEmpty(this.oldpwd) && !this.$StringUtils.isEmpty(this.nnPwd) && !this.$StringUtils.isEmpty(this.npwd)){
//            this.btnRegister = 'color:#fff ;background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);';//背景橙色
//
//          }
//        }
//      },
//      npwd: {
//        handler(){
//
//          if (this.$StringUtils.isEmpty(this.npwd)) {
//            this.btnRegister = '';//暗色
//
//          }
//          if(!this.$StringUtils.isEmpty(this.oldpwd) && !this.$StringUtils.isEmpty(this.nnPwd) && !this.$StringUtils.isEmpty(this.npwd)){
//            this.btnRegister = 'color:#fff ;background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);';//背景橙色
//
//          }
//        }
//      },
//      nnPwd: {
//        handler(){
//
//          if (this.$StringUtils.isEmpty(this.nnPwd)) {
//            this.btnRegister = '';//暗色
//
//          }
//          if(!this.$StringUtils.isEmpty(this.oldpwd) && !this.$StringUtils.isEmpty(this.nnPwd) && !this.$StringUtils.isEmpty(this.npwd)){
//            this.btnRegister = '  color:#fff ;background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);';//背景橙色
//
//          }
//        }
//      },
      //监听x按钮的状态
      items:{
        handler:function(val, oldValue){
          console.log("watch")
          var temp
          for(var i=0;i < val.length;i++){
            temp = val[i].inputInfo
            if(temp.length > 0){
              this.items[i].clearType = true
            }
          }


        },
        deep: true
      }

    }
  }

</script>
<style scoped>
  .itemText{
    margin-left: 0.3rem;
    font-size: 30px;
    white-space: nowrap;
    color: #666666;

  }
  .changePwd {
    display: flex;

    line-height: 100px;
  }
  .line {
    margin-left: 0.3rem;
    background: #e1e1e1;
    width: auto;
    border-width: 0;
    color: #e1e1e1;
    height: 2px;

  }
  .loginTyle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    margin-top: 0.7rem;
  }
  .button {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
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
  .clearimgLeft{

    margin-left: 5px;

  }
  .clearimgSyle{
    width: 0.3rem;
    height: 0.3rem;
    align-items: center;
    margin-right: 10px;

  }
  .imgSyle {
    width: 0.4rem;
    height: 0.3rem;
  }

  .inputPwd{
    border:none;
    text-align: left;
    margin-left: 20px;
    width: 50%;
    line-height: 1rem;
    font-size: 30px;
    margin-right: 10px;
    color:#c1c1c1;

    /*line-height: 1rem;*/
  }
  .inputWith{
    margin-left: 50px;
  }
  .pwdStateStyle{
    margin-left: 0.3rem;
    float: left;
    color: red;
    font-size: 24px;

  }
</style>
