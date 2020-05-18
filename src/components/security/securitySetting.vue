<!--安全设置界面-->
<template>
  <div>
    <ToolBar>安全设置
    </ToolBar>
    <Divider></Divider>
    <div class="infoItem" >
      <span class="leftText">登录账号</span>
      <span class="rightText">{{phone}}</span>
    </div>
    <Divider ></Divider>
    <div class="infoItem" v-on:click="pwdClick">
      <span class="leftText">修改登录密码:</span>
      <img class="rightImge" src="/static/assets/right_arrow.png"/>
    </div>
    <div style="height: 0.2rem; background: #f5f5f5"></div>
    <div class="switch">
      <span class="leftext">手势密码登录</span>
      <mt-switch v-model="value" @change="turn"></mt-switch>
    </div>
    <Divider v-bind:class="{active:isActive}"></Divider>
    <div class="infoItem" v-if="flag" v-on:click="fingerPwdClick">
      <span class="leftText">修改手势密码:</span>
      <img class="rightImge" src="/static/assets/right_arrow.png"/>
    </div>
    <Divider  v-if="flag" ></Divider>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import InfoItem from '../EditInfoItem.vue'

  import IntentItem from '../IntentItem.vue'

  export default{
    components: {ToolBar, Divider},
    created(){
//      this.$on('intent', function (index) {
//        switch (index) {
//          case 0:
//            this.$router.push({path: '/security/changePwd'})
//            break;
//          case 1:
//            this.$router.push({path: '/security/securityCheck'})
//            break;
//          default:
//            break;
//        }
//      })
    },
    data(){
      return {
        phone:this.$StringUtils.getPhone().replace(/(\d{3})\d{4}(\d{4})/,"$1****$2"),
        flag:true,
        value:true,
        isActive:true,
        fingerLockType:this.$StringUtils.getFingerLockType()


      }
    },
    mounted() {
      //15分钟之后失效，强制登陆
      this.$storeData.fetchSession();
      console.log(this.$StringUtils.getFingerLockType())
        //判断手势开关是否打开
        if (this.$StringUtils.isEquals(this.$StringUtils.getFingerLockType(),"2")) {
          this.flag = true;
          this.value = true;
          this.isActive=true;
        } else {

          this.flag = false;
          this.value = false;
          this.isActive=false;

        }

    },
    methods: {
      pwdClick:function () {
        this.$router.push(this.$RM.ChangePwd)
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.SedPwdClick,
          "segmentation": {
            appId: window.appId,
          }
        });
      },
      fingerPwdClick:function () {
        this.$router.push(this.$RM.SecurityCheck)
      },
      //点击手势开关
      turn: function(){
        console.log(this.flag)
        if(this.flag){
          this.flag=!this.flag;
          this.isActive =!this.isActive;
          this.$StringUtils.setFingerLockType("1")
          if(window.appId == "IOS" ) {
            window.interfacePhone.saveFingerPwd(JSON.stringify({isLock:"1",pwd:JSON.stringify(this.$StringUtils.getFingerLockPwd())}))
          }
        }else{
          this.flag=!this.flag;
          this.isActive =!this.isActive;
          this.$StringUtils.setFingerLockType("2")
          if(window.appId == "IOS" ) {
            window.interfacePhone.saveFingerPwd(JSON.stringify({isLock:"2",pwd:JSON.stringify(this.$StringUtils.getFingerLockPwd())}))
          }
        }


      }
    }
  }
</script>
<style scoped>

  .leftext {
    margin-left: 0.3rem;
    font-size: 0.38rem;
    color: #666666;
    text-align: left;
    line-height:   100px;
    width: 88%;
  }

  .switch {
    display: flex;
    flex-direction: row;

    align-items: center;
    line-height: 1rem;
  }
  .infoItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 100px;
  }
  .leftText{
    margin-left: 0.3rem;
    color: #666666;
    font-size: 30px;
    flex-grow: 1;

  }
  .rightText{
    margin-right: 0.3rem;
    color: #666666;
    font-size: 30px;

    text-align: right;
  }
  .rightImge{
    width: 17px;
    height: 31px;
    margin-right: 30px;

  }
  .active{
    /*margin-left: 0.3rem;*/
  }
</style>
