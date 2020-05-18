<!--商户经营性数据授权查询-->
<template>
  <div>
    <ToolBar>商户经营性数据授权查询</ToolBar>
    <Divider></Divider>
    <p>商户经营性数据授权查询</p>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  export default{
    components: {ToolBar, Divider},
    mounted(){
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }
    }
  }
</script>
<style scoped>
  p {
    padding: 30px;
  }
</style>
