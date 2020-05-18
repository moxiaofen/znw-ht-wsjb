<template>
  <div>
    <van-nav-bar
      class="bar"
      title="再保理资产详细信息"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <!--与顶部保持距离-->
      <div class='item'>
        <span class='item-left'>资产编号</span>
        <span class='item-right flex1 word-break' ref="rAssetsNo">{{resData.assetsNo}}</span>
      </div>


      <div class='item'>
        <span class='item-left'>再保理合同编号</span>
        <span class='item-right flex1 word-break' ref="rContractNo">{{resData.contractNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>再保理商名称</span>
        <span class='item-right flex1 word-break' ref="rCustName">{{resData.custName}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>保理类别</span>
        <span class='item-right' ref="rProjectName">{{resData.projectName}}</span>
      </div>


      <div class='item'>
        <span class='item-left'>保理品种</span>
        <span class='item-right' ref="rBusinessType">没返回这字段</span>
      </div>

      <div class='item'>
        <span class='item-left'>再保理融资金额（元）</span>
        <span class='item-right' ref="rLoanAmt">{{resData.loanAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>回款核销金额（元）</span>
        <span class='item-right' ref="rCanAmt">{{resData.canAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>再保理融资余额（元）</span>
        <span class='item-right' ref="rLoanBal">{{resData.loanBal}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>合同生效日</span>
        <span class='item-right' ref="rContractStartDate">没返回这字段</span>
      </div>

      <div class='item'>
        <span class='item-left'>合同到期日</span>
        <span class='item-right' ref="rTerm">{{resData.term}}2000.00</span>
      </div>

      <div class='item'>
        <span class='item-left'>回款账号</span>
        <span class='item-right flex1 word-break' ref="rContractEndDate">没返回这字段</span>
      </div>

      <div class='item'>
        <span class='item-left'>状态</span>
        <span class='item-right' ref="rStatus">没返回这字段</span>
      </div>
      
      <!-- 基础资产信息 -->
      <refactoring-list :tip='tip' :refactoringList='assetsList'></refactoring-list>
      
      <!-- 资料信息 -->
      <file-list :tipFile='tipFile' :fileList='fileList'></file-list>

    </div>
  </div>
</template>

<script>
  import RefactoringList from '../components/refactoring-list'
  import FileList from '../components/file-list'
  export default {
    components: {
      RefactoringList,
      FileList
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        id:"",
        resData:{}, 
        assetsList:[],
        tip:false,
        fileList:[], 
        tipFile:false,    
      }
    },
    
    created() {
        this.queryFinancingDetail();
    },
    methods: {
      //获取详情
      queryFinancingDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_REFACTORING_DETAIL;
          this.$http.post(url,{"assetsNo": this.id})
              .then(function (res) {
                  this.resData = JSON.parse(res.data); 
                  console.log(this.resData) 
                  this.assetsList = this.resData.assetsList  
                  this.tip = (this.assetsList.length<1) ? true:false;
                  this.fileList = this.resData.fileList     
                  this.tipFile = (this.fileList.length<1) ? true:false;            
              })
              .catch(function () {
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
              });
      }  
    },
  }
</script>

<style scoped>
@import "../../css/common";
  .content {
    margin-top: 46px;
    position: relative;
  }
    .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
</style>
