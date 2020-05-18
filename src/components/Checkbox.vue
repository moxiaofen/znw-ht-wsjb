<!--公用的复选框样式页面-->
<template>
  <!--<div>-->
  <label class="show-boxttt">

    <!--<input type="checkbox" id="checkbox-2-1" class="regular-checkbox big-checkbox" v-model="checked"/><label-->
    <!--for="checkbox-2-1"></label>-->

    <input type="checkbox" v-model="checked" />
    <div class="show-box" ></div>


  </label>
  <!--</div>-->

</template>
<script>
  export default{
    data(){
      return {
        checked: false
      }
    },
    watch: {
      checked: function (val) {
        this.$emit('onCheckChange', val)
        console.info("选择了吗？？？"+val)
        sessionStorage.setItem(this.$parent.$options.name + 'checked', val)
      }
    },
    mounted(){
      this.checked = sessionStorage.getItem(this.$parent.$options.name + 'checked') === 'true'
    }
  }
</script>
<style scoped>

  label {
    cursor: pointer;

  }
  input {
    display: none;
    cursor: pointer;
  }
  .show-box {
    display: none;
  }

  .show-box {
    top: 0;
    left: 0;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 1px;
    border: 1px solid #d8d8d8;
    background: white;
  }


  .show-boxttt {
    display: block;
    top: 0;
    left: 0;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 1px;
    border: 1px solid #d8d8d8;
    background: white;
  }

  input:checked + .show-box {
    display: block;
    content: '';
    top: 0px;
    left: 0px;
    margin-left: 0.1rem;
    width: 5px;
    height: 9px;
    border: solid #ff6400;

    border-radius: 2px;
    border-width: 0 2px 2px 0;

    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
  }



</style>
