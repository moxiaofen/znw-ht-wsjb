<!--进件首页-->
<template>
  <!-- 最外层的div-------------------start -->
  <mt-loadmore :top-method="loadTop" ref="loadmore">
    <div id='indexContainer'>

      <ToolBar :isShowNav='false'><span class="toolBar">安田惠通</span></ToolBar>
      <div>
        <!--<CircleRadius ></CircleRadius>-->
      </div>
      <!--<span @click="toTest()" id="test666">测试按钮</span>-->

      <!-- 背景图-------------------start -->
      <!--bgcHidden背景图片一开始 让它显示，同时加载一个隐藏的断网占位图，默认是隐藏的，然后断网之后，显示出来，-->
      <div class="netErrorBgcImg" v-show="netErrorHidden"></div>

      <div class="bgcImg" :hidden="bgcHidden">
        <!-- 头部文字 -->
        <div class='top_font ' :hidden="top_fontShow">
          您的授信额度(元)



          <div class='rmb'>{{money}}</div>
          银行信贷，循环授信，随借随还，万四日息



        </div>
        <!-- 中间变化的按钮图片----------start  -->
        <!--六套-->
        <div :style="apply_btnNowApply" :hidden="apply_btnNowApplyHid" @click="now_applyClick">
          <div class="applyContent">
            <div class="applyContentTitle">{{applyTitle}}<br/>
              <span class="applyContentWord" :hidden="applyWordHid">{{applyWord}} </span></div>
          </div>
        </div>
        <!-- 中间变化的按钮图片----------end -->
        <div class="yancao" :hidden="yancaoHid">烟草商户专享，信用授信</div>
        <input type="button" class="btn888" :style="btnVertBackStyle" v-bind:disabled="vertDisabled" :value="pro_word"
               @click="toRepaySkip()"/>
      </div>

      <!-- 背景图-------------------end -->
      <!-- 产品的介绍-----------start---------- -->
      <div class='section__title'>
        产品介绍



      </div>
      <div class=''>
        <!-- 加一个白色背景图-------start -->
        <div class='white_bac'>
          <div class='product_word'>
            面对正常经营的正规烟草商户，以商户经营状况为基础进行银行信用授信



          </div>
        </div>
        <!-- 加一个白色背景图------end -->
      </div>
      <!-- 产品的介绍-----------end---------- -->
      <!-- 申请的进度-----------start---------- -->
      <div class='section__title'>
        申请流程
        <span class='outdateCss'>{{outdate}}</span>
      </div>
      <!-- 加一个白色背景图-------start -->
      <div class='white_bac commom_bottom'>
        <div class='test-margin'>
          <!-- 横线并排 -->
          <div class='common_center margain_top_30 '>
            <!-- 画个圆点 -->
            <div class='radius' :style='raOne'></div>
            <!-- 来条线 -->
            <div :style="xian">
              <div :style='lineOne'>
              </div>
            </div>
            <!-- 画个圆点 -->
            <div class='radius' :style='raTwo'></div>
            <!-- 来条线 -->
            <div :style='xian'>
              <div :style='lineTwo'>
              </div>
            </div>
            <!-- 画个圆点 -->
            <div class='radius' :style='raThree'></div>
            <!-- 来条线 -->
            <div :style='xian'>
              <div :style='lineThree'></div>
            </div>
            <!-- 画个圆点 -->
            <div class='radius' :style='raFour'></div>
          </div>
          <div class='common_center margain_top_30 splex'>
            <div :style='applyOne' class='common_bettween marginOne'>开始申请</div>
            <div :style='applyTwo' class='common_bettween marginTwo'>{{checkSuccess}}</div>
            <div :style='applyThree' class='common_bettween marginThree'>{{faceSign}}</div>
            <div :style='applyFour' class='common_bettween marginFour'>{{progressEnd}}</div>
          </div>
        </div>
      </div>
      <!--<Main></Main>-->
      <!-- 加一个白色背景图------end -->
      <div>
      </div>
      <div id="allmap"></div>
    </div>
  </mt-loadmore>
  <!-- 申请的进度-----------end---------- -->
  <!-- 最外层的div-----------end---------- -->
</template>
<script>

  import ToolBar from './ToolBar.vue';
  import locationFun from '../api/location.js';
  import {Loadmore} from 'mint-ui';
  import Store from '../store';

//  安卓获取地理位置回调
    window.onLocAccess = function () {
      //获取经纬度
      console.log('地理位置成功授权的回调');
      locationFun.getLocation(function (location) {
        sessionStorage.setItem('location', location);
      });
    };



  //  ios第一次获取地理位置回调
    window.onLocAccessIos = function () {
      //获取经纬度
      locationFun.getLocation(function (location) {
        sessionStorage.setItem('location', location);
      });

    };

  //  ios第二次获取地理位置回调
    window.getIOSLocation = function (latitude,longitude) {
      //获取经纬度
      locationFun.getIOSLocationIos(latitude,longitude,function (locationIOS) {
        sessionStorage.setItem('location', locationIOS);
      });
    };



  export default {
    components: {ToolBar},
    data(){
      return {
        money: '500,000',//预授信额度
        bgcHidden: false,//背景图片，true是隐藏
        netErrorHidden: false,//断网占位图片，true是显示
        netError: false,//true是没网
        account: '',

        yancaoHid: false,
        top_fontShow: false,
        applyWordHid: true,
        applyTitle: "立即申请",//动态改变大字的内容
        applyWord: "审核失败",//动态改变小字的内容

        pro_word: '暂未申请',
        btnVertBackStyle: "",
        vertDisabled: "",

        apply_btnNowApply: "margin: auto; background: url(/static/assets/diban.png) no-repeat;background-size: 100% 4.2rem;  width: 4.2rem;height: 4.2rem; margin-top: 29px;-webkit-tap-highlight-color:rgba(0,0,0,0);",
        apply_btnNowApplyHid: false,

        isRefreshing: false, //首页刷新,
        hiddenCss: true,//为了让背景大图隐藏，显示出断网时的 占位图，问题
        imageCss: false,//为了让背景大图隐藏，显示出断网时的 占位图，问题

        outdate: '',//可能存在： '（银行面签超期，请重新提交）'的情况,
        checkSuccess: '审核成功',
        btnImg: '',
        faceSign: '银行面签',
        progressEnd: '合同签署',

        //圆点
        raOne: '',
        raTwo: '',
        raThree: '',
        raFour: '',
        raColor: 'background-color: #ff6400;',

        //横线
        xian: 'background-color: #e7e7e7; width: 25%;height: 1px;',//默认进度条
        lineOne: '',//默认颜色
        lineTwo: '',
        lineThree: '',
        lineColor: 'background:#ff6400;width:100%;height: 1px;',//橙色
        statusTemp: "",
        //进度文字的初始化颜色
        applyOne: '',
        applyTwo: '',
        applyThree: '',
        applyFour: '',
        applyColor: 'color:#ff6400',
      }
    },
    mounted(){
        if(window.appId==='IOS'){
          window.interfacePhone.accessLocIos();
        }
        if(window.appId==='ANDROID'){
          window.interfacePhone.accessLoc();
        }

      //15分钟之后失效，强制登陆
      if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
        return
      }
      var that = this;
      //清除掉地址选择器的缓存，解决用户常规进件填写了地址，又进去到快捷，导致快捷进件地址为空的异常提示
      that.toastLocation(); //弹出假的通知的弹出框
      that.checkNetWork();   //调取监听网络状态的代码
      that.selecCreditStatus();//查询当前授信状态
    },
    methods: {
      IOSlocation(){
        //重新获取ios用户的地理位置
        window.interfacePhone.accessLocIos();
      },
      AndroidLocation(){
        //重新获取安卓用户的地理位置
        window.interfacePhone.accessLoc();
      },
      countCountly(status){

        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
          var tempKey = "";
          switch (status) {
            case "01":
              tempKey = this.$Constants.confirmClick
              break;
            case "04":
              tempKey = this.$Constants.FailClick
              break;
            case "10":
              tempKey = this.$Constants.OvertimeClick
              break;
            case "17":
              tempKey = this.$Constants.expireClick
              break;
            case "15":
              tempKey = this.$Constants.drawingClick
              break;
            case "13":
              tempKey = this.$Constants.signButton
              break;
          }
          Countly.track_sessions();
          Countly.track_pageview();
          Countly.add_event({
            key: tempKey,
            "segmentation": {
              appId: window.appId,
            }
          });

      },
      //弹出假的通知的弹出框
      toastLocation(){
        var that = this;
        //跳个假的 授权信息通知的弹出框
        var tempTan = localStorage.getItem("tan");
        if (that.$StringUtils.isEmpty(tempTan)) {
          tempTan = 'yes';
        }
        if (tempTan == 'yes') {
          that.$dialog.confirm("    ", '安田惠通想给您发送通知。通知可能包括提醒、声音和图标标记。这些可在设置中配置',
            {
                confirmButtonText: '允许',
              cancelButtonText: '不允许'
            })
            .then(() => {
              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.inform,
                "segmentation": {
                  appId: window.appId,
                }
              });
              console.info("停留在当前页面")

              localStorage.setItem("tan", "no");
            })
            .catch(() => {
              console.info("停留在当前页面")
              localStorage.setItem("tan", "no");
            });
        }
      },
      //监听网络状态
      checkNetWork(){
        let that = this;
        let el = document.body;
        if (el.addEventListener) {
//          addEventListener——兼容：firefox、chrome、IE、safari、opera；不兼容IE7、IE8
          window.addEventListener("online", function () {
//            alert("有网....");
            that.netError = false;
            let sessionStatus = sessionStorage.getItem("nowStatus");
            if (!that.$StringUtils.isEmpty(sessionStatus)) {
              that.selecCreditStatus();//查询当前授信状态
            }

          });
          window.addEventListener("offline", function () {
//            alert("网络走丢了....");
            that.netError = true;
            that.isCreditStatus('6666');//直接渲染无网络的页面
          });
        }

      },
      //查询授信状态的方法
      selecCreditStatus(){
        var that = this;
        if (that.netError) {
          that.isCreditStatus("6666");
          sessionStorage.setItem('nowStatus', "6666");
          return
        }
        let isCanApply = '00'//给个初始化登陆状态

        var loginSession = sessionStorage.getItem("loginSession")//从缓存中取出登陆状态
        console.info("获取缓存的登陆状态session>>>" + loginSession)

        var timestamp = that.$utils.generateSignTime();
        var reqId = that.$utils.generateSignTime();
        var sign = that.$utils.generateSign(reqId, timestamp);

        if (that.$StringUtils.isEmpty(loginSession)) {
          console.info("index,登陆状态>>>为空")
          //调方法，初始化渲染页面
          that.money = "500,000";//赋值预授信额度给全局变量
          that.isCreditStatus(isCanApply);
          //把状态存入缓存，提供给now_applyClick的点击事件，根据状态点击时，跳转到不同的 页面去
          sessionStorage.setItem('nowStatus', isCanApply);

        }
        else {
          console.info("index,登陆状态>>>有值");
          const url = that.$api.ROOT + that.$Constants.QUERYCREDITSTATUS;
          that.$http.post(url, {
            reqId: reqId,
            appId: window.appId,
            sign: sign,
            timestamp: timestamp,
            openId: loginSession,
            data: {}
          })
            .then(function (res) {
              console.log(res);
              if (res.data.ret === '0') {

                isCanApply = res.data.data.isCanApply;
                //把查询到的状态存到缓存
                sessionStorage.setItem('nowStatus', isCanApply);
                var newBusinessAccount = res.data.data.newBusinessAccount;//新商盟账号
                that.account = newBusinessAccount;//赋值新商盟账号给全局变量
                var preCreditAmount = res.data.data.preCreditAmount;//预授信额度
                if (that.$StringUtils.isEmpty(preCreditAmount)) {
                  that.money = "500,000";
                }

                if (isCanApply === '10' || isCanApply === '11' || isCanApply === '12' || isCanApply === '13' || isCanApply === '14' || isCanApply === '15' || isCanApply === '16') {
                  that.money = that.$utils.addComma(preCreditAmount);//赋值预授信额度给全局变量
                } else {
                  that.money = "500,000";
                }

                var custName = res.data.data.custName;//商户名称
                //把返回来的其他数据缓存起来
                sessionStorage.setItem('newBusinessAccount', newBusinessAccount);
                sessionStorage.setItem('preCreditAmount', preCreditAmount);
                sessionStorage.setItem('custName', custName);
                //渲染页面
                that.isCreditStatus(isCanApply);
              }
              else {
                if (res.data.ret === '000002') {
                  that.$dialog.alert("    ",that.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
                  that.$StringUtils.loginOut();
                  return
                }
                that.isCreditStatus(isCanApply);
              }
            })
            .catch(function () {
              that.isCreditStatus(isCanApply);
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);//这里要处理一下
            })
        }

      },
      getOpenApp() {
          //跳转去 登陆的界面
        if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
          this.$router.replace({path: '/security/fingerLockView'});
        } else {
          this.$router.replace(this.$RM.Login);
        }
      },
      loadTop() {
        console.log('下拉刷新');

        var that = this;
        that.selecCreditStatus();//查询当前授信状态
        that.checkNetWork();//监听网络状态
        that.$refs.loadmore.onTopLoaded(); // 这个是用来关闭刷新的
      },
      onIndexSelected(){
        console.log('标签TAB切换到首页了!!!');
        var that = this;
        that.selecCreditStatus();//查询当前授信状态
        that.checkNetWork();   //调取监听网络状态的代码

      },
      toRepaySkip(){
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        //点击进度查询按钮，跳转平安页面
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        });
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.inquiryClick,
          "segmentation": {
            appId: window.appId,
          }
        });

        var that = this;
        let statusNow = sessionStorage.getItem('nowStatus');
        if ('10' === statusNow) {
          that.$dialog.confirm('暂无法查询，银行面签激活后可查询', '您的银行面签截止日期为2018年10月30日', {
            showCancelButton: false,
            confirmButtonText: "确定",
          })
            .then(() => {
              console.info("停留在当前页面")
            })
        }
        if ('14' === statusNow) {
          that.$dialog.confirm('您的新商盟授权信息已失效，请您再次授权新商盟信息，谢谢！此授权仅用于信息核对。', '新商盟授权操作', {
            showCancelButton: true,
            confirmButtonText: "前去授权",
            cancelButtonText: "取消",
          })
            .then(function ({value, action}) {
              that.$router.push({name: that.$RM.BusinessAccess, params: {account: that.account}});
              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.confirmButton,
                "segmentation": {
                  appId: window.appId,
                }
              });
            });
        }
        if ('03' === statusNow || '13' === statusNow || '15' === statusNow || '16' === statusNow) {
          that.$router.push(that.$RM.RepaySkip + "?status=" + statusNow);
        }
      },
      //————————————点击立即申请，跳转申请页面——————start—————————
      now_applyClick () {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }

        let that = this;
        //需要从缓存中取出，判断状态
        var statusNow = sessionStorage.getItem('nowStatus');
        console.info('当前的授信状态是>>>' + statusNow);
        //如果用户的userphone，或者 session 为空，那就提示让它去我的页面，登陆注册
        var loginSession = sessionStorage.getItem("loginSession");//从缓存中取出登陆状态
        var userPhone = sessionStorage.getItem('cachePhone'); //从缓存中取出标识用户的唯一值
        console.info("是否有登陆状态和用户唯一标识>>>" + loginSession + ",userPhone:" + userPhone)

        if (that.$StringUtils.isEmpty(loginSession) || that.$StringUtils.isEmpty(userPhone)) {
//          跳到我的页面去登陆
          that.$dialog.confirm('  ', "请先登录", {confirmButtonText: '确定', cancelButtonText: '取消'})
            .then(function () {
              that.$emit('toOwner')
            });
          return
        }

          let cacheLocation = sessionStorage.getItem("location");
          if (that.$StringUtils.isEmpty(cacheLocation)) {
            that.$dialog.confirm('  ', "请允许获取您的地理位置信息", {confirmButtonText: '确定', cancelButtonText: '取消'})
              .then(function () {
                //调原生接口获取用户的地理位置
                if (window.appId === 'ANDROID') {
                  that.AndroidLocation();  //调原生接口获取用户的地理位置
                }
                if (window.appId === 'IOS') {
                  that.IOSlocation();  //调原生接口获取用户的地理位置
                }
              })
              .catch(function () {
                that.$dialog.alert("    ", "无法获取您的地理位置信息将影响您的正常操作")
              });
            return
          }

        //这个也待商榷,00是新申请用户，04是被拒绝用户
        if ('00' == statusNow || '01' == statusNow || '02' == statusNow || '04' == statusNow || '11' == statusNow || '12' == statusNow || '17' == statusNow) {
          that.countCountly(statusNow);
          that.$dialog.confirm('   ', '为方便您的快速申请，平台开通了新商盟授权后台带出的申请方式，请您根据个人习惯选择申请方式',
            {
              confirmButtonText: '新商盟快捷申请',
              cancelButtonText: '常规申请'
            })
            .then(function () {

              //跳转到新商盟填写资料的页面
              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.confirmClick,
                "segmentation": {
                  appId: window.appId,
                }
              });

              that.$router.push({path: "/apply/quickwriteone"});

            })
            .catch(function (res) {

              if (res === 'cancel') {
                //跳转到常规填写资料的页面
                Countly.init({
                  app_key: that.$Constants.APPKEY,
                  url: that.$Constants.ROOTMAI, //your server goes here
                  debug: true,
                });
                Countly.track_sessions();
                Countly.track_pageview();
                Countly.add_event({
                  key: that.$Constants.confirmClick,
                  "segmentation": {
                    appId: window.appId,
                  }
                });
                that.$router.push({path: "/apply/writeone"});
              }
              else {
                //停留在当前页面
              }
            });
          return
        }
        if ('10' == statusNow) {
          that.countCountly(statusNow);
          that.$dialog.confirm('暂无法查询，银行面签激活后可查询', '您的银行面签截止日期为2018年10月30日', {
            showCancelButton: false,
            confirmButtonText: "确定",
          })
            .then(() => {
              console.info("停留在当前页面")
            })
          return
        }
//         14：银行面签成功，授权失效的，需要重新授权，点击此页面的 话，跳转到已经失效的页面，点击激活页面 跳转到激活授信的页面，这里的1和2是？？？
        if ('14' == statusNow) {
          that.$dialog.confirm('您的新商盟授权信息已失效，请您再次授权新商盟信息，谢谢！此授权仅用于信息核对。', '新商盟授权操作', {
            showCancelButton: true,
            confirmButtonText: "前去授权",
            cancelButtonText: "取消",
          })
            .then(function ({value, action}) {
              Countly.init({
                app_key: "fac364a78f023a9e1d95e7a3d9be08a53144831b",
                url: "http://10.0.18.37:32768", //your server goes here
                debug: true,

              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: "confirmButton",
                "segmentation": {
                  appId: window.appId,
                }
              });
              that.$router.push({name: that.$RM.BusinessAccess, params: {account: that.account}});
            });
          return
        }
//         15：授权激活成功的，进度条到 授信激活成功，点击立即提现的，跳转到提现的页面，提现完了之后，跳转回到首页，显示
        if ('13' === statusNow || '15' === statusNow || '16' === statusNow) {
          that.countCountly(statusNow);
          that.$router.push(that.$RM.RepaySkip + "?status=" + statusNow);
          return
        }
      },
      //————————————点击立即申请，跳转申请页面——————-end—————————-
      //根据授信状态渲染页面
      isCreditStatus(statusTemp) {
        var that = this;
        console.info("进入，根据授信状态渲染页面的方法，状态是:" + statusTemp);
        if ('00' == statusTemp) {
          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          that.applyTitle = "立即申请",//动态改变大字的内容
          that.applyWordHid = true,
            //按钮大图样式渲染
          that.pro_word = '暂未申请',//暂未申请
          that.btnVertBackStyle = "",//暗色
          that.vertDisabled = "",//按钮不可用

            //新用户>>>跳转进件申请
            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;
          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;


          //进度文字的样式
          that.applyOne = '';
          that.applyTwo = '';
          that.applyThree = '';
          that.applyFour = '';

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗

          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,

          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签

        }
        else if ('01' == statusTemp) {
          //地区未开展>>>跳转进件申请
          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          that.applyTitle = "立即申请",//动态改变大字的内容
          that.applyWordHid = true,
            //按钮大图样式渲染

          that.pro_word = '暂未申请',//暂未申请
          that.btnVertBackStyle = "",//暗色
          that.vertDisabled = "",//按钮不可用

            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;

          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;

          //进度文字的样式
          that.applyOne = '';
          that.applyTwo = '';
          that.applyThree = '';
          that.applyFour = '';

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗
          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none',//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签

        }
        else if ('02' == statusTemp) {
          //02无资格申请
          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          that.applyTitle = "立即申请",//动态改变大字的内容
          that.applyWordHid = true,
            //按钮大图样式渲染

          that.pro_word = '暂未申请',//暂未申请
          that.btnVertBackStyle = "",//暗色
          that.vertDisabled = "",//按钮不可用

            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;

          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;
          //进度文字的样式
          that.applyOne = '';
          that.applyTwo = '';
          that.applyThree = '';
          that.applyFour = '';

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗
          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签
        }
        else if ('03' == statusTemp) {
          //03审核中
          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          //按钮大图样式渲染
          that.applyTitle = "申请中",//动态改变大字的内容
          that.applyWordHid = true,

          that.pro_word = '申请进度查询',//申请进度查询
          that.btnVertBackStyle = "color: #ff6400; border: 1px solid #ff6400;background: #ffffff;",//暗色
          that.vertDisabled = false,//按钮可用

            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;
          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;
          //进度文字的样式
          that.applyOne = '';
          that.applyTwo = '';
          that.applyThree = '';
          that.applyFour = '';

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗
          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签

        }
        else if ('04' == statusTemp) {
          //审核失败，跳转到 重新立即申请的页面
          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          //按钮大图样式渲染
          that.applyTitle = "立即申请",//动态改变大字的内容
          that.applyWordHid = false,
          that.applyWord = '(审核失败)',
          that.pro_word = '暂未申请',//暂未申请
          that.btnVertBackStyle = "",//暗色
          that.vertDisabled = "",//按钮不可用
            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;
          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;
          //进度文字的样式

          that.applyOne = "";
          that.applyTwo = "";
          that.applyThree = "";
          that.applyFour = "";

          that.checkSuccess = '审核失败';//这两个不是写死的吗

          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签

        }
        else if ('10' == statusTemp) {
          //10，面签中(待面签激活)  不能继续申请   点击“申请中”按钮后无任何跳转

          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          //按钮大图样式渲染
          that.applyTitle = "申请中",//动态改变大字的内容
          that.applyWordHid = true,

          that.pro_word = '申请进度查询',//申请进度查询
          that.btnVertBackStyle = "color: #ff6400; border: 1px solid #ff6400;background: #ffffff;",//暗色
          that.vertDisabled = false;//按钮可用

          //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;
          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;
          //进度文字的样式
          that.applyOne = '';
          that.applyTwo = '';
          that.applyThree = '';
          that.applyFour = '';

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗
          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签

        }
        else if ('11' === statusTemp) {
          //面签被拒  能够继续申请  点击“立即申请”按钮后进入资料填写页面
          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          //按钮大图样式渲染
          that.applyTitle = "立即申请",//动态改变大字的内容
          that.applyWordHid = false,
          that.applyWord = '(面签超时)',
          that.pro_word = '暂未申请',//暂未申请
          that.btnVertBackStyle = "",//暗色
          that.vertDisabled = "",//按钮不可用

            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;
          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;

          //进度文字的样式
          that.applyOne = '';
          that.applyTwo = '';
          that.applyThree = '';
          that.applyFour = '';

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗
          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign//银行面签

        }
        else if ('12' === statusTemp) {
          //银行面签超期>>>立即申请
          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          //按钮大图样式渲染
          that.applyTitle = "立即申请",//动态改变大字的内容
          that.applyWordHid = false,
          that.applyWord = '(面签超时)',
          that.pro_word = '暂未申请',//暂未申请
          that.btnVertBackStyle = "",//暗色
          that.vertDisabled = "",//按钮不可用

            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;
          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;

          //进度文字的样式
          that.applyOne = '';
          that.applyTwo = '';
          that.applyThree = '';
          that.applyFour = '';

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗
          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign//银行面签

        }
        else if ('13' === statusTemp) {
          //13面签成功  不可继续申请  点击“签署授信合同”按钮后进入银行H5页面签署合同
          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          //银行面签成功，如果授权没失效，就可以提现,
          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏


          //按钮大图样式渲染
          that.applyTitle = "签署授信合同",//动态改变大字的内容
          that.applyWordHid = true,

          that.pro_word = '申请进度查询',//申请进度查询
          that.btnVertBackStyle = "color: #ff6400; border: 1px solid #ff6400;background: #ffffff;",//暗色
          that.vertDisabled = false,//按钮可用
            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;

          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;

          //进度文字的样式
          that.applyOne = "";
          that.applyTwo = "";
          that.applyThree = "";
          that.applyFour = "";

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗

          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签
        }
        else if ('14' === statusTemp) {
          //授权失效，
          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          //按钮大图样式渲染
          that.applyTitle = "立即提现",//动态改变大字的内容
          that.applyWordHid = false,
          that.applyWord = '(授权失效)',

          that.pro_word = '申请进度查询',//申请进度查询
          that.btnVertBackStyle = "color: #ff6400; border: 1px solid #ff6400;background: #ffffff;",//暗色
          that.vertDisabled = false,//按钮可用
            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;

          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;
          //进度文字的样式
          that.applyOne = "";
          that.applyTwo = "";
          that.applyThree = "";
          that.applyFour = "";


          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗
          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签

        }
        else if ('15' === statusTemp) {
//          15 授信激活  就是立即提现，点击“立即提现”按钮即进入银行H5提现页面（APP）或
//          跳转提示页面（微信公众号）

          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          //按钮大图样式渲染
          that.applyTitle = "立即提现",//动态改变大字的内容
          that.applyWordHid = true,
          that.pro_word = '申请进度查询',//申请进度查询
          that.btnVertBackStyle = "color: #ff6400; border: 1px solid #ff6400;background: #ffffff;",//暗色
          that.vertDisabled = false,//按钮可用
            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;

          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;

          //进度文字的样式
          that.applyOne = "";
          that.applyTwo = "";
          that.applyThree = "";
          that.applyFour = "";

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗

          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,

          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签

        }
        else if ('16' === statusTemp) {
          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          //银行面签成功，如果授权没失效，就可以提现,
          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏


          //按钮大图样式渲染
          that.applyTitle = "签署授信合同",//动态改变大字的内容
          that.applyWordHid = true,

          that.pro_word = '申请进度查询',//申请进度查询
          that.btnVertBackStyle = "color: #ff6400; border: 1px solid #ff6400;background: #ffffff;",//暗色
          that.vertDisabled = false,//按钮可用
            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;

          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;

          //进度文字的样式
          that.applyOne = "";
          that.applyTwo = "";
          that.applyThree = "";
          that.applyFour = "";

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗

          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签
        }
        else if ('17' === statusTemp) {
          //授信到期

          that.netErrorHidden = false;//断网占位图片，true是隐藏
          that.bgcHidden = false;//背景图片，true是隐藏

          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          //按钮大图样式渲染

          that.applyTitle = "立即申请",//动态改变大字的内容
          that.applyWordHid = false,
          that.applyWord = '(授信到期)',

          that.pro_word = '暂未申请',//暂未申请
          that.btnVertBackStyle = "",//暗色
          that.vertDisabled = "",//按钮不可用
            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;

          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;

          //进度文字的样式
          that.applyOne = "";
          that.applyTwo = "";
          that.applyThree = "";
          that.applyFour = "";

          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗
          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,
          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签


        }
        else if ('6666' == statusTemp) {
          console.info("无网络状态>>>>>>")

          that.netErrorHidden = true;//断网占位图片，true是显示
          that.bgcHidden = true;//背景图片，true是隐藏
          that.top_fontShow = true;//您的授信额度文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = true;//橙色背景图，false是不隐藏
          that.yancaoHid = true;//烟草商户专享文字是否隐藏,false不隐藏

          that.applyTitle = " ",//立即申请，动态改变大字的内容
          that.applyWordHid = true,//审核失败是否隐藏

          that.pro_word = '暂未申请';//暂未申请
          that.btnVertBackStyle = "margin-top:8.8rem;",//暗色，还要往下调
          that.vertDisabled = "";//按钮不可用


            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;

          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;

          //进度文字的样式
          that.applyOne = "";
          that.applyTwo = "";
          that.applyThree = "";
          that.applyFour = "";


          that.checkSuccess = that.checkSuccess;//这两个不是写死的吗

          that.outdate = '';//可能存在： '（银行面签超期，请重新提交）'的情况,

          that.hiddenCss = 'display:bolck';//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none',//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign;//银行面签

        }
        else {
          console.info("初始化页面...")

          that.netErrorHidden = false;//断网占位图片，true是显示
          that.bgcHidden = false;//背景图片，true是隐藏

          that.top_fontShow = false;//您的授信额度文字是否隐藏,false不隐藏
          that.yancaoHid = false;//烟草商户专享文字是否隐藏,false不隐藏
          that.apply_btnNowApplyHid = false;//橙色背景图，false是不隐藏
          that.applyTitle = "立即申请",//动态改变大字的内容
          that.applyWordHid = true,


          that.pro_word = '暂未申请',//暂未申请

          that.btnVertBackStyle = "",//暗色
          that.vertDisabled = "",//按钮不可用


            //横线
          that.lineOne = that.lineColor;//橙色
          that.lineTwo = that.lineColor;
          that.lineThree = that.lineColor;
          //圆点
          that.raOne = that.raColor;//橙色
          that.raTwo = that.raColor;
          that.raThree = that.raColor;
          that.raFour = that.raColor;

          //进度文字的样式
          that.applyOne = '',
          that.applyTwo = '',
          that.applyThree = '',
          that.applyFour = '',

          that.checkSuccess = that.checkSuccess,//这两个不是写死的吗
          that.outdate = '',//可能存在： '（银行面签超期，请重新提交）'的情况,

          that.hiddenCss = 'display:bolck',//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.imageCss = 'display:none',//为了让背景大图隐藏，显示出断网时的 占位图，问题
          that.faceSign = that.faceSign//银行面签
        }

      }
    }
  }
</script>

<style scoped>

  .bgcImg {
    background: url(/static/assets/index_backImg.png) no-repeat;
    height: 9.4rem;
    background-size: 100% 9.4rem;
    margin-top: 30px;
    box-shadow: 0 0 8px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 8px;
    text-align: center;
  }

  .netErrorBgcImg {

    background: url(/static/assets/btnImgError.png) no-repeat;
    height: 9.4rem;
    background-size: 100% 9.4rem;
    margin-top: 30px;
    box-shadow: 0 0 8px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 8px;
    text-align: center;
  }

  #indexContainer {
    margin-right: 30px;
    margin-left: 30px;
    background-color: #ffffff;
  }

  /* flex的垂直居中、水平居中，都可以抽出来当公共的演示 */
  .common_center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .top_font {
    font-size: 24px;
    color: #999999;
    line-height: 75px;
  }

  .margain_top_30 {
    margin-top: 30px;
  }

  /* 画个圆点 */
  .radius {
    width: 14px;
    height: 14px;
    background-color: #b1b1b1;
    border-radius: 100%;
  }

  .section__title {
    font-weight: bold;
    font-size: 36px;
    color: #111111;
    text-align: left;
    margin-top: 80px;
    margin-bottom: 10px;
  }

  .rmb {
    font-size: 88px;
    color: #111111;
  }

  .white_bac {
    background-size: 100% 195px;
    margin-top: 35px;
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    width: 100%;
    height: 175px;

  }

  .test-margin {
    padding-top: 15px;
  }

  .splex {
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #666666;
  }

  .common_bettween {
    display: flex;

  }

  .yancao {
    font-size: 22px;
    color: #999999;
    margin-top: 0.3rem;
    margin-bottom: 0.2rem;
  }

  .product_word {
    font-size: 30px;
    color: #666666;
    text-align: left;
    margin-left: 20px;
    margin-right: 10px;
    padding-top: 49px;

  }

  .commom_bottom {
    margin-bottom: 100px;
  }

  .toolBar {
    font-size: 36px;
    color: #111111;
    text-align: center;
    line-height: 48px;
  }

  /*定位*/

  .marginOne {
    margin-left: 10px;
  }

  .marginTwo {
    margin-right: 10px;
  }

  .marginThree {
    margin-right: 17px;
  }

  .marginFour {
    padding-right: 24px;
  }

  .outdateCss {
    font-size: 30px;
    line-height: 54px;
    color: #ea1111;
  }

  .applyContent {
    /*border: 0.013333rem solid red;*/
    width: 4.2rem;
    height: 2.6rem;
    position: relative;
    margin: auto;
    padding-top: 1.7rem;
  }

  .applyContentTitle {
    width: 100%;
    height: 100px;
    letter-spacing: 2px;
    font-size: 32px;
    color: #fff1e8;
    text-shadow: 0 1px 0 rgba(180, 71, 1, 0.50);
  }

  .applyContentWord {
    width: 100%;
    height: 100px;
    opacity: 0.8;
    font-size: 0.373333rem;
    color: #fff1e8;
  }

  .btn888 {
    -webkit-appearance: none; /*解决iphone safari上的按钮圆角问题*/
    font-size: 30px;
    color: #999999;
    text-align: center;
    text-shadow: 0 1px 0 #ffffff;
    border: 1px solid #e1e1e1;
    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
    -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    width: 4.8rem;
    height: 1.06667rem;
    letter-spacing: 0.03rem;

    background: #e1e1e1;
  }

  input:disabled, input[disabled] {
    opacity: 1;
  }

  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

</style>
