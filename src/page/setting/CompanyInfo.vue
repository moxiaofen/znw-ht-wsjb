<template>
  <div class="por">
    <van-nav-bar
      class="bar"
      title="企业信息"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">      
      <!--企业资料-->
      <p class="cont-item">企业资料</p>
      <div>
          <!--本次企业名称-->
          <div class='top'>
            <span class='inputLable'>企业名称</span>
            <input class='inputVal' type="text" ref="rCustName" v-model="vCustName" placeholder="请输入企业名称" readonly='true' />
          </div>
          <!-- 统一社会信用代码 -->
          <div class='top'>
            <span class='inputLable'>统一社会信用代码</span>
            <input class='inputVal' type="text" ref="rIdNo" v-model="vIdNo" placeholder="请输入统一社会信用代码" readonly='true' />
          </div>
      </div>
      <!--身份资料-->
      <p class="cont-item">企业基本信息</p>
      <div>
          <div class='top'>
            <span class='inputLable'>企业性质</span>
            <van-dropdown-menu active-color="#FFC600" class="dropdown">
              <van-dropdown-item v-model="vCompanyNature" :options="companyNatureOpt" :readonly='readonly'/>
            </van-dropdown-menu>
          </div>
          <div class='top'>
            <span class='inputLable'>注册资本（万元）</span>
            <input class='inputVal' type="text" ref="rRegisteredCapital" v-model="vRegisteredCapital" placeholder="请输入注册资本（万元）"  :readonly='readonly'/>
          </div>

          <!--成立日期-->
          <div class='top'>
            <span class='common' >成立日期</span>
            <!-- <span class='item-right' v-show='resDataFlag'>{{resData.startDate}}</span>
            <span v-show='!resDataFlag'  class='inputVal' @click="show1 = true" >{{startDate}}</span> -->
             <span class='inputVal' @click="show1 = true" >{{vStartDate}}</span>
              <van-calendar v-model="show1" @confirm="onConfirm"  :show-confirm="false"/>
          </div>

          <div class='top'>
            <span class='inputLable'>联系人</span>
            <input class='inputVal' type="text" ref="rContact" v-model="vContact" placeholder="请输入联系人"  :readonly='readonly'/>

            <!-- <span class='item-right' v-show='resDataFlag'>{{resData.contact}}</span>
            <input  v-show='!resDataFlag'  class='inputVal' type="text" ref="rContact" v-model="vContact" placeholder="请输入联系人" /> -->
          </div>

          <div class='top'>
            <span class='inputLable'>电话</span>
            <input class='inputVal' type="text" ref="rTel" v-model="vTel" placeholder="请输入电话"  :readonly='readonly'/>
            <!-- <span class='item-right' v-show='resDataFlag'>{{resData.tel}}</span>            
            <input v-show='!resDataFlag'  class='inputVal' type="text" ref="rTel" v-model="vTel" placeholder="请输入电话" /> -->
          </div>

          <div class='top'>
            <span class='inputLable'>经营地址</span>
            <input class='inputVal' type="text" ref="rBusinessAddress" v-model="vBusinessAddress" placeholder="请输入经营地址"  :readonly='readonly'/>

            <!-- <span class='item-right' v-show='resDataFlag'>{{resData.businessAddress}}</span>            
            <input v-show='!resDataFlag'  class='inputVal' type="text" ref="rBusinessAddress" v-model="vBusinessAddress" placeholder="请输入经营地址" /> -->
          </div>       

          <div class='top'>
            <span class='inputLable'>联系人手机号码</span>
            <input class='inputVal' type="text" ref="rContactPhoneNo" v-model="vContactPhoneNo" placeholder="请输入联系人手机号码" :readonly='readonly'/>

            <!-- <span class='item-right' v-show='resDataFlag'>{{resData.contactPhoneNo}}</span>            
            <input v-show='!resDataFlag'  class='inputVal' type="text" ref="rContactPhoneNo" v-model="vContactPhoneNo" placeholder="请输入联系人手机号码" /> -->
          </div>

          <div class='top'>
            <span class='inputLable'>备注</span>
            <textarea  class='inputVal' name="" id="" cols="30" rows="3" ref="rRemark" v-model="vRemark" placeholder="请输入备注" :readonly='readonly'></textarea>

            <!-- <span class='item-right' v-show='resDataFlag'>{{resData.remark}}</span>
            <textarea  v-show='!resDataFlag'  class='inputVal' name="" id="" cols="30" rows="3" ref="rRemark" v-model="vRemark" placeholder="请输入备注"></textarea> -->
          </div>    
      </div>
    </div>
    <div class="btn-cont">
        <a class="btn btnEnable mr15" href="javascript:void(0);" @click="changeCompanyInfo">修改</a>
        <a class="btn btnEnable" href="javascript:void(0);"  @click="updateCompanyInfo" >提交</a>       
    </div>

  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  import LoginButton from '@/components/LoginButton.vue'
  export default {
    name: "identity",
    components: {
      ToolBar,
      Divider,
      LoginButton
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        readonly: false,
        //enable: false, //立即注册 按钮默认不可用

        //authType: 0, // 认证类型
        //companyType: 0, // 企业证件类型
        companyNatureOpt: [
          {
            text: '个人客户',
            value: '00'
          },
          {
            text: '企业客户',
            value: '01'
          },
          {
            text: '个人客户2',
            value: '02'
          },
          {
            text: '个人客户3',
            value: '03'
          },
          {
            text: '个人客户4',
            value: '04'
          },
          {
            text: '个人客户5',
            value: '05'
          },
        ],  
        resData:{},//企业信息查询的数据
        resDataFlag:true,
        enable: true,
        vCustName:'',
        vIdNo:'',
        vCompanyNature: '01',
        //startDate:'请选择',
        vStartDate:'',
        show1: false,
        vRegisteredCapital	:'',
        vContact	:'',
        vTel	:'',
        vBusinessAddress	:'',
        vContactPhoneNo	:'',
        vRemark	:'',

      }
    },
    mounted(){
        this.getCompanyInfo()
    },
    methods: {
      //获取企业信息
      getCompanyInfo(){
          const url = this.$api.ROOT + this.$Constants.GET_COMPANY_INFO;
          const data = {
              "custNo": 'C000250'
          }
          this.$http.post(url,data)//operType操作类型0.注册，1.登陆
            .then(function (res) {
             console.log(res);
             this.resData = JSON.parse(res.data)
             console.log(this.resData);
             //this.resDataFlag = true;          
             this.vCustName = this.resData.custName
             this.vIdNo = this.resData.idNo
             this.vCompanyNature = this.resData.companyNature 
             this.vStartDate = this.formatDay2( this.resData.startDate )
             this.vRegisteredCapital	= this.resData.registeredCapital
             this.vContact	= this.resData.contact
             this.vTel	= this.resData.tel
             this.vBusinessAddress	= this.resData.businessAddress
             this.vContactPhoneNo	= this.resData.contactPhoneNo
             this.vRemark	= this.resData.remark
             this.readonly = true;//获取企业信息时为仅读
          })
          .catch(function () {
             this.$indicator.close();
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });
      },
      //点击修改
      changeCompanyInfo(){
          this.readonly = false;
      },
      //清除输入框数据
      clear(str) {       
          this[str] = '';  
      },
      //插件获取时间格式化时间
      formatDate(date) {
        var month = date.getMonth() + 1
        if(month<10){
          month =''+'0'+month
        }
        this.dateTime=`${date.getFullYear()}${month}${date.getDate()}`
        console.log(this.dateTime)
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      },
      //插件确定时间
      onConfirm(date) {
        this.show1 = false;
        this.vStartDate = this.formatDate(date);

      },
      //回填数据格式化时间
      formatDay2(num){
        if(num){
            return `${num.slice(0,4)}年${parseInt(num.slice(4,6))}月${parseInt(num.slice(6,8))}日`;
        }
      },
      //转格式化时间
      formatDay3(num){
        if(num){
            var mouth = parseInt(num.slice(5,7))
            mouth = (mouth<10)?`0${mouth}`: mouth
            var day = parseInt(num.split('月')[1])
            day = (day<10)?`0${day}`: day
            return `${num.slice(0,4)}${mouth}${day}`;
        }
      },
      //点击提交数据
      updateCompanyInfo(){
          const url = this.$api.ROOT + this.$Constants.UPDATE_COMPANY_INFO;
          const data = {
            custNo : sessionStorage.getItem('custNo'),
            companyNature : this.vCompanyNature ,
            startDate : this.formatDay3(this.vStartDate)  ,
            registeredCapital : this.vRegisteredCapital	,
            contact : this.vContact	,
            tel : this.vTel	,
            businessAddress : this.vBusinessAddress	,
            contactPhoneNo : this.vContactPhoneNo	,
            remark : this.vRemark	
          }
          console.log(data)
          this.$http.post(url,{'companyInfo':data})//operType操作类型0.注册，1.登陆
            .then(function (res) {
             console.log(res);
             const resData = JSON.parse(res.data); 
            if (resData.respCode === '000000') {

                this.$indicator.close();
                console.info("企业信息修改成功>>>>");
                this.$router.go(-1)
              } else {
                this.$indicator.close();
                this.$toast(resData.respMsg);
                console.warn("企业信息修改失败!!!")
             }
            })
          .catch(function () {
             this.$indicator.close();
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          });


      }

    },
  

  }
</script>

<style scoped>
@import "../../css/common";
  .content {
    margin-top: 46px;
    position: relative;
    padding-bottom: 70px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }


  .item-right{
        line-height: 49px;
  }
  /* .content {
    margin-top: 100px;
    position: relative;
    padding-bottom: 30px;
  }

  .item {
    padding: 16px;
    background-color: #FFC600;
    display: flex;
    text-align: center;
    flex-direction: column;
  }

  .item-box-dev {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
  }


  .item-line1 {
    letter-spacing: 2px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2 {
    letter-spacing: 2px;
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2-div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .item-title {
    font-size: 34px;
    color: #ffffff;

  }

  .item-title2 {
    font-size: 35px;
    color: #ffffff;
  }

  .item-title3 {
    font-size: 35px;
    color: #ffffff;
  }

  .contract-name {
    color: #ffffff;
    font-weight: bolder;
    margin-left: 30px;
    font-size: 42px;
  }

  .contract-no {
    color: #ffffff;
    font-size: 28px;
  }

  .contract-amount {
    font-size: 30px;
    margin-left: 16px;
    color: #ffffff;
  }

  .top {
    display: flex;
    flex-direction: row;
    margin-left: 32px;
    margin-right: 32px;
    justify-content: space-between;
    position: relative;
  }

  .dropdown {
    padding: 35px 0 20px;
  }



  .number {
    position: absolute;
    right: 0;
  }

  .inputLable {
    font-size: 0.4rem;
    line-height: 45px;
    border: none;
    padding: 35px 0 20px;
  }

  .inputVal {
    font-size: 0.4rem;
    line-height: 45px;
    border: none;
    padding: 35px 0 20px;
    text-align: right;
  }

  .common {
    font-size: 0.4rem;
    line-height: 45px;
    border: none;
    padding: 35px 0 20px;
  }

  .clearCss {
    width: 21px;
    height: 21px;
    position: absolute;
    right: 0px;
    top: 48px;
  }
  .add-img {
    width: 50px;
    height: 50px;
    margin-top: 30px;
  }


  .receivables-lib {
    margin-top: 10px;
  }

  .img-type {
    width: 80px;
    height: 80px;
  }

  .item-receivables-line1 {
    letter-spacing: 2px;
    color: #c9c9c9;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-receivables-line2 {
    display: flex;
  }

  .item-receivables-line3 {
    display: flex;
    margin-top: 10px;
  }

  .receivables-name {
    color: #1f1f1f;
    margin-left: 32px;
    font-size: 36px;
  }

  .receivables-no {
    color: #969696;
    font-size: 24px;
  }



  .receivables-data {
    margin-left: 32px;
    color: #343434;
    font-size: 26px;
  }

  .receivables-amount {
    font-size: 38px;
    margin-left: 32px;
    color: #ff0000;
  } */


/* 新增 */
/* .select-left{
   width: 160px;
   display: inline-block;
}
.select-item{
   font-size: 25px;
   padding:10px;
} */




 .btn-cont{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    background: #fff;
 }
 .btn{
    padding: 12px;
    border-radius: 50px;
    width: 100%;
    text-align: center;
    font-size: 15px;
    color: #fff1e8;
 }
 .btnEnable {
    background-color: rgba(255, 198, 0, 1);
    text-shadow: 0 0.01333rem 0 #ff6400;
}
.mr15{
    margin-right: 15px;
}



</style>
