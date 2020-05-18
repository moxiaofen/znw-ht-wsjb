<template>
  <div>
    <!-- <ToolBar page_title="登录密码 " :isWhile="false"></ToolBar> -->
    <van-nav-bar
      class="bar"
      title="登录密码 "
      left-arrow
      fixed
      right-text="保存"
      border='false'
      @click-left="$router.back(-1)"
      @click-right="save"
    />
    <div class="content">
        <van-cell-group>
           <van-field v-model="vPsdOld" type="password" clearable="true" input-align="right" label="原密码" placeholder="请输入原密码" />
           <van-field v-model="vPsdNew" type="password" clearable="true" input-align="right" label="新密码"  placeholder="请输入新密码"/>
           <van-field v-model="vPsdAgain" type="password" clearable="true" input-align="right" label="确认密码" placeholder="请再次输入原密码"/>
        </van-cell-group>    
    </div>


  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import Encrypt from '../../api/encrypt.js'

  export default {

    components: {
      ToolBar
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        vPsdOld:'',
        vPsdNew:'',
        vPsdAgain:'',
      }
    },
    created(){
      //  const loginSession = JSON.parse(sessionStorage.loginSession)
      //  this.vName = loginSession.username
    },
    methods: {
      save(){
           //var encStr = Encrypt.msg_md5(this.vRegisterPwd1).toString();
           const url = this.$api.ROOT + this.$Constants.CHANGE_PSW;
           const data = {
             'userId':sessionStorage.getItem('userId'),
             'oldPassword' : Encrypt.msg_md5(this.vPsdOld).toString(),
             'password' : Encrypt.msg_md5(this.vPsdNew).toString(),
             'confirmPw' : Encrypt.msg_md5(this.vPsdAgain).toString()
           }
           this.$http.post(url,data)
           .then(function (res) {
              const resDate = JSON.parse(res.data);
              console.log(res)   
              if (resDate.respCode === '000000') {
                  this.$indicator.close();
                  this.$toast("修改密码成功");
                  this.$router.go(-1)
              } else {
                  this.$indicator.close();
                  this.$toast(JSON.parse(resDate.respMsg).error_message);
                  console.warn("修改密码失败!!!")
              }                          
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      }

    },
 

  }
</script>
<style>
 .bar .van-nav-bar__text{
   color: #fff;
 }
</style>
<style scoped>
.content {
  margin-top: 46px;
  position: relative;
  padding-bottom: 30px;
}

.bar {
  background-color: #FFC600;
  color: #ffffff;
}
 .van-nav-bar__text{
   color: #fff;
 }
/* .hide-updata{
  position: relative;
  margin-top: -130px;
  background: transparent;
}
.van-uploader__wrapper{
  position: relative;
}
.van-uploader__upload{
  position: absolute;
  left: 0;
  top: 0;

}
.van-uploader__input{

} */

</style>
