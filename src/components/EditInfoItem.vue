<!--可切换编辑模式的信息编写item，isEdit属性为true则为input可编辑，isEdit属性为false则为span不可编辑-->
<template>
  <div class="backGround">
    <div class="infoItem">
      <span class="leftText">
        {{desc}}
      </span>
      <input v-if="isEdit" class="rightText" v-model="editContent" :placeholder="placeHolder"
             :class="{alignLeft:!isRight,alignRight:isRight}" :maxlength="maxLength" :type="type">
      <span class="rightText" :class="{alignLeft:!isRight,alignRight:isRight}" v-else>{{editContent}}</span>
      <slot></slot>
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
        type: [Boolean],
        default: false
      },
      isRight: {
        type: [Boolean],
        default: true
      },
      editContent: {
        type: String,
        default: ''
      },
      placeHolder: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      maxLength: {
        type: Number,
        default: 10000
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    methods: {
      valueChange(){
        this.$emit()
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
    white-space: nowrap;
    flex-basis: auto;
  }

  .alignLeft {
    text-align: left;
  }

  .alignRight {
    text-align: right;
  }

  .rightText {
    font-size: 30px;
    border: none;
    outline: none;
    color: #999999;
    padding-right: 30px;
    flex-grow: 1;
    line-height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
