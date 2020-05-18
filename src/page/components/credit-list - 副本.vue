<template>
<div>
    <van-cell title="选择授信合同" value="" />
    <van-field name="radio" label="">
      <template #input>
        <van-radio-group class="w100"  v-model="radio" direction="columns">
          <van-radio  class="credit-item" :name="index" v-for='(item,index) in creditList' :key='index'>
              <van-cell center :title="item.creditContractNo" :value="item.contractEndDate" :label="item.custName" />             
          </van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <div class="btn-box">
       <a class="btn btn-all" href="javascript:void(0)" @click = "comfirm">确定</a>
       <a class="btn btn-line" href="javascript:void(0)" @click = "cancel">取消</a>
    </div>



</div>
</template>

<script>
import { Toast } from 'vant';
export default {
  props:['showPop'],
  data() {
    return {
      radio: '1',
      creditList:[],
      showPop:true,
      
    }
  },
  created() {
        this.queryContractList();
  },
  methods: {
      //获取列表  queryContractList   
      queryContractList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_CONTRACT_LIST;
           this.$http.post(url,{"creditContract":{"custNo":"C000259","contractStatus":"04","pageNo":this.pageIndex,"pageSize":this.pageSize}})
           .then(function (res) {
               const data = JSON.parse(res.data);
               this.creditList = data.records
               console.log(records)
             
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      comfirm(){
          console.log(this.radio)
      },
      cancel(){
        console.log(1)
        this.showPop = false
          this.$emit('hideItem')
      },


  }
}
</script>

<style >
  .w100{
    width: 100%;
  }

  .credit-item{
    width: 100%;
        display: flex;
  }
  .credit-item .van-radio__label{
    flex: 1;
  }
</style>
<style scoped>

.btn-box{
  display: flex;
  text-align: center;
  padding:20px 10px;
}
.btn{
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
  margin:0 10px;
  color: #fff; 
}
.btn-all{
  background-color: #fec301;
  border: 1px solid #fec301;
}
.btn-line{
  border: 1px solid #fec301;
  color: #fec301;
}
</style>
