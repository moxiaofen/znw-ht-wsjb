<!--授权成功界面-->
<template>
  <div>
    <ToolBar>新商盟授权</ToolBar>
    <Divider></Divider>
    <div class="feedSuccess">
      <img src="/static/assets/commit_success.png">
      <span class="success">提交成功</span>
      <span class="feedDesc">恭喜您，授权提交成功，状态已激活。<br>祝您用款愉快！</span>
      <button @click="goMain">
        返回首页
      </button>
    </div>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  export default{
    components: {ToolBar, Divider},
    methods: {
      goMain(){
        this.$router.push({path: this.$RM.Main})
      }
    }
  }
</script>
<style scoped>
  .feedSuccess {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .feedSuccess > img {
    margin-top: 2.8rem;
    width: 2rem;
    heigh: 2rem;
  }

  .feedSuccess .success {
    font-size: 0.41rem;
    color: #ff6400;
    margin-top: 0.5rem;
  }

  .feedDesc {
    font-size: 0.35rem;
    color: #999999;
    margin-top: 0.5rem;
    text-align: center;
    line-height: 0.42rem;
  }

  .feedSuccess > button {
    background: #ffffff;
    border: 2px solid #ff6400;
    border-radius: 5px;
    width: 2.5rem;
    height: 0.82rem;
    line-height: 0.82rem;
    font-size: 0.35rem;
    color: #ff6400;
    letter-spacing: 0;
    text-align: center;
    margin-top: 1rem;
  }

</style>

