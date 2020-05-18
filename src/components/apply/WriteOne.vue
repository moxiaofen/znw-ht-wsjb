<!--进件中,资料填写的第一步的页面-->
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
            <div class='radius ' :style="backcolor_orange">
              <div class='numbercss '>1</div>
            </div>
            <!-- 来条线 -->
            <div class='lineCss'>
              <div :style="progressCss"></div>
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
            <div :style="text_orange">法人信息</div>
            <div>商户信息</div>
            <div>银行鉴权</div>
          </div>
        </div>
      </div>
      <!-- 加一个白色背景图------end -->
    </div>
    <!-- 步骤进度-----end------ -->


    <!-- 中部法人信息 -->
    <!--加入表单验证-->

    <div class='middle'>
      <div class='section__title'>商户法人信息<span class="accountCss">(必填项)</span></div>
      <!-- 加一个白色底色背景-----------start----------- -->
      <div class='bgc_white'>
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'>法人姓名<span class="maohao">：</span></div>
          <input name='lawName' ref="rLawName" v-model="vLawName" class='expandOne'
                 type='text' placeholder='请输入法人姓名'
                 @blur='checkLawName'/>
          <img class=' clearUserPhoneCss' v-show="vLawName" @click="clearData(1)" src="/static/assets/clear.png"/>

        </div>

        <!-- 来条灰色横线 -->
        <Divider></Divider>
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'>身份证号<span class="maohao">：</span></div>
          <input @blur='checkIdcard' class='expandOne' type='text' ref="rIdcard" v-model="vIdcard"
                 placeholder='请输入有效身份证号码'/>
          <img class=' clearUserPhoneCss' v-show="vIdcard" @click="clearData(2)" src="/static/assets/clear.png"/>

        </div>

        <!-- 来条灰色横线 -->
        <Divider></Divider>
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'>手机号码<span class="maohao">：</span></div>
          <input v-model="vPhone" class='expandOne' readonly="readonly"/>
        </div>
        <!-- 来条灰色横线 -->
        <Divider></Divider>
        <div class='common_center margin_top_bottom'>
          <div class='common_margin_left verticode_font'> 手机验证码<span class="maohao">：</span></div>
          <!-- 输入验证码 -->
          <input placeholder='请输入验证码' class='codeInput' @blur='checkYanCode' ref="rYanCode" v-model="vYanCode"
                 oninput="if(value.length>4)value=value.slice(0,4)" type='number' min="0" inputmode="numeric"
                 pattern="[0-9]*" title="Non-negative integral number"/>
          <img class=' clearUserPhoneCss' v-show="vYanCode" @click="clearData(3)" src="/static/assets/clear.png"/>

          <input type="button" class="btn999" :style="btnVertBackStyle" v-bind:disabled="vertDisabled" :value="time"
                 @click="getVerificationCode()"/>
        </div>

        <!-- 来条灰色横线 -->
        <Divider></Divider>
      </div>
      <!-- 加一个白色底色背景-----------end----------- -->

      <div class='section__title '>紧急联系人信息<span class="accountCss">(必填项)</span></div>

      <!-- 加一个白色底色背景-----------start----------- -->
      <div class='bgc_white'>
        <div class='common_center_Three'>
          <div class='commonCss' @click="choose">
            <div class='common_margin_left common_font'>紧急联系人关系<span class="maohao">：</span></div>
            <input class="rightText" placeholder="请选择" v-model="vRelation" type='text' readonly="readonly"/>
            <img src="/static/assets/right_arrow.png" class="img">
          </div>
        </div>
        <!-- 来条灰色横线 -->
        <Divider></Divider>
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'> 紧急联系人姓名<span class="maohao">：</span></div>
          <input @blur='checkUrgentName' ref="rUrgentName" v-model="vUrgentName" class='emerinput'
                 type='text' placeholder='请输入紧急联系人姓名'/>
          <img class=' clearUserPhoneCss' v-show="vUrgentName" @click="clearData(4)" src="/static/assets/clear.png"/>

        </div>
        <!-- 来条灰色横线 -->
        <Divider></Divider>
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'> 紧急联系人电话<span class="maohao">：</span></div>
          <input ref="rUrgentPhone" v-model="vUrgentPhone" @blur='checkUrgentPhone'
                 class='emerinput' type='number' min="0" inputmode="numeric" pattern="[0-9]*"
                 title="Non-negative integral number" placeholder='请输入紧急联系人联系方式'
                 oninput="if(value.length>11)value=value.slice(0,11)"/>
          <img class=' clearUserPhoneCss' v-show="vUrgentPhone" @click="clearData(5)" src="/static/assets/clear.png"/>
        </div>
        <!-- 来条灰色横线 -->
        <Divider></Divider>
      </div>
    </div>
    <!-- 加一个白色底色背景-----------end----------- -->

    <div align="center">
      <input type="button" class="btn666" value="下一步" :style="btnRegister" v-bind:disabled="btnDisabled"
             @click="firstNext()"/>
    </div>
    <ContactRelationPicker ref="picker" @onValueChange="onValueChange"></ContactRelationPicker>
  </div>

</template>
<script>

  import Checkbox from '../Checkbox'
  import RelationPicker from '../Picker'
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import SM from '../../api/SessionManager.js'
  import ContactRelationPicker from '../ContactRelationPicker.vue'

  export default {
    name: SM.WriteOne,
    components: {Checkbox, RelationPicker, ToolBar, Divider, ContactRelationPicker},
    data() {
      return {

        idCardLength: 18,
        lawNameLength: 6,
        urgentNameLength: 6,
        testCheck: null,
        vertiCode: null,
        text_orange: '',
        backcolor_orange: '',
        progressCss: '',
        btnRegister: 'background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);',//下一步样式
        btnDisabled: false,//下一步按钮默认不可用
        token: null,
        vertDisabled: false,//验证码按钮可用
        btnVertBackStyle: '',//发送验证码样式置灰
        check: false,
        nonet: false,
        currentTime: 61,
        time: '获取验证码', //倒计时
        alreaUserCode: null,
        vRelation: null,//紧急联系人关系
        vLawName: null,
        vPhone: null,
        vIdcard: null,
        vUrgentPhone: null,
        vUrgentName: null,
        vYanCode: null,


      }
    },

    //生命周期方法
    mounted() {
      //15分钟之后失效，强制登陆
      if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
        return
      }

      console.info("writeone,执行生命周期函数>>>>>>>mounted。。。");


      var token = sessionStorage.getItem("loginSession");

      this.token = token;//登陆态，赋值给全局变量
      console.info("writeone,获取登陆态>>>" + this.token);

      //获取缓存里的手机号

      var cphone = this.$StringUtils.getPhone();
      if (!this.$StringUtils.isEmpty(cphone)) {
        this.vPhone = cphone;
      }

      //如果法人姓名有缓存，先显示出来
      var cacheLawName = sessionStorage.getItem('cacheLawName');
      if (!this.$StringUtils.isEmpty(cacheLawName)) {
        this.vLawName = cacheLawName;
      }
      //如果身份证有缓存，先显示出来
      var cacheIdcard = sessionStorage.getItem('cacheIdcard');
      if (!this.$StringUtils.isEmpty(cacheIdcard)) {
        this.vIdcard = cacheIdcard;
      }

      //如果手机号有缓存，先显示出来
      var cachePhone = sessionStorage.getItem('cachePhone');
      if (!this.$StringUtils.isEmpty(cachePhone)) {
        this.vPhone = cachePhone;
      }

      //如果验证码有缓存，先显示出来
      var cacheInputYanCode = sessionStorage.getItem('cacheInputYanCode');
      if (!this.$StringUtils.isEmpty(cacheInputYanCode)) {
        this.vYanCode = cacheInputYanCode;
      }
      //如果紧急联系人有缓存，先显示出来
      var cacheUrgent = sessionStorage.getItem(this.$options.name + 'cacheUrgent');
      if (!this.$StringUtils.isEmpty(cacheUrgent)) {
        this.vRelation = cacheUrgent;
      }

      //如果紧急联系人姓名有缓存，先显示出来
      var cacheUrgentName = sessionStorage.getItem('cacheUrgentName');
      if (!this.$StringUtils.isEmpty(cacheUrgentName)) {
        this.vUrgentName = cacheUrgentName;
      }

      //如果紧急联系人手机号码有缓存，先显示出来
      var cacheUrgentPhone = sessionStorage.getItem('cacheUrgentPhone');
      if (!this.$StringUtils.isEmpty(cacheUrgentPhone)) {
        this.vUrgentPhone = cacheUrgentPhone;
      }
    },
    methods: {

      choose: function () {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        this.$refs.picker.popupVisible = true
      },
      onValueChange: function (value) {
        this.vRelation = value;
        console.info("选择的关系：" + value);
      },
      kingCode() {
        //测试专用，快速填写信息
        this.vLawName = "你好";
        this.vIdcard = "450502199211260775";
        this.vUserPhone = sessionStorage.getItem('cachePhone');
        this.vYanCode = "6666";
        this.vUrgentName = "我很好";
        this.vUrgentPhone = "13333333333";
        this.vRelation = "父母";


        sessionStorage.setItem('cacheUrgentRelation', this.vRelation);
        sessionStorage.setItem("cacheLawName", this.vLawName);
        sessionStorage.setItem("cacheIdcard", this.vIdcard);
        sessionStorage.setItem("cachePhone", this.vUserPhone);

        sessionStorage.setItem("cacheInputYanCode", this.vYanCode);
        sessionStorage.setItem("cacheUrgentName", this.vUrgentName);
        sessionStorage.setItem("cacheUrgentPhone", this.vUrgentPhone);
      },
      //请求接口，校验验证码
      checkVerification(code) {

        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        let that=this;
        if (!that.$StringUtils.isEmpty(code)) {
          console.info("checkVerification请求的数据包：phone:" + that.vPhone + ",code:" + code);

          let timeStamp=Date.now();
          that.$api.post(that.$Constants.CHECK_VERIFICATION, {
            appId: window.appId,
            reqId: that.$StringUtils.getReqId(),
            timestamp:timeStamp,
            sign: that.$utils.generateSign(that.$StringUtils.getReqId(),timeStamp),
            openId: that.token,
            data: {
              phoneNo: that.vPhone, //手机号
              smsCode: code
            }
          }, function (res) {
            if (res.ret === '0') {
              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.WriteTwo,
                "segmentation": {
                  appId: window.appId,
                }
              });
              //跳转下一步
              that.$router.push(that.$RM.WriteTwo);
            }
            else {
                    //如果不成功，弹出后台提示的错误语
                     that.$toast(res.msg);
            }
          }.bind(that), function () {
          }.bind(that))


        }
      },
      //清除输入框数据
      clearData(num) {
        if (num == 1) {
          this.vLawName = '';
        }
        if (num == 2) {
          this.vIdcard = '';
        }

        if (num == 3) {
          this.vYanCode = '';
        }
        if (num == 4) {
          this.vUrgentName = '';
        }
        if (num == 5) {
          this.vUrgentPhone = '';
        }

      },
      toProcol() {
        //跳转个人协议
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
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
          key: this.$Constants.agreementClick,
          "segmentation": {
            appId: window.appId,
          }
        });


        this.$router.push(this.$RM.PersonProtocol);
      },
      onCheckChange: function (val) {
        //nCheckChange勾选框的状态
        this.check = val;
      },
      getRelation(res) {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        this.vRelation = res
      },
      //点击图片获取验证码
      getVerificationCode() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        console.info("点击图片获取验证码>>>")
        var that = this;

        console.info('现在的网络状态是>>>' + that.nonet)
        if (that.nonet) {
          that.$toast("网络异常，请重试")
          //跳转断网页面
          that.$router.push(that.$RM.Netbroken);
        } else {
          // 获取手机号
          var userPhone = that.vPhone;
          console.info("输入的手机号>>>" + userPhone)
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


          that.$indicator.open("发送中...");
          let timeStamp=Date.now();
          that.$api.post(that.$Constants.GET_VERIFICATION, {
            appId: window.appId,
            reqId: that.$StringUtils.getReqId(),
            timestamp: timeStamp,
            sign: that.$utils.generateSign(that.$StringUtils.getReqId(),timeStamp),
            openId: that.token,
            data: {
              phoneNo: userPhone //手机号
            }
          }, function (res) {

            console.info('成功请求到后台验证码接口>>>');

            if (res.ret === '0') {
              that.$indicator.close();
              var yanCode = res.data.verificationCode;
              if (!that.$StringUtils.isEmpty(yanCode)) {
                console.info('后台返回的手机验证码是>>>' + yanCode)
              }
            }
            else {
              that.$indicator.open("请稍候...");
              //如果不成功，弹出后台提示的错误语
              that.$toast(res.msg);
            }
          }.bind(that), function () {
            that.$indicator.close();
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          }.bind(that));

          //倒计时1分钟，才可重新点击获取
          that.getCode();
          that.vertDisabled = ''//按钮不可用
        }

      },
      //验证码倒计时
      getCode() {

        var interval = null //倒计时函数
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
          sessionStorage.setItem('cacheLawName', lawNameInput);
        }
      },
//      校验紧急联系人姓名
      checkUrgentName() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }

        var that = this;

        var urgentNameInput = that.$refs.rUrgentName.value;
        console.info('用户的输入的紧急人姓名>>>' + urgentNameInput);
        if (!that.$StringUtils.isEmpty(urgentNameInput)) {
          //第六步、校验输入的内容
          if (!(that.$utils.checkName(urgentNameInput))) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.URGENTNAM_EERROR);
          }
          that.vUrgentName = urgentNameInput;
          sessionStorage.setItem('cacheUrgentName', urgentNameInput);

        }
      },
      //校验身份证号码
      checkIdcard() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }

        var that = this;

        var idcardInput = that.$refs.rIdcard.value;
        console.info('输入的身份证号>>>' + idcardInput)
        if (!that.$StringUtils.isEmpty(idcardInput)) {

          if (!that.$utils.checkIdcard(idcardInput)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IDCARD_IS_ERROR);
          }
          that.vIdcard = idcardInput;
          sessionStorage.setItem('cacheIdcard', idcardInput);

        }
      },
      //校验校验紧急联系人号码
      checkUrgentPhone() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;

        //接收到，输入的传过来的手机号
        var urgentPhoneInput = that.$refs.rUrgentPhone.value;
        console.info('输入的手机号>>>' + urgentPhoneInput);

        if (!that.$StringUtils.isEmpty(urgentPhoneInput)) {
          if (!that.$utils.checkPhone(urgentPhoneInput)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
          }
          that.vUrgentPhone = urgentPhoneInput;
          //存入本地缓存
          sessionStorage.setItem('cacheUrgentPhone', that.vUrgentPhone);
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
        var rYanCodeInput = that.$refs.rYanCode.value;
        console.info('输入验证码>>>' + rYanCodeInput);
        if (!that.$StringUtils.isEmpty(rYanCodeInput)) {
          //存入本地缓存
          that.vYanCode = rYanCodeInput;//赋值全局变量
          sessionStorage.setItem('cacheInputYanCode', that.vYanCode)
        }

      },
      //点击下一步，表单校验
      firstNext() {
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
        }
        else {
          //校验法人姓名
          if (that.$StringUtils.isEmpty(that.vLawName)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_200004);
            console.info('法人姓名为null...');
            return;
          }

          if (!(that.$utils.checkName(that.vLawName))) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.LAWNAMEERROR);
            return;
          }
          //校验身份证
          if (that.$StringUtils.isEmpty(that.vIdcard)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_200005);
            console.info('身份证为null...');
            return;
          }
          if (!that.$utils.checkIdcard(that.vIdcard)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IDCARD_IS_ERROR);
            return;
          }


          if (that.$StringUtils.isEmpty(that.vYanCode)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.YANCODE_NULL);
            console.info('验证码为null...');
            return;
          }


          //校验紧急联系人关系
          let checkEmerRelationTemp = '';
          if (that.vRelation === '配偶') {
            checkEmerRelationTemp = '01';
          }
          if (that.vRelation === '父母') {
            checkEmerRelationTemp = '02';
          }
          if (that.vRelation === '儿女') {
            checkEmerRelationTemp = '03';
          }
          if (that.vRelation === '兄弟姐妹') {
            checkEmerRelationTemp = '06';
          }
          //紧急关系人的数字代号 存入缓存，留给第二步，提交进件接口使用
          sessionStorage.setItem('cacheUrgentRelation', checkEmerRelationTemp);

          if (that.$StringUtils.isEmpty(that.vRelation)) {
            console.info('紧急联系人关系为null...');
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201003);
            return;
          }
          //校验紧急联系人姓名
          if (that.$StringUtils.isEmpty(that.vUrgentName)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201004);
            console.info('紧急联系人名字为null...');
            return;
          }

          if (!(that.$utils.checkName(that.vUrgentName))) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.URGENTNAM_EERROR);
            return;
          }

          //校验紧急联系人手机号
          if (that.$StringUtils.isEmpty(that.vUrgentPhone)) {
            console.info('紧急联系人电话为null...');
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201005);
            return;
          }
          if (!that.$utils.checkPhone(that.vUrgentPhone)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
            return;
          }
          //调用校验验证码的接口,跳转下一步
          that.checkVerification(that.vYanCode);
        }
      }
    },
    watch: {
      vUrgentName(val, oldval) {
        if (val.length > this.urgentNameLength) {
          this.vUrgentName = String(val).slice(0, this.urgentNameLength);
        }
      },
      vIdcard(val, oldval) {
        val = val.replace(/[\W]/g, '');
        if (val.length > this.urgentNameLength) {
          this.vIdcard = String(val).slice(0, this.idCardLength);
        }
      },
      vLawName(val, oldval) {
        if (val.length > this.lawNameLength) {
          this.vLawName = String(val).slice(0, this.lawNameLength);
        }
        if (!this.$StringUtils.isEmpty(this.vLawName)) {
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
    },
    destroyed() {
      this.$sessionManager.saveWrite(this.vRelation)
    }
  }
</script>
<style scoped>
  .regular-checkbox {
    -webkit-appearance: none;
  }
</style>
<style scoped>
.fixed {
    position: fixed;
    width: 100%;
    margin-top: 0;
    top:0;
  }
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
  }

  .top {
    font-size: 26px;
    color: #999;
    text-align: justify;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.50);
    padding-top: 0.4rem;
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

  .commonCss {
    width: 100%;
    display: flex;
    align-items: center;
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
    border: 0;
    width: 2.6rem;
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

  .emerinput {

    width: 5.6rem;
    /*height: 1rem;*/
    /*line-height: 1rem;*/
    border: 0;
    /*font-size: 0.4rem;*/

  }

  input::-webkit-input-placeholder {
    font-size: 29px;
    color: #999;
  }

  input {
    font-size: 30px;
  }

  .expandOne {
    width: 6.8rem;
    border: 0;
  }

  .margin_top_bottom {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .codeInput {
    width: 3.4rem;
    font-size: 0.4rem;
    flex-grow: 1;
    border: none;
  }

  .accountCss {
    font-size: 26px;
    color: #666666;
    margin-left: 0.2rem;
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

  .btn666 {
    margin-top: 50px;
    margin-bottom: 50px;
    background-image: linear-gradient(-90deg, #ffa366 0%, #ffa366 100%);
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    width: 8.7rem;
    height: 1.3rem;
    border: none;
    font-size: 30px;
    color: #ffffff;
  }

  .clearUserPhoneCss {
    width: 0.373333rem;
    height: 0.373333rem;
    margin-right: 0.3rem;
  }

  .rightText {
    font-size: 30px;
    text-align: left;
    /*padding-right: 30px;*/
    border: none;
    outline: none;
    line-height: 42px;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .img {
    width: 17px;
    height: 31px;
    padding-right: 0.5rem;;
    margin: auto;
  }

  .maohao {
    margin-left: 0.1rem;
  }
  .page {
    background-color: #f2f2f2;
    height: 100%;
    padding-top: 1rem;
  }
</style>
