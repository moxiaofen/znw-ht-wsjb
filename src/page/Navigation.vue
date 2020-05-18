<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="首页">
          <HomePage @toOwner="toOwner" ref="index"></HomePage>
        </mt-tab-container-item>
        <mt-tab-container-item id="我的" >
          <MinePage></MinePage>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="首页">
        <img slot="icon" :src="borrowIcon">
        <span :style="{color:borrowColor}">首页</span>
      </mt-tab-item>
      <mt-tab-item id="我的" click="RepayClick">
        <img slot="icon" :src="repayIcon">
        <span :style="{color:repayColor}">我的</span>
      </mt-tab-item>
    </mt-tabbar>
    <div id="allmap"></div>
  </div>
</template>
<script>

  import HomePage from './home/Home.vue'
  import MinePage from './mine/Mine.vue'
  import LoginPage from './login/Login.vue'

  import location from '../api/location.js'
  export default{
    components: {HomePage, MinePage, LoginPage},
    data() {
      return {
        selected: this.$variable.selected
      };
    },
    computed: {
      borrowIcon() {
        return 'static/assets/'.concat(this.selected == ('首页') ? 'home_selected.png' : 'home_normal.png')
      },
      repayIcon(){
        return 'static/assets/'.concat(this.selected == ('我的') ? 'mine_selected.png' : 'mine_normal.png')
      },

      borrowColor(){
        return this.selected == ('首页') ? '#FFC600' : '#888888'
      },
      repayColor(){
        return this.selected == ('我的') ? '#FFC600' : '#888888'
      }
    },
    methods: {
      toOwner(){
        this.selected = '首页'
      },
      toIndex(){
        this.$refs.index.onIndexSelected();
      },
    },
    destroyed(){
      this.$variable.selected = this.selected
    },
    mounted(){
      //15分钟之后失效，强制登陆
     /* if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }
      this.toIndex();
      console.log('params：' + this.$route.params.selected);
      if (this.$route.params && this.$route.params.selected) {
        this.selected = this.$route.params.selected;
        return
      } */
    },
   /* watch: {
      selected: function (val, oldVal) {
        if (this.selected === '借款') {
          //15分钟之后失效，强制登陆
          if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
            return
          }
          this.$refs.index.onIndexSelected();
          return
        }
        else if(this.selected === '还款'){
          //15分钟之后失效，强制登陆
          if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
            return
          }
          Countly.init({
            app_key: this.$Constants.APPKEY,
            url: this.$Constants.ROOTMAI, //your server goes here
            debug: true,
          })
          Countly.track_sessions();
          Countly.track_pageview();
          Countly.add_event({
            key: this.$Constants.RepayClick,
            "segmentation": {
              appId: window.appId,
            }
          });

          return
        }
        else if(this.selected === '我的'){
          //15分钟之后失效，强制登陆
          if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
            return
          }
        }
      }
    } */
  }
</script>
<style scoped>

  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

</style>
