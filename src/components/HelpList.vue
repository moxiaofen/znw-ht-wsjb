<!--帮助中心item-->
<template>
  <ul>
    <li @click="showDesc">
      <img :src="arrow" :class="{arrowDown : isVisible}"/>
      <span>{{item.theme}}</span>
    </li>
    <Divider></Divider>
    <div v-if="isVisible" class="desc">{{item.dateil}}</div>
  </ul>
</template>
<script>
  import Divider from '../components/Divider.vue'
  export default{
    components: {Divider},
    props: {
      item: {}
    },
    data () {
      return {
        isVisible: false,
        arrow: '../../static/assets/right_arrow.png'

      }
    },
    methods: {
      showDesc: function () {
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.HelpClick,
          "segmentation": {
            appId: window.appId,
          }
        });
        this.isVisible = !this.isVisible
        this.arrow = this.isVisible ? '../../static/assets/down_arrow.png' : '../../static/assets/right_arrow.png'
      }
    }
  }
</script>
<style scoped>
  ul > li {
    margin-left: 30px;
    display: flex;
    flex-direction: row-reverse;
  }

  li span {
    font-size: 30px;
    color: #666666;
    line-height: 42px;
    padding: 23px 0;
    text-align: left;
    flex-grow: 1;
  }

  ul img {
    width: 16px;
    height: 35px;
    padding-right: 30px;
    margin: auto;
  }

  .arrowDown {
    width: 35px;
    height: 16px;
  }

  .desc {
    padding: 20px 30px;
    font-size: 26px;
    color: #9b9b9b;
    text-align: justify;
    line-height: 38px;
    text-shadow: 0 1px 0 #ffffff;
    background: #f5f5f5;
  }

</style>
