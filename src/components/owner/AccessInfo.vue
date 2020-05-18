<!--授权信息界面-->
<template>
  <div>
    <ToolBar>授权信息</ToolBar>
    <p class="desc">商户授权中新商盟网址登陆账号密码仅为了验证商户烟草业态属性，为银行授信提供信用支持。为了您的用款体验请保持授权处于激活状态。</p>
    <InfoItem :isEdit="false" desc="新商盟客户账号：" :editContent="account"></InfoItem>
    <InfoItem :isEdit="false" desc="新商盟客户密码：" :editContent="password"></InfoItem>
    <InfoItem :isEdit="false" desc="授权状态：">
      <span class="activation">激活</span>
    </InfoItem>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import InfoItem from '../EditInfoItem.vue'
  export default{
    components: {ToolBar, Divider, InfoItem},
    data(){
      return {
        password: ''
      }
    },
    computed: {
      account: function () {
        let account = this.$route.params ? this.$route.params.account : ''
        if (!this.$StringUtils.isEmpty(account)) {
          this.password = '*******'
        }
        return this.$StringUtils.encryptText(account)
      }
    }
  }
</script>
<style scoped>
  .desc {
    font-size: 30px;
    color: #999999;
    line-height: 44px;
    text-shadow: 0 1px 0 #ffffff;
    text-align: left;
    background: #f5f5f5;
    padding: 20px 30px;
  }

  .activation {
    font-size: 30px;
    color: #017ad4;
    letter-spacing: 0;
    padding-right: 0.20rem;
    text-align: right;
    line-height: 42px;
  }
</style>
