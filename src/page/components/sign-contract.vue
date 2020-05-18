<template>
<div  class="reset-pop">
   <van-popup
     
      v-model="showPop"
      round
      position="bottom"
      :style="{ height: '25%' }"
    >
      <!-- <van-cell title="" value="" /> -->
      <p class="pop-title">请输入电子签约预留手机收到的短信验证码</p>
      <van-field
        v-model="checkCode"
        center
        clearable
        label=""
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="getAuthorizeCode">发送验证码</van-button>
        </template>
      </van-field>

      <div class="btn-box">
        <a class="btn btn-all" href="javascript:void(0)" @click ="comfirm">确定</a>
        <a class="btn btn-line" href="javascript:void(0)" @click ="cancel">取消</a>
      </div>
    </van-popup>
    <!-- <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <div class="block" />
        </div>
        <van-loading v-show='showLoading' size="24px" vertical>请稍候...</van-loading>
    </van-overlay> -->






</div>
</template>

<script>
import { Toast } from 'vant';
export default {
  props:['showPop','contractNo'],
  data() {
    return {
      showLoading:false,//请稍微弹窗
      checkCode : '',
         
    }
  },
  created() {
      this.checkCode = ''

  },
  methods: {
      //获取授权码
      getAuthorizeCode() {
        // data: {"custNo":custNo,"contractNo":JSON.parse(sessionStorage.getItem('pdfData')).contractNo},   APPLY_AUTHORIZE_CODE,
          const data = {
            "custNo":sessionStorage.getItem('custNo'),
            "contractNo": this.contractNo
          }
          const  url = this.$api.ROOT + this.$Constants.APPLY_AUTHORIZE_CODE;
          this.$indicator.open("请稍候...");
          //this.showLoading = true;
          this.$http.post(url,data)          
            .then(function (res) {
              console.info('成功请求到后台验证码接口>>>');
              console.info(res.data)
              const resDate = JSON.parse(res.data)
              if (resDate.respCode == '000000') {
                this.$indicator.close();
                this.$toast('获取授权码成功')
              } else {
                this.$indicator.close();
                console.info('获取授权码失败...');
                this.$toast(JSON.parse(resDate.respMsg).error_message);
              }
            })
            .catch(function (error) {
              this.$indicator.close();
              console.error(error);
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });
 

      },

      //确认授权码
      comfirm(){         
          // data:{"custNo":custNo,"contractNo":contracts[0].contractNo,checkCode:checkCode},
          const data = {
            "custNo":sessionStorage.getItem('custNo'),
            "contractNo": this.contractNo,
            checkCode:this.checkCode
          }
          const  url = this.$api.ROOT + this.$Constants.COMFIRM_AUTHORIZE_CODE;
          this.$indicator.open("请稍候...");
          this.$http.post(url,data)          
            .then(function (res) {
              console.info('成功请求到后台验证码接口>>>');
              console.info(res.data)
              const resDate = JSON.parse(res.data)
              if (resDate.respCode == '000000') {
                this.$indicator.close();
                this.$toast('在线签约成功')
                this.showPop = false  
                this.checkCode = ''
              } else {
                this.$indicator.close();
                console.info('在线签约失败...');
                this.$toast(JSON.parse(resDate.respMsg).error_message);
              }
            })
            .catch(function (error) {
              this.$indicator.close();
              console.error(error);
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });

      },
      cancel(){
          this.showPop = false    
      },


  }
}
</script>

<style >
/* 提示语z-index提升 */
.reset-pop .van-overlay{
  z-index: 1 !important;
}

  /* .w100{
    width: 100%;
  }

  .credit-item{
    width: 100%;
        display: flex;
  }
  .credit-item .van-radio__label{
    flex: 1;
  } */
</style>
<style scoped>


.btn-box{
  display: flex;
  text-align: center;
  padding:20px 10px;
}
.btn{
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
  margin:0 10px;
  color: #fff; 
}
.btn-all{
  background-color: #fec301;
  border: 1px solid #fec301;
}
.btn-line{
  border: 1px solid #fec301;
  color: #fec301;
}


.pop-title{
  padding:8px 16px;
}


/* .wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
} */

</style>
