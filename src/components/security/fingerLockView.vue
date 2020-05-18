
<template>
  <div class="masks"  >

    <div class="gesturePwd" v-show="currentValue">

      <div style="position: absolute;top:0;left:0;right:0;bottom:0;">
        <img class="imgTitle" src="/static/assets/antianlogo.png">
        <h3 ref="helloTitle" class="helloTitle" >欢迎你:</h3>
        <h3 ref="phoneTitle" class="phoneTitle" >{{phone}}</h3>
        <h3 ref="gestureTitle" class="gestureTitle" >请绘制您的手势密码</h3>
        <a ref="updatePassword" v-if="gobackShow" style="position: absolute;left: 5px;bottom: 5px;color:orange;font-size: 0.4rem;display:block;" @click="updatePassword()">返回</a>
        <a ref="closPassword" v-if="closeShow" style="position: absolute;right: 5px;bottom: 5px;color:#ff6400;font-size: 0.4rem;display:block;" @click="closePwd()">跳过</a>
        <a ref="joinLogin" v-if="joinShow" style="position: absolute;left: 43%;bottom: 5px;color:#87888a;font-size: 0.4rem;display:block;" @click="joinLogin()">密码登录</a>
        <canvas ref="canvas" style="background-color:#ffffff; display: inline-block; margin-top: 24px; width: 320px; height: 320px;"></canvas>
      </div>
    </div>
  </div>


</template>

<script>

  import { MessageBox } from 'mint-ui';
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        ctx:'',
        width:0,
        height:0,
        devicePixelRatio:0,
        chooseType : '',
        r :'',// 公式计算
        lastPoint: [],
        arr : [],
        restPoint :[],
        pswObj:{step:2},
        canvas:'',
        currentValue:true,
        fingerLockType:'',
        phonekey:'',
        checkfingerPwdNum:5,
        phone:this.$StringUtils.getPhone().replace(/(\d{3})\d{4}(\d{4})/,"$1****$2"),
        inputFingerPwdNum:0,
        jointype:'',
        gobackShow:false,
        joinShow:true,
        closeShow:true,
        pwd:[]


      }
    },
    watch: {
      value: {
        handler: function (val) {
          this.currentValue = val
        },
        immediate: true
      },
      currentValue (val) {
        this.$emit(val ? 'on-show' : 'on-hide')
        this.$emit('input', val)
      }
    },
    created () {
      if (typeof this.value !== 'undefined') {
        this.currentValue = true
      }

    },
    mounted() {
      this.setChooseType(3);
    },
    methods: {
       brgba(hex, opacity) {
           //转化rgba，https://bbs.csdn.net/topics/390873548
          if( ! /#?\d+/g.test(hex) ) return hex; //如果是“red”格式的颜色值，则不转换。//正则错误，参考后面的PS内容
          var h = hex.charAt(0) == "#" ? hex.substring(1) : hex,
            r = parseInt(h.substring(0,2),16),
            g = parseInt(h.substring(2,4),16),
            b = parseInt(h.substring(4,6),16),
            a = opacity;
          return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  },
      joinLogin(){
        this.$router.push(this.$RM.Login)

      },
      closePwd () {
        this.$router.push(this.$RM.Main)
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.ClosePwdClick,
          "segmentation": {
            appId: window.appId,
          }
        });

      },

      H5lock (obj){

        this.height = obj.height;
        this.width = obj.width;
        this.chooseType = Number(window.localStorage.getItem('chooseType')) || obj.chooseType;
        this.devicePixelRatio = window.devicePixelRatio || 1;
      },
      drawCle (x, y) { // 初始化解锁密码面板 小圆圈
        this.ctx.strokeStyle = '#ff6400';//密码的点点默认的颜色
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.stroke();
      },
      drawPointInit(x, y) { // 初始化解锁密码面板 小圆圈
      //圆点初始化的颜色

        var hex ="#ff6400",opacity = 0.3;//设置透明度
        this.ctx.fillStyle = this.brgba(hex, opacity);
        // this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.r/2, 0, Math.PI * 2, true);
        this.ctx.closePath();
        // this.ctx.stroke();
        this.ctx.fill();
      },
      drawPoint (style) { // 初始化圆心
        for (var i = 0 ; i < this.lastPoint.length ; i++) {
          this.ctx.fillStyle = style;
          this.ctx.beginPath();
          this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2.5, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.fill();
        }
      },
      drawStatusPoint (type) { // 初始化状态线条
        for (var i = 0 ; i < this.lastPoint.length ; i++) {
          this.ctx.strokeStyle = type;
          this.ctx.beginPath();
          this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      },
      drawLine (style, po, lastPoint) {//style:颜色 解锁轨迹
        this.ctx.beginPath();
        this.ctx.strokeStyle = style;
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);

        for (var i = 1 ; i < this.lastPoint.length ; i++) {
          this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
        }
        this.ctx.lineTo(po.x, po.y);
        this.ctx.stroke();
        this.ctx.closePath();

      },
      createCircle () {// 创建解锁点的坐标，根据canvas的大小来平均分配半径

        var n = this.chooseType;
        var count = 0;
        this.r = this.ctx.canvas.width / (2 + 4 * n);// 公式计算
        this.lastPoint = [];
        this.arr = [];
        this.restPoint = [];
        var r = this.r;
        for (var i = 0 ; i < n ; i++) {
          for (var j = 0 ; j < n ; j++) {
            count++;
            var obj = {
              x: j * 4 * r + 3 * r,
              y: i * 4 * r + 3 * r,
              index: count
            };
            this.arr.push(obj);
            this.restPoint.push(obj);
          }
        }
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (var i = 0 ; i < this.arr.length ; i++) {
          this.drawPointInit(this.arr[i].x, this.arr[i].y);

        }

        //return arr;
      },
      getPosition (e) {// 获取touch点相对于canvas的坐标
        var rect = e.currentTarget.getBoundingClientRect();
        var po = {
          x: (e.touches[0].clientX - rect.left)*this.devicePixelRatio,
          y: (e.touches[0].clientY - rect.top)*this.devicePixelRatio
        };
        return po;
      },
      update(po) {// 核心变换方法在touchmove时候调用
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (var i = 0 ; i < this.arr.length ; i++) { // 每帧先把面板画出来
          this.drawCle(this.arr[i].x, this.arr[i].y);
        }

        this.drawPoint('#ff6400');// 每帧花轨迹
        this.drawStatusPoint('#ff6400');// 每帧花轨迹

        this.drawLine('#ff6400',po , this.lastPoint);// 每帧画圆心

        for (var i = 0 ; i < this.restPoint.length ; i++) {
          if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
            this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
            this.lastPoint.push(this.restPoint[i]);
            this.restPoint.splice(i, 1);
            break;
          }
        }

      },
      checkPassTwo (psw1, psw2) {// 检测密码
        var p1 = '',
          p2 = '';

        for (var i = 0 ; i < psw1.length ; i++) {
          p1 += psw1[i].index + psw1[i].index;
        }
        for (var i = 0 ; i < psw2.length ; i++) {
          p2 += psw2[i].index + psw2[i].index;
        }
        if(p1 == p2 ){
          console.log("pwd yes")
          return true
        }else{
          console.log("pwd no")
          return false
        }

      },
      checkPass (psw1, psw2,psw3) {// 检测密码
        var p1 = '',
          p2 = '',
          p3 = '';
        for (var i = 0 ; i < psw1.length ; i++) {
          p1 += psw1[i].index + psw1[i].index;
        }
        for (var i = 0 ; i < psw2.length ; i++) {
          p2 += psw2[i].index + psw2[i].index;
        }
        for (var i = 0 ; i < psw3.length ; i++) {
          p3 += psw3[i].index + psw3[i].index;
        }
        if(p1 == p2 && p1 == p3){
          for (var i = 0 ; i < psw3.length ; i++) {
            var obj={index:psw3[i].index};
            this.pwd.push(obj)
          }
          console.log("pwd yes")

          return true
        }else{
          console.log("pwd no")
          return false
        }

      },

      checkNewPass (psw1, psw2) {// 检测密码
        var p1 = '',
          p2 = '';
        for (var i = 0 ; i < psw1.length ; i++) {
          p1 += psw1[i].index + psw1[i].index;
        }
        for (var i = 0 ; i < psw2.length ; i++) {
          p2 += psw2[i].index + psw2[i].index;
        }

        if(p1 == p2 ){
          for (var i = 0 ; i < psw2.length ; i++) {
            var obj={index:psw2[i].index};
            this.pwd.push(obj)
          }
          console.log("pwd yes")
          return true
        }else{
          console.log("pwd no")
          return false
        }

      },
      storePass (psw) {// touchend结束之后对密码和状态的处理
        console.log(this.pswObj.step);
        console.log(this.pswObj.fpassword);
        if(psw.length<4){
          this.$refs.gestureTitle.style.color = "#ff4c4c";
          this.$refs.gestureTitle.innerHTML = '至少需要连接4个点，请重新绘制';
          return
        }
        if (this.pswObj.step == 1) {

          if (this.checkNewPass(this.pswObj.fpassword, psw)) {

            this.pswObj.step = 1;
            this.pswObj.spassword = this.pwd;
            this.$dialog.alert("    ","手势密码设置成功");
            Countly.init({
              app_key: this.$Constants.APPKEY,
              url: this.$Constants.ROOTMAI, //your server goes here
              debug: true,
            })
            Countly.track_sessions();
            Countly.track_pageview();
            Countly.add_event({
              key: this.$Constants.ChangePwdClick,
              "segmentation": {
                appId: window.appId,
              }
            });

            this.$dialog.alert("    ","手势密码设置成功");

            this.drawStatusPoint('#ff6400');
            this.drawPoint('#ff6400');
            console.log(this.pwd)
            console.log(JSON.stringify(this.pswObj.spassword))
            this.$StringUtils.setFingerLockPwd(JSON.stringify(this.pswObj.spassword));
            window.localStorage.setItem('chooseType', this.chooseType);
            this.$StringUtils.setFingerLockType("2");//设置成功就要弹登录界面
            if(window.appId == "IOS") {
              window.interfacePhone.saveFingerPwd(JSON.stringify({isLock:"2",pwd:JSON.stringify(this.pswObj.spassword)}))
            }
            delete this.pswObj.step;
            this.inputFingerPwdNum = 0
            //发送给后台
            this.jointype="6"
            this.sendPwd(this.jointype);

          } else {
            this.$refs.gestureTitle.innerHTML = '确认密码错误，请重新设置';
            this.drawStatusPoint('red');
            this.drawPoint('red');
            delete this.pswObj.step;
            this.inputFingerPwdNum = 0
          }
        } else if (this.pswObj.step == 2) {
          console.log(psw)
          this.pswObj.spassword = JSON.parse(this.$StringUtils.getFingerLockPwd())
          if (this.checkPassTwo(this.pswObj.spassword,psw)) {
            var gestureTitle = this.$refs.gestureTitle;
            gestureTitle.style.color = "#ff6400";
            gestureTitle.innerHTML = '';
            this.drawStatusPoint('#ff6400');//小点点外圈高亮
            this.drawPoint('#ff6400');
            this.drawLine('#ff6400',this.lastPoint[this.lastPoint.length-1] , this.lastPoint);// 每帧画圆心
            //发送给后台
            this.jointype="1"
            this.sendPwd(this.jointype);

          } else {

            this.sendfingerPwd(psw)

//            console.log(this.checkfingerPwdNum)
//            if(this.checkfingerPwdNum > 1) {
//              console.log(this.checkfingerPwdNum)
//              this.drawStatusPoint('#ff6400');
//              this.drawPoint('#ff6400');
//              this.drawLine('#ff6400', this.lastPoint[this.lastPoint.length - 1], this.lastPoint);// 每帧画圆心
//
//
//              var gestureTitle = this.$refs.gestureTitle;
//              gestureTitle.style.color = "#ff6400";
//              this.checkfingerPwdNum = this.checkfingerPwdNum -1
//              gestureTitle.innerHTML = '密码错误，您还可以输入' + this.checkfingerPwdNum + '次';


        //    }else{
              //错误5次跳转到首页
           //   this.$StringUtils.removeFingerLockPwd()
            //  this.$StringUtils.removeFingerLockType()

           // }
          }
        } else {
        /*  if(this.inputFingerPwdNum == 0){

            this.pswObj.fpassword = psw;
            this.inputFingerPwdNum = this.inputFingerPwdNum +1

          }else{*/

            this.pswObj.fpassword = psw;
            this.pswObj.step = 1;

         // }
          this.$refs.gestureTitle.innerHTML = '请再次确认手势密码';
          this.$refs.gestureTitle.style.color = "#87888a";
        }

      },
      makeState () {

        if (this.pswObj.step == 2) {
          //this.$refs.updatePassword.style.display = 'none';
         // this.$refs.closPassword.style.display = 'none'
         // this.$refs.joinLogin.style.display = 'block';
          //this.gobackShow=false
          this.joinShow =true
          this.closeShow=false

          var gestureTitle = this.$refs.gestureTitle;
          gestureTitle.style.color = "#87888a";
          gestureTitle.innerHTML = '请绘制您的手势密码';

        } else if (this.pswObj.step == 1) {
         // this.$refs.joinLogin.style.display = 'none';
        //  this.$refs.updatePassword.style.display = 'block';
          //this.gobackShow=true
          this.joinShow =false
          this.closeShow=true
        } else {

         // this.gobackShow=true
          this.joinShow =false
          this.closeShow=true
       //   this.$refs.updatePassword.style.display =  'block';
          //this.$refs.joinLogin.style.display  = 'none';
        }
      },
      setChooseType (type){
        this.chooseType = type;
        this.init();
      },
      updatePassword (){

        this.pswObj = {};
        this.$router.push(this.$RM.Main)
      },
      initDom (){


        this.chooseType = Number(window.localStorage.getItem('chooseType')) || 3;
        this.devicePixelRatio = window.devicePixelRatio || 1;

        var canvas = this.$refs.canvas;

        var width = this.width || 320;
        var height = this.height || 320;

        // 高清屏锁放
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * this.devicePixelRatio;
        canvas.width = width * this.devicePixelRatio;



      },
      //检验错误手势密码
      sendfingerPwd(pwd){
        var that = this;
        console.log("post data wait")
        that.$api.post(that.$Constants.UPDATE_PASSWORD, {
          "appId": window.appId,
          "reqId": that.$utils.generateSignTime(),
          "data": {
            "phoneNo":that.$StringUtils.getPhone(),
            "operType":"1",
            "openId": that.$StringUtils.getOpenId(),
            "gesture": pwd,
            "mac":"",
          }
        }, function (result) {
          if (result && result.ret) {
            if(result.ret != '0') {
              let errorTime = Number(result.data.errorTime)
              console.log("账号密码不对!!!")
              if (errorTime == 5) {
//                var gestureTitle = this.$refs.gestureTitle;
//                gestureTitle.style.color = "#ff6400";
//                gestureTitle.innerHTML = '手势密码输入错误5次，用户已锁定。您可通过账号密码重新登录或者通过忘记手势密码重新设置手势密码。';
                that.$toast(

                  "手势密码错误5次，即将返回登录页面利用密码登录"
                );
                setTimeout(function(){
                  that.$router.push(that.$RM.Login)
                }, 1500);
                sessionStorage.setItem('fingerPwdError','1');
                that.$StringUtils.removeFingerLockPwd()
                that.$StringUtils.removeFingerLockType()
                if (window.appId == "IOS" ) {
                  window.interfacePhone.removePwd()
                }
              } else {
                var gestureTitle = this.$refs.gestureTitle;
                gestureTitle.style.color = "#ff4c4c";
                gestureTitle.innerHTML = '密码错误，您还可以输入' + (5 - errorTime) + '次';
              }
            }
          }
        }.bind(this))
      },
      //检验正确手势密码
      sendPwd(type){
        var that = this
        console.log("post data wait")
        this.$api.post(this.$Constants.UPDATE_PASSWORD, {
          "appId": window.appId,
          "reqId": this.$utils.generateSignTime(),
          "data": {
            "phoneNo":this.$StringUtils.getPhone(),
            "operType":type,
            "openId": this.$StringUtils.getOpenId(),
            "gesture": this.$StringUtils.getFingerLockPwd(),
            "mac":"",
          }
        }, function (result) {
          if (result && result.ret) {
            console.log("post data wait")
            //用手势登录interfacePhone
            if(that.jointype == "1"){
              var token=result.data.token;
              //保留个登陆状态
              that.$storeData.setSession(token)
              sessionStorage.setItem("loginSession", token)
              that.$router.push(that.$RM.Main)
              if(window.appId == "IOS" ) {
                window.interfacePhone.saveSession(JSON.stringify({phone: this.$StringUtils.getPhone(), token: token}))
              }

            }
            else if(that.jointype == "6"){
              that.$router.push(that.$RM.Main)
            }
            console.log(result.msg)
          }
        }.bind(this))
      },
      init () {

        this.initDom();

        this.pswObj = this.$StringUtils.getFingerLockPwd()? {
          step: 2,
          spassword: JSON.parse(this.$StringUtils.getFingerLockPwd())
        } : {};


        this.lastPoint = [];
        this.makeState();
        this.touchFlag = false;

        this.canvas = this.$refs.canvas;

        this.ctx = this.canvas.getContext('2d');
        this.createCircle();
        this.bindEvent();
      },
      reset () {
        this.makeState();
        this.createCircle();
      },
      bindEvent () {

        var self = this;
        this.canvas = this.$refs.canvas;
        this.canvas.addEventListener("touchstart", function (e) {
          e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
          var po = self.getPosition(e);

          for (var i = 0 ; i < self.arr.length ; i++) {
            if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {

              self.touchFlag = true;
              self.drawPoint(self.arr[i].x,self.arr[i].y);
              self.lastPoint.push(self.arr[i]);
              self.restPoint.splice(i,1);
              break;
            }
          }
        }, false);
        this.canvas.addEventListener("touchmove", function (e) {
          if (self.touchFlag) {
            self.update(self.getPosition(e));
          }
        }, false);
        this.canvas.addEventListener("touchend", function (e) {
          if (self.touchFlag) {
            self.touchFlag = false;
            self.storePass(self.lastPoint);

            setTimeout(function(){

              self.reset();
            }, 1000);
          }


        }, false);

      }

    }
  }
</script>




<style scoped>

  .masks {
    text-align: center;
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .gesturePwd{
    position: fixed;
    z-index: 5000;
    width: 100%;
    height:100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    background-color: #ffffff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    background-color: #ffffff;
  }

  .gestureTitle {
    color: #87888a;
    margin-top: 0.6rem;
    font-size: 30px;
    font-weight:normal;
  }

  .helloTitle {
    color: #87888a;
    margin-top: 0.1rem;
    font-size: 26px;
    font-weight:normal;


  }
  .phoneTitle {
    color: #87888a;
    margin-top:  0.1rem;
    font-size: 28px;
    font-weight:normal;
  }
  .imgTitle {
    margin-top: 1rem;
    width: 1.41rem;
    height: 1.41rem;

  }

</style>
