<template>
<div>
 
    <div class='cont-sides'>
        <p class="cont-item">附件信息      
        </p>
    </div>

    <div  class="bgcf">
      <div class="affix-lib bber">
        <div class="affix-type">
           <span >资料类型</span>
        </div>

        <div class="affix-name">
         <span >附件名称</span>
        </div>

        <div class="affix-remark">
            <span >备注</span>
        </div>
      </div>
      <div class="bber bgcf" v-for="(item,index) in fileList" :key="index">
          <div class="affix-lib por">
            <div class="affix-type">
              <span >{{item.dataType}}</span>
            </div>
            <div class="affix-name">
            <span >{{item.fileName}}</span>
            </div>

            <div class="affix-remark">
                <span >{{item.fileDesc}}</span>
            </div>
            <!-- <img class='clear-file' @click="clearFile(index)" src="../../assets/gray-del.png"/> -->
          </div>
      </div>
      
      <div v-if='tipFile' class="tip">暂无更多数据</div>

    </div>



</div>
</template>

<script>
  import Divider from '@/components/Divider.vue'
    export default {
        components: {
          Divider,
        },
        props:['tipFile','fileList'],
        computed: {},
        data() {
            return {
              //nonet: false,//断网
              //enable: true,//立即注册 按钮默认不可用
              //show: false,//测试时为true
              //vDataType:this.optDate[0].value,
              tipShow : false,
 
            }
        },
        mounted(){

           this.tipShow = (this.fileList.length<1)?true:false       
        },
        methods: {
            
        
        },

    }
</script>

<style scoped>
@import "../../css/common";
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    /*background-color:burlywood;*/
    position: relative;
    padding: 0 16px;
  }

  .inputLable {
    font-size: 0.4rem;
    line-height: 23px;
    border: none;
    padding: 20px 0 10px;
  }
.inputVal{
  font-size: 0.4rem;
  line-height: 23px;
  border: none;
  padding: 20px 0 10px;
  margin-right: 15px;
  text-align: right;
}
  .common {
    font-size: 0.4rem;
    line-height: 13px;
    border: none;
    padding: 20px 0 10px;
  }

  .clearCss {
    width: 10px;
    height: 10px; 
    /*margin: 68px 30px 30px;*/
    position: absolute;
    right: 16px;
    top: 23px;
  }
  .add-img {
    width: 25px;
    height: 25px;
    padding: 10px 15px 9px
  } 
  .cont-sides{
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fafafa;
  }

  /* 弹窗样式 */
  .pop-content{
    width: 80%;
  }
  .pop-select{
    outline:none;
    /* -webkit-appearance:none; */
    -webkit-tap-highlight-color:rgba(255,0,0,0);
    border: none;
    text-align: right;
    text-align-last: right;
    background: transparent;
  }

  .file{
     /* text-align: center; */
     padding: 15px;
     position: relative;
  }
  .file-button{
      /* width: 120px;
      height: 60px; */
      color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
    padding: 5px 20px;
    border-radius: 2px;
  }
  .file input{
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 100%;
    opacity: 0;
  }
  .tac{
    text-align: center;
  }
  .confirm{
    background: #fec301;
    margin-right: 10px;
    border: 1px solid #fec301;
  }
  .cancel{
    background-color: #fff;
    margin-left: 10px;
    color: #333;
    border: 1px solid #666;
  }
  .hide{
    display: none;
  }

 .affix-lib {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-size: 15px;
    padding: 10px 16px;
  }

  .affix-type {
      width: 30%;
  }

  .affix-name {
  width: 40%;
  }

  .affix-remark {
  width: 30%;
  }

  .por{
    position: relative;
  }
  .clear-file{
    position: absolute;
    top: 12px;
    right: 16px;
    width: 13px;
    height: auto;
  }
  .redTips {
    font-size: 12px;
    color: #ff4c4c;
    line-height: 18px;
    padding:5px 16px;
  }

</style>
