<!--进件中,资料填写的第二步-->
<template>
  <div class="page">
    <ToolBar class="fixed">资料填写</ToolBar>
    <div class='top margain_top_30_two common_margin_left word_left'>
      以下信息仅将提供银行信审使用！其中选填项中资料的提交可以提高您的授信额度，请确认提交信息准确。
<!--<span style="color: #f2f2f2" @click="kingCode">金手指</span>-->

    </div>

    <!-- 步骤进度------start------ -->
    <div class='progress_line'>
      <!-- 加一个白色背景图-------start -->


      <div class='white_bac'>
        <div class='margin_top50'>
          <div class='common_center_Two margain_top_30 '>
            <div class='radius backcolor_orange'>
              <div class='numbercss '>1</div>
            </div>
            <!-- 来条线 -->
            <div class='lineCss_orange'></div>
            <!-- 画个圆点 -->
            <div class='radius ' :style="backcolor_orange">
              <div class='numbercss  '>2</div>
            </div>
            <!-- 来条线 -->
            <div class='lineCss'>
              <div :style="progressCss"></div>
            </div>
            <!-- 画个圆点 -->
            <div class='radius'>
              <div class='numbercss '>3</div>
            </div>
          </div>

          <div class='common_center margain_top_30 splex'>
            <div class='text_orange'>商户验证</div>
            <div :style="text_orange">信息填写</div>
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

        <Divider></Divider>
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'>新商盟登录账号<span class="maohao">：</span></div>
          <input readonly="readonly" v-model="vNewAccount" class='expandOne'
          />

        </div>
        <!-- 来条灰色横线 -->
        <Divider></Divider>

        <div class='common_center_Three'>
          <div class='common_margin_left common_font'>新商盟登录密码<span class="maohao">：</span></div>
          <input readonly="readonly" v-model="vAccountPwd" class='expandOne'
                 type='password'/>

        </div>
        <!-- 来条灰色横线 -->
        <Divider></Divider>

      </div>
      <!-- 加一个白色底色背景-----------end----------- -->
      <div class='section__title'>商户信息补充确认<span class="accountCss">(必填项)</span></div>
      <!-- 加一个白色底色背景-----------start----------- -->
      <div class='bgc_white'>
        <div class='common_center_Three'>
          <div class='common_margin_left common_font lawNameSpaceCss'>法人姓名<span class="maohao">：</span></div>
          <input v-model="vLawName" ref="rLawName" class='lawNameCss' type='text' placeholder='请输入法人姓名'
                 @blur='checkLawName'/>
          <img class='clearUserPhoneCss' v-show="vLawName" @click="clearData(5)" src="/static/assets/clear.png"/>
        </div>

        <!-- 来条灰色横线 -->
        <Divider></Divider>

        <div class='common_center_Three'>
          <div class='common_margin_left common_font yanCaoSpaceCss'>烟草许可证号<span class="maohao">：</span></div>
          <input name='yancao' readonly='readonly' v-model="vYancao" class='expandOne'/>
        </div>

        <!-- 来条灰色横线 -->
        <Divider></Divider>
        <div class='common_center_Three'>
          <div class='common_margin_left common_font idCardSpaceCss'>身份证号码<span class="maohao">：</span></div>
          <input @blur='checkIdcard' class='idCardCss' type='text' placeholder='请输入有效身份证号码'
                 ref="rIdcard" v-model="vIdcard"/>
          <img class=' clearIdcardCss' v-show="vIdcard" @click="clearData(1)" src="/static/assets/clear.png"/>

        </div>


        <!-- 来条灰色横线 -->
        <Divider></Divider>
        <div class='common_center_Three'>
          <div class='common_margin_left common_font lineLight'>营业执照注册号<span class="maohao">：</span>

            <div class="believeCss">(统一社会信用代码)</div>
          </div>
          <input ref="rLicen" v-model="vLicen" @blur='checkLicen' class='believeInputCss' type='text'
                 placeholder='请输入营业执照注册号'/>
          <img class=' clearUserPhoneCss' v-show="vLicen" @click="clearData(2)" src="/static/assets/clear.png"/>

        </div>

        <!-- 来条灰色横线 -->

        <!-- 来条灰色横线 -->
        <Divider></Divider>

        <div class='common_center_Three'>
          <div class='common_margin_left common_font shopAddNameSpaceCss'>商户门店名称<span class="maohao">：</span></div>
          <input ref="rAccountShopName" v-model="vAccountShopName" @blur='checkAccountShopName'
                 class='shopAddeCss' type='text' placeholder='请输入商户门店名称'
                 oninput="if(value.length>30)value=value.slice(0,30)"/>
          <img class=' clearUserPhoneCss' v-show="vAccountShopName" @click="clearData(3)"
               src="/static/assets/clear.png"/>

        </div>
        <!-- 来条灰色横线 -->
        <Divider></Divider>
        <!-- 城市级联开始 -->
        <div class='common_center_Three'>
          <div class='juzhong'>
            <div class="common_margin_left common_font shopAddSpaceCss ">商户门店地址<span class="maohao">：</span></div>
            <div>
              <CitySelect @getProvince="getProvince" @getCity="getCity" @getArea="getArea"
                          class="myAddress"></CitySelect>
              <textarea ref="rStreet" v-model="vStreet" @blur='checkStreet'
                        placeholder='请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等'
                        oninput="if(value.length>30)value=value.slice(0,30)"></textarea>
            </div>
          </div>
        </div>
        <!-- 来条灰色横线 -->
        <Divider></Divider>

        <!-- 城市级联结束 -->
        <div class='common_center_Three'>
          <div class='common_margin_left common_font phoneNumSpaceCss'>手机号码<span class="maohao">：</span></div>
          <input v-model="vPhone" class='phoneNumCss' readonly="readonly"/>
        </div>
        <!-- 来条灰色横线 -->
        <Divider></Divider>
        <div class='common_center margin_top_bottom'>
          <div class='common_margin_left verticode_font'> 手机验证码<span class="maohao">：</span></div>
          <!-- 输入验证码 -->
          <input @blur='checkYanCode()' ref="rYanCode" v-model="vYanCode"
                 oninput="if(value.length>4)value=value.slice(0,4)" type='number' min="0" inputmode="numeric"
                 pattern="[0-9]*" title="Non-negative integral number" placeholder='请输入验证码'
                 class='codeInput'/>
          <img class=' clearYanCodeCss' v-show="vYanCode" @click="clearData(4)" src="/static/assets/clear.png"/>

          <input type="button" class="btn999" :style="btnVertBackStyle" v-bind:disabled="vertDisabled" :value="time"
                 @click="getVerificationCode()"/>
        </div>

        <!-- 来条灰色横线 -->
        <Divider></Divider>
      </div>
      <!-- 加一个白色底色背景-----------end----------- -->
    </div>
    <div align="center">
      <input type="button" class="btn666" value="下一步" :style="btnRegister" v-bind:disabled="btnDisabled"
             @click="quickSecondNext()"/>
    </div>
  </div>
</template>

<script>
  import Checkbox from '../Checkbox'
  import CitySelect from '../CitySelect.vue'
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import SM from '../../api/SessionManager.js'

  export default {
    name: SM.QuickWriteTwo,
    components: {Checkbox, CitySelect, ToolBar, Divider},
    data() {
      return {

        idCardLength: 18,
        licenLength: 18,
        lawNameLength: 6,
        vertiCode: false,
        text_orange: '',
        backcolor_orange: '',
        progressCss: '',
        currentTime: 61,
        time: '获取验证码', //倒计时
        vertDisabled: false,//验证码按钮可用
        btnVertBackStyle: '',//发送验证码样式置灰
        btnRegister: 'background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);',//下一步样式
        btnDisabled: false,//下一步按钮默认不可用
        token: null,
        province: null,
        city: null,
        area: null,
        check: false,
        vStreet: null,
        vIdcard: null,
        vNewAccount: null,
        vAccountPwd: null,
        vAccountShopName: null,
        vPhone: null,
        vLawName: null,
        vYancao: null,
        vLicen: null,
        vYanCode: null,
      }
    },
    //生命周期方法
    mounted() {
      //15分钟之后失效，强制登陆
      if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
        return
      }
      var token = sessionStorage.getItem("loginSession");

      this.token = token;//登陆态，赋值给全局变量

      //如果新商盟账号有缓存，先显示出来

      var cacheNewAccount = sessionStorage.getItem('quickCacheNewAccount');
      if (!this.$StringUtils.isEmpty(cacheNewAccount)) {
        var tempvNewAccount = this.$utils.hidePhoneStr(cacheNewAccount);
        this.vNewAccount = tempvNewAccount;
      }

      //如果新商盟密码有缓存，先显示出来
      var cacheAccountPwd = sessionStorage.getItem('quickCacheAccountPwd');
      if (!this.$StringUtils.isEmpty(cacheAccountPwd)) {
        this.vAccountPwd = cacheAccountPwd;
      }

      //如果法人姓名有缓存，先显示出来
      var quickCacheCustName = sessionStorage.getItem('quickCacheLawName');
      if (!this.$StringUtils.isEmpty(quickCacheCustName)) {
        this.vLawName = quickCacheCustName;
      }


      //如果烟草许可证有缓存，先显示出来
      var quickCacheLicenseKey = sessionStorage.getItem('quickCacheLicenseKey');
      if (!this.$StringUtils.isEmpty(quickCacheLicenseKey)) {
        let tempvYancao = this.$utils.hidePhoneStr(quickCacheLicenseKey);
        this.vYancao = tempvYancao;
      }


      //如果身份证号码有缓存，先显示出来
      var cacheIdcard = sessionStorage.getItem('quickCacheIdcard');
      if (!this.$StringUtils.isEmpty(cacheIdcard)) {
        this.vIdcard = cacheIdcard;
      }
//      //如果营业执照有缓存，先显示出来
      var cacheLicen = sessionStorage.getItem('quickCacheLicen');
      if (!this.$StringUtils.isEmpty(cacheLicen)) {
        this.vLicen = cacheLicen;
      }

      //如果商户门店名称有缓存，先显示出来
      var quickCacheAccountShopName = sessionStorage.getItem('quickCacheAccountShopName');
      if (!this.$StringUtils.isEmpty(quickCacheAccountShopName)) {
        this.vAccountShopName = quickCacheAccountShopName;
      }
//      如果门店地址有缓存，先显示出来
      var cacheUserStreet = sessionStorage.getItem('quickCacheStreet');
      if (!this.$StringUtils.isEmpty(cacheUserStreet)) {
        this.vStreet = cacheUserStreet;
      }

      //如果手机号码有缓存，先显示出来
      var quickCacheCustPhone = sessionStorage.getItem('cachePhone');
      if (!this.$StringUtils.isEmpty(quickCacheCustPhone)) {
        this.vPhone = quickCacheCustPhone;
      }


      //如果验证码有缓存，先显示出来
      var quickCacheInputYanCode = sessionStorage.getItem('quickCacheInputYanCode');
      if (!this.$StringUtils.isEmpty(quickCacheInputYanCode)) {
        this.vYanCode = quickCacheInputYanCode;
      }

    },
    methods: {
      kingCode() {
        //测试专用，快速填写信息
        this.vLawName = "你好";
        this.vIdcard = "450502199211260775";
        this.vLicen = "1234567891234567";

        this.vAccountShopName = "我很好";
        this.vStreet = "测试地点";
        this.vYanCode = "6666";
        sessionStorage.setItem("quickCacheLawName", this.vLawName);
        sessionStorage.setItem("quickCacheIdcard", this.vIdcard);
        sessionStorage.setItem("quickCacheLicen", this.vLicen);
        sessionStorage.setItem("quickCacheAccountShopName", this.vAccountShopName);
        sessionStorage.setItem("quickCacheStreet", this.vStreet);
        sessionStorage.setItem("quickCacheInputYanCode", this.vYanCode);
      },
      //校验法人姓名
      checkLawName() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        //第一步，复制对象
        var that = this;

        //第三步，获取用户输入的值
        var lawNameInput = that.$refs.rLawName.value;
        console.info('用户的输入的法人姓名>>>' + lawNameInput);
        if (!that.$StringUtils.isEmpty(lawNameInput)) {
          //第六步、校验输入的内容
          if (!(that.$utils.checkName(lawNameInput))) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.LAWNAMEERROR);
          }
          that.vLawName = lawNameInput;
          sessionStorage.setItem('quickCacheLawName', lawNameInput);
        }
      },

      //请求接口，校验验证码
      checkVerification(code) {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
          let that=this;
        if (!that.$StringUtils.isEmpty(code)) {
          console.info("quicktwo,checkVerification请求的数据包：phone:" + that.vPhone + ",code:" + code);
          //开始请求校验验证码的操作
          let timeStamp=Date.now();
          that.$api.post(that.$Constants.CHECK_VERIFICATION, {
            appId: window.appId,
            reqId: that.$StringUtils.getReqId(),
            timestamp: timeStamp,
            sign: that.$utils.generateSign(that.$StringUtils.getReqId(),timeStamp),
            openId: that.token,
            data: {
              phoneNo: that.vPhone, //手机号
              smsCode: code
            }
          }, function (res) {

            if  (res.ret === '0') {
              //跳转下一步
              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.QuickWriteThree,
                "segmentation": {
                  appId: window.appId,
                }
              });
              that.$router.push(that.$RM.quickwritethree);
            }
            else {
              //如果不成功，弹出后台提示的错误语
              that.$toast(res.msg);
            }
          }.bind(that), function () {

          }.bind(that))
        }
      },

      clearData(num) {
        if (num == 1) {
          this.vIdcard = '';
        }
        if (num == 2) {
          this.vLicen = '';
        }
        if (num == 3) {
          this.vAccountShopName = '';
        }
        if (num == 4) {
          this.vYanCode = '';
        }
        if (num == 5) {
          this.vLawName = '';
        }
      },

      //校验身份证号码
      checkIdcard() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;


        let idcardInput = that.$refs.rIdcard.value;
        console.info('输入的身份证号>>>' + idcardInput);
        if (!that.$StringUtils.isEmpty(idcardInput)) {
          if (!that.$utils.checkIdcard(idcardInput)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IDCARD_IS_ERROR);

          }
          that.vIdcard = idcardInput;
          sessionStorage.setItem('quickCacheIdcard', idcardInput);

        }
      },
      //校验验证码
      checkYanCode() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;


        //接收到，输入的传过来的验证码
        let rYanCodeInput = that.$refs.rYanCode.value;
        console.info('输入验证码>>>' + rYanCodeInput);
        if (!that.$StringUtils.isEmpty(rYanCodeInput)) {
          //存入本地缓存
          sessionStorage.setItem('quickCacheInputYanCode', rYanCodeInput);
          that.vYanCode = rYanCodeInput;
        }

      },

      toProcol() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        this.$router.push(this.$RM.PersonProtocol);
      },


      //获取城市级联组件传来的省
      getProvince(Province) {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        this.province = Province;
        console.info("省..." + this.province);
        if (!this.$StringUtils.isEmpty(this.province)) {
          sessionStorage.setItem("quickCacheProvince", this.province)
        }


      },
      //获取城市级联组件传来的市
      getCity(City) {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        this.city = City;
        console.info("市.." + this.city);
        if (!this.$StringUtils.isEmpty(this.city)) {
          sessionStorage.setItem("quickCacheCity", this.city)
        }
      },
      //获取城市级联组件传来的区
      getArea(Area) {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        this.area = Area;
        console.info("区.." + this.area);
        if (!this.$StringUtils.isEmpty(this.area)) {
          sessionStorage.setItem("quickCacheArea", this.area)
        }
      },
      //点击图片获取验证码
      getVerificationCode() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        console.info("点击图片获取验证码>>>");
        var that = this;

        console.info('现在的网络状态是>>>' + that.nonet);
        if (that.nonet) {
          that.$toast("网络异常，请重试")
          //跳转断网页面
          that.$router.push(that.$RM.Netbroken);
        } else {
          // 获取手机号
          var userPhone = that.vPhone;
          console.info("输入的手机号>>>" + userPhone);
          //校验手机号为空

          if (that.$StringUtils.isEmpty(userPhone)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100007);
            return;
          }
          //校验手机号格式是否正确
          if (!that.$utils.checkPhone(userPhone)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
            return
          }

          //开始请求获取验证码的操作
          that.$indicator.open("发送中...");
          let timeStamp=Date.now();
          that.$api.post(that.$Constants.GET_VERIFICATION, {
            appId: window.appId,
            reqId: that.$StringUtils.getReqId(),
            timestamp:timeStamp,
            sign: that.$utils.generateSign(that.$StringUtils.getReqId(), timeStamp),
            openId: that.token,
            data: {
              phoneNo: userPhone //手机号
            }
          }, function (res) {
            console.info('成功请求到后台验证码接口>>>')
            if (res.ret === '0') {
              that.$indicator.close();
              var yanCode = res.data.verificationCode;
              if (!that.$StringUtils.isEmpty(yanCode)) {
                console.info('后台返回的手机验证码是>>>' + yanCode)
              }
            }
            else {
              //如果不成功，弹出后台提示的错误语
              that.$indicator.close();
              that.$toast(res.msg);
            }
          }.bind(that), function () {
            that.$indicator.close();
          }.bind(that));


          //倒计时1分钟，才可重新点击获取
          that.getCode();
          that.vertDisabled = ''//按钮不可用
        }

      },
      //验证码倒计时
      getCode() {
        var interval = null;//倒计时函数
        var that = this;

        var currentTime = that.currentTime;
        interval = setInterval(() => {
          currentTime--;
          that.time = '(' + currentTime + ')重新获取';
          //发送验证码样式变亮
          that.btnVertBackStyle = 'color:#999999;border:1px solid #e1e1e1; box-shadow:0 0 4px 0 rgba(193,193,193,0.40);'
          if (currentTime <= 0) {
            clearInterval(interval);
            that.time = '重新获取';
            that.currentTime = 61;
            that.vertDisabled = false;//按钮可用
            that.btnVertBackStyle = "";//样式置灰
          }
        }, 1000)
      },
      onCheckChange(val) {
        this.check = val;
        sessionStorage.setItem("quickCacheGou", this.check);
      },
      //获取商户门店输名称入值
      checkAccountShopName() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;
        //接收到，输入的传过来的商户门店
        var accountNameInput = that.$refs.rAccountShopName.value;
        if (!that.$StringUtils.isEmpty(accountNameInput)) {
          //存入本地缓存
          sessionStorage.setItem('quickCacheAccountShopName', accountNameInput);
          console.info('输入的商户名称>>>' + accountNameInput)
          that.vAccountShopName = accountNameInput;
        }
      },
      //校验营业执照，有15位、有18位、有全部数字，也有数字+字母，我干脆就校验它不能输入特殊字符和中文
      checkLicen() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;

        //接收到，输入的传过来的营业执照注册号
        var licenInput = that.$refs.rLicen.value;
        console.info('输入营业执照>>>' + licenInput);

        if (!that.$StringUtils.isEmpty(licenInput)) {
          if (licenInput.length < 13) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.LICENERROR);
          } else {
            that.vLicen = licenInput;
            //存入本地缓存
            sessionStorage.setItem('quickCacheLicen', that.vLicen);
          }
          if (!that.$utils.checkLicense(licenInput)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.LICENERROR);
          }
        }

      },

      //校验输入详细的地址
      checkStreet() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;

        //接收到，输入的传过来的详细的地址
        var streetInput = that.$refs.rStreet.value;
        if (!that.$StringUtils.isEmpty(streetInput)) {
          console.info('输入新商盟密码>>>' + streetInput);
          //存入本地缓存
          sessionStorage.setItem('quickCacheStreet', streetInput);
          that.vStreet = streetInput;
        }
      },
      //点击下一步，表单校验
      quickSecondNext: function () {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;

        console.info('--------下一步的按钮事件--------');
        console.info('现在的网络状态是>>>' + that.nonet);
        if (that.nonet) {
          that.$toast("网络异常，请重试");
          that.$router.push(that.$RM.Netbroken);
        } else {
          //校验法人姓名
          var cacheLawName = that.$refs.rLawName.value;
          if (that.$StringUtils.isEmpty(cacheLawName)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_200004);
            console.info('法人姓名为null...');
            return;
          }
          if (!(that.$utils.checkName(cacheLawName))) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.LAWNAMEERROR);
            return;
          }
          //校验身份证
          var cacheIdcard = that.$refs.rIdcard.value;
          if (that.$StringUtils.isEmpty(cacheIdcard)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_200005);
            console.info('身份证为null...');
            return;
          }

          if (!that.$utils.checkIdcard(cacheIdcard)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IDCARD_IS_ERROR);
            return;
          }
          //校验营业执照
          var cacheLicen = that.$refs.rLicen.value;
          if (that.$StringUtils.isEmpty(cacheLicen)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201012);
            console.info('营业执照为null...');
            return;
          }
          if (!that.$utils.checkLicense(cacheLicen)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.LICENERROR);
            return;
          }

          if (cacheLicen.length < 13) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.LICENERROR);
            return;
          }

          //校验商户门店名称
          var accountStoreInput = sessionStorage.getItem('quickCacheAccountShopName');
          if (that.$StringUtils.isEmpty(accountStoreInput)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.ACCOUNTSTORE_NULL);
            console.info('门店名称有误，输入的门店名称为null...');
            return;
          }

          //校验省市区
          var cacheProvince = sessionStorage.getItem('quickCacheProvince');
          if (that.$StringUtils.isEmpty(cacheProvince)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201006);
            console.info('省为null...');
            return;
          }
          var cacheCity = sessionStorage.getItem('quickCacheCity');
          if (that.$StringUtils.isEmpty(cacheCity)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201007);
            console.info('市为null...');
            return;
          }
          var cacheArea = sessionStorage.getItem('quickCacheArea');
          if (that.$StringUtils.isEmpty(cacheArea)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201008);
            console.info('区为null...');
            return;
          }
          //校验输入的详细地址
          var cacheStreet = that.$refs.rStreet.value;
          if (that.$StringUtils.isEmpty(cacheStreet)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201009);
            console.info('详细地址为null...');
            return;
          }

          //校验输入的详细地址
          var cacheYanCode = that.$refs.rYanCode.value;
          if (that.$StringUtils.isEmpty(cacheYanCode)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.YANCODE_NULL);
            console.info('验证码为null...');
            return;
          }
          //调用校验验证码的接口,跳转下一步
          that.checkVerification(that.vYanCode);
        }
      }

    },
    watch: {
      //监听这1个值的改变，一改变样式也相对改变
      vLawName(val, oldval) {
        if (val.length > this.lawNameLength) {
          this.vLawName = String(val).slice(0, this.lawNameLength);
        }
      },
      vLicen(val, oldval) {
        val = val.replace(/[\W]/g, '');
        if (val.length > this.licenLength) {
          this.vLicen = String(val).slice(0, this.licenLength);
        }
      },
      vIdcard(val, oldval) {
        val = val.replace(/[\W]/g, '');
        if (val.length > this.idCardLength) {
          this.vIdcard = String(val).slice(0, this.idCardLength);
        }
        if (!this.$StringUtils.isEmpty(this.vIdcard)) {
          this.progressCss = 'background-color: #ff6400;;width:50%;height: 1px;';//进度条橙色
          this.text_orange = 'color: #ff6400;';//文字橙色
          this.backcolor_orange = 'background-color: #ff6400;';//背景橙色

        }
        else {
          this.progressCss = '';//暗色
          this.text_orange = '';
          this.backcolor_orange = '';

        }

      }
    }
  }
</script>

<style scoped>
  .fixed {
    position: fixed;
    width: 100%;
    margin-top: 0;
    top:0;
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
    line-height: 32px;
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

  .backcolor_orange {
    background-color: #ff6400;
  }

  .text_orange {
    color: #ff6400;
  }

  .common_font {
    font-size: 30px;
    color: #000;
  }

  .verticode_font {

    font-size: 0.4rem;
    color: #000;
    letter-spacing: 0.15rem;
    border: 0;
  }

  .bgc_white {
    background-color: #fff;
  }

  .believeCss {
    font-size: 24px;
    color: #878787;
    text-align: left;
  }

  .believeInputCss {
    width: 5.6rem;
    border: 0;
    margin-bottom: 0.7rem;
    font-size: 0.4rem;
    margin-left: -0.1rem;
  }

  .common_center_Three {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 12px;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }

  textarea {
    width: 6rem;
    height: 1.6rem;
    border: 0;
    font-size: 30px;
    /*去掉多行文本框右下角的伸缩显示，详情见https://bbs.csdn.net/topics/390764944/*/
    resize: none;
    margin-left: -0.1rem;
  }

  textarea::-webkit-input-placeholder {
    font-size: 25px;
    color: #999;
  }

  input::-webkit-input-placeholder {
    font-size: 29px;
    color: #999;
  }

  .expandOne {
    width: 6rem;
    border: 0;
    font-size: 30px;
    margin-left: -0.1rem;
  }

  .phoneNumCss {
    width: 5rem;
    border: 0;
    font-size: 0.4rem;
    margin-left: -0.3rem;
  }

  .shopAddeCss {
    width: 5.6rem;
    border: 0;
    font-size: 0.4rem;
    margin-left: -0.2rem;
  }

  .shopAddNameSpaceCss {
    letter-spacing: 0.08rem;

  }

  .idCardCss {
    width: 5.2rem;
    border: 0;
    font-size: 0.4rem;
    margin-left: -0.2rem;
  }

  .idCardSpaceCss {
    letter-spacing: 0.17rem;
  }

  .yanCaoSpaceCss {
    letter-spacing: 0.07rem;
  }

  .lawNameCss {
    width: 5.6rem;
    border: 0;
    font-size: 0.4rem;
    margin-left: -0.3rem;
  }

  .lawNameSpaceCss {
    letter-spacing: 0.3rem;
  }

  .phoneNumSpaceCss {
    letter-spacing: 0.3rem;
  }

  .shopAddSpaceCss {
    letter-spacing: 0.08rem;
    width: 3.6rem;
  }

  .juzhong {
    display: flex;
  }

  .margin_top_bottom {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .codeInput {
    width: 2.6rem;
    font-size: 0.4rem;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    border: none;
    margin-left: -0.1rem;
  }

  .page {
    height: 100%;
    background-color: #f2f2f2;
    padding-top: 1rem;
  }

  .accountCss {
    font-size: 26px;
    color: #666666;
    margin-left: 0.2rem;
  }

  .lineLight {
    line-height: 48px;
    letter-spacing: 0.01rem;
  }

  .btn666 {
    margin-top: 50px;
    margin-bottom: 50px;
    background-image: linear-gradient(-90deg, #ffa366 0%, #ffa366 100%);
    border-radius: 5px;
    width: 8.7rem;
    height: 1.3rem;
    color: #fff1e8;
    border: none;
    font-size: 30px;
  }

  .btn999 {
    background: #ffffff;
    border: 1px solid #ff6400;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.30);
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    width: 178px;
    height: 58px;
    /*margin: auto;*/
    font-size: 26px;
    color: #ff6400;
    text-align: center;
    line-height: 40px;
    -webkit-appearance: none; /*解决iphone safari上的按钮圆角问题*/
    margin-right: 0.5rem;
  }

  .clearUserPhoneCss {
    width: 0.373333rem;
    height: 0.373333rem;
  }

  .clearYanCodeCss {
    width: 0.373333rem;
    height: 0.373333rem;
    padding-right: 0.3rem;
  }

  .clearIdcardCss {
    width: 0.373333rem;
    height: 0.373333rem;
    padding-left: 0.4rem;
  }

  .lineCss_orange {
    background-color: #ff6400;
    width: 32%;
    height: 2px;
  }

  .myAddress {
    margin-top: -0.1rem !important;
    /*margin-left: -0.1rem!important;*/
  }

  .maohao {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
</style>
