<!--我的界面-->
<template>
  <mt-loadmore :top-method="loadTop" ref="loadmore">
    <div>
      <ToolBar isShowNav="false">
        <img src="/static/assets/info.png" slot="right" class="barRight" @click="toMessageCenter">
        <i v-if="isShowBadge" class="smallCircle"></i>
      </ToolBar>
      <div class="toolBarExtra">
        <span class="loginName" @click="login">{{loginName}}</span>
        <span class="loginTips" @click="login">欢迎来到安田</span>
      </div>
      <p class="accessTitle">授权信息</p>
      <div class="accessGroup">
        <div class="accessInfo">
          <span class="businessAccess">新商盟授权</span>
          <span v-if="accessState == 3" class="accessInvalid">授权失效，请重新授权</span>
        </div>
      <span class="businessBtn" :class="{auth : accessState == 1}"
            @click="toAccess">{{accessState==1 ?'已授权':'立即授权'}}</span>
      </div>
      <Divider style="margin-top: 0.8rem;margin-left: 0.3rem"></Divider>
      <ul>
        <li v-for="(text,index) in textList" style="margin-left: 0.3rem">
          <IntentItem :index="index" isBold @click.native="intent(index)">{{text.text}}</IntentItem>
        </li>
      </ul>
      <IntentItem style="margin-left: 0.3rem" @click.native="intent(5)" isBold>
        电话咨询
      <span slot="extra_text" class="phone" @click="PhoneClick">
        {{phone}}
      </span>
      </IntentItem>
      <IntentItem style="margin-left: 0.3rem;margin-bottom: 1.5rem" @click.native="exit" isBold>
        安全退出
      </IntentItem>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
  </mt-loadmore>
</template>
<script>
  import IntentItem from '../IntentItem.vue'
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  // import store from './store'
  const AUTH = 1;
  const UN_AUTH = 2;
  const INVALID = 3;
  export default{
    components: {IntentItem, ToolBar, Divider},
    data(){
      return {
        //新商盟授权的状态，1代表已授权，2，代表未授权，3代表失效，失效要显示红色提示消息
        accessState: UN_AUTH,
        loginName: !this.$StringUtils.isLogin() ? '登录/注册' : '安田',
        phone: '4006887777',
        sheetVisible: false,
        isShowBadge: false,
        newReturnBusinessAccount: '',
        actions: [],
        textList: [
          {
            id: 0,
            text: '我的信息'
          }, {
            id: 1,
            text: '业务开展区域校验'
          }, {
            id: 2,
            text: '安全设置'
          }, {
            id: 3,
            text: '帮助中心'
          }, {
            id: 4,
            text: '意见反馈'
          }
        ]
      }
    },
    methods: {
      PhoneClick(){
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.telephoneClick,
          "segmentation": {
            appId: window.appId,
          }
        });

      },
      intent(index){
        switch (index) {
          case 0:
            if (!this.$StringUtils.isLogin()) {
              this.$router.push(this.$RM.Login)
            } else {
              if (this.accessState == AUTH) {
                this.$router.push(this.$RM.PersonInfo)
              } else {
                this.$toast('您暂未授信，无信息展示')
              }
            }
            break;
          case 1:
            if (!this.$StringUtils.isLogin()) {
              this.$router.push(this.$RM.Login)
            } else {
              this.$router.push(this.$RM.QueryBusinessArea)
            }
            break;
          case 2:
            if (!this.$StringUtils.isLogin()) {
              this.$router.push(this.$RM.Login)
            } else {
              this.$router.push(this.$RM.SecuritySetting)
            }
            break;
          case 3:
            this.$router.push(this.$RM.HelpCenter)
            break;
          case 4:
            if (!this.$StringUtils.isLogin()) {
              this.$router.push(this.$RM.Login)
            } else {
              this.$router.push(this.$RM.FeedBack)
            }
            break;
          case 5:
            this.sheetVisible = true
            break
        }
      },
      loadTop(){
        if (!this.$StringUtils.isLogin()) {
          console.log("未登录")
          this.$refs.loadmore.onTopLoaded();
          // 没有登陆则不查询是否授权和是否有未读消息
          return
        }
        console.log('查询授权信息');
        this.$api.post(this.$Constants.IS_ACCESS, {
          //        "appId": window.appId,
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId(),
        }, function (result) {
          this.$refs.loadmore.onTopLoaded();
          this.saveAccessData(result);
        }.bind(this), function (err) {
          this.$refs.loadmore.onTopLoaded();
        }.bind(this))
      },
      saveAccessData(result){
        if (result && result.ret) {
          if (result.data) {
            this.newReturnBusinessAccount = result.data.newReturnBusinessAccount
            this.loginName = result.data.legalPersonName
          }
          switch (result.ret) {
            case '0':
              this.accessState = AUTH
              break
            case '100000':
              this.accessState = UN_AUTH
              break
            case '100002':
              this.accessState = INVALID
              break
          }
        }
      },
      toMessageCenter(){
        if (!this.$StringUtils.isLogin()) {
          this.$router.push(this.$RM.Login)
        } else {
          this.$router.push(this.$RM.MessageCenter)
        }
      },
      toAccess(){
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.confirmButton_two,
          "segmentation": {
            appId: window.appId,
          }
        });
        if (!this.$StringUtils.isLogin()) {
          // 没有登陆跳转到登陆界面
          this.$router.push(this.$RM.Login)
        } else {
          switch (this.accessState) {
            case AUTH:
              this.$router.push({name: this.$RM.AccessInfo, params: {account: this.newReturnBusinessAccount}})
              break
            case INVALID:
              this.$router.push({name: this.$RM.BusinessAccess, params: {account: this.newReturnBusinessAccount}})
              break
            case UN_AUTH:
              this.$toast('暂无授权信息')
              break
          }
        }
      },
      call(){
        console.log(window.appId)
        if (window.appId == "ANDROID" || window.appId == "IOS") {
          window.interfacePhone.callPhone(this.phone)
        }


      },
      login(){
        if (!this.$StringUtils.isLogin()) {
          this.$router.push(this.$RM.Login)
        }
      },
      exit(){
        if (!this.$StringUtils.isLogin()) {
          this.$router.push(this.$RM.Login)
        } else {
          this.$dialog.confirm('  ', '是否退出当前登录账号', {confirmButtonText: '是', cancelButtonText: '否'})
            .then(function (action) {
              this.$storeData.romveTimeSession()
              sessionStorage.removeItem('cachePhone')
              this.$router.push(this.$RM.Login)
              if (window.appId == "IOS") {
                window.interfacePhone.removeSession()
                window.interfacePhone.removePwd()
              }
            }.bind(this));
        }
      }

    },
    mounted(){
      this.actions = [{
        name: this.phone,
        method: this.call
      }];
      //15分钟之后失效，强制登陆
      this.$storeData.fetchSession();
      console.log('查询是否有未读消息');
      this.$api.post(this.$Constants.GET_MESSAGE_LIST, {
        //        "appId": window.appId,
        "appId": window.appId,
        "reqId": this.$StringUtils.getReqId(),
        "timestamp": Date.now(),
        "openId": this.$StringUtils.getOpenId()
      }, function (result) {
        if (result && result.data) {
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].state === '01') {
              // 只要消息列表有一条未读消息，图标就显示红点
              this.isShowBadge = true
            }
          }
        }
      }.bind(this))

      console.log('查询授权信息');
      this.$api.post(this.$Constants.IS_ACCESS, {
        //        "appId": window.appId,
        "appId": window.appId,
        "reqId": this.$StringUtils.getReqId(),
        "timestamp": Date.now(),
        "openId": this.$StringUtils.getOpenId(),
      }, function (result) {
        this.saveAccessData(result);
      }.bind(this))
    }
  }
</script>
<style scoped>
  .smallCircle {
    position: absolute;
    background: #f43530;
    right: 0;
    margin-top: 12px;
    margin-right: 16px;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    z-index: 1;
  }

  .barRight {
    position: absolute;
    right: 0;
    height: 0.5rem;
    width: 0.55rem;
    margin-top: 0.2rem;
    padding-right: 0.30rem;
  }

  .toolBarExtra {
    background: #ffffff;
    height: 240px;
    display: flex;
    padding-left: 30px;
    flex-direction: column;
    align-items: flex-start;
    -webkit-tap-highlight-color: transparent;
  }

  .toolBarExtra .loginName {
    font-size: 42px;
    color: #333333;
    margin-top: 60px;
    line-height: 60px;
    text-align: left;
    font-weight: bolder;
  }

  .toolBarExtra .loginTips {
    font-size: 26px;
    color: #666666;
    margin-top: 5px;
    text-align: center;
    margin-bottom: 80px;
  }

  .accessTitle {
    font-size: 36px;
    color: #111111;
    text-align: left;
    line-height: 54px;
    margin-top: 60px;
    font-weight: bolder;
    margin-left: 30px;
  }

  .accessInvalid {
    font-size: 24px;
    color: #ff0000;
    letter-spacing: 0;
    text-align: left;
  }

  .accessGroup {
    background: #ffffff;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 8px;
    height: 180px;
    margin: 20px 30px 0;
    padding: 0 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .accessGroup .accessInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
  }

  .accessGroup .accessInfo .businessAccess {
    font-size: 30px;
    color: #333333;
    letter-spacing: 0;
    text-align: left;
    font-weight: bolder;
  }

  .accessGroup .businessBtn {
    border: 2px solid #017ad4;
    border-radius: 100px;
    width: 154px;
    color: #017ad4;
    text-align: center;
    font-size: 26px;
    line-height: 56px;
  }

  .phone {
    font-size: 26px;
    color: #999999;
    line-height: 42px;
    margin-right: 36px;
    text-align: right;
  }

  .auth {
    border: none;
    color: #017ad4;
  }

</style>
