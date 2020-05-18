<template>
  <div >
    <ToolBar ></ToolBar>
    <img src='/static/assets/btnImgError.png' @click="netError" />

  </div>

</template>
<script>

  import ToolBar from '../ToolBar.vue'

  export default{

    components: {ToolBar},
    data(){
      return {


      }
    },
    methods:{
      netError() {
        this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.NET_ERROR);
      }
    }

  }
</script>
<style scoped>

  img{
    width: 100%;
    height: 12rem;
  }
</style>
