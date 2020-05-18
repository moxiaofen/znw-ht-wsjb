<template>
  <div>
    <ToolBar page_title="融资意向申请" :isWhile="false"> </ToolBar>

    <div class="content">

      <!--本次企业名称-->
      <div class='top'>
        <span class='inputLable'>企业名称</span>
        <input class='inputVal' type="text" ref="rCustName" v-model="vCustName" placeholder="请输入企业名称" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <div class='top'>
        <span class='common'>证件类型</span>
        <van-dropdown-menu active-color="#FFC600" class="dropdown">
          <van-dropdown-item v-model="vIdType" :options="idTypeOpt" />
        </van-dropdown-menu>
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--证件号码-->
      <div class='top'>
        <span class='inputLable'>证件号码</span>
        <input class='inputVal' type="text" ref="rIdNo" v-model="vIdNo" placeholder="请输入证件号码" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--联系人-->
      <div class='top'>
        <span class='inputLable'>联系人</span>
        <input class='inputVal' type="text" ref="rContact" v-model="vContact" placeholder="请输入联系人" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--联系人电话-->
      <div class='top'>
        <span class='inputLable'>手机号码</span>
        <input class='inputVal' type="text" ref="rContactPhoneNo" v-model="vContactPhoneNo" placeholder="请输入手机号码"  @change="checkContactPhone"/>
      </div>
      <!--横线-->
      <Divider></Divider>


      <!--多选框-->
      <div class='top'>        
          <div><span class='inputLable select-left'>意向产品</span></div>
          <van-checkbox-group v-model="vCheckboxGroup" direction="horizontal" class="select-right">
            <van-checkbox :name="index" shape="square"  v-for="(item,index) in checkboxList" class="select-item" :key="item.id" >{{item.title}}</van-checkbox>
          </van-checkbox-group>    
      </div>
      <!--横线-->
      <Divider></Divider>

      
      <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="toNext" borderRadius="6px"></LoginButton>
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
        //enable: false, //立即注册 按钮默认不可用
        enable: true,
        vCustName:'',
        vIdType: 0,
        vIdNo:'',
        vContact:'',
        vContactPhoneNo:'',
        vCheckboxGroup:[],
        //statusCount: 0 ,

        //statusCountArr: ["-1","-1","-1","-1","-1"],//用一数组判断是否有空值
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
      //校验校验手机号码
      checkContactPhone () {
          if (!this.$utils.checkPhone(this.vContactPhoneNo)) {
               this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
          }   
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
          if (this.$StringUtils.isEmpty(this.vContactPhoneNo)) {
              this.$toast('请输入手机号码');
              return
          }
          if (this.$StringUtils.isEmpty(this.vCheckboxGroup)) {
              this.$toast('请选择意向产品');
              return
          }
          const url = that.$api.ROOT + that.$Constants.APP_LOGIN;
          const data = {

          }
          this.$http.post(url,data)//operType操作类型0.注册，1.登陆
            .then(function (res) {
             console.log(res);
            if (res.data.respCode === '000000') {

              //console.log(res.data)
              //缓存数据--new
              var token = JSON.parse(res.data) ;
              console.log(token)


               sessionStorage.setItem("loginSession", token);
               sessionStorage.setItem("custNo",res.data.custNo);
               //console.info("获取的token>>>" + token);
               //this.$storeData.setSession(token)


                that.$indicator.close();
               console.info("登陆成功>>>>");
                this.$router.go(-1)

              } else {
               that.$indicator.close();
               that.$toast(res.data.msg);
                console.warn("登陆失败!!!")
             }
            })
          .catch(function () {
            that.$indicator.close();
             that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });


      }

    },
    // watch: {
    //   //监听值的改变，一改变样式也相对改变
    //   vCustName(){
    //       if (this.vCustName == null || this.vCustName == "") {
    //         this.enable = false//按钮不可用
    //         this.statusCountArr[0] = "-1"  //为空时赋值1
    //       }else{
    //         this.statusCountArr[0] = "1"   //不为空时赋值正数
    //         if (this.statusCountArr.indexOf("-1") == -1){ //状态数组有-1时即为空时
    //             this.enable = true
    //         }
    //       }
    //   },
    //   vIdType(){
    //       //不空值，不计 statusCountArr
    //   },
    //   vIdNo(){
    //       if (this.vIdNo == null || this.vIdNo == "") {
    //         this.enable = false//按钮不可用
    //         this.statusCountArr[1] = "-1"
    //       }else{
    //         this.statusCountArr[1] = "2"
    //         if (this.statusCountArr.indexOf("-1") == -1){
    //             this.enable = true
    //         }
    //       }
    //   },
    //   vContact(){
    //       if (this.vContact == null || this.vContact == "") {
    //         this.enable = false//按钮不可用
    //         this.statusCountArr[2] = "-1"
    //       }else{
    //         this.statusCountArr[2] = "3"
    //         if (this.statusCountArr.indexOf("-1") == -1){
    //            this.enable = true
    //         }
    //       }
    //   },
    //   vContactPhoneNo(){
    //       if (this.vContactPhoneNo == null || this.vContactPhoneNo == "") {
    //         this.enable = false//按钮不可用
    //         this.statusCountArr[3] = "-1"
    //       }else{
    //         this.statusCountArr[3] = "4"
    //         if (this.statusCountArr.indexOf("-1") == -1){
    //            this.enable = true
    //         }  
    //       }
    //   },
    //   vCheckboxGroup(){
    //       if (this.vCheckboxGroup == null || this.vCheckboxGroup == "") {
    //         this.enable = false//按钮不可用
    //         this.statusCountArr[4] = "-1"
    //       }else{
    //         this.statusCountArr[4] = "5"
    //         if (this.statusCountArr.indexOf("-1") == -1){
    //           this.enable = true
    //         }
    //       }
    //   }
    // }

  }
</script>

<style scoped>
  .content {
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
    /*background-color:burlywood;*/
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
    /*margin: 68px 30px 30px;*/
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
  }


/* 新增 */
.select-left{
   width: 160px;
   display: inline-block;
}
.select-item{
   font-size: 25px;
   padding:10px;
}





</style>
