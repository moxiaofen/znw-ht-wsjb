<template>
<div>
  <ToolBar page_title="身份认证" :isWhile="false"> </ToolBar>

  <div class="content" >

    <div class='top'>
      <span class='common'>认证类型</span>
      <van-dropdown-menu active-color="#FFC600" class="dropdown" >
        <van-dropdown-item v-model="vAuthType" :options="authTypeOpt" @change="authTypeChange"/>
      </van-dropdown-menu>
    </div>

    <p class="cont-item">基本信息</p>

    <!--与顶部保持距离-->
    <div class='top' v-if="cust">
      <span class='inputLable'>客户企业名称</span>
      <input  class='inputVal' type="text" ref="rCustName" v-model="vCustName"
              placeholder="请输入客户企业名称"/>
      <img class='clearCss' v-show="vCustName" @click="clear('vCustName')" src="../../assets/clear.png"/>
    </div>

    <div class='top' v-if="cust">
      <span class='common'>企业证件类型</span>
      <van-dropdown-menu active-color="#FFC600" class="dropdown">
        <van-dropdown-item v-model="vCustIdType" :options="custIdTypeOpt" />
      </van-dropdown-menu>
    </div>

    <!--与顶部保持距离-->
    <div class='top' v-if="cust">
      <span class='inputLable'>企业证件号码</span>
      <input  class='inputVal' type="text" ref="rCustIdNo" v-model="vCustIdNo"
              placeholder="请输入企业证件号码" @change="checkCustIdNo('vCustIdNo')" />
      <img class='clearCss' v-show="vCustIdNo" @click="clear('vCustIdNo')" src="../../assets/clear.png"/>
    </div>

    <!--与顶部保持距离-->
    <div class='top'>
      <span class='inputLable'>姓名</span>
      <input  class='inputVal' type="text" ref="rName" v-model="vName"
              placeholder="请输入姓名"/>
      <img class='clearCss' v-show="vName" @click="clear('vName')" src="../../assets/clear.png"/>
    </div>
   
    <div class='top top-dropdown'>
      <van-dropdown-menu active-color="#FFC600" class="dropdownId">
        <van-dropdown-item v-model="vIdType" :options="idTypeOpt" />
      </van-dropdown-menu>
      <input  class='inputVal' type="text" ref="rIdNo" v-model="vIdNo"
              placeholder="请输入对应的证件号码" @change="checkIdNo('vIdNo')"/>
      <img class='clearCss' v-show="vIdNo" @click="clear('vIdNo')" src="../../assets/clear.png"/>
    </div>

    <!--与顶部保持距离-->
    <div class='top'>
      <span class='inputLable'>手机号</span>
      <input  class='inputVal' type="tel" ref="rTel" v-model="vTel"
              placeholder="请输入手机号" @change="checkPhone('vTel')"/>
      <img class='clearCss' v-show="vTel" @click="clear('vTel')" src="../../assets/clear.png"/>
    </div>

    <!--与顶部保持距离-->
    <div class='top'  v-if="!cust">
      <span class='inputLable'>邮箱</span>
      <input  class='inputVal' type="email" ref="rEmail" v-model="vEmail"
              placeholder="请输入邮箱" @change="checkEmail"/>
      <img class='clearCss' v-show="vEmail" @click="clear('vEmail')" src="../../assets/clear.png"/>
    </div>

    <!--与顶部保持距离-->
    <div class='top' v-if="!cust">
      <span class='inputLable'>银行卡账号</span>
      <input  class='inputVal' type="text" ref="rBankCardNo" v-model="vBankCardNo"
              placeholder="请输入银行卡账号"  @change="checkBankCardNo"/>
      <img class='clearCss' v-show="vBankCardNo" @click="clear('vBankCardNo')" src="../../assets/clear.png"/>
    </div>

    <!--与顶部保持距离-->
    <div class='top' v-if="!cust">
      <span class='inputLable'>办卡时的手机号</span>
      <input  class='inputVal' type="text" ref="rBankCardPhone" v-model="vBankCardPhone"
              placeholder="请输入办卡时的手机号" @change="checkPhone('vBankCardPhone')"/>
      <img class='clearCss' v-show="vBankCardPhone" @click="clear('vBankCardPhone')" src="../../assets/clear.png"/>
    </div>

    <!-- 引入组件 -->
    <new-affix :itemShow='cust' :optDate='dataTypeOpt' :dataFileList='dataFileLists'></new-affix>

    <!-- 个人认证图片上传 -->
    <ul class="photoBox"  v-if="!cust">
      <li class="item photo-item">
        <img class="img-photo" ref='img1' alt="handleFile" :src="src1" />
        <input type="file" accept="image/*" class="img-input" ref="inputImg1" @change="handleFileId('inputImg1')">
        <p>身份证正面</p>
      </li>
      <li class="item photo-item">
        <img class="img-photo" ref='img2' alt="handleFile" :src="src2" />
        <input type="file" accept="image/*" class="img-input" ref="inputImg2" @change="handleFileId('inputImg2')">
        <p>身份证反面</p>
      </li>
    </ul>

    <div class='protocol'>
      <!--导入复选框组件-->
      <Checkbox class="checkbox" @onCheckChange="onCheckChange"></Checkbox>
      <div class='tips'>请阅读并同意<span @click="toProcol" style="color:#FFC600">《免责说明》</span></div>
    </div>

    <div class="btn-box">
        <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="submitId" borderRadius="6px"></LoginButton>
    </div>

  </div>
</div>
</template>

<script>
  import Checkbox from '@/components/Checkbox'
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  import LoginButton from '@/components/LoginButton.vue'

  import NewAffix from '../components/new-affix'

    export default {
        name: "identity",
        components: {
          Checkbox,
          ToolBar,
          Divider,
          LoginButton,
          NewAffix
        },
        computed: {},


        data() {
            return {
              nonet: false,//断网
              enable: true,//立即注册 按钮默认不可用
              check: false,//勾选请阅读并同意《免责说明》
              vAuthType: '02',
              authTypeOpt: [
                { text: '个人客户', value: "02" },
                { text: '企业客户', value: "01" }
              ],
              vCustName : '',
              vCustIdType : '01',
              custIdTypeOpt : [
                  { text: '统一社会信用代码', value: "01" },
                  { text: '组织机构代码', value: "02" }
              ],
              vCustIdNo : '',
              vLegalName : '',
              vIdType :'01',
              idTypeOpt : [
                  { text: '身份证', value: "01" },
                  { text: '护照', value: "02" },
                  { text: '港澳通行证', value: "03" }
              ],
              vIdNo : '',
              vTel : '',
              vBankCardNo : '',
              vBankCardPhone :'',
              vEmail :'',
              cust : false, //客户认证
              //src: 'https://img.yzcdn.cn/vant/cat.jpeg',
              src1: require('../../assets/upload_photo.png'),
              src2: require('../../assets/upload_photo.png'),
              
              show: false,//测试时为true

              //vDataType : "01",//资料类型
              dataTypeOpt:[
                {
                  text: '营业执照',
                  value: "01"
                },
                {
                  text: '法人身份证明',
                  value: "02"
                },
                {
                  text: '开户许可证',
                  value: "03"
                },
                {
                  text: '护照',
                  value: "04"
                },
                {
                  text: '其他',
                  value: "05"
                }
              ],
              dataFileListId:[],
              //总参数
              handleFileList:[],
              dataFileLists:[],//附件参数

            }
        },
        methods: {
          //跳转到免责说明
          toProcol(){
            console.info("跳转身份认证的免责说明....")
            this.$router.push({path: this.$RM.IdentityProtocol})
          },
          //清除输入框数据
          clear (str) {
            this[str] = ''
          },
          //input校验
          //校验校验手机号码
          // checkPhone(tel) {
          //     if (!this.$utils.checkPhone(this[tel])) {
          //         this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
          //         return false
          //     }  
          //     return true
          // },
          // //校验邮箱
          // checkEmail(){           
          //     if (!this.$utils.checkEmail(this.vEmail)) {
          //         this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201019);
          //         return false
          //     } 
          //     return true
          // },
          // //校验银行卡号
          // checkBankCardNo(){           
          //     if (!this.$utils.checkBankCardNo(this.vBankCardNo)) {
          //         this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201020);
          //         return false
          //     }
          //     return true  
          // },

          // //校验个人证件号码
          // checkIdNo(vIdNo){  
          //     if(this.vIdType == '01'){
          //        if (!this.$utils.checkIdcard(this[vIdNo])) {
          //           this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201021);
          //           return false
          //        } 
          //        return true
          //     }else if(this.vIdType == '02'){
          //        if (!this.$utils.checkPassportNo(this[vIdNo])) {
          //           this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201022);
          //           return false
          //        } 
          //        return true
          //     }else if(this.vIdType == '03'){
          //        if (!this.$utils.checkHKMPassNo(this[vIdNo])) {
          //           this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201023);
          //           return false
          //        } 
          //        return true
          //     }     
          // },
          // //校验企业证件号码
          // checkCustIdNo(vCustIdNo){  
          //     if(this.vCustIdType == '01'){
          //        if (!this.$utils.checkUSCC(this[vCustIdNo])) {
          //           this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201024);
          //           return false
          //        }
          //        return true 
          //     }else if(this.vCustIdType == '02'){
          //        if (!this.$utils.checkCOC(this[vCustIdNo])) {
          //           this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201025);
          //           return false
          //       } 
          //       return true
          //     }     
          // },

          //选择客户验证或者个人验证
          authTypeChange(value){
              //value值为01，不显示企业认证
              this.cust = value=="02"? false : true;
              console.log(this.cust)
              //this.dataFileList ='';
          },
          //上传图片
          handleFileId(e) {
              var file;
              var rimg;
              var dataType;
              if(e=='inputImg1'){
                  file = this.$refs.inputImg1.files[0];
                  rimg =  this.$refs.img1;
                  dataType = "01"
              }else{
                  file = this.$refs.inputImg2.files[0];
                  rimg =  this.$refs.img2;
                  dataType = "02"
              }
              var imgcode ;
              var reader = new FileReader();
              reader.readAsDataURL(file);
              //处理loadend事件，该事件在读取操作结束时触发
              reader.onload = function (e) {
                      rimg.src = e.target.result;                   
              }
             var dataFileId = {
                dataType : dataType ,
                fileName :file.name ,
                fileDesc :'身份证' 
             }
             return dataFileId
          },
        
          //协议勾选状态判断
          onCheckChange: function (val) {
            this.check = val
            console.info("勾选框的状态>>>" + this.check)
          },
          //提交
          submitId(){

              //console.log('提交')
              // if (!this.check) {
              //   this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.CHECKBOXSTU_REGISTER_ERROR);
              //   return
              // }
              // if(!this.vName){
              //     this.$toast('姓名不能为空');
              //     return
              // }
              // //数据校验
              // if(!this.checkIdNo('vIdNo') || !this.checkPhone('vTel')){  
              //   console.log('检查1') 
              //   this.$toast('数据有误，请检查！');
              //   return 
              // }                 
              this.handleFileList ='';
              if(this.vAuthType == '02' ){
                  //个人验证 bankCardNo bankCardPhone email
                  // if(!this.checkPhone('vBankCardPhone') || !this.checkEmail() || !this.checkBankCardNo()){  
                  //   console.log('检查2')     
                  //   this.$toast('数据有误，请检查！');
                  //   return 
                  // } 
                  //个人客户验证时的dataFileList
                  //inputfile的base64字符串去掉','前的部分，不然传给后端的数据有误
                  this.dataFileListId[0] = this.handleFileId('inputImg1');
                  this.dataFileListId[0].fileInput = this.$refs.img1.src.split(",")
                  this.dataFileListId[1] = this.handleFileId('inputImg2');
                  this.dataFileListId[1].fileInput = this.$refs.img2.src.split(",")[1];
                  this.handleFileList = this.dataFileListId;
              }else{
                  // if(!this.vCustName){
                  //     this.$toast('客户企业名称不能为空');
                  //     return
                  // }
                  //企业验证custName custIdType custIdNo
                  // if(!this.checkCustIdNo('vCustIdNo')){  
                  //   console.log('检查3')    
                  //   this.$toast('数据有误，请检查！');
                  //   return 
                  // } 
                  this.handleFileList = this.dataFileLists ;                 
              }
              const userId = sessionStorage.getItem('userId')
              console.log(userId)
              //传过去的数据
              const data = {
                "userId": userId,
                //"userId": '20200325105006004300000000000377',
                "authType":this.vAuthType,
                "custName":this.vCustName,
                "custIdType":this.vCustIdType,
                "custIdNo":this.vCustIdNo,
                "name":this.vName,
                "idType":this.vIdType,
                "idNo":this.vIdNo,
                "tel":this.vTel,
                "bankCardNo":this.vBankCardNo,
                "bankCardPhone":this.vBankCardPhone,    
                "email":this.vEmail,
                "dataFileList" : this.handleFileList             
              }
              console.log(data)
              this.enable = false ; //设置按钮不可用，防止重复点击
              const url = this.$api.ROOT +this.$Constants.APP_IDCHECKAPPLY;
              this.$indicator.open("请稍候...");   
              this.$http.post(url, data)
                .then(function (res) {
                  console.log(res);
                  const resDate = res.data ; 
                  if (resDate.respCode == '000000') {
                    this.$indicator.close();
                    console.info("身份认证成功...");
                    this.$router.go(-1);
                  }
                  else {
                    this.$indicator.close();
                    console.warn("身份认证失败!!!");
                    this.$toast(resDate.respMsg);
                    this.enable = true;
                  }
                })
                .catch(function (error) {
                  this.$indicator.close();
                  console.error(error);
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
                  this.enable = true;
                });
              console.info('>>>>>>>>>>>>身份认证>>>>end>>>>>>>>')     
          },

        },

    }
</script>

<style scoped>
@import "../../css/common";

  .content {
    margin-top: 46px;
    position: relative;
  }
  .content input{
    text-align: right;
  }
  .photoBox {
    width: 100%;
    padding:15px 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #fff;
  }
  .photoBox .item span{
    font-size: 0.4rem;
    line-height: 40px;
  }

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    padding: 0 16px;

  }

  .protocol {
    display: flex;
    padding: 25px 0 0 15px;
    background-color: #fff;
  }

  .protocol .checkbox {
    width: 15px;
    height: 15px;
    margin-top: -0.05rem;
  }

  .protocol .tips {
    letter-spacing: 1px;
    color: #c9c9c9;
    font-size: 13px;
    line-height: 15px;
    margin-left: 10px;
  }


  .photo-item{
    position: relative;
    flex: 1;
    text-align: center;
  }
  .img-photo{
    width: 120px;
    height: 150px;
  }
  .img-input{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .btn-box{
    padding: 15px;
    background-color: #fff;
  }
   .btn-box .loginButton{
    margin-top:1px;
  }
  .top-dropdown{
    padding: 0 16px 0 6px;
  } 




</style>
