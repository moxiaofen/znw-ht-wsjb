<!--新商盟授权页面-->
<template>
  <div style="height: 100%">
    <ToolBar>新商盟授权</ToolBar>
    <Divider></Divider>
    <EditInfoItem :isEdit="false" :isRight="false" desc="新商盟客户账号：" :editContent="this.$StringUtils.encryptText(account)"
                  type="text"></EditInfoItem>
    <EditInfoItem isEdit :isRight="false" placeHolder="请输入新商盟客户密码" desc="新商盟客户密码：" ref="password" @input.native="change"
                  type="password"></EditInfoItem>
    <EditInfoItem isEdit :isRight="false" placeHolder="请输入有效手机号码" desc="手机号码：" ref="phone" @input.native="change"
                  maxLength="11"></EditInfoItem>
    <EditInfoItem isEdit :isRight="false" placeHolder="请输入手机验证码" desc="手机验证码：" ref="code" @input.native="change"
                  maxLength="4">
      <VerifyCode style="margin-right: 0.3rem; font-size: 0.3rem;margin-top: 0" @click.native="getCode"
                  ref="codeBtn"></VerifyCode>
    </EditInfoItem>
    <div class="businessAccess">
      <div class="protocol">
        <Checkbox class="cb" @onCheckChange="onCheckChange"></Checkbox>
        <span class="text">本人已阅读并同意签署
          <span class="protocolContent" @click="toProtocol">《商户经营性数据授信查询》</span>
        </span>
      </div>
      <div class="btnGroup">
        <CommitButton name="提交" :isInputNonEmpty="isInputNonEmpty" @click.native="commit"></CommitButton>
      </div>
    </div>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import EditInfoItem from '../EditInfoItem.vue'
  import Checkbox from '../Checkbox.vue'
  import CommitButton from '../CommitButton.vue'
  import VerifyCode from '../VerifyCode.vue'
  import SM from '../../api/SessionManager.js'
  export default{
    name: SM.BusinessAccess,
    components: {ToolBar, Divider, EditInfoItem, Checkbox, CommitButton, VerifyCode},
    methods: {
      toProtocol() {
        this.$router.push(this.$RM.BusinessService)
        this.saveInputData();
        if( appId === window.appId) {
          Countly.init({
            app_key: "fac364a78f023a9e1d95e7a3d9be08a53144831b",
            url: "http://10.0.18.37:32768", //your server goes here
            debug: true,

          })
          Countly.track_sessions();
          Countly.track_pageview();
          Countly.add_event({
            key: "dataClick",
            "segmentation": {
              appId: window.appId,
            }
          });
        }

      },
      saveInputData(){
        sessionStorage.setItem('account', this.account)
        sessionStorage.setItem(this.$sessionManager.BusinessAccess + 'password', this.$refs.password.editContent)
        sessionStorage.setItem(this.$sessionManager.BusinessAccess + 'phone', this.$refs.phone.editContent)
        sessionStorage.setItem(this.$sessionManager.BusinessAccess + 'code', this.$refs.code.editContent)
      },
      change(){
        this.isInputNonEmpty = !this.$StringUtils.isEmpty(this.$refs.password.editContent) && !this.$StringUtils.isEmpty(this.$refs.phone.editContent)
          && !this.$StringUtils.isEmpty(this.$refs.code.editContent)
      },
      onCheckChange: function (val) {
        this.check = val
      },
      commit(){
        if (!this.isInputNonEmpty) {
          return
        }
        if (!this.check) {
          this.$toast('请点击并签署本人已阅读《商户经营性数据授权查询》后提交')
          return
        }
        if (!this.$regx.isPhone(this.$refs.phone.editContent)) {
          if( appId === window.appId) {
            Countly.init({
              app_key: "fac364a78f023a9e1d95e7a3d9be08a53144831b",
              url: "http://10.0.18.37:32768", //your server goes here
              debug: true,

            })
            Countly.track_sessions();
            Countly.track_pageview();
            Countly.add_event({
              key: "GoConfirm_two",
              "segmentation": {
                appId: window.appId,
              }
            });
          }

          this.$toast(this.$ErrorMsg.ERROR_PHONE)
          return
        }
        // rsa加密新商盟密码
        var publicKey = this.$utils.PUBLIC_KEY
        var encrypt_rsa = new this.$RSA.RSAKey();
        encrypt_rsa = this.$RSA.KEYUTIL.getKey(publicKey);
        var encStr = encrypt_rsa.encrypt(this.$refs.password.editContent)
        encStr = this.$RSA.hex2b64(encStr);

        this.$indicator.open()
        this.$api.post(this.$Constants.BUSINESS_ACCESS, {
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId(),
          "data": {
            "newBusinessAccount": this.account,
            "newBusinessAccountPwd": encStr,
            "phoneNo": this.$refs.phone.editContent,
            "checkCode": this.$refs.code.editContent
          }
        }, function (result) {
          this.$indicator.close()
          if (result && result.ret) {
            if (result.ret == '000442') {
              this.$toast('新商盟账号密码不匹配,请重新输入')
            } else if (result.ret == '000010') {
              this.$toast('验证码输入错误')
            } else if (result.ret == '0') {
              this.$router.replace(this.$RM.AccessSuccess)
              this.$sessionManager.clearBusinessAccess(this)
            }
          }
        }.bind(this), function (err) {
          this.$indicator.close()
        }.bind(this))
      },
      getCode(){
        if (this.$StringUtils.isEmpty(this.$refs.phone.editContent)) {
          this.$toast(this.$ErrorMsg.EMPTY_PHONE)
          return
        }
        if (!this.$regx.isPhone(this.$refs.phone.editContent)) {
          this.$toast(this.$ErrorMsg.ERROR_PHONE)
          return
        }
        this.$refs.codeBtn.getCode();
        this.$indicator.open('请求验证码中')
        this.$api.post(this.$Constants.BUSINESS_SEND_SMS, {
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId(),
          "data": {
            "phoneNo": this.$refs.phone.editContent
          }
        }, function (result) {
          this.$indicator.close()
          if (result && result.data) {
            this.$toast('获取验证码成功')
          }
        }.bind(this), function (err) {
          this.$indicator.close()
        }.bind(this))
      }
    },
    data(){
      return {
        isInputNonEmpty: false,
        account: '',
        check: false,
      }
    },
    mounted(){
      var cacheAccount = sessionStorage.getItem('account');
      if (this.$StringUtils.isEmpty(cacheAccount)) {
        this.account = this.$route.params ? this.$route.params.account : ''
      } else {
        this.account = cacheAccount
      }
      this.$refs.phone.editContent = sessionStorage.getItem(this.$sessionManager.BusinessAccess + 'phone')
      this.$refs.phone.editContent = this.$StringUtils.isEmpty(this.$refs.phone.editContent) ? '' : this.$refs.phone.editContent
      this.$refs.code.editContent = sessionStorage.getItem(this.$sessionManager.BusinessAccess + 'code')
      this.$refs.code.editContent = this.$StringUtils.isEmpty(this.$refs.code.editContent) ? '' : this.$refs.code.editContent
      this.$refs.password.editContent = sessionStorage.getItem(this.$sessionManager.BusinessAccess + 'password')
      this.$refs.password.editContent = this.$StringUtils.isEmpty(this.$refs.password.editContent) ? '' : this.$refs.password.editContent
      this.change()
    }
  }
</script>
<style scoped>
  .btnGroup {
    padding: 0 30px;
  }

  .businessAccess {
    background: #f5f5f5;
    padding-bottom: 100%;
  }

  .businessAccess .protocol {
    display: flex;
    flex-direction: row;
    padding-left: 30px;
    padding-top: 20px;
  }

  .businessAccess .protocol .cb {
    width: 30px;
    height: 30px;
  }

  .businessAccess .protocol .text {
    font-size: 30px;
    color: #666666;
    margin-left: 30px;
    text-align: left;
  }

  .businessAccess .protocol .text .protocolContent {
    color: #ff0000;
  }

</style>
