<template>
  <button :disabled="!show" class="code" :class="{codeBg2 :!show}">
    <span v-show="show" class="font content1">获取验证码</span>
    <span v-show="!show" class="font content2">{{'重新获取('+count+'s...)'}}</span>
  </button>
</template>
<script>
  const TIME_COUNT = 60;
  let timer = null;
  export default {
    data(){
      return {
        show: true,
        count: '',
        isInterval: true
      }
    },

    methods: {
      getCode(){
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          timer = setInterval(function () {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(timer);
              timer = null;
            }
          }.bind(this), 1000)
        }
      }
    }
  }
</script>
<style scoped>
  .code {
    background: #ffffff;
    border: 1px solid #ff6400;
    border-radius:5px;
    width:198px;
    padding: 0.15rem 0.35rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .codeBg2 {
    background: #f5f5f5;
    border: 1px solid #e1e1e1;
  }

  .code font {
    font-size: 26px;
    line-height: 36px;
    text-align: left;
  }

  .code .content1 {
    color: #ff6400;
  }

  .code .content2 {
    color: #bcbcbc;
  }
</style>
