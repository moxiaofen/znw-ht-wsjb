<!--picker紧急联系人关系选择器-->
<template>
  <div>
    <div  @click="toShow" id="toShowHid">
      <input readonly="readonly" v-model="relation" name='array' class='inputWidth' type='text' placeholder='请选择' id="inputHid">
      <img src="/static/assets/right.png" class='img_right_Css' id="imgHid"/>
    </div>
    <vue-pickers
      :show="show"
      :columns="columns"
      :selectData="pickData"
      @cancel="close"
      @confirm="confirmFn"></vue-pickers>
  </div>
</template>

<script>
  import vuePickers from 'vue-pickers'
  export default {
    components: {
      vuePickers
    },
    data() {
      return {
        isCopy: '',
        show: false,
        columns: 1,
        pickData: {
          // 第一列的数据结构
          data1:
            [
              {text:'父母',value:1},
              {text:'兄弟姐妹',value:2},
              {text:'配偶',value:3},
              {text:'儿女',value:4}]
        },
        relation: null
      }
    },

    created() {
      var body = document.querySelector('body');
      body.addEventListener('click',(e)=>{
        if( e.target.id === 'inputHid'||e.target.id === 'toShowHid') {
          this.show = true
        }else {
          this.show = false
        }
      },false)
    },
    mounted(){
      //如果紧急联系人关系有缓存，先显示出来
      var cacheUrgentRelation = sessionStorage.getItem('cacheUrgent');

      console.info("如果紧急联系人关系有缓存，先显示出来>>>>"+cacheUrgentRelation)
      if (cacheUrgentRelation != null && cacheUrgentRelation != '') {
        this.relation=cacheUrgentRelation;
      }
    },
    methods: {
      toShow() {
        this.show =!this.show;
      },
      confirmFn(val) {
        sessionStorage.removeItem('cacheUrgent');
        this.show = false;
        var relationIndex=val.select1.value;//取数组第一个值
        if(relationIndex==1){
          this.relation ='父母';
        }
        if(relationIndex==2){
          this.relation ='兄弟姐妹';
        }
        if(relationIndex==3){
          this.relation ='配偶';
        }
        if(relationIndex==4){
          this.relation ='儿女';
        }
        console.info("取到的值是》》》》》"+ this.relation);
        sessionStorage.setItem('cacheUrgent',this.relation);
      },
      close() {
        console.log(123);
        this.show = false
      }
    },
    watch: {
      relation: function (relation) {
        this.$emit('getRelation', relation)
      }
    }
  }
</script>

<style scoped>
  .inputWidth {
    width: 5.7rem;
    height: 1rem;
    line-height: 1rem;
    border: 0;
    /*margin-top: 0.1rem;*/
    font-size: 0.4rem;
    /*不明白这个元素为什么会影响横线*/
    margin-bottom: 8px;
  }
  .btnbox{
    display: flex;
    justify-content: center;
  }
  .result{
    text-align: center;
    padding: 10px;
  }
  input::-webkit-input-placeholder {
    font-size: 30px;
    color: #999;
  }
  .isCopy{
    margin: 10px;
    border: 1px dashed red;
    text-align: center
  }
  /*重写模板样式，优先采用大一点的字体*/
  .area_ctrl {
    font-size: 0.3rem !important;
  }
  .img_right_Css {
    width: 0.3rem;
    height: 0.5rem;
    margin-top: 0.3rem;
  }
</style>

