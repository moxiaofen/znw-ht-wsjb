<!--头部标题栏-->
<template>
  <div >
    <mt-header fixed="true" :title="page_title" :class="{btnEnable:isWhile,btnDisable:!isWhile}" class="header" >

      <div slot="left" class="left">
        <img class="img"  v-if="isShowNav == true" @click="back"  :src="imgUrl" />
      </div>

    </mt-header>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    props: {
      page_title: String,
      isShowNav: {
        type: [Boolean, String],
        default: true
      },
      imgUrl: {
        type:[String],
        default: "static/assets/icon_while_back.png" ,
      },
      isWhile: {
        type: Boolean,
        default: false
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
    display: flex;
    justify-content: center;

    height: 50px;
    line-height: 50px;
    width: 100%;
    font-size: 18px;
    font-weight: bolder;
    flex-direction: row;
    margin: auto 0;
  }

  .btnDisable {
  background-color: #FFC600;
  color: #ffffff;

  }

  .btnEnable {
  background-color: #ffffff;
    color: #1f1f1f;
  }

  .left{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
  }

  .img {
    height: 30px;
    width: 30px;
  }
  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
