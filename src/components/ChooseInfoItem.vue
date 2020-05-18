<!--右侧有箭头符号并可通过选择器或者输入来选择的信息编写Item-->
<template>
  <div class="backGround">
    <div class="infoItem">
      <span class="leftText">
        <slot></slot>
      </span>
      <input v-if="isInput" class="rightText" v-model="editContent" :placeholder="placeHolder"
             :maxlength="maxLength">
      <span class="rightText" v-else>{{editContent}}</span>
      <img v-if="isEdit == true" src="../../static/assets/right_arrow.png" class="img">
    </div>
    <Divider></Divider>
  </div>
</template>
<script>
  import Divider from '../components/Divider.vue'
  export default{
    components: {Divider},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      isInput: {
        type: Boolean,
        default: false
      },
      placeHolder: {
        type: String,
        default: ''
      },
      maxLength: {
        type: Number,
        default: 10000
      }
    },
    data(){
      return {
        editContent: ''
      }
    }
  }
</script>
<style scoped>
  .backGround {
    background: #FFFFFF;
    padding-left: 30px;
  }

  .infoItem {
    display: flex;
    flex-direction: row;
    padding: 30px 0;
    align-items: center;
  }

  .leftText {
    font-weight: bold;
    font-size: 30px;
    color: #666666;
    line-height: 42px;
    text-align: left;
    flex-basis: auto;
  }

  .rightText {
    font-size: 30px;
    text-align: right;
    padding-right: 30px;
    border: none;
    outline: none;
    line-height: 42px;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .img {
    width: 17px;
    height: 31px;
    padding-right: 30px;
    margin: auto;
  }

</style>
