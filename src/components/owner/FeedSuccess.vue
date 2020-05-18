<!--反馈成功界面-->
<template>
  <div>
    <ToolBar>意见反馈</ToolBar>
    <Divider></Divider>
    <div class="feedSuccess">
      <img src="/static/assets/feed_success.png">
      <span class="success">反馈成功</span>
      <span class="feedDesc">感谢您对我们的支持，我们会认真处理您的反馈，尽快回复您。</span>
    </div>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  export default{
    components: {ToolBar, Divider}
  }
</script>
<style scoped>
  .feedSuccess {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .feedSuccess > img {
    margin-top: 280px;
    width: 140px;
    height: 140px;
  }

  .feedSuccess .success {
    font-size: 36px;
    color: #ff6400;
    margin-top: 50px;
    text-align: center;
  }

  .feedDesc {
    font-size: 30px;
    color: #999999;
    margin: 50px 55px 0px;
    text-align: center;
    line-height: 42px;
  }

</style>
