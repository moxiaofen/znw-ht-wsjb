<!--紧急联系人选择器-->
<template>
  <mt-popup class="mint-popup-4" v-model="popupVisible" position="bottom">
    <mt-picker :slots="relationSlot" @change="onRelationChange" :visible-item-count="5" :itemHeight="40" showToolbar>
      <div class="title">
        <span class="chooseFinish" @click="cancel">取消</span>
        <span class="chooseFinish flexGrow1" @click="finish">完成</span>
      </div>
    </mt-picker>
  </mt-popup>
</template>
<script>
  export default{
    data(){
      return {
        popupVisible: false,
        relation: '',
        relationSlot: [{
          flex: 1,
          values: ['父母', '兄弟姐妹', '配偶', '儿女'],
          className: 'slot1'
        }],
      }
    },
    methods: {
      onRelationChange: function (picker, values) {
        this.relation = values[0]
      },
      finish(){
        this.$emit('onValueChange', this.relation);
        this.popupVisible = false
      },
      cancel(){
        this.popupVisible = false
      }
    }
  }
</script>
<style scoped>
  .title {
    display: flex;
    flex-direction: row;
    width: 100%;
    background: #f0f0f0;
  }

  .chooseFinish {
    font-size: 0.45rem;
    color: #0076ff;
    padding: 20px 36px;
    text-align: right;
  }

  .flexGrow1 {
    flex-grow: 1;
  }
</style>
