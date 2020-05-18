<!--进件中,商户协议的内容页面-->
<template>
    <div class="page">
      <ToolBar>个人征信查询授信协议 </ToolBar>
<div class="content">
  本合同记载的借款金额、借款日期、还款日期如与借款凭证记载不相一致时，以借款凭证记载为准。借款凭证为本合同的组成部分，与本合同具有同等法律效力。<br/> 　　

  <span>(1)借款人提前还款，应当向贷款人提出书面申请，并征得贷款人同意。提前还款是利率不变，贷款人有权按本合同的预定的借款期限计收利息。</span><br/>  　　
  <span>5、利息计付：</span><br/>
 <span> (1)本合同项下借款年利率为­3%。短期贷款按本合同利率执行;中长期贷款利率按中国人民银行规定一年一定，第一年按本合同利率执行。 </span><br/> 　
  <span>(2)本合同项下借款按月结息，结息日为每月的第20日。</span><br/>
 <span> 第二条 除非满足以下先决条件，否则贷款人有权拒绝提供本合同项下贷款：</span><br/>
 <span> 1、借款人在贷款人处开立 帐户，并通过该帐户办理与本合同项下贷款有关的往来结算和存款。</span><br/>
 <span> 2、每次提款时，借款人已填妥有关借款凭证，并根据贷款人要求提供有关文件、资料。</span><br/>
 <span> 3、若本合同项下贷款有抵押、质押担保，则借款人已根据贷款人要求办妥登记及/或保险等法律手续，且该担保、保险持续有效。</span><br/> 　
 <span> 第三条 贷款人权利和义务</span><br/>
 <span> 1、贷款人有权了解借款人的生产经营、财务活动、物资库存和贷款的使用等情况，要求借款人按期提供财务报表等文件、资料和信息。</span>


  </div>


    </div>
</template>
<script>

  import ToolBar from '../ToolBar.vue'
  export default {

    components: {ToolBar},
    data(){
      return {


      }
    },
    //生命周期方法
    mounted(){
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }
    }
  }
</script>
<style scoped>
.page{

  background-color: #f2f2f2;

}
  .content{

    margin-left: 0.4rem;
    margin-right: 0.4rem;

    font-size:30px;
    color:#666666;
    text-align:justify;

    line-height: 0.7rem;

    padding-top: 0.4rem;
  }
</style>
