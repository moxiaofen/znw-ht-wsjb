<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="借款">
          <Index @toOwner="toOwner" ref="index"></Index>
        </mt-tab-container-item>
        <mt-tab-container-item id="还款" >
          <RepaySkip></RepaySkip>
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          <Owner></Owner>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="借款">
        <img slot="icon" :src="borrowIcon">
        <span :style="{color:borrowColor}">借款</span>
      </mt-tab-item>
      <mt-tab-item id="还款" click="RepayClick">
        <img slot="icon" :src="repayIcon">
        <span :style="{color:repayColor}">还款</span>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" :src="ownerIcon">
        <span :style="{color:ownerColor}">我的</span>
      </mt-tab-item>
    </mt-tabbar>
    <div id="allmap"></div>
  </div>
</template>
<script>


  import Owner from './owner/Owner.vue'
  import RepaySkip from './repay/RepaySkip.vue'
  import Index from './Index.vue'
  import location from '../api/location.js'
  export default{
    components: {Owner, RepaySkip, Index},
    data() {
      return {
        selected: this.$variable.selected
      };
    },
    computed: {
      borrowIcon() {
        return '../../static/assets/'.concat(this.selected == ('借款') ? 'lend.png' : 'lend_no.png')
      },
      repayIcon(){
        return '../../static/assets/'.concat(this.selected == ('还款') ? 'repay.png' : 'repay_no.png')
      },
      ownerIcon(){
        return '../../static/assets/'.concat(this.selected == ('我的') ? 'my.png' : 'my_no.png')
      },
      borrowColor(){
        return this.selected == ('借款') ? '#ff6400' : '#666666'
      },
      repayColor(){
        return this.selected == ('还款') ? '#ff6400' : '#666666'
      },
      ownerColor(){
        return this.selected == ('我的') ? '#ff6400' : '#666666'
      }
    },
    methods: {
      toOwner(){
        this.selected = '我的'
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
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }
      this.toIndex();
      console.log('params：' + this.$route.params.selected);
      if (this.$route.params && this.$route.params.selected) {
        this.selected = this.$route.params.selected;
        return
      }
    },
    watch: {
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
    }
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
