<!--透明橘色和深橘色状态切换的按钮-->
<template>
  <button type="button" :class="{btnEnable:isInputNonEmpty,btnDisable:!isInputNonEmpty}" class="loginButton"
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
  .loginButton {
    border: none;
    border-radius: 50px;
    height: 44px;
    width: 100%;
    text-align: center;
    font-size: 15px;
    margin-top: 1.4rem;
    color: #fff1e8;
  }

  .btnDisable {
    background-color: rgba(255, 198, 0, 0.5);
   text-shadow: 0 1px 0 rgba(220, 86, 0, 0.50);


  }

  .btnEnable {
      background-color: rgba(255, 198, 0, 1);
   text-shadow: 0 1px 0 #ff6400;
  }
</style>
