<!--头部标题栏-->
<template>
  <div :style="{background : bgColor}">
    <header class="text">
      <!--使用slot插槽-->
      <slot></slot>
      <img   v-if="isShowNav == true" src="static/assets/toolbar_nav.png" class="left" @click="back"/>
      <slot name="right" class="right"></slot>
    </header>
  </div>
</template>

<script>
  export default{
    data() {
      return {

      };
    },
    props: {
      page_title: String,
      bgColor: {
        type: [Number, String],
        default: "#ffffff"
      },
      isShowNav: {
        type: [Boolean, String],
        default: true
      }
    },

    methods: {
      back() {

        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  header {
    height: 44px;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    margin: auto 0;
  }

  .text {
    font-size: 18px;
    color: #111111;
    font-weight: bolder;
    text-align: center;
    line-height: 44px;
    position: relative;
  }

  .left {
    height: 100%;
    width: 44px;
    top: 0rem;
    float: left;
  }
  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

</style>
