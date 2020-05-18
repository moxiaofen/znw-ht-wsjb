<template>
<div>
  <van-nav-bar
    class="bar"
    title="身份认证"
    left-arrow
    fixed
    border='false'
    @click-left="$router.back(-1)"
  />
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
              placeholder="请输入企业证件号码"/>
      <img class='clearCss' v-show="vCustIdNo" @click="clear('vCustIdNo')" src="../../assets/clear.png"/>
    </div>

    <!--与顶部保持距离-->
    <div class='top'>
      <span class='inputLable'><i v-if='vAuthType=="01"'>法人</i>姓名</span>
      <input  class='inputVal' type="text" ref="rName" v-model="vName"
              placeholder="请输入姓名"/>
      <img class='clearCss' v-show="vName" @click="clear('vName')" src="../../assets/clear.png"/>
    </div>
   
    <div class='top top-dropdown'>
      <van-dropdown-menu active-color="#FFC600" class="dropdownId">
        <van-dropdown-item v-model="vIdType" :options="idTypeOpt" />
      </van-dropdown-menu>
      <input  class='inputVal' type="text" ref="rIdNo" v-model="vIdNo"
              placeholder="请输入对应的证件号码"/>
      <img class='clearCss' v-show="vIdNo" @click="clear('vIdNo')" src="../../assets/clear.png"/>
    </div>

    <!--与顶部保持距离-->
    <div class='top'>
      <span class='inputLable'>手机号</span>
      <input  class='inputVal' type="tel" ref="rTel" v-model="vTel"
              placeholder="请输入手机号"/>
      <img class='clearCss' v-show="vTel" @click="clear('vTel')" src="../../assets/clear.png"/>
    </div>

    <!--与顶部保持距离-->
    <div class='top'  v-if="!cust">
      <span class='inputLable'>邮箱</span>
      <input  class='inputVal' type="email" ref="rEmail" v-model="vEmail"
              placeholder="请输入邮箱"/>
      <img class='clearCss' v-show="vEmail" @click="clear('vEmail')" src="../../assets/clear.png"/>
    </div>

    <!--与顶部保持距离-->
    <div class='top' v-if="!cust">
      <span class='inputLable'>银行卡账号</span>
      <input  class='inputVal' type="text" ref="rBankCardNo" v-model="vBankCardNo"
              placeholder="请输入银行卡账号" />
      <img class='clearCss' v-show="vBankCardNo" @click="clear('vBankCardNo')" src="../../assets/clear.png"/>
    </div>

    <!--与顶部保持距离-->
    <div class='top' v-if="!cust">
      <span class='inputLable'>办卡时的手机号</span>
      <input  class='inputVal' type="text" ref="rBankCardPhone" v-model="vBankCardPhone"
              placeholder="请输入办卡时的手机号"/>
      <img class='clearCss' v-show="vBankCardPhone" @click="clear('vBankCardPhone')" src="../../assets/clear.png"/>
    </div>

    <!-- 引入组件 -->
    <new-affix :itemShow='cust' :optDate='dataTypeOpt' :dataFileList='dataFileLists'></new-affix>

    <!-- 个人认证图片上传 -->
    <ul class="photoBox"  v-if="!cust">
      <li class="item photo-item">
        <img class="img-photo" ref='img1' alt="handleFile" :src="src1" />
        <p>身份证正面</p>
      </li>
      <li class="item photo-item">
        <img class="img-photo" ref='img2' alt="handleFile" :src="src2" />
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
  import LoginButton from '@/components/LoginButton.vue'
  import NewAffix from '../components/new-affix'
    export default {
        name: "identity",
        components: {
          Checkbox,
          LoginButton,
          NewAffix
        },
        computed: {},
        data() {
            return {
              nonet: false,//断网
              enable: false,//立即注册 按钮默认不可用
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
              //stepFlag:0,//测试
              id:'',//判断是否已经调身份认证接口的flag
            }
        },
        mounted(){
            if(!sessionStorage.getItem('custNo')){
              this.$toast('请先登录');          
              return
            }
            this.enable = true
            //route加上id判断是不是已经调用了身份认证的接口，id=0即已经调用了身份认证
            this.id = this.$route.query.id;
            if(this.id==0){
                this.getAuthResult()
            }else{
                this.faceIdAuthenty()
            }

        },
        methods: {
          //人脸识别1
          faceIdAuthenty(){
              const baseUrl = window.location.href
              const data={
                "custNo":sessionStorage.getItem('custNo'),
                //"custNo":'C000289',
                "ruleId":"2",
                "redirectUrl":`${baseUrl}?id=0`,
                "region": "ap-shenzhen-fsi"
                };
              this.custNo = sessionStorage.getItem('custNo')
              const url = this.$api.ROOT +this.$Constants.FACE_IDENTIFY
              this.$indicator.open("请稍候...");   
              this.$http.post(url, data)
                .then(function (res) {                
                  const resDate =JSON.parse(res.data) ; 
                  //console.log(resDate)
                  if (resDate.respCode == '000000') {
                    this.$indicator.close();
                    //console.info("人脸识别信息成功...");
                    window.location.href=resDate[`${this.custNo}_url`]
                  }
                  else {
                    this.$indicator.close();
                    //console.warn("人脸识别信息失败!!!");
                    this.$toast(resDate.respMsg);
                  }
                })
                .catch(function (error) {
                  this.$indicator.close();
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
                });
              
          },
          //人脸识别2--获取认证的信息
          getAuthResult(){
            console.log(2)
              const data={
                "custNo":sessionStorage.getItem('custNo'),
                "ruleId":"2",
                "type": "TENCENT_POLICE_AUTHORITY",
                "infoType": "0"
                };
              this.custNo = sessionStorage.getItem('custNo')
              const url = this.$api.ROOT +this.$Constants.GET_AUTH_RESULT
              this.$indicator.open("请稍候...");  
              this.$http.post(url, data)
                .then(function (res) {
                  const resDate =JSON.parse(res.data) ; 
                  //console.log(resDate)
                  if (resDate.respCode == '000000') {
                    this.$indicator.close();
                    //console.info("获取返回信息成功...");
                    this.vName=resDate.data.ocrName;
                    this.vIdNo=resDate.data.idCard;

                    this.src1 = `data:image/jpg;base64,${resDate.data.ocrIdCardFront}` 
                    this.src2 = `data:image/jpg;base64,${resDate.data.ocrIdCardBack}` 
                    //this.src2 = resDate.data.ocrIdCardBack


                  }
                  else {
                    this.$indicator.close();
                    //console.warn("获取返回信息失败!!!");
                    this.$toast(resDate.respMsg);
                  }
                })
                .catch(function (error) {
                  this.$indicator.close();
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
                });
              
          },
          //跳转身份认证的免责说明
          toProcol(){
            this.$router.push({path: this.$RM.IdentityProtocol})
          },
          //清除输入框数据
          clear (str) {
            this[str] = ''
          },
          //选择客户验证或者个人验证
          authTypeChange(value){
              //value值为01，不显示企业认证
              this.cust = value=="02"? false : true;
          },

          //协议勾选状态判断
          onCheckChange: function (val) {
            this.check = val
            //console.info("勾选框的状态>>>" + this.check)
          },
          //提交
          submitId(){
              if (!this.check) {
                this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.CHECKBOXSTU_IDENTITY_ERROR);
                return
              }
              if(!this.vName){
                  this.$toast('姓名不能为空');
                  return
              }
              // //数据校验
              //身份认证
              if(this.vIdType == '01'){
                 if (!this.$utils.checkIdcard(this.vIdNo)) {
                    this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201021);
                    return 
                 } 
              }else if(this.vIdType == '02'){
                 if (!this.$utils.checkPassportNo(this.vIdNo)) {
                    this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201022);
                    return 
                 } 
              }else if(this.vIdType == '03'){
                 if (!this.$utils.checkHKMPassNo(this.vIdNo)) {
                    this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201023);
                    return 
                 } 
              }  
              //手机号认证   
              if (!this.$utils.checkPhone(this.vTel)) {
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
                  return 
              }              
              this.handleFileList ='';
              if(this.vAuthType == '02' ){
                  //个人验证 bankCardNo bankCardPhone email
                  if (!this.$utils.checkPhone(this.vBankCardPhone)) {
                      this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201017);
                      return false
                  }  
                  //放开邮箱认证
                  // if (!this.$utils.checkEmail(this.vEmail)) {
                  //     this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201019);
                  //     return 
                  // } 
                  if (!this.$utils.checkBankCardNo(this.vBankCardNo)) {
                      this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201020);
                      return 
                  }            
                  this.handleFileList = [
                    {
                      dataType : '01' ,
                      fileName :'身份证正面' ,
                      fileDesc :'身份证正面' ,
                      fileInput :this.src1.split(",")
                    },
                    {
                      dataType : '02' ,
                      fileName :'身份证反面' ,
                      fileDesc :'身份证反面' ,
                      fileInput :this.src2.split(",")
                    }, 
                  ]

              }else{
                  if(!this.vCustName){
                      this.$toast('客户企业名称不能为空');
                      return
                  }
                  //企业验证custName custIdType custIdNo
                  if(this.vCustIdType == '01'){
                    if (!this.$utils.checkUSCC(this.vCustIdNo)) {
                        this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201024);
                        return 
                    }
                  }else if(this.vCustIdType == '02'){
                    if (!this.$utils.checkCOC(this.vCustIdNo)) {
                        this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201025);
                        return 
                    } 
                  }   
                  if(this.dataFileLists.length<1){
                      this.$toast('附件信息不能为空');
                      return
                  }
                  this.handleFileList = this.dataFileLists ;                 
              }
              const userId = sessionStorage.getItem('userId')
              //console.log(userId)
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
              this.enable = false ; //设置按钮不可用，防止重复点击
              const url = this.$api.ROOT +this.$Constants.APP_IDCHECKAPPLY;
              this.$indicator.open("请稍候...");   
              this.$http.post(url, data)
                .then(function (res) {
                  //console.log(res);
                  const resDate = res.data ; 
                  if (resDate.respCode == '000000') {
                    this.$toast('身份认证成功!');
                    this.$indicator.close();
                    this.enable = true
                    //console.info("身份认证成功...");
                    this.$router.replace({
                      path: this.$RM.Navigation,       
                    })
                  }
                  else {
                    this.$indicator.close();
                    //console.warn("身份认证失败!!!");
                    this.$toast(resDate.respMsg);
                    this.enable = true;
                  }
                })
                .catch(function (error) {
                  this.$indicator.close();
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
                  this.enable = true;
                });            
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
