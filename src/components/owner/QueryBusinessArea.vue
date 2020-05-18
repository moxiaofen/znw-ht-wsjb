<!--业务开展区域查询-->
<template>
  <div class="QueryBusinessArea">
    <ToolBar>业务开展区域查询</ToolBar>
    <Divider></Divider>
    <div class="tips">{{tips}}</div>
    <Divider></Divider>
    <div class="edit_bg">
      <span class="edit_name">{{edit_name}}</span>
      <input :placeholder="place_holder" class="edit_text" v-model="creditNo">
    </div>
    <Divider></Divider>
    <div class="page_rest">
      <CommitButton @click.native="queryAreaOpen" name="查询" :isInputNonEmpty="isInputNonEmpty"></CommitButton>
    </div>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import CommitButton from '../CommitButton.vue'
  export default {
    components: {ToolBar, Divider, CommitButton},
    mounted(){

      //进入新界面重置session失效时间
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }

    },
    data () {
      return {
        tips: '本次查询，要求客户输入对应烟草许可证号，仅验证客户所在区域是否已开展业务。',
        edit_name: '烟草许可证号：',
        place_holder: '请输入正确的烟草许可证号',
        isInputNonEmpty: false,
        creditNo: ''
      }
    },
    watch: {
      creditNo: function (val, oldVal) {
        if (val != null && val != undefined && val.length > 0) {
          this.isInputNonEmpty = true
        } else {
          this.isInputNonEmpty = false
        }
      }
    },
    methods: {
      queryAreaOpen(){

        if (this.$StringUtils.isEmpty(this.creditNo)) {

          this.$toast('烟草许可证号不能为空')
          return
        }
        this.$api.post(this.$Constants.IS_AREA_OPEN, {
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId(),
          "data": {
            "newBusinessAccount": this.creditNo
          }
        }, function (result) {
          if (result && result.data) {
            if (result.data.businessOpenFlag == "1") {
              //已开展业务跳转到首页

              this.$dialog.confirm('恭喜您！该烟草证所在区域已开展!', '点击立即申请即可前往审核授信', {confirmButtonText: '立即申请'})
                .then(function (action) {
                  Countly.init({
                    app_key: this.$Constants.APPKEY,
                    url: this.$Constants.ROOTMAI, //your server goes here
                    debug: true,
                  })
                  Countly.track_sessions();
                  Countly.track_pageview();
                  Countly.add_event({
                    key: this.$Constants.queryAreaOpenClick,
                    "segmentation": {
                      appId: window.appId,
                    }
                  });


                  this.$router.push({name: this.$RM.Main, params: {selected: '借款'}})
                }.bind(this));
            } else {
              //未开展业务
              this.$toast('对不起，该烟草证所在区域暂未开展业务，敬请等待！')
              Countly.init({
                app_key: this.$Constants.APPKEY,
                url: this.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: this.$Constants.queryAreaClick,
                "segmentation": {
                  appId: window.appId,
                }
              });

            }
          }
        }.bind(this), function (err) {
        }.bind(this))
//        if( this.$toast('对不起，该烟草证所在区域暂未开展业务，敬请等待！')){
//          if( appId === window.appId) {
//            Countly.init({
//              app_key: "fac364a78f023a9e1d95e7a3d9be08a53144831b",
//              url: "http://10.0.18.37:32768", //your server goes here
//              debug: true,
//
//            })
//            Countly.track_sessions();
//            Countly.track_pageview();
//            Countly.add_event({
//              key: "queryAreaClick",
//              "segmentation": {
//                appId: window.appId,
//              }
//            });
//          }
//
//        }
      }

    }
  }
</script>
<style scoped>
  .QueryBusinessArea {
    background: #f5f5f5;
    height: 100%;
  }

  .page_rest {
    padding: 0 30px;
  }

  .tips {
    padding: 20px 30px;
    background: #f5f5f5;
    font-size: 30px;
    color: #999999;
    line-height: 44px;
    text-shadow: 0 1px 0 #ffffff;
    text-align: left;
  }

  .edit_bg {
    background: #ffffff;
    display: flex;
    height: 100px;
    flex-direction: row;
    align-items: center;
    padding-left: 30px;
  }

  .edit_name {
    font-size: 30px;
    color: #666666;
    letter-spacing: 0;
    text-align: justify;
    line-height: 42px;
  }

  .edit_text {
    padding-left: 10px;
    font-size: 30px;
    color: #999999;
    letter-spacing: 0;
    outline: none;
    line-height: 42px;
    text-align: left;
    flex-grow: 1;
    border: 0;
    background: none;
  }
</style>
