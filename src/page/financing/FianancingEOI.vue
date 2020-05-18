<template>
  <div>
    <van-nav-bar
      class="bar"
      title="融资意向申请"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">

      <!--本次企业名称-->
      <div class='top'>
        <span class='inputLable'>企业名称</span>
        <input class='inputVal' type="text" ref="rCustName" v-model="vCustName" placeholder="请输入企业名称" />
        <img class='clearCss' v-show="vCustName" @click="clear('vCustName')" src="../../assets/clear.png" />
      </div>

      <div class='top'>
        <span class='common'>证件类型</span>
        <van-dropdown-menu active-color="#FFC600" class="dropdown">
          <van-dropdown-item v-model="vIdType" :options="idTypeOpt" />
        </van-dropdown-menu>
      </div>

      <!--证件号码-->
      <div class='top'>
        <span class='inputLable'>证件号码</span>
        <input class='inputVal' type="text" ref="rIdNo" v-model="vIdNo" placeholder="请输入证件号码" />
        <img class='clearCss' v-show="vIdNo" @click="clear('vIdNo')" src="../../assets/clear.png" />
      </div>

      <!--联系人-->
      <div class='top'>
        <span class='inputLable'>联系人</span>
        <input class='inputVal' type="text" ref="rContact" v-model="vContact" placeholder="请输入联系人" />
        <img class='clearCss' v-show="vContact" @click="clear('vContact')" src="../../assets/clear.png" />
      </div>

      <!--联系人电话-->
      <div class='top'>
        <span class='inputLable'>手机号码</span>
        <input class='inputVal' type="text" ref="rContactPhoneNo" v-model="vContactPhoneNo" placeholder="请输入手机号码" />
        <img class='clearCss' v-show="vContactPhoneNo" @click="clear('vContactPhoneNo')" src="../../assets/clear.png" />
      </div>

      <!--多选框-->
      <div class='top'>        
          <div><span class='inputLable select-left'>意向产品</span></div>
          <van-checkbox-group v-model="vCheckboxGroup" direction="horizontal" class="select-right">
            <van-checkbox :name="index" shape="square"  v-for="(item,index) in checkboxList" class="select-item" :key="item.id" >{{item.title}}</van-checkbox>
          </van-checkbox-group>    
      </div>

      <div class="btn-box">
        <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="toNext" borderRadius="6px"></LoginButton>
      </div>
      
    </div>
  </div>
</template>

<script>
  import LoginButton from '@/components/LoginButton.vue'
  export default {
    name: "FianancingEOI",
    components: {
      LoginButton
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        //enable: false, //立即注册 按钮默认不可用
        enable: true,
        vCustName:'',
        vIdType: 0,
        vIdNo:'',
        vContact:'',
        vContactPhoneNo:'',
        vCheckboxGroup:[],
        idTypeOpt: [
          {
            text: '个人客户',
            value: 0
          },
          {
            text: '企业客户',
            value: 1
          }
        ],
        checkbox: false,
        vcheckboxGroup: [],
        checkboxList:[
          {
            id : 1,
            title : '电子签约产品测试'
          },
          {
            id : 2,
            title : '全保理产品'
          },
          {
            id : 3,
            title : '林产票据'
          },
          {
            id : 4,
            title : '易安正向定保理01'
          },
          {
            id : 5,
            title : '产品流程测试'
          },
          {
            id : 6,
            title : '反向票据保理业务1号'
          },
          {
            id : 7,
            title : '反向定保有追1号'
          },
          {
            id : 8,
            title : '孟测试产品'
          },
          {
            id : 9,
            title : '测试用正向定保理'
          },
          {
            id : 10,
            title : '核心企业大客户'
          },
          {
            id : 11,
            title : '反向池保理'
          },
          {
            id : 12,
            title : '宜华票据保理1号模型'
          },
          {
            id : 13,
            title : '易安保理正向保理'
          },
          {
            id : 14,
            title : '正向池保理'
          },
          {
            id : 15,
            title : '恒大票据保理'
          },
          {
            id : 16,
            title : '票据保理'
          }
        ]
      }
    },
    mounted(){
    },
    methods: {
      //清除输入框数据
      clear(str) {       
          this[str] = '';  
      },
      //点击提交数据
      toNext(){
          // 如果为空，弹出提示框，返回。
          if (this.$StringUtils.isEmpty(this.vCustName)) {
              this.$toast('请输入企业名称');
              return
          }
          if (this.$StringUtils.isEmpty(this.vIdNo)) {
              this.$toast('请输入证件号码');
              return
          }
          if (this.$StringUtils.isEmpty(this.vContact)) {
              this.$toast('请输入联系人');
              return
          }
          //手机号认证
          if (!this.$utils.checkPhone(this.vContactPhoneNo)) {
              this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              return 
          }  
          if (this.$StringUtils.isEmpty(this.vCheckboxGroup)) {
              this.$toast('请选择意向产品');
              return
          }
          //上传数据
          const url = this.$api.ROOT + this.$Constants.APP_FINANCING_EOI;
          const data = {
              "custName" : this.vCustName,
              "idType" : this.vIdType,
              "idNo" : this.vIdNo,              
              "contact" : this.vContact,              
              "contactPhoneNo" : this.vContactPhoneNo,
              "projectNos" : this.vCheckboxGroup              
          };
          //console.log(this.vIdType)
          this.$http.post(url,{"fncInttApply":data})
          .then(function (res) {
              if (JSON.parse(res.data).respCode === '000000') {
                  this.$indicator.close();
                  this.$toast("申请成功");
                  this.$router.go(-1)
              } else {
                  this.$indicator.close();
                  this.$toast(res.data.msg);
                  //console.warn("登陆失败!!!")
              }
          })
          .catch(function () {
             //console.log('error')
             this.$indicator.close();
             this.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
      }
    },
    
  }
</script>

<style scoped>
@import "../../css/common";
.content {
    margin-top:46px;
    position: relative;
    padding-bottom: 15px;
    background-color: #fff;
  }
.select-left{
   width: 80px;
   display: inline-block;
}
.select-item{
   font-size: 12px;
   padding:5px;
}
.select-item .van-checkbox__icon .van-icon{
  width: 15px;
  height: 15px;
}
  .btn-box{
    padding:0 10px 10px;
  }
</style>
