<template>
  <div class="page">
    <van-nav-bar
      class="bar"
      title="关于我们"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <div class="top">
        <img class="img" src="../../assets/ic_launcher.jpg" />
        <span class="title">v1.0.0</span>
      </div>
    </div>
  </div>
</template>
<script>
  import ToolBar from '@/components/ToolBar2.vue'
  export default {

    components: {
      ToolBar
    },
    data() {
      return {}
    },

  }
</script>
<style scoped>
  .content {
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    font-size: 15px;
    margin-top: 70px;
    text-align: justify;
    line-height: 0.7rem;
    padding-top: 0px;
  }
  .top {
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .img {
    width: 60px;
    height: 60px;
  }

  .title {
    color: #343434;
    font-size: 15px;
  }
</style>
