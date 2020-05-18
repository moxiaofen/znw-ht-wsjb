<!--公用的获取验证码样式页面-->
<template>
  <div>
    <!--发送验证码的按钮-->
    <input type="button" class="btn999" :style="btnBackStyle" v-bind:disabled="disabled" :value="time"
           @click="getVerificationCode()"/>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        disabled: false,//发送验证码 按钮默认不可用
        time: '获取验证码', //倒计时
        currentTime: 61,//发送验证码
      }
    },
    methods: {
      //点击图片获取验证码
      getVerificationCode() {
        //倒计时1分钟，才可重新点击获取
        this.getCode();
        this.disabled = ''//按钮不可用，防止重复点击
      },
      //验证码倒计时
      getCode() {
        var interval = null //倒计时函数
        var that = this;
        var currentTime = that.currentTime;
        interval = setInterval(() => {
          currentTime--;
          that.time = '(' + currentTime + ')重新获取';
          //按钮颜色置灰
          that.btnBackStyle = 'color:#999999;border:1px solid #e1e1e1; box-shadow:0 0 4px 0 rgba(193,193,193,0.40);'
          if (currentTime <= 0) {
            clearInterval(interval);
            that.time = '重新获取';
            that.currentTime = 61;
            that.disabled = false;//按钮可用
            that.btnBackStyle = "";//变亮
          }
        }, 1000)
      },
    },


  }
</script>
<style scoped>
  .btn999 {
    background: #ffffff;
    border: 1px solid #ff6400;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.30);
    border-radius: 4px;
    width: 178px;
    height: 58px;
    margin: auto;
    font-size: 26px;
    color: #ff6400;
    text-align: center;
    line-height: 40px;
  }


</style>
