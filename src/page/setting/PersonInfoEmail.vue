<template>
  <div>
    <!-- <ToolBar page_title="绑定邮箱" :isWhile="false"></ToolBar> -->
    <van-nav-bar
      class="bar"
      title="绑定邮箱"
      left-arrow
      fixed
      right-text="保存"
      border='false'
      @click-left="$router.back(-1)"
      @click-right="save"
    />
    <div class="content">
        <van-cell-group>
           <van-field label="绑定邮箱" v-model="vEmail" clearable="true" input-align="right" placeholder="请输入绑定邮箱" />        
        </van-cell-group>    
    </div>


  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  export default {

    components: {
      ToolBar
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        vEmail:'',

      }
    },
    created(){
       //const loginSession = JSON.parse(sessionStorage.loginSession)
       //this.vName = loginSession.username
       this.loginid = sessionStorage.getItem('loginid')
       this.vEmail = sessionStorage.getItem('email')
    },
    methods: {
      save(){
           //校验邮箱      
           if (!this.$utils.checkEmail(this.vEmail)) {
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201019);
              return false
           } 
           const url = this.$api.ROOT + this.$Constants.CHANGE_EMAIL;
           this.$http.post(url,{"mail":this.vEmail,'userId':sessionStorage.getItem('userId')})
           .then(function (res) {
              const resDate = JSON.parse(res.data);
              console.log(res)   
              if (resDate.respCode === '000000') {
                  this.$indicator.close();
                  this.$toast("修改邮箱成功");
                  sessionStorage.setItem('email',this.vEmail)
                  this.$router.go(-1)
              } else {
                  this.$indicator.close();
                  this.$toast(JSON.parse(resDate.respMsg).error_message);
                  console.warn("修改邮箱失败!!!")
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
