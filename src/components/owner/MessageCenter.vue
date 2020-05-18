<!--消息中心界面-->
<template>
  <div>
    <ToolBar>消息中心</ToolBar>
    <Divider></Divider>
    <ul>
      <li class="messageItem" v-for="msg in list" @click="toDetail(msg)">
        <div class="itemOne">
          <span class="title">{{msg.theme}}</span>
          <i v-if="msg.state === '01'" class="smallCircle"></i>
          <span class="time">{{msg.date}}</span>
        </div>
        <span class="itemTwo">
        {{msg.description}}
        </span>
        <Divider></Divider>
      </li>
    </ul>
    <div class="nullItem" v-if="isEmptyShow">
      <img src="/static/assets/null_message.png">
      <span>暂无消息</span>
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
//        list: [{
//          theme: '我發覺阿三',
//          date: '2012-12-11',
//          description: '大家發了上空的飛機lads看風景lads的放假啦上帝就發啊收到了附近'
//        },
//          {
//            theme: '我發覺阿三',
//            date: '2012-12-11',
//            description: '大家發了上空的飛機lads看風景lads的放假啦上帝就發啊收到了附近'
//          }],
        list: [],
        isEmptyShow: false
      }
    },
    methods: {
      activation() {
        this.$toast('商户经营性数据授信查询')
      },
      toDetail(msg){
        this.$router.push({path: this.$RM.MessageDetail, query: {detail: msg}})
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.MessageClick,
          "segmentation": {
            appId: window.appId,
          }
        });

      }
    },
    mounted(){

      //进入新界面重置session失效时间
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }
      this.$indicator.open();
      this.$api.post(this.$Constants.GET_MESSAGE_LIST, {
        "appId": window.appId,
        "reqId": this.$StringUtils.getReqId(),
        "timestamp": Date.now(),
        "openId": this.$StringUtils.getOpenId()
      }, function (result) {
        this.$indicator.close();
        if (result && result.ret == 0 && result.data) {
          for (let i = 0; i < result.data.length; i++) {
            this.list.push(result.data[i])
          }
          if (this.list == null || this.list.length <= 0) {
            this.isEmptyShow = true
          }
        } else {
          this.isEmptyShow = true
        }
      }.bind(this), function (err) {
        this.$indicator.close();
        this.isEmptyShow = true
      }.bind(this))
    }
  }
</script>
<style scoped>
  .messageItem {
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }

  .messageItem .itemOne {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
  }

  .messageItem .itemOne .title {
    font-size: 32px;
    color: #333333;
    font-weight: bold;
    margin-left: 30px;
    text-align: left;
  }

  .messageItem .itemOne .smallCircle {
    background: #f43530;
    width: 14px;
    height: 14px;
    border-radius: 100%;
  }

  .messageItem .itemOne .time {
    font-size: 24px;
    color: #999999;
    text-align: right;
    flex-grow: 1;
    margin-right: 30px;
  }

  .messageItem .itemTwo {
    font-size: 26px;
    color: #666666;
    margin: 20px 30px 30px;
    text-align: left;
  }

  .nullItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 321px;
  }

  .nullItem > img {
    width: 181px;
    height: 223px;
  }

  .nullItem > span {
    font-size: 30px;
    color: #666666;
    line-height: 42px;
    text-align: left;
  }

</style>
