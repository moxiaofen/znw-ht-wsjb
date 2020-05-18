<template>
  <div>
    <!-- <ToolBar page_title="个人信息" :isWhile="false"> </ToolBar> -->
    <van-nav-bar
      class="bar"
      title="个人信息"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />

    <van-cell-group class="content">
      <van-cell  title="头像">          
           <img style="width:60px;height:60px" ref='img' alt="handleFile" :src="src" />
           <input type="file" accept="image/*" class="van-uploader__input" ref="inputImg" @change="handleFile">
      </van-cell>

      <van-cell title="用户昵称" is-link :value="loginid"  to="/setting/PersonInfoName" />
      <van-cell title="登录密码" is-link value="******"  to="/setting/PersonInfoPsw" />
      <van-cell title="绑定邮箱" is-link :value="email"  to="/setting/PersonInfoEmail" />
      <van-cell title="绑定手机" is-link :value="mobile"  to="/setting/PersonInfoPhone" />

    </van-cell-group>

   



      
      <!-- <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="toNext" borderRadius="6px"></LoginButton> -->
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  import LoginButton from '@/components/LoginButton.vue'
  export default {
    components: {
      ToolBar
      
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        src: 'https://img.yzcdn.cn/vant/cat.jpeg',

        //loginSession:{},
        loginid:'',
        mobile:'',
        email:'',
      }
    },
    created(){
       //this.loginSession = JSON.parse(sessionStorage.getItem('loginSession'))
       this.loginid = sessionStorage.getItem('loginid')
       this.mobile = sessionStorage.getItem('mobile')
       this.email = sessionStorage.getItem('email')

    },
    methods: {

      handle() {
            const file = this.$refs.inputImg.files[0];
            // createObjectURL传入File类型的数据创建url，可以在浏览器看到网络请求
            const ObjectURL = URL.createObjectURL(file);
            const rimg = this.$refs.img;
            rimg.src = ObjectURL;
            rimg.onload = function(img) {
                URL.revokeObjectURL(this.src);  // 释放createObjectURL创建的对象##
            }
            
      },

      handleFile(){
           this.handle();
           const url = this.$api.ROOT + this.$Constants.CHANGE_HEADERIMG;
           this.$http.post(url,{'userId':sessionStorage.getItem('userId')})
           .then(function (res) {
              //  const data = JSON.parse(res.data);
              //  const records = data.records
               console.log(res)                           
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      }


    },
 

  }
</script>

<style scoped>
.content {
  margin-top: 46px;
  position: relative;
}
.input-right{
  text-align: right;
} 
.bar {
  background-color: #FFC600;
  color: #ffffff;
}


</style>
