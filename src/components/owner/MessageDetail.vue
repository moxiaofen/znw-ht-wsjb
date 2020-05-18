<!--消息详情界面-->
<template>
  <div>
    <ToolBar>消息中心</ToolBar>
    <Divider></Divider>
    <div class="messageItem">
      <span class="title">{{msg.theme}}</span>
      <span class="time">{{msg.date}}</span>
      <span class="itemTwo">
        {{msg.description}}
      </span>
    </div>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import InfoItem from '../EditInfoItem.vue'
  export default{
    components: {ToolBar, Divider, InfoItem},
    data(){
      return {
        msg: {}
      }
    },
    mounted(){

      //进入新界面重置session失效时间
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }
      if (this.$route.query && this.$route.query.detail) {
        this.msg = this.$route.query.detail
        // 修改消息已读状态
        this.$indicator.open()
        this.$api.post(this.$Constants.MODIFY_MESSAGE_STATUS, {
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "openId": this.$StringUtils.getOpenId(),
          "data": {
            "infoId": this.msg.infoNo
          }
        }, function (result) {
          this.$indicator.close()
        }.bind(this), function (err) {
          this.$indicator.close()
        }.bind(this))
      }
    }
  }
</script>
<style scoped>
  .messageItem {
    background: #ffffff;
    display: flex;
    padding-left: 30px;
    padding-top: 30px;
    flex-direction: column;
  }

  .messageItem .title {
    font-size: 32px;
    font-weight: bold;
    color: #333333;
    text-align: left;
  }

  .messageItem .time {
    font-size: 24px;
    color: #999999;
    text-align: left;
    margin-top: 20px;
    flex-grow: 1;
  }

  .messageItem .itemTwo {
    font-size: 26px;
    color: #666666;
    margin-top: 20px;
    text-align: left;
  }

</style>
