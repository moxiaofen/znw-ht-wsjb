<!--进件中,资料填写的第二步-->
<template>
  <div class="page">
    <ToolBar >资料填写</ToolBar>
    <div class='top margain_top_30_two common_margin_left word_left'>
      以下信息仅将提供银行信审使用！其中选填项中资料的提交可以提高您的授信额度，请确认提交信息准确。
<!--<span style="color: #f2f2f2" @click="kingCode">金手指</span>-->
    </div>

    <!-- 步骤进度------start------ -->
    <div class='progress_line'>
      <!-- 加一个白色背景图-------start -->
      <!--<input type="button" value="测试" @click="toTest()"/>-->

      <div class='white_bac'>
        <div class='margin_top50'>
          <div class='common_center_Two margain_top_30 '>
            <div class='radius ' :style="backcolor_orange">
              <div class='numbercss '>1</div>
            </div>
            <!-- 来条线 -->
            <div class='lineCss'>
              <div  :style="progressCss"></div>
            </div>
            <!-- 画个圆点 -->
            <div class='radius'>
              <div class='numbercss '>2</div>
            </div>
            <!-- 来条线 -->
            <div class='lineCss'></div>
            <!-- 画个圆点 -->
            <div class='radius'>
              <div class='numbercss '>3</div>
            </div>
          </div>

          <div class='common_center margain_top_30 splex'>
            <div :style="text_orange">商户验证</div>
            <div>信息填写</div>
            <div>银行鉴权</div>
          </div>
        </div>
      </div>
      <!-- 加一个白色背景图------end -->
    </div>
    <!-- 步骤进度-----end------ -->
    <!-- 中部商户验证 -->
      <div class='middle'>
        <div class='section__title'>商户信息验证</div>
        <!-- 加一个白色底色背景-----------start----------- -->
        <div class='bgc_white'>
          <div class='common_center_Three'>
            <div class='common_margin_left common_font'>新商盟登录账号<span class="maohao">：</span></div>
            <input   ref="rNewAccount" v-model="vNewAccount" @blur='checkNewAccount' class='expandOne'
                   type='number' min="0" inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number" placeholder='请输入新商盟登录账号' oninput="if(value.length>18)value=value.slice(0,18)"/>
            <img class=' clearUserPhoneCss' v-show="vNewAccount" @click="clearData(1)" src="/static/assets/clear.png"/>

          </div>
          <!-- 来条灰色横线 -->
          <Divider></Divider>

          <div class='common_center_Three'>
            <div class='common_margin_left common_font'>新商盟登录密码<span class="maohao">：</span></div>
            <input   type="password" ref="rAccountPwd" v-model="vAccountPwd" @blur='checkAccountPwd'
                   class='expandOne'
                   placeholder='请输入新商盟登录密码' oninput="if(value.length>16)value=value.slice(0,16)"/>
            <img class=' clearUserPhoneCss' v-show="vAccountPwd" @click="clearData(2)" src="/static/assets/clear.png"/>
          </div>
          <!-- 来条灰色横线 -->
          <Divider></Divider>
        </div>

      </div>
      <!-- 加一个白色底色背景-----------end----------- -->
      <div class='protocol'>
        <!--导入复选框组件-->
        <Checkbox class="checkbox" @onCheckChange="onCheckChange"></Checkbox>
        <div class='tips'>本人已阅读并同意签署<span   style="color:#ff6400" @click="toProcol">《安田数据个人信息声明》</span></div>
      </div>
      <!-- 底部协议-----------start---------- -->

      <!-- 底部协议-----------end---------- -->
      <!--底部按钮-->
      <div align="center" >
        <input type="button"   class="btn666" value="点击验证" :style="btnRegister" v-bind:disabled="btnDisabled"
               @click="quickFirstNext()"/>
      </div>

  </div>

</template>
<script>
  import Checkbox from '../Checkbox'
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import SM from '../../api/SessionManager.js'
  export default{
    name: SM.QuickWriteOne,
    components: {ToolBar, Checkbox, Divider},
    data(){
      return {
        text_orange:'',
        backcolor_orange:'',
        progressCss: '',
        btnRegister:'background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);',//下一步样式
        btnDisabled:false,//下一步按钮默认不可用
        token: null,
        check: false,
        vAccountPwd: null,
        vNewAccount:null,
      }
    },
    //生命周期方法
    mounted(){
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }
      //新商盟账号有缓存的显示出来
      var quickCacheNewAccount=sessionStorage.getItem("quickCacheNewAccount");
      if(!this.$StringUtils.isEmpty(quickCacheNewAccount)){
        this.vNewAccount=quickCacheNewAccount
      }
      //如果新商盟密码有缓存，先显示出来
      var quickCacheAccountPwd = sessionStorage.getItem('quickCacheAccountPwd');
      if(!this.$StringUtils.isEmpty(quickCacheAccountPwd)){
        this.vAccountPwd = quickCacheAccountPwd;
      }
    },
    methods: {

      kingCode(){
        //测试专用，快速填写信息
        this.vNewAccount="110102105906";
        this.vAccountPwd="123";

        sessionStorage.setItem("quickCacheNewAccount",this.vNewAccount);
        sessionStorage.setItem("quickCacheAccountPwd",this.vAccountPwd);

      },
      //清除输入框数据
      clearData: function (num) {
        if(num==1){
          this.vNewAccount = '';
        }
        if(num==2){
          this.vAccountPwd = '';
        }
      },

      toProcol(){
        //跳转个人协议....
        //15分钟之后失效，强制登陆
        if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
          return
        }
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.AccessClick,
          "segmentation": {
            appId: window.appId,
          }
        });
        console.info("个人协议>>>>");
        this.$router.push(this.$RM.PersonProtocol);
      },
      onCheckChange(status) {
        console.info("勾选框的状态>>>" + status);
        this.check = status;
        sessionStorage.setItem("quickCacheGou", this.check);
      },
      //校验新商盟账号
      checkNewAccount() {
        //15分钟之后失效，强制登陆
        if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
          return
        }
        var that = this;

        //接收到，输入的传过来的新商盟账号
        var newAccountInput = that.$refs.rNewAccount.value;
        console.info('输入新商盟账号>>>' + newAccountInput);
        if(!that.$StringUtils.isEmpty(newAccountInput)){
          //存入本地缓存
          sessionStorage.setItem('quickCacheNewAccount', newAccountInput);
          that.vNewAccount = newAccountInput;
        }
      },
      //校验新商盟密码
      checkAccountPwd() {
        //15分钟之后失效，强制登陆
        if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
          return
        }
        var that = this;

        //接收到，输入的传过来的新商盟密码
        var accountPwdInput = that.$refs.rAccountPwd.value;
        if(!that.$StringUtils.isEmpty(accountPwdInput)){
          console.info('输入新商盟密码>>>' + accountPwdInput);
          //存入本地缓存
          sessionStorage.setItem('quickCacheAccountPwd', accountPwdInput);
          that.vAccountPwd = accountPwdInput;
        }
      },
      //点击下一步，表单校验
      quickFirstNext() {
        //15分钟之后失效，强制登陆
        if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
          return
        }

        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.QuickFirstNext,
          "segmentation": {
            appId: window.appId,
          }
        });
        var that = this;
        console.info('--------点击验证的按钮事件--------');
        console.info('现在的网络状态是>>>' + that.nonet);
        if (that.nonet) {
          Countly.init({
            app_key: that.$Constants.APPKEY,
            url: that.$Constants.ROOTMAI, //your server goes here
            debug: true,
          })
          Countly.track_sessions();
          Countly.track_pageview();
          Countly.add_event({
            key: that.$Constants.QuickNoNetwork,
            "segmentation": {
              appId: window.appId,
            }
          });
          that.$toast("网络异常，请重试")
          that.$router.push(that.$RM.Netbroken);
        } else {
            //校验新商盟账号
            if (that.$StringUtils.isEmpty(that.vNewAccount)) {
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_000437);
              console.info('新商盟账号为null...');
              return;
            }
            //校验新商盟密码
            var tempAccountPwd = that.vAccountPwd;
          if (that.$StringUtils.isEmpty(tempAccountPwd)) {
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_000438);
              console.info('新商盟密码为null...');
              return;
            }

            //校验勾选框
            if (!that.check) {
              //如果不正确
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.CHECKBOXSTUERROR);
              return;
            }

            //新商盟密码加密：
            let publicKey = that.$utils.PUBLIC_KEY;
            let encrypt_rsa = new that.$RSA.RSAKey();
                encrypt_rsa = that.$RSA.KEYUTIL.getKey(publicKey);
            let encStr = encrypt_rsa.encrypt(tempAccountPwd);
                encStr = that.$RSA.hex2b64(encStr);

          let timestamp = that.$utils.generateSignTime();
          let reqId = that.$utils.generateSignTime();
          let sign = that.$utils.generateSign(reqId, timestamp);

          //开始请求查询新商盟账号信息

          that.$indicator.open("请稍候...");
          let timeStamp=Date.now();
          that.$api.post(that.$Constants.QUERYNEWBUSINESSACCOUNT, {
            appId: window.appId,
            reqId: that.$StringUtils.getReqId(),
            timestamp: timeStamp,
            sign: that.$utils.generateSign(that.$StringUtils.getReqId(),timeStamp),
            data: {
              newBusinessAccount: that.vNewAccount,
              password: encStr
            }
          }, function (res) {

            if (res.ret === '0') {
              that.$indicator.close();
              let custCode = res.data.custCode;//客户编码
              let custName = res.data.custName;//	客户姓名
              let custPhone = res.data.custPhone;//客户电话

              let custShortname = res.data.custShortname;//客户简称
              let directorAddr = res.data.directorAddr;//地址
              let directorName = res.data.directorName;//负责人
              let directorPhone = res.data.directorPhone;//负责人电话
              let licenseKey = res.data.licenseKey;//许可证号

              let businessOpenFlag = res.data.businessOpenFlag;//业务是否已开展的标识,	0 未开展 1 已开展
              let withInWhitelist = res.data.withInWhitelist;//是否在白名单,0 否 1 是

              let zeroLimitFlag = res.data.zeroLimitFlag;//是否0额度，0 否 1 是

              if (businessOpenFlag === '0') {
                //尚未开展业务的地区。
                Countly.init({
                  app_key: that.$Constants.APPKEY,
                  url: that.$Constants.ROOTMAI, //your server goes here
                  debug: true,
                })
                Countly.track_sessions();
                Countly.track_pageview();
                Countly.add_event({
                  key: that.$Constants.QuickDevelop,
                  "segmentation": {
                    appId: window.appId,
                  }
                });
                that.$dialog.confirm(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300037, '',
                  {
                    showCancelButton:false,
                    confirmButtonText: '返回首页',
                  })
                  .then(() => {
                    that.$router.push(that.$RM.Main);
                  });
                return
              }
              if (withInWhitelist === '0') {
                Countly.init({
                  app_key: that.$Constants.APPKEY,
                  url: that.$Constants.ROOTMAI, //your server goes here
                  debug: true,
                })
                Countly.track_sessions();
                Countly.track_pageview();
                Countly.add_event({
                  key: that.$Constants.QuickQualified,
                  "segmentation": {
                    appId: window.appId,
                  }
                });
                //不在白名单内。
                that.$dialog.confirm(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300036, '',
                  {
                    showCancelButton:false,
                    confirmButtonText: '返回首页',
                  })
                  .then(() => {
                    that.$router.push(that.$RM.Main);
                  });
                return
              }

              if (zeroLimitFlag === '1') {
                //0额度。
                that.$dialog.confirm(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300036, '',
                  {
                    showCancelButton:false,
                    confirmButtonText: '返回首页',
                  })
                  .then(() => {
                    that.$router.push(that.$RM.Main);
                  });
                return
              }
              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.QuickWriteTwo,
                "segmentation": {
                  appId: window.appId,
                }
              });
              //存缓存
              sessionStorage.setItem('quickCacheCustCode', custCode);
              sessionStorage.setItem('quickCacheCustName', custName);
              sessionStorage.setItem('quickCacheCustPhone', custPhone);
              sessionStorage.setItem('quickCacheCustShortname', custShortname);
              sessionStorage.setItem('quickCacheDirectorAddr', directorAddr);
              sessionStorage.setItem('quickCacheDirectorName', directorName);
              sessionStorage.setItem('quickCacheDirectorPhone', directorPhone);
              sessionStorage.setItem('quickCacheLicenseKey', licenseKey);

              //跳转页面
              that.$router.push(that.$RM.quickwritetwo);

            } else {
              that.$indicator.close();
              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.QuickWrong,
                "segmentation": {
                  appId: window.appId,
                }
              });
              console.info('填写信息有误>>>');
              if(res.ret==="0004"){//校验失败	用户名/密码错误
                that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_0004);
                return
              }
              else if(res.ret==="300033"){
                that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300033);//已存在有效进件
                return
              }
              else if(res.ret==="300036"){
                  //额度为0
                that.$dialog.confirm(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300036,'',
                  {
                    showCancelButton:false,
                    confirmButtonText: '返回首页',
                  })
                  .then(() => {
                    that.$router.push(that.$RM.Main);
                  })
                ;
                return
              }
              else if(res.ret==="300037"){
//                地区未开展
                that.$dialog.confirm(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300037,'',
                  {
                    showCancelButton:false,
                    confirmButtonText: '返回首页',
                  })
                  .then(() => {
                    that.$router.push(that.$RM.Main);
                  })
                ;
                return
              }
              else{
                that.$dialog.confirm(that.$ERRCODE.STATIC_ERRORCDDE.RTN_0001,'',
                  {
                    showCancelButton:false,
                    confirmButtonText: '返回首页',
                  })
                  .then(() => {
                    that.$router.push(that.$RM.Main);
                  })
                ;
                return
              }
            }
          }.bind(that), function () {
            that.$indicator.close();
          }.bind(that))

        }

      }
    },

    watch: {
      //监听这两个值的改变，一改变样式也相对改变
      vNewAccount: {
        handler(){

          if ( !this.$StringUtils.isEmpty(this.vNewAccount)) {
            this.progressCss = 'background-color: #ff6400;;width:50%;height: 1px;';//进度条橙色
            this.text_orange= 'color: #ff6400;';//文字橙色
            this.backcolor_orange= 'background-color: #ff6400;';//背景橙色


          }
          if(this.$StringUtils.isEmpty(this.vNewAccount) || this.$StringUtils.isEmpty(this.vAccountPwd)){
            this.progressCss = '';//暗色
            this.text_orange= '';
            this.backcolor_orange= '';


          }
        }
      },
      vAccountPwd: {
        handler(){

            if ( !this.$StringUtils.isEmpty(this.vAccountPwd)) {
            this.progressCss = 'background-color: #ff6400;;width:50%;height: 1px;';//进度条橙色
            this.text_orange= 'color: #ff6400;';//文字橙色
            this.backcolor_orange= 'background-color: #ff6400;';//背景橙色


          }
          if(this.$StringUtils.isEmpty(this.vNewAccount) || this.$StringUtils.isEmpty(this.vAccountPwd)){
            this.progressCss = '';//暗色
            this.text_orange= '';
            this.backcolor_orange= '';


          }
        }
      }
    }
  }
</script>

<style scoped>

  .protocol {
    display: flex;
    margin-top: 20px;
  }

  .protocol .checkbox {
    width: 30px;
    height: 30px;
    margin-left: 0.3rem;
  }

  .protocol .tips {
    letter-spacing: 2px;
    color: #c9c9c9;
    font-size: 26px;
    line-height: 30px;
    margin-left: 20px;
    margin-top: 0.06rem;
  }

  .top {
    font-size: 26px;
    color: #999;
    text-align: justify;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.50);
  }

  .middle {
    font-size: 28px;
  }

  .section__title {
    font-weight: bold;
    font-size: 32px;
    color: #111111;
    text-align: left;
    margin-left: 0.4rem;
    margin-bottom: 0.4rem;
    margin-top: 0.4rem;
  }

  .common_margin_left {
    margin-left: 25px;
  }



  .lineCss {
    background-color: #ddd;
    width: 32%;
    height: 2px;
  }



  .common_center {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .common_center_Two {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .margain_top_30 {
    margin-top: 30px;
  }

  /* 画个圆点 */
  .radius {
    background-color: #b1b1b1;
    width: 32px;
    height: 32px;
    line-height:32px;
    border-radius: 100%;
  }

  .word_left {
    margin-left: 20px;
    margin-right: 20px;

  }

  .margain_top_30_two {
    margin-top: 30px;
  }

  .progress_line {
    display: flex;
    justify-content: center;
  }

  .white_bac {
    background-size: 80% 195px;
    margin-top: 0.4rem;
    margin-left: 0;
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    width: 100%;
    height: 155px;
  }

  .margin_top50 {
    margin-top: 50px;
  }

  .splex {
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    margin-left: 59px;
    margin-right: 35px;
    line-height: 10px;
  }

  .numbercss {
    text-align: center;
    color: #fff;
  }

  .bgc_white {
    background-color: #fff;
  }

  .common_center_Three {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 12px;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }



  input::-webkit-input-placeholder {
    font-size: 29px;
    color: #999;
  }
  .expandOne {
    width: 5.5rem;
    border: 0;
    font-size:30px;
  }
  .common_font {
    font-size: 0.4rem;
    color: #000;
  }


  .page {
    height: 100%;
    background-color: #f2f2f2;
  }

  .btn666 {
    margin-top: 1.6rem;
    margin-bottom: 4.5rem;
    background-image: linear-gradient(-90deg, #ffa366 0%, #ffa366 100%);
    border-radius: 5px;
    width: 8.7rem;
    height: 1.3rem;
    color: #fff1e8;
    border: none;

    font-size: 30px;

  }

  .clearUserPhoneCss {
    width: 0.373333rem;
    height: 0.373333rem;
  }
</style>
