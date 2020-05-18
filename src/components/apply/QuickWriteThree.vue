<!--进件中,资料填写的第二步-->
<template>
  <div class="page">
    <!--bgcHidden背景图片一开始 让它显示，同时加载一个隐藏的断网占位图，默认是隐藏的，然后断网之后，显示出来，-->
    <NetBroken v-show="netErrorHidden"></NetBroken>
    <div :hidden="bgcHidden">
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
              <div class='radius backcolor_orange'>
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
              <div class='text_orange'>信息填写</div>
              <div>银行鉴权</div>

            </div>
          </div>
        </div>
        <!-- 加一个白色背景图------end -->
      </div>
      <!-- 步骤进度-----end------ -->
      <!-- 中部商户验证 -->
      <form>
        <div class='middle'>
          <div class='section__title'>紧急联系人信息<span class="accountCss">(必填项)</span></div>
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
              <img class=' clearUserPhoneCss' v-show="vUrgentName" @click="clearData(1)"
                   src="/static/assets/clear.png"/>
            </div>
            <!-- 来条灰色横线 -->
            <Divider></Divider>
            <div class='common_center_Three'>
              <div class='common_margin_left common_font'> 紧急联系人电话<span class="maohao">：</span></div>
              <input ref="rUrgentPhone" v-model="vUrgentPhone" @blur='checkUrgentPhone'
                     class='emerinput' type='number' min="0" inputmode="numeric" pattern="[0-9]*"
                     title="Non-negative integral number" placeholder='请输入紧急联系人联系方式'
                     oninput="if(value.length>11)value=value.slice(0,11)"/>
              <img class=' clearUserPhoneCss' v-show="vUrgentPhone" @click="clearData(2)"
                   src="/static/assets/clear.png"/>
            </div>
            <!-- 来条灰色横线 -->
            <Divider></Divider>


          </div>
          <!-- 加一个白色底色背景-----------end----------- -->

          <div class='section__title '>推荐人代码<span class="accountCss">(可选填)</span></div>
          <!-- 加一个白色底色背景-----------start----------- -->
          <div class='bgc_white'>
            <!-- 来条灰色横线 -->
            <Divider></Divider>
            <div class='common_center_Three'>
              <div class='common_margin_left common_font'> 推荐人代码<span class="maohao">：</span></div>
              <input ref="rRecommedCode" v-model="vRecommedCode" @blur='checkRecommedCode'
                     class='remoomedCodeCss' type='number' min="0" inputmode="numeric" pattern="[0-9]*"
                     title="Non-negative integral number" placeholder='请输入推荐人代码'
                     oninput="if(value.length>20)value=value.slice(0,20)"/>
              <img class=' clearUserPhoneCss' v-show="vRecommedCode" @click="clearData(3)"
                   src="/static/assets/clear.png"/>


            </div>
            <!-- 来条灰色横线 -->
            <Divider></Divider>
          </div>

          <!-- 加一个白色底色背景-----------end----------- -->
          <div class='section__title '>资产证明<span class="accountCss">(可选填)</span>
            <span class="operation" @click="toOpert">操作指引</span>
          </div>


          <!-- 加一个白色底色背景-----------start----------- -->
          <div class='bgc_white'>


            <div class='common_center_Three'>
              <div class='commonCss'>
                <div class='common_margin_left common_font'>商户座机号码<span class="maohao">：</span></div>

                <input class='quhao' ref="rQuhao" v-model="vQuhao" @blur='checkQuhao' type='number' min="0"
                       inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number" placeholder='010'
                       oninput="if(value.length>4)value=value.slice(0,4)"/>

                <span class="gang">-</span>
                <input class='zuoji' ref="rZuoji" v-model="vZuoji" @blur='checkZuoji' type='number' min="0"
                       inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number" placeholder='9283213'
                       oninput="if(value.length>8)value=value.slice(0,8)">

              </div>
            </div>


            <!-- 来条灰色横线 -->
            <Divider></Divider>

            <!--一行代码即可吊起上拉菜单-->
            <mt-actionsheet :actions="data" v-model="sheetVisible"></mt-actionsheet>


            <div class="identify">
              <div style="text-align: left;color: #000;">房产证明<span class="maohao">：</span>

                <div class="uploadCommon">
                  <img src="/static/assets/clearInput.png" class="garbageCss" :hidden="garbageHouseHidden"
                       @click="clearImg('house')"/>
                  <img class="upload progress_line" :src="houseSrc" @click="toActionSheet('house')"
                       :style="isHouseAble"/>
                  <!--上传房产图片进度条画布-->
                  <!--<canvas id="canvas_House_Text" ref="canvas_House_Text" class="canvas_House_Text_Css"-->
                          <!--v-show="imgHouseProgress"></canvas>-->
                  <!--<canvas id="canvas_House" ref="canvas_House" class="canvas_House_Css"-->
                          <!--v-show="imgHouseProgress"></canvas>-->
                </div>
                <span class="idenword">房产证/不动产证拍照上传，照片大小不可超过5M</span>
              </div>
            </div>


            <!-- 来条灰色横线 -->
            <Divider></Divider>

            <div class="identify">
              <div style="text-align: left;color: #000;">车辆证明<span class="maohao">：</span>

                <div class="uploadCommon">
                  <img src="/static/assets/clearInput.png" class="garbageCss" :hidden="garbageCarHidden"
                       @click="clearImg('car')"/>
                  <img class="upload progress_line" :src="carSrc" @click="toActionSheet('car')" :style="isCarAble"/>
                  <!--<img class="upload progress_line" :src="carSrc"  @click="toTest()"/>-->
                  <!--上传车辆图片进度条画布-->
                  <!--<canvas ref="canvas_Car_Text" class="canvas_Car_Text_Css" v-show="imgCarProgress"></canvas>-->
                  <!--<canvas ref="canvas_Car" class="canvas_Car_Css" v-show="imgCarProgress"></canvas>-->
                </div>
                <span class="idenword">机动车行驶证拍照上传，照片大小不可超过5M</span>
              </div>
            </div>

            <!-- 来条灰色横线 -->
            <Divider></Divider>
            <div class="identify">
              <div style="text-align: left;color: #000;">流水证明<span class="maohao">：</span>
                <div class="uploadCommonFlex">
                  <div v-for="(item,index) in streamSrcData" :key="item">
                    <div class="uploadCommon">
                      <img src="/static/assets/clearInput.png" class="garbageCss" :hidden="item.deleStatus"
                           @click="clearImg('stream',index)"/>
                      <!--<img src="/static/assets/clearInput.png" class="garbageCss" :hidden="item.deleStatus"-->
                      <!--@click="delImage('stream',item)"/>-->
                      <img class="upload progress_line" :src="item.src"/>
                    </div>
                  </div>
                  <!--<img class="upload progress_line" src="/static/assets/upload.png"  v-show="upHidden"-->
                  <!--@click="toTest()"  />-->
                  <img class="upload progress_line" src="/static/assets/upload.png" v-show="upHidden"
                       @click="toActionSheet('stream')"/>
                </div>
                <span class="idenword">微信、支付宝流水截图上传，照片大小不可超过5M</span>
              </div>
            </div>

            <!-- 来条灰色横线 -->
            <Divider></Divider>
          </div>
        </div>
        <!-- 加一个白色底色背景-----------end----------- -->

        <!--底部按钮-->
        <div align="center">
          <input type="button" class="btn666" value="下一步" :style="btnRegister" v-bind:disabled="btnDisabled"
                 @click="quickThirdNext()"/>
        </div>
      </form>
    </div>
    <ContactRelationPicker ref="picker" @onValueChange="onValueChange"></ContactRelationPicker>
  </div>

</template>

<script>
  import Checkbox from '../Checkbox'
  import CitySelect from '../CitySelect.vue'
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import RelationPicker from '../Picker'
  import SM from '../../api/SessionManager.js'
  import NetBroken from '../error/NetBroken.vue'//引入网络中断提示图片
  import ContactRelationPicker from '../ContactRelationPicker.vue'

  export default {
    name: SM.QuickWriteThree,
    components: {Checkbox, CitySelect, ToolBar, Divider, RelationPicker, NetBroken, ContactRelationPicker},
    data() {
      return {
        imgStreamProgress: false,//上传流水图片的进度条，ture是显示
        imgCarProgress: false,//上传车辆图片的进度条，ture是显示
        imgHouseProgress: false,//上传房屋图片的进度条，ture是显示
        urgentNameLength: 6,
        bgcHidden: false,//背景图片，true是隐藏
        netErrorHidden: false,//断网占位图片，true是显示
        netError: false,//有网
        upHidden: true,
        streamSrcData: [],
        garbageHouseHidden: true,
        garbageCarHidden: true,

        houseSrc: "/static/assets/upload.png",
        carSrc: "/static/assets/upload.png",
        house: "",
        car: "",
        tempType: "",

        isHouseAble: " ",//默认不禁用这张图片的点击事件
        isCarAble: " ",//默认不禁用这张图片的点击事件

        // action sheet 选项内容
        data: [{
          name: '拍照',
          method: this.getCamera	// 调用原生提供的拍照的methods中的函数
        }, {
          name: '从相册中选择',
          method: this.getAlbum	// 调用原生提供的选择图片的methods中的函数
        }],
        // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        sheetVisible: false,

        progressCss: 'background-color: #ff6400;;width:50%;height: 1px',//进度条橙色
        btnRegister: 'background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);',//立即注册样式
        btnDisabled: false,//立即注册 按钮默认不可用
        token: null,
        province: null,
        city: null,
        area: null,
        vStreet: null,
        vRelation: '',
        check: false,
        vNewAccount: null,
        vAccountPwd: null,
        vAccountName: null,
        vUrgentRelation: null,
        vUrgentName: null,
        vUrgentPhone: null,
        vYancao: null,
        vLicen: null,
        vQuhao: "",
        imagList: null,
        vZuoji: ""
      }
    },
    //生命周期方法
    mounted() {
      //15分钟之后失效，强制登陆
      if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
        return
      }
      //监听网络状态
      this.checkNetWork();
//      //获取登录态
      var token = sessionStorage.getItem("loginSession");

      this.token = token;//登陆态，赋值给全局变量

      //如果紧急联系人有缓存，先显示出来
      var cacheUrgent = sessionStorage.getItem(this.$options.name + 'cacheUrgent');
      if (!this.$StringUtils.isEmpty(cacheUrgent)) {
        this.vRelation = cacheUrgent;
      }

      //如果紧急联系人电话有缓存，先显示出来
      var quickCacheUrgentPhone = sessionStorage.getItem('quickCacheUrgentPhone');
      console.info("紧急联系人电话有缓存>>>>" + quickCacheUrgentPhone)
      if (!this.$StringUtils.isEmpty(quickCacheUrgentPhone)) {
        this.vUrgentPhone = quickCacheUrgentPhone;
      }

      //如果紧急联系人姓名有缓存，先显示出来
      var quickCacheUrgentName = sessionStorage.getItem('quickCacheUrgentName');
      if (!this.$StringUtils.isEmpty(quickCacheUrgentName)) {
        this.vUrgentName = quickCacheUrgentName;
      }
      //如果推荐人代码有缓存，先显示出来
      var cacheRecommedCode = sessionStorage.getItem('quickCacheRecommedCode');
      if (!this.$StringUtils.isEmpty(cacheRecommedCode)) {
        this.vRecommedCode = cacheRecommedCode;
      }
      //如果区号有缓存，先显示出来
      var quickCacheQuhao = sessionStorage.getItem('quickCacheQuhao');
      if (!this.$StringUtils.isEmpty(quickCacheQuhao)) {
        this.vQuhao = quickCacheQuhao;
      }
      //如果座机号有缓存，先显示出来
      var quickCacheZuoji = sessionStorage.getItem('quickCacheZuoji');
      if (!this.$StringUtils.isEmpty(quickCacheZuoji)) {
        this.vZuoji = quickCacheZuoji;
      }

      //如果房产图片有缓存
      let cacheHouse = sessionStorage.getItem('quickCacheHouse');
      if (!this.$StringUtils.isEmpty(cacheHouse)) {
        this.garbageHouseHidden = false;
        this.houseSrc = cacheHouse;
      }

      //如果车辆图片有缓存
      let cacheCar = sessionStorage.getItem('quickCacheCar');
      if (!this.$StringUtils.isEmpty(cacheCar)) {
        this.garbageCarHidden = false;
        this.carSrc = cacheCar;
      }

      //房产图片删除按钮，也取缓存
      var quickCacheHouseGarbage = sessionStorage.getItem('quickCacheHouseGarbage');
      if (!this.$StringUtils.isEmpty(quickCacheHouseGarbage)) {
        if (quickCacheHouseGarbage === 'true') {
          this.garbageHouseHidden = true;//缓存让这个图片隐藏起来，
        }
        else {
          this.garbageHouseHidden = false;//缓存让这个图片隐藏起来，
        }
      }

      //车辆图片删除按钮，也取缓存
      var quickCacheCarGarbage = sessionStorage.getItem('quickCacheCarGarbage');
      if (!this.$StringUtils.isEmpty(quickCacheCarGarbage)) {
        if (quickCacheCarGarbage === 'true') {
          this.garbageCarHidden = true;//缓存让这个图片隐藏起来，
        }
        else {
          this.garbageCarHidden = false;//缓存让这个图片隐藏起来，
        }
      }
      //如果流水有缓存
      let cacheStream = sessionStorage.getItem('quickCacheStream');
      if (!this.$StringUtils.isEmpty(cacheStream)) {
        this.streamSrcData = JSON.parse(cacheStream);//把字符串转化成数组对象
      }
      //流水图片，隐藏的按钮，也取缓存
      var cacheUpHidden = sessionStorage.getItem('quickCacheUpHidden');
      if (!this.$StringUtils.isEmpty(cacheUpHidden)) {
        if (cacheUpHidden === 'false') {
          this.upHidden = false;//缓存让这个图片隐藏起来，
        }
      }

    },
    methods: {
      canvasCar(per) {
        //车辆照片的上传图片进度条
        var that = this;
        var canvas_1 = that.$refs.canvas_Car_Text;//百分比文字
        var canvas_2 = that.$refs.canvas_Car;//阴影图案

        var ctx_1 = canvas_1.getContext('2d');
        var ctx_2 = canvas_2.getContext('2d');

        ctx_2.fillStyle = '#999';
        ctx_1.fillStyle = '#fff';
        var angle = 0;
        var timer;

        (function draw() {
          timer = requestAnimationFrame(draw);
          ctx_1.clearRect(0, 0, canvas_2.width, canvas_2.height);
          ctx_2.beginPath();
          ctx_2.fillRect(0, 0, 300, angle);
          //x，就是隔左边多少的 距离,相当于left，y就是隔上边多少的距离，相当于top
          //        150*100 像素的已填充矩形,,,,x,y,left，top
          //        填充的矩形的左上方的xy坐标和右下方的xy坐标
          //        width: 120px;
          //        height: 90px;
          angle++;
          var percentAge = parseInt((angle / 150) * 100);
          console.info("此时的高度是angle：" + angle);
          console.info("此时的百分比是percentAge：" + percentAge);

          if (angle > (per / 100 * 150)) {
//            if (angle > 150) {//151  > 150
            percentAge = per;
            window.cancelAnimationFrame(timer);
            ctx_2.clearRect(0, 0, 300, angle);//清除画布
            that.imgCarProgress = false;
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.UPLOAD_IMG_SUCCESS);//照片上传成功
          }
          ;
          ctx_1.font = "bold 40px 宋体";
          ctx_1.fillStyle = '#fff';
          var text = percentAge + '%';
          ctx_1.fillText(text, canvas_2.width / 2 - 25, canvas_2.height / 2 + 40);

        })()

      },
      canvasHouse(per) {
        var that = this;
        //房屋照片的上传图片进度条
        var canvas_1 = that.$refs.canvas_House_Text;
        var canvas_2 = that.$refs.canvas_House;

        var ctx_1 = canvas_1.getContext('2d');
        var ctx_2 = canvas_2.getContext('2d');

        ctx_2.fillStyle = '#999';
        ctx_1.fillStyle = '#fff';
        var angle = 0;
        var timer;

        (function draw() {
          timer = requestAnimationFrame(draw);
          ctx_1.clearRect(0, 0, canvas_2.width, canvas_2.height);
          ctx_2.beginPath();
          ctx_2.fillRect(0, 0, 300, angle);
          //x，就是隔左边多少的 距离,相当于left，y就是隔上边多少的距离，相当于top
          //        150*100 像素的已填充矩形,,,,x,y,left，top
          //        填充的矩形的左上方的xy坐标和右下方的xy坐标
          //        width: 120px;
          //        height: 90px;
          angle++;
          var percentAge = parseInt((angle / 150) * 100);
          console.info("此时的高度是angle：" + angle);
          console.info("此时的百分比是percentAge：" + percentAge);

          if (angle > (per / 100 * 150)) {
//            if (angle > 150) {//151  > 150
            percentAge = per;
            window.cancelAnimationFrame(timer);
            ctx_2.clearRect(0, 0, 300, angle);//清除画布
            that.imgHouseProgress = false;
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.UPLOAD_IMG_SUCCESS);//照片上传成功
          }
          ;
          ctx_1.font = "bold 40px 宋体";
          ctx_1.fillStyle = '#fff';
          var text = percentAge + '%';
          ctx_1.fillText(text, canvas_2.width / 2 - 25, canvas_2.height / 2 + 40);

        })()

      },

      choose: function () {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        this.$refs.picker.popupVisible = true
      },
      onValueChange: function (value) {
        this.vRelation = value
      },
      //校验推荐人代码
      checkRecommedCode() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;

        //接收到，输入的传过来的详细的地址
        var recommedCodeInput = that.$refs.rRecommedCode.value;

        if (!that.$StringUtils.isEmpty(recommedCodeInput)) {
          console.info('输入推荐人代码>>>' + recommedCodeInput)
          //存入本地缓存
          sessionStorage.setItem('quickCacheRecommedCode', recommedCodeInput)
          that.vRecommedCode = recommedCodeInput;
        }

      },
      kingCode() {
        //测试专用，快速填写信息
        this.vUrgentName = "好不好";
        this.vUrgentPhone = "13444444444";
        this.vQuhao = "0775";
        this.vZuoji = "3056358";
        this.vRelation = "父母";
        sessionStorage.setItem("quickCacheUrgentPhone", this.vUrgentPhone);
        sessionStorage.setItem("quickCacheUrgentName", this.vUrgentName);
        sessionStorage.setItem("quickCacheZuoji", this.vZuoji);
        sessionStorage.setItem("quickCacheQuhao", this.vQuhao);

      },
      //清除输入框数据
      clearData: function (num) {
        if (num == 1) {
          this.vUrgentName = '';
        }
        if (num == 2) {
          this.vUrgentPhone = '';
        }
        if (num == 3) {
          this.vRecommedCode = '';
        }

      },
      //进行弹框、指定id
      toActionSheet(type) {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        //弹出底部动画
        this.actionSheet();
        this.tempType = type;//决定是 点击房产、还是车辆、还是流水
      },
      // 打开选择照片action sheet弹出菜单
      actionSheet: function () {
        this.sheetVisible = true;
      },
      getCamera() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;
        if (sessionStorage.getItem("cacheNet") === 'true') {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.NET_ERROR);
          that.$router.push(that.$RM.Netbroken);
        } else {
          window.interfacePhone.takePhoto();//吊起原生提供的方法
          //在拍照里面判断，是安卓还是ios还是微信
          if (window.appId == 'ANDROID') {
            console.log('选择安卓相册....');
            window.onPhotoSelected = function () {
              for (var i = 0; i < arguments.length; i++) {
                if (arguments[i].indexOf("9j") != -1) {
                  //一般bsae64的图片都会带上9j这样的字符 //拿到base64的图片，直接调取工具类判断图片大小
                  let photoSize = that.$utils.showSize(arguments[i]);
                  if (photoSize >= 5) {
                    that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IMG_SIZE_LARGE_ERROR);
                    return
                  }
                  //上传图片
                  that.uploadImg(arguments[i]);//调取上传图片方法
                }
              }
            }

          }
          if (window.appId == 'IOS') {
            console.log('苹果相机....');
            window.onPhotoSelectIOS = function (path) {
              if (!that.$StringUtils.isEmpty(path)) {
                const iosBase64 = 'data:image/*;base64,';
                path = iosBase64 + path;//ios返回给我没给我拼接上base64前缀，这里拼接上
                //拿到base64的图片，直接调取工具类判断图片大小
                let photoSize = that.$utils.showSize(path);
                if (photoSize >= 5) {
                  that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IMG_SIZE_LARGE_ERROR);
                  return
                }
                that.uploadImg(path);//调取上传图片方法
              }
            }
          }
        }
      },
      getAlbum() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;
        if (sessionStorage.getItem("cacheNet") === 'true') {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.NET_ERROR);
          that.$router.push(that.$RM.Netbroken);
        } else {
          //安卓
          if (window.appId === 'ANDROID') {
            console.log('选择安卓相册....');
            if (that.tempType === 'stream') {//流水图片
              window.interfacePhone.takePhotos(3 - (that.streamSrcData.length));//多图相册，选择吊起这个方法,最多3张
            } else {
              window.interfacePhone.pickPhoto();//单图相册，选择吊起这个方法
            }
            window.onPhotoSelected = function () {
              for (var i = 0; i < arguments.length; i++) {
                if (arguments[i].indexOf("9j") != -1) {
                  //一般bsae64的图片都会带上9j这样的字符 //拿到base64的图片，直接调取工具类判断图片大小
                  let photoSize = that.$utils.showSize(arguments[i]);
                  if (photoSize >= 5) {
                    that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IMG_SIZE_LARGE_ERROR);
                    return
                  }
                  //上传图片
                  that.uploadImg(arguments[i]);//调取上传图片方法
                }
              }
            }
          }
          //ios
          if (window.appId === 'IOS') {
            console.log('选择苹果的相册....');
            const iosBase64 = 'data:image/*;base64,';
            if (that.tempType === 'stream') {//流水图片
              window.interfacePhone.pickPhoto(3 - (that.streamSrcData.length));//多图相册，选择吊起这个方法,最多3张
            } else {
              window.interfacePhone.pickPhoto(1);//单图相册，选择吊起这个方法
            }
            window.onPhotoSelect = function () {
              for (var i = 0; i < arguments.length; i++) {
//                循环拼接上base64的前缀
                if (arguments[i].indexOf("9j") != -1) {//一般bsae64的图片都会带上9j这样的字符
                  let testPa = iosBase64 + arguments[i];//ios返回给我没给我拼接上base64前缀，这里拼接上
                  let photoSize = that.$utils.showSize(arguments[i]);
                  if (photoSize >= 5) {
                    that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IMG_SIZE_LARGE_ERROR);
                    return
                  }
                  that.uploadImg(testPa);
                }
              }
            }
          }

        }
      },
      //监听网络状态
      checkNetWork() {
          let that=this;
        let el = document.body;
        if (el.addEventListener) {
//          addEventListener——兼容：firefox、chrome、IE、safari、opera；不兼容IE7、IE8
          window.addEventListener("online", function () {
//            alert("有网....");
            that.netError = false;
            sessionStorage.setItem("cacheNet", "false")
          });
          window.addEventListener("offline", function () {
//            alert("网络走丢了....");
            that.netError = true;
            sessionStorage.setItem("cacheNet", "true")
          });
        }

      },
      //图片上传到服务器
      uploadImg(path) {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;
        if (sessionStorage.getItem("cacheNet") === "true") {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.NET_ERROR);
          that.$router.push(that.$RM.Netbroken);
        } else {
          let photoType = "";
          //通过全局变量判断点击的上传的类型
          if (that.tempType === 'house') {//房产图片
            photoType = "01"
          }
          if (that.tempType === 'car') {//车辆图片
            photoType = "02"
          }
          if (that.tempType === 'stream') {//流水图片
            photoType = "03"
          }

          let fileName = that.$utils.randomString(15) + ".jpg";//文件名必须加个后缀，后台不知道图片格式会报错
          let timestamp = that.$utils.generateSignTime();
          let reqId = that.$utils.generateSignTime();
          let sign = that.$utils.generateSign(reqId, timestamp);
          //开始请求图片上传接口
          const url =that.$api.ROOT +that.$Constants.UPLOAD_IMG;
          that.$indicator.open("上传中...");
          //开始请求上传图片接口
          that.$http.post(url, {
            appId: window.appId,
            reqId: reqId,
            timestamp: timestamp,
            sign: sign,
            openId: that.token,
            data: [
              {
                photoType: photoType, fileName: fileName, base64Str: path
              }
            ]
          })
            .then(function (res) {
              console.info('成功请求到上传图片接口>>>');
              console.info(res.data);
              if (res.data.ret === '0') {
                that.$indicator.close();
                var imageId = res.data.data.imageId;
                if (that.$StringUtils.isEmpty(imageId)) {
                  //图片上传失败
                  that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300009);
                  return
                }

                if (that.tempType === 'house') {//房产图片
                  //显示进度条
//                  that.imgHouseProgress = true;
//                  that.canvasHouse(100);

                  Countly.init({
                    app_key: that.$Constants.APPKEY,
                    url: that.$Constants.ROOTMAI, //your server goes here
                    debug: true,
                  })
                  Countly.track_sessions();
                  Countly.track_pageview();
                  Countly.add_event({
                    key: that.$Constants.QuickPushHouse,
                    "segmentation": {
                      appId: window.appId,
                    }
                  });

                  that.garbageHouseHidden = false;   //图片的删除按钮显示出来
                  sessionStorage.setItem("quickCacheHouseGarbage", that.garbageHouseHidden);
                  that.houseSrc = path;//页面显示图片
                  that.isHouseAble = "pointer-events: none",//是否禁用这个标签，" "是不禁用,
                    that.house = imageId;//后台服务器返回的Id，存入全局变量；
                  sessionStorage.setItem("quickCacheHouseImageId", that.house);//把返回来的图片id也缓存起来，防止丢失，记得清除
                  sessionStorage.setItem("quickCacheHouse", path);//JSON.stringify，把对象转成json字符串

                }

                if (that.tempType === 'car') {//车辆图片
                  //显示进度条
//                  that.imgCarProgress = true;
//                  that.canvasCar(100);
                  Countly.init({
                    app_key: that.$Constants.APPKEY,
                    url: that.$Constants.ROOTMAI, //your server goes here
                    debug: true,
                  })
                  Countly.track_sessions();
                  Countly.track_pageview();
                  Countly.add_event({
                    key: that.$Constants.QuickPushCar,
                    "segmentation": {
                      appId: window.appId,
                    }
                  });

                  that.garbageCarHidden = false;   //图片的删除按钮显示出来
                  sessionStorage.setItem("quickCacheCarGarbage", that.garbageCarHidden);
                  that.carSrc = path;//页面显示图片
                  that.isCarAble = "pointer-events: none",//是否禁用这个标签，" "是不禁用,
                    that.car = imageId;//后台服务器返回的Id，存入全局变量；
                  sessionStorage.setItem("quickCacheCarImageId", that.car);//把返回来的图片id也缓存起来，防止丢失，记得清除
                  sessionStorage.setItem("quickCacheCar", path);//JSON.stringify，把对象转成json字符串
                }


                if (that.tempType === 'stream') {//流水图片
                  Countly.init({
                    app_key: that.$Constants.APPKEY,
                    url: that.$Constants.ROOTMAI, //your server goes here
                    debug: true,
                  })
                  Countly.track_sessions();
                  Countly.track_pageview();
                  Countly.add_event({
                    key: that.$Constants.QuickStream,
                    "segmentation": {
                      appId: window.appId,
                    }
                  });

                  //把图片ID存入数组，并让页面显示图片出来，
                  that.streamSrcData.push({
                    imgId: imageId,//图片上传成功之后的图片id
                    src: path, //用户选择的图片base64
                    deleStatus: false,//删除的图标,true是隐藏,
                    isAble: "pointer-events: none",//是否禁用这个标签，" "是不禁用,
                  });

                  if (that.streamSrcData.length >= 3) {
                    //最多3张，超过隐藏上传图片的按钮
                    that.upHidden = false;
                    that.streamSrcData.length = 3;
                    sessionStorage.setItem("quickCacheUpHidden", that.upHidden);
                  }
                  sessionStorage.setItem("quickCacheStream", JSON.stringify(that.streamSrcData));//JSON.stringify，把对象转成json字符串
                }
//                that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.UPLOAD_IMG_SUCCESS);//照片上传成功

              } else {
                that.$indicator.close();
                if (res.data.ret === '000002') {
                  that.$dialog.alert("    ",that.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
                  that.$StringUtils.loginOut();
                  return
                }
                console.info('上传失败...');
              }
            })
            .catch(function () {
              that.$indicator.close();
              console.info('系统错误...');
            });
        }

      },
      //清除上传的图片
      clearImg(type, num) {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;
        that.$dialog.confirm("   ", "是否删除照片？", {confirmButtonText: '是', cancelButtonText: '否'})
          .then(() => {
            if (type === 'house') {
              that.garbageHouseHidden = true;
              that.houseSrc = "/static/assets/upload.png";
              that.isHouseAble = " ",//是否禁用这个标签，" "是不禁用,
                sessionStorage.setItem("quickCacheHouse", that.houseSrc);
              sessionStorage.removeItem("quickCacheHouseImageId");//把返回来的图片id也缓存起来，防止丢失，记得清除
              sessionStorage.setItem("quickCacheHouseGarbage", that.garbageHouseHidden);
            }
            if (type === 'car') {
              that.garbageCarHidden = true;
              that.carSrc = "/static/assets/upload.png";
              that.isCarAble = " ",//是否禁用这个标签，" "是不禁用,
                sessionStorage.setItem("quickCacheCar", that.carSrc);
              sessionStorage.removeItem("quickCacheCarImageId");//把返回来的图片id也缓存起来，防止丢失，记得清除
              sessionStorage.setItem("quickCacheCarGarbage", that.garbageCarHidden);
            }
            if (type === 'stream') {
              that.streamSrcData.splice(num, 1);
              if (that.streamSrcData.length < 3) {
                that.upHidden = true;
                sessionStorage.setItem("quickCacheUpHidden", that.upHidden);
              }
              sessionStorage.setItem("quickCacheStream", JSON.stringify(that.streamSrcData));//JSON.stringify，删除1个，就要覆盖一个缓存
            }
          })

      },
      //校验座机号
      checkZuoji() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;

        //接收到，输入的传过来的座机
        let ZuojiInput = that.$refs.rZuoji.value;
        Countly.init({
          app_key: that.$Constants.APPKEY,
          url: that.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: that.$Constants.QuickZuoji,
          "segmentation": {
            appId: window.appId,
          }
        });

        if (ZuojiInput.length < 7 || ZuojiInput.length > 8) {
          //如果不正确
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.ZUOJIERROR);
        }
        that.vZuoji = ZuojiInput;
        //存入本地缓存
        sessionStorage.setItem('quickCacheZuoji', ZuojiInput)
      },
      //校验区号
      checkQuhao() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        var that = this;

        //接收到，输入的传过来的座机
        let quhaoInput = that.$refs.rQuhao.value;
        if (quhaoInput.length < 3 || quhaoInput.length > 4) {
          //如果不正确
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.QUHAOERROR);
        }
        //存入本地缓存
        that.vQuhao = quhaoInput;
        sessionStorage.setItem('quickCacheQuhao', quhaoInput)
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
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.URGENTPHONE_ERROR);
          }
          that.vUrgentPhone = urgentPhoneInput;
          //存入本地缓存
          sessionStorage.setItem('quickCacheUrgentPhone', urgentPhoneInput);

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
        if (!this.$StringUtils.isEmpty(urgentNameInput)) {
          //第六步、校验输入的内容
          if (!(that.$utils.checkName(urgentNameInput))) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.URGENTNAM_EERROR);

          }
          that.vUrgentName = urgentNameInput;
          sessionStorage.setItem('quickCacheUrgentName', urgentNameInput);

        }
      },
      getRelation: function (res) {
        this.vRelation = res
      },

      toProcol() {
        //跳转个人协议
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        this.$router.push(this.$RM.PersonProtocol);
      },

      toOpert() {
        //15分钟之后失效，强制登陆
        if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
          return
        }
        //跳转去操作指引页面.
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.QuickhandleClick,
          "segmentation": {
            appId: window.appId,
          }
        });


        this.$router.push(this.$RM.Operation);
      },

      onCheckChange: function (val) {
        //勾选框的状态
        this.check = val;
        sessionStorage.setItem("cacheGou", this.check)
      },

      //点击下一步，表单校验
      quickThirdNext() {
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
          //校验用户名
          var cacheLawName = sessionStorage.getItem('quickCacheLawName');
          //校验身份证
          var cacheIdcard = sessionStorage.getItem('quickCacheIdcard');
          //获取手机号
          var cachePhone = sessionStorage.getItem('cachePhone');


          //校验紧急联系人关系
          var checkEmerRelationTemp = '';
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
          //校验紧急联系人关系的数字代号
          if (that.$StringUtils.isEmpty(checkEmerRelationTemp)) {
            console.info('紧急联系人关系为null...');
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201003);
            return;
          }

          //校验系紧急联人姓名
          var cacheUrgentName = that.$refs.rUrgentName.value;
          if (that.$StringUtils.isEmpty(cacheUrgentName)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201004);
            console.info('紧急联系人名字为null...');
            return;
          }
          if (!(that.$utils.checkName(cacheUrgentName))) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.URGENTNAM_EERROR);
            return;
          }

          //校验紧急联系人手机号
          var cacheUrgentPhone = that.$refs.rUrgentPhone.value;
          if (that.$StringUtils.isEmpty(cacheUrgentPhone)) {
            console.info('紧急联系人电话为null...');
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201005);
            return;
          }
          if (!that.$utils.checkPhone(cacheUrgentPhone)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.URGENTPHONE_ERROR);
            return;
          }

          //校验商户门店名称
          var quickCacheAccountShopName = sessionStorage.getItem('quickCacheAccountShopName');

          //校验营业执照
          var cacheLicen = sessionStorage.getItem('quickCacheLicen');

          //校验烟草许可证
          var cacheYancao = sessionStorage.getItem('quickCacheLicenseKey');

          //校验新商盟账号
          var cacheNewAccount = sessionStorage.getItem('quickCacheNewAccount');

          //校验新商盟密码
          var cacheAccountPwd = sessionStorage.getItem('quickCacheAccountPwd');

          //校验门店地址的省市区
          var quickCacheProvince = sessionStorage.getItem("quickCacheProvince");

          var quickCacheCity = sessionStorage.getItem("quickCacheCity");

          var quickCacheArea = sessionStorage.getItem("quickCacheArea");

          //校验输入的详细地址
          var cacheStreet = sessionStorage.getItem('quickCacheStreet');

          //校验区号
          if (!that.$StringUtils.isEmpty(that.vQuhao)) {
            if (that.vQuhao.length < 3 || that.vQuhao.length > 4) {
              //如果不正确
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.QUHAOERROR);
              return;
            }

          }
          //校验座机
          if (!that.$StringUtils.isEmpty(that.vZuoji)) {
            if (that.vZuoji.length < 7 || that.vZuoji.length > 8) {
              //如果不正确
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.ZUOJIERROR);
              return;
            }
          }
          //获取图片上传,先定义一个空数组，
          var resultImg = [];

          //如果house不是数组，是字符串，那么直接添加入 数组里面，
          if (!that.$StringUtils.isEmpty(sessionStorage.getItem("quickCacheHouseImageId"))) {
            resultImg.push(sessionStorage.getItem("quickCacheHouseImageId"))
          }
          //车辆照片
          if (!that.$StringUtils.isEmpty(sessionStorage.getItem("quickCacheCarImageId"))) {

            resultImg.push(sessionStorage.getItem("quickCacheCarImageId"))
          }
          //流水证明照片
          if (that.streamSrcData.length > 0) {
            //遍历，添加入新数组里
            for (var i = 0; i < that.streamSrcData.length; i++) {
              resultImg.push(that.streamSrcData[i].imgId)//只取图片ID
            }
          }
          var imageNoList = resultImg.join(); //将数组转化成字符串
          console.info('获取到的图片字符串>>>>' + imageNoList);
          //获取缓存的地理位置
          var userLocation = sessionStorage.getItem("location");

          if (that.$StringUtils.isEmpty(userLocation)) {
            userLocation = "未获得地理位置，录入测试地址";
          }
          //新商盟密码加密：
          let publicKey = that.$utils.PUBLIC_KEY;
          let encrypt_rsa = new that.$RSA.RSAKey();
          encrypt_rsa = that.$RSA.KEYUTIL.getKey(publicKey);
          let encStr = encrypt_rsa.encrypt(cacheAccountPwd);
          encStr = that.$RSA.hex2b64(encStr);

          //开始请求快捷进件接口
          that.$indicator.open("请稍后...");
          let timeStamp=Date.now();
          that.$api.post(that.$Constants.APPLYLOANDATA, {
            appId: window.appId,
            reqId: that.$StringUtils.getReqId(),
            timestamp: timeStamp,
            sign: that.$utils.generateSign(that.$StringUtils.getReqId(),timeStamp),
            openId: that.token,
            data: {
              name: cacheLawName,
              idNo: cacheIdcard,
              phoneNo: cachePhone,
              relationship: checkEmerRelationTemp,
              contactName: cacheUrgentName,
              contactPhoneNo: cacheUrgentPhone,
              addProvince: quickCacheProvince,
              addCity: quickCacheCity,
              addCounty: quickCacheArea,
              addDetail: cacheStreet,
              merchantName: quickCacheAccountShopName,
              businessLicense: cacheLicen,
              tobaccoLicenseNo: cacheYancao,
              newBusinessAccount: cacheNewAccount,
              newBusinessAccountPsd: encStr,
              HomePhone: that.vZuoji,
              HomeAddNo: that.vQuhao,
              imageNoList: imageNoList,
              isFastApply: 1,//1是快捷进件
              location: userLocation,
              referralNo: that.vRecommedCode
            }
          }, function (res) {

            console.info('开始请求进件接口>>>');
            if (res.ret === '0') {
              that.$indicator.close();
              that.upHidden = true;//让流水的初始化图片，重新显示出来
              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.QuickBankClick,
                "segmentation": {
                  appId: window.appId,
                }
              });
              let businessOpenFlag = res.data.businessOpenFlag;//业务是否已开展的标识,	0 未开展 1 已开展
              let withInWhitelist = res.data.withInWhitelist;//是否在白名单,0 否 1 是
              let custNo = res.data.custNo;//客户编号
              let applyId = res.data.applyId;//申请编号


              that.$sessionManager.clearQuickWrite();

              if (businessOpenFlag === '0') {
                that.$dialog.alert(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300037, '',
                  {
                    showCancelButton: false,
                    confirmButtonText: '返回首页',
                  })
                  .then(() => {
                    that.$router.push(that.$RM.Main);
                  })
                return
              }
//                  var withInWhitelist=0;
              if (withInWhitelist === '0') {

                that.$dialog.alert(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300036, '',
                  {
                    showCancelButton: false,
                    confirmButtonText: '返回首页',
                  })
                  .then(() => {
                    that.$router.push(that.$RM.Main);
                  });
                return
              }
              //跳转页面
              that.$router.push(that.$RM.RepaySkip + "?success=1");
            } else {
              if (res.ret === '300032') {
                //审批拒绝。
                that.$sessionManager.clearQuickWrite()
                that.$dialog.alert(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300036, '',
                  {
                    showCancelButton: false,
                    confirmButtonText: '返回首页',
                  })
                  .then(() => {
                    that.$router.push(that.$RM.Main);
                  })
                ;
                return
              }
              else if (res.ret === '300036') {
                //客户的额度为0。
                that.$dialog.confirm(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300036, '',
                  {
                    showCancelButton: false,
                    confirmButtonText: '返回首页',
                  })
                  .then(() => {
                    that.$router.push(that.$RM.Main);
                  })
                ;
                return
              }
              else if (res.ret === '300037') {
                //客户的地区未开展该业务
                that.$dialog.confirm(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300037, '',
                  {
                    showCancelButton: false,
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
          }.bind(that));
        }

      }
    },
    watch: {
      //监听这1个值的改变，一改变样式也相对改变
      vUrgentName(val, oldval) {
        if (val.length > this.urgentNameLength) {
          this.vUrgentName = String(val).slice(0, this.urgentNameLength);
        }
      },
      vUrgentPhone: {
        handler() {
          if (!this.$StringUtils.isEmpty(this.vUrgentPhone)) {
            this.progressCss = 'background-color: #ff6400;;width:100%;height: 1px;';//进度条橙色
          } else {
            this.progressCss = '';//暗色

          }

        }
      }
    },
    destroyed() {
      this.$sessionManager.saveQuickWrite(this.vRelation)
    }
  }
</script>

<style scoped>
  .fixed {
    position: fixed;
    width: 100%;
    margin-top: 0;
    top:0;
    z-index: 2;
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
    border: 0;
    font-size: 0.4rem;
  }

  textarea {
    width: 6.4rem;
    height: 1.493333rem;
    padding-top: 0.5rem;
    border: 0;
    font-size: 0.4rem;

  }

  input::-webkit-input-placeholder {
    font-size: 29px;
    color: #999;
  }

  .quhao {
    width: 1rem;
    border: 0;
    font-size: 0.4rem;
  }

  .zuoji {
    width: 4rem;
    border: 0;
    margin-left: 0.2rem;
    font-size: 0.4rem;
    text-align: left;
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
    width: 5.6rem;
    height: 0.8rem;
    border: 0;
  }

  .operation {
    font-size: 26px;
    color: #017ad4;
    margin-left: 4.5rem;
  }

  .gang {
    font-size: 30px;
    color: #999999;
    margin-left: 0.1rem;
  }

  .upload {
    border: 1px solid #e1e1e1;
    border-radius: 2px;
    width: 3rem;
    height: 2.1rem;
  }

  .identify {

    display: flex;
    margin-left: 0.35rem;
    line-height: 1.5rem;
    font-size: 30px;
    color: #666666;
  }

  .idenword {
    font-size: 26px;
    color: #999999;
  }

  .btn666 {
    margin-top: 50px;
    margin-bottom: 50px;
    background-image: linear-gradient(-90deg, #ffa366 0%, #ffa366 100%);
    width: 8.7rem;
    height: 1.3rem;
    border: none;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    font-size: 30px;
    color: #ffffff;
  }

  .uploadCommon {
    width: 3.1rem;
    position: relative;
z-index: 1;
  }

  .uploadCommonFlex {
    display: flex;
    /*justify-content: space-between;*/
  }

  .garbageCss {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    right: 0;
  }

  .clearUserPhoneCss {
    width: 0.373333rem;
    height: 0.373333rem;
  }

  .lineCss_orange {
    background-color: #ff6400;
    width: 32%;
    height: 2px;
  }

  .remoomedCodeCss {
    width: 6.3rem;
    border: 0;
    font-size: 0.4rem;

  }

  .rightText {
    font-size: 30px;
    text-align: left;
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

  .canvas_House_Text_Css {
    z-index: 3;
    position: absolute;
    width: 3rem;
    height: 2.2rem;
    top: 0;
  }

  .canvas_House_Css {
    opacity: 0.3;
    width: 3rem;
    height: 2.2rem;
    /*border: 1px solid red;*/
    position: absolute;
    /*z-index: 2;*/
    /*整体翻转180度，很重要*/
    transform: rotate(180deg);
    top: 0;
  }

  .canvas_Car_Css {
    opacity: 0.3;
    width: 3rem;
    height: 2.2rem;
    /*border: 1px solid red;*/
    position: absolute;
    /*z-index: 2;*/
    /*整体翻转180度，很重要*/
    transform: rotate(180deg);
    top: 0;
  }

  .canvas_Car_Text_Css {
    z-index: 3;
    position: absolute;
    width: 3rem;
    height: 2.2rem;
    top: 0;
  }
</style>
