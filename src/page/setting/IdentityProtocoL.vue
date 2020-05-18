<!--进件中,商户协议的内容页面-->
<template>
  <div class="page">
    <!-- <ToolBar page_title="免责说明" :isWhile="false"></ToolBar> -->
    <van-nav-bar
      class="bar"
      title="免责说明"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <p class="txt-cont">本网站是深圳前海中农易安商业保理有限公司（以下简称“本公司”）为用户提供的互联网保理金融服务平台，本声明为有关网站使用的条款，凡浏览使用本网站及相关网页的用户，均表示接受以下条款。本公司保留依法对本声明包含的条款、条件和说明变更的权利。您对条款有任何不清楚的地方，请及时咨询相应的专业人事寻求协助。</p> 
      <p class="txt-cont">本网站包含的条款、条件和说明的变更自公布时生效，您继续使用本网站，则视为您接受所有更改。请您及时浏览本网站声明，以了解本网站政策的变化。我们将依据本声明来处理您向我们提供的信息，请您务必仔细阅读。</p>       
      <section>1、<span class="commonCss">您注册成为本网站用户即表明您已经仔细阅读了本网站的声明及相关协议，并且对相关内容与信息充分知晓与理解，并愿意遵守相关条款约束。</span>　
      </section>
      <section>2、<span class="commonCss">在法律规定的情况下，如司法机关、监管机构及其他相关机构提出要求，本公司有可能向其提供您的相关信息。</span>      　　
      </section>
      <section>3、<span class="commonCss">对于由于您将用户密码告知他人或与他人共享注册账户，因此导致的任何资料、客户信息的泄露，产生的任何操作风险，本网站及本公司不承担任何责任。</span>
      </section>
      <section>4、<span class="commonCss">对于任何由于黑客攻击、计算机病毒侵入或发作、因政府管制或不可抗力而造成的暂时性关闭等影响网络正常经营之不可抗力而造成的个人资料泄露、丢失、被盗用或被篡改等，本网站及本公司不承担任何责任。</span>
     </section>
      <section>5、<span class="commonCss">本公司有权于任何时间暂时或永久修改或终止本服务(或其任何 部分)，而无论其通知与否，本站对平台用户和任何第三人均不承担任何责任。</span> 　　
      </section>
      <section>6、<span class="commonCss">本声明解释权及修订权归深圳前海中农易安商业保理有限公司所有。</span>
      </section>
    </div>

  </div>
</template>
<script>
  import ToolBar from '@/components/ToolBar2.vue'
  export default {

    components: {
      ToolBar
    },
    data() {
      return {}
    },
    mounted(){
      //  sessionStorage.setItem('keepAliveFlag',1)
    }

  }
</script>
<style scoped>
  .page .fixed {
    position: fixed;
    width: 100%;
  }

  .commonCss {
    font-weight: normal;

  }

  section>span {
    margin-left: 0.4rem;
  }

  section {
    font-weight: bold;
  }

  .company {
    font-weight: bold;
  }

  .page {
    background-color: #f2f2f2;
  }

  .content {
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    font-size: 15px;
    color: #666666;
    margin-top: 50px;
    text-align: justify;
    line-height: 0.7rem;
    padding-top: 0px;
  }

  .antian {
    margin-left: 0.8rem;
  }
  .bar {
    background-color: #FFC600;
    color: #ffffff;
  }
</style>
