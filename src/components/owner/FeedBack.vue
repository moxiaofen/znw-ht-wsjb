<!--意见反馈-->
<template>
  <div style="height: 100%;background: #f5f5f5;">
    <ToolBar>意见反馈</ToolBar>
    <div class="feedBack">
      <span class="title">欢迎留下宝贵意见：</span>
      <textarea
        type="text"
        class="input"
        v-model="feedBack"
        maxlength="500"
        placeholder="请详细描述您的问题或建议，我们将及时跟进解决。请详细描述您的问题或建议，我们将及时跟进解决。请详细描述您的问题或建议，我们将及时跟进解决。请详细描述您的问题或建议，我们将及时跟进解决。请详细描述您的问题或建议，我们将及时跟进解决。请详细描述您的问题……"
      ></textarea>
      <div class="protocol">
        <Checkbox class="cb" @onCheckChange="onCheckChange"></Checkbox>
        <span class="text">允许后台客户电话回访</span>
      </div>
      <input type="text" class="phone" v-if="check" placeholder="请输入您的电话号码" v-model="phone"
             oninput="if(value.length>11)value=value.slice(0,11)">
      <CommitButton name="提交" :isInputNonEmpty="isInputNonEmpty" @click.native="commit"></CommitButton>
    </div>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Checkbox from '../Checkbox.vue'
  import CommitButton from '../CommitButton.vue'
  import SM from '../../api/SessionManager.js'
  export default{
    name: SM.FeedBack,
    components: {ToolBar, Checkbox, CommitButton},
    mounted(){
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }
    },
    data(){
      return {
        check: false,
        feedBack: '',
        phone: '',//可选
        isInputNonEmpty: false
      }
    },
    methods: {
      onCheckChange: function (val) {
        this.check = val
        console.info(this.check)
      },
      commit: function () {
        let toast = this.$toast;
        let indicator = this.$indicator
        let router = this.$router
        if (this.$StringUtils.isEmpty(this.feedBack)) {
          toast('反馈内容不能为空');
          return
        }
        if (this.check && this.$StringUtils.isEmpty(this.phone)) {
          toast('电话号码不能为空')
          return
        }
        if (this.check && !this.$regx.isPhone(this.phone)) {
          toast('电话号码格式错误')
          return
        }
        indicator.open()
        this.$api.post(this.$Constants.FEED_BACK, {
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId(),
          "data": {
            "phoneNo": this.phone,
            "opinion": this.feedBack,
            "allowCall": this.check ? 1 : 0
          }
        }, function (result) {
          indicator.close()
          if (result && result.ret == 0) {
            Countly.init({
              app_key: this.$Constants.APPKEY,
              url: this.$Constants.ROOTMAI, //your server goes here
              debug: true,
            })
            Countly.track_sessions();
            Countly.track_pageview();
            Countly.add_event({
              key: this.$Constants.FeedClick,
              "segmentation": {
                appId: window.appId,
              }
            });

            router.replace(this.$RM.FeedSuccess)
          }
        }.bind(this), function (err) {
          indicator.close()
        })
      }
    },
    watch: {
      feedBack: function (val, oldVal) {
        this.isInputNonEmpty = !this.$StringUtils.isEmpty(val)
      }
    }
  }
</script>
<style scoped>
  .feedBack {
    background: #f5f5f5;
    display: flex;
    padding: 30px 30px 0;
    flex-direction: column;
  }

  .feedBack .title {
    font-size: 26px;
    color: #666666;
    text-align: left;
  }

  .feedBack .input {
    margin-top: 0.21rem;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    padding: 30px;
    font-size: 30px;
    color: #333333;
    text-align: justify;
    line-height: 42px;
    height: 310px;
  }

  .feedBack .protocol {
    display: flex;
    flex-direction: row;
    margin-top: 0.2rem;
  }

  .feedBack .protocol .cb {
    width: 0.30rem;
    height: 0.30rem;
  }

  .feedBack .protocol .text {
    font-size: 26px;
    color: #999999;
    text-align: left;
    margin-left: 30px;
  }

  .feedBack .phone {
    margin-top: 20px;
    padding-left: 30px;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    font-size: 30px;
    outline: none;
    color: #999999;
    letter-spacing: 0;
    line-height: 42px;
    text-align: left;
    border-radius: 5px;
    height: 78px;
  }

  .feedBack .btn {
    background: #e1e1e1;
    border-radius: 0.05rem;
    height: 0.88rem;
    font-size: 0.28rem;
    margin-top: 1.6rem;
    color: #999999;
    text-shadow: 0 1px 0 #ffffff;
    text-align: center;
  }
</style>
