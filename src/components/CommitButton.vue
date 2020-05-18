<!--灰色和橘色状态切换的按钮-->
<template>
  <button type="button" :class="{btnEnable:isInputNonEmpty,btnDisable:!isInputNonEmpty}" class="commitButton"
          :disabled="!isInputNonEmpty">
    {{name}}
  </button>
</template>
<script>
  export default{
    props: {
      name: {
        type: String,
        default: ''
      },
      isInputNonEmpty: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style scoped>
  .commitButton {
    border: none;
    border-radius: 5px;
    height: 88px;
    width: 100%;
    text-align: center;
    font-size: 28px;
    margin-top: 1.4rem;
  }

  .btnDisable {
    color: #999999;
    background: #e1e1e1 none;
    text-shadow: 0 1px 0 #ffffff;
  }

  .btnEnable {
    color: #ffffff;
    background-image: linear-gradient(90deg, #ff8c40 0%, #ff6400 100%);
    text-shadow: none;
  }
</style>
