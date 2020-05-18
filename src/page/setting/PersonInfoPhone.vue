<template>
  <div>
    <!-- <ToolBar page_title="绑定手机" :isWhile="false"></ToolBar> -->
    <van-nav-bar
      class="bar"
      title="绑定手机"
      left-arrow
      fixed
      right-text="保存"
      border='false'
      @click-left="$router.back(-1)"
      @click-right="save"
    />
    <div class="content">
        <van-cell-group>
           <van-field label="绑定手机" v-model="vPhone" clearable="true" input-align="right" placeholder="请输入手机号" />
          <van-field
            v-model="vPhoneCode"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button size="small" type="primary" @click="getVerificationCode">发送验证码</van-button>
            </template>
          </van-field>


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
        vPhone : '',
        vPhoneCode : '',
      }
    },
    created(){
       this.vPhone = sessionStorage.getItem('mobile')
    },
    methods: {
      //点击图片获取验证码
      getVerificationCode() {
          if (!this.$utils.checkPhone(this.vPhone)) {
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              return false
          }
          const  url = this.$api.ROOT + this.$Constants.APP_SENDCODE;
          this.$indicator.open("请稍候...");
          this.$http.post(url, {
           "telNo": this.vPhone, "type": '02'
          })          
            .then(function (res) {
              console.info(res.data)
              const resDate = JSON.parse(res.data)
              if (resDate.respCode == '000000') {
                this.$indicator.close();
                this.$toast('验证码已发送')
              } else {
                this.$indicator.close();
                console.info('发送验证码失败...');
                this.$toast(resDate.msg);
              }
            })
            .catch(function (error) {
              this.$indicator.close();
              console.error(error);
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });     
      },
      save(){
           if (!this.$utils.checkPhone(this.vPhone)) {
                this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
                return false
           }          
           const url = this.$api.ROOT + this.$Constants.CHANGE_PHONE;
           const data = {
              'phone' : this.vPhone,
              'phoneCode': this.vPhoneCode
           }
           this.$http.post(url,data)
           .then(function (res) {
              const resDate = JSON.parse(res.data);
              console.log(res)   
              if (resDate.respCode === '000000') {
                  this.$indicator.close();
                  this.$toast("修改手机号成功");
                  sessionStorage.setItem('mobile',this.vPhone)
                  this.$router.go(-1)
              } else {
                  this.$indicator.close();
                  this.$toast(JSON.parse(resDate.respMsg).error_message);
                  console.warn("修改手机号失败!!!")
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
 .bar .van-nav-bar__text{
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
