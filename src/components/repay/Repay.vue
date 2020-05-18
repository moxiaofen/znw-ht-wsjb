<!--还款的页面-->
<template>
  <mt-loadmore :top-method="loadTop" ref="loadmore">
  <div>
    <ToolBar isShowNav="false">还款
    </ToolBar>
    <div class="netErrorBgcImg" v-show="netErrorHidden" ></div>

      <div class='middle' v-show="bgcHidden">
      <div>
        <img class='imgcss' :src='repayImg' id="pic">
      </div>
            <div class='record' >{{selectWord}}</div>

      <input type="button" class="btn666" v-model="btnName"  @click="now_applyClick()"/>

      <!--一行代码即可吊起上拉菜单-->
      <mt-actionsheet :actions= "data" v-model="sheetVisible"></mt-actionsheet>

      <div id="zsz"></div>

    </div>
    <!-- 现在这个版本不需要显示出来  -->
  </div>
  </mt-loadmore>
</template>
<script>
  window.onPhotoSelect= function (basedata) {

    console.log('IOS接受到回调');
    console.log(basedata);
   // var zsz=document.getElementById('zsz');
    //zsz.innerHTML="<image style='width:200px;height:200px;' src='data:image/png;base64,"+basedata+"'>";
    let path = 'data:image/png;base64,'+basedata
//    document.getElementById('pic').setAttribute('src', path)
  },
  window.onPhotoSelected = function (path) {
    console.log('接受到回调');
    console.log(path);
//    document.getElementById('pic').setAttribute('src', path)
  }
  import ToolBar from '../ToolBar.vue'

  export default{
    components: {ToolBar},
    data () {
      return {
        netErrorHidden:false,//断网占位图片，true是显示
        netError:false,
        bgcHidden:true,//背景图片，true是隐藏
        selectWord:"暂无借款记录",
        btnName:"立即申请",
        repayImg:"/static/assets/book.png",
        // action sheet 选项内容
        data: [{
          name: '拍照',
          method : this.getCamera	// 调用原生提供的拍照的methods中的函数
        }, {
          name: '从相册中选择',
          method : this.getAlbum	// 调用原生提供的选择图片的methods中的函数
        }],
        // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        sheetVisible: false
      }
    },
    mounted(){
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }
      //查询授信状态，根据状态变化html的图片样式
      var that = this;
      that.checkNetWork();   //调取监听网络状态的代码
      that.selecCreditStatus();//查询当前授信状态

    },
    methods: {
      //————————————点击立即申请，跳转申请页面——————start—————————
      now_applyClick () {
        var that = this;
        //需要从缓存中取出，判断状态
        var statusNow = sessionStorage.getItem('nowStatus');
        console.info('当前的授信状态是>>>' + statusNow)
        //如果用户的userphone，或者 session 为空，那就提示让它去我的页面，登陆注册
        var loginSession = sessionStorage.getItem("loginSession")//从缓存中取出登陆状态
        var userPhone = sessionStorage.getItem('cachePhone'); //从缓存中取出标识用户的唯一值

        console.info("是否有登陆状态和用户唯一标识>>>" + loginSession + ",userPhone:" + userPhone)

        if (that.$StringUtils.isEmpty(loginSession) || that.$StringUtils.isEmpty(userPhone)) {
//          跳到我的页面去登陆
          that.$dialog.confirm('  ', "请先登录", {confirmButtonText: '确定', cancelButtonText: '取消'})
            .then(function () {
              that.$emit('toOwner')
            })
            .catch(function () {
              console.warn("用户拒绝登陆!!!")
            })
          return
        }
        //这个也待商榷,00是新申请用户，04是被拒绝用户
        if ('00' == statusNow || '01' == statusNow || '02' == statusNow ||'04' == statusNow || '11' == statusNow || '12' == statusNow  || '17' == statusNow) {
          that.$dialog.confirm('为方便您的快速申请，平台开通了新商盟授权后台带出的申请方式，请您根据个人习惯选择申请方式', '',
            {
              confirmButtonText: '新商盟快捷申请',
              cancelButtonText: '常规申请'
            })
            .then(function () {
              //跳转到新商盟填写资料的页面
              that.$router.push(that.$RM.quickwriteone);
            })
            .catch(function (res) {
              if (res === 'cancel') {
                //跳转到常规填写资料的页面
                that.$router.push(that.$RM.WriteOne);
              }
              else {
                //停留在当前页面
              }
            });
        }

        if ('10' == statusNow) {
          that.$dialog.confirm('暂无法查询，银行面签激活后可查询', '您的银行面签截止日期为2018年10月30日', {
            showCancelButton: false,
            confirmButtonText: "确定",
          })
            .then(() => {
              console.info("停留在当前页面")
            })
        }
        // 14：银行面签成功，授权失效的，需要重新授权，点击此页面的 话，跳转到已经失效的页面，点击激活页面 跳转到激活授信的页面，这里的1和2是？？？
        if ('14' === statusNow) {
          that.$dialog.confirm('您的新商盟授权信息已失效，请您再次授权新商盟信息，谢谢！此授权仅用于信息核对。', '新商盟授权操作', {
            showCancelButton: true,
            confirmButtonText: "前去授权",
            cancelButtonText: "取消",
          })
            .then(function ({value, action}) {
              that.$router.push({name: that.$RM.BusinessAccess,params:{account:that.account}});
            });

        }
        // 15：授权激活成功的，进度条到 授信激活成功，点击立即提现的，跳转到提现的页面，提现完了之后，跳转回到首页，显示
        if ('03'===statusNow||'13'===statusNow||'15' === statusNow || '16'===statusNow) {
          that.$router.push(that.$RM.RepaySkip+"?status="+statusNow);
          Countly.init({
            app_key: that.$Constants.APPKEY,
            url: that.$Constants.ROOTMAI, //your server goes here
            debug: true,
          })
          Countly.track_sessions();
          Countly.track_pageview();
          Countly.add_event({
            key: that.$Constants.RepayClick_two,
            "segmentation": {
              appId: window.appId,
            }
          });


        }
      },
      //————————————点击立即申请，跳转申请页面——————-end—————————-
      loadTop() {
        console.log('下拉刷新');

        var that = this
        that.selecCreditStatus();//查询当前授信状态
        that.checkNetWork();//监听网络状态
        that.$refs.loadmore.onTopLoaded(); // 这个是用来关闭刷新的
      },
      actionSheet: function () {
        // 打开action sheet
        this.sheetVisible = true;
      },
      //查询授信状态的方法
      selecCreditStatus(){
        var that =this;
        if(that.netError){
          that.isCreditStatus("6666");
          sessionStorage.setItem('nowStatus',  "6666");
          return
        }
        var isCanApply='00';
        var loginSession = sessionStorage.getItem("loginSession")//从缓存中取出登陆状态
        console.info("获取登陆状态session>>>" + loginSession)
        let timestamp = that.$utils.generateSignTime();
        let reqId = that.$utils.generateSignTime();
        let sign = that.$utils.generateSign(reqId, timestamp);
        if (that.$StringUtils.isEmpty(loginSession)) {
          console.info("index,登陆状态和用户唯一标识，>>>为空")
          //调方法，初始化渲染页面
          console.info("返回的授信状态:"+isCanApply);
          //把查询到的状态存到缓存
          sessionStorage.setItem('nowStatus', isCanApply);
          //渲染页面
          that.isCreditStatus(isCanApply);
        }
        else {
          console.info("index,登陆状态和用户唯一标识，>>>有值");
          //根据，loginSession调取授信状态查询接口
          console.info("登陆态是什么>>>" + loginSession);
          const url = that.$api.ROOT +that.$Constants.QUERYCREDITSTATUS;

          that.$indicator.open("请稍候...");
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
                that.$indicator.close();
                isCanApply = res.data.data.isCanApply;
                //把查询到的状态存到缓存
                sessionStorage.setItem('nowStatus', isCanApply);
                console.info("返回的授信状态:"+isCanApply);
                //渲染页面
                that.isCreditStatus(isCanApply);
              }
              else {
                that.$indicator.close();
                if (res.data.ret === '000002') {
                  that.$dialog.alert("    ",that.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
                  that.$StringUtils.loginOut();
                  return
                }
              }
            });
//            .catch(function () {
//              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
//            });
        }
      },
      getOpenApp () {
//          跳转登陆失效的页面
        if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
          this.$router.replace({path: '/security/fingerLockView'})
        } else {
          this.$router.replace(this.$RM.Login)
        }
      },
      //根据授信状态渲染页面
      isCreditStatus(statusTemp) {
        console.info("进入，根据授信状态渲染页面的方法，状态是:" + statusTemp);
        var that =this;
        if ('00' === statusTemp || '01'===statusTemp || '02'===statusTemp ||'04'===statusTemp || '11'===statusTemp || '12'===statusTemp || '16'===statusTemp || '17'===statusTemp) {
          //立即申请页面，全部是初始化状态，传值吧，减少接口请求的压力
          that.btnName="立即申请";//按钮文字
          that.repayImg="/static/assets/book.png";//显示图片
          that.selectWord="暂无借款记录";//图片下的文字

          that.netErrorHiddenbgcHidden=false;//断网占位图片，true是显示
          that.bgcHidden=true;//背景图片，true是隐藏
        }
       if ('03' === statusTemp||'10'===statusTemp ||'13'===statusTemp ||'16'===statusTemp ) {
          that.btnName="申请进度查询";
          that.repayImg="/static/assets/repay_loadin.png";
          that.selectWord="申请授信中…";
          that.netErrorHiddenbgcHidden=false;//断网占位图片，true是显示
          that.bgcHidden=true;//背景图片，true是隐藏
        }
        if ( '14'===statusTemp ||'15'===statusTemp) {
          that.btnName="立即提现";
          that.repayImg="/static/assets/repay_loadin.png";
          that.selectWord="";
          that.netErrorHiddenbgcHidden=false;//断网占位图片，true是显示
          that.bgcHidden=true;//背景图片，true是隐藏
        }

        if ('6666' === statusTemp) {
            console.info("进入无网络状态>>>>>>");
            that.netErrorHidden=true;//断网占位图片，true是显示
            that.bgcHidden=false;//背景图片，true是隐藏
        }

      },
      getCamera(){
        //在拍照里面判断，是安卓还是ios还是微信
        if (window.appId == 'ANDROID' || window.appId == 'IOS') {
          console.log('选择相机进行拍照....');
          // 拍照
          var androidCam = window.interfacePhone.takePhoto();
          console.info("安卓相机返回数据>>>"+androidCam)
        }else {
          //h5微信调取微信的wei-jsdk来拍照
          console.info("微信接口返回数据>>>")
        }
      },
      getAlbum(){
        //在相册里面判断，是安卓还是ios还是微信
        if (window.appId == 'ANDROID' || window.appId == 'IOS') {
          console.log('选择安卓或IOS的相册....');
          // 拍照

          var androidAlbum = window.interfacePhone.pickPhoto();
          console.info("安卓相册，返回数据>>>"+androidAlbum)

        } else {
          //h5微信调取微信的wei-jsdk来选择照片
          console.info("微信接口相册，返回数据>>>")
        }
      },
      takePhoto(){
        if (window.appId == 'ANDROID') {
          console.log('拍照');
          // 从图库选择图片
          window.interfacePhone.pickPhoto()
          // 拍照
//          window.interfacePhone.takePhoto()
        }
        else if(window.appId == 'IOS') {

          //拍照传1，本地相册传2
          window.interfacePhone.takePhoto()
        }
      },
      takePhoto1(){
        if(window.appId == 'IOS') {

          //拍照传1，本地相册传2
          // window.interfacePhone.takePhoto()
        }

      },
      //监听网络状态
      checkNetWork(){
          var that=this;
        let el = document.body;
        if (el.addEventListener) {
//          addEventListener——兼容：firefox、chrome、IE、safari、opera；不兼容IE7、IE8
          window.addEventListener("online", function () {
//            alert("有网....");
            that.netError= false;
            let sessionStatus=sessionStorage.getItem("nowStatus")
            if(!that.$StringUtils.isEmpty(sessionStatus)){
              that.selecCreditStatus();//查询当前授信状态
            }

          });
          window.addEventListener("offline", function () {
//            alert("网络走丢了....");
            that.netError= true;
            that.isCreditStatus("6666");
          });
        }

      },
      toWait(){
        //跳转等待页面
        this.$router.push({path: '/repay/RepaySkip'})
      }
    },
  }
</script>

<style scoped>
  .btn666 {
  /*'background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);';//按钮亮色*/
    margin-top: 50px;
    margin-bottom: 50px;
    background-image: linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);
    border-radius: 5px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    width: 8.7rem;
    height: 1.3rem;
    border: none;
    font-size:30px;
    color:#ffffff;
  }
  .btn_apply {
    width: 90%;
    margin-top: 2rem;
  }

  .middle {
    /* width: 1334px; */
    height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* margin-left:144px; */

  }

  .record {

    font-size: 30px;
    color: #666666;
    line-height: 42px;
    margin-top: 0.5rem;
  }

  .imgcss {
    width: 110px;
    height: 100px;
    margin: auto;

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
</style>
