<template>
  <div class="bg por">
    <van-nav-bar
      class="bar"
      title="合同管理详情"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div  class="content">
      <pdf      
        :src="src" 
        v-for="item in numPages" :key="item"  :page="item"  
      ></pdf>
    </div>

    <div class="btn-cont">
        <a v-show="showSign" class="btn btnEnable mr15" href="javascript:void(0);" @click="signOnline">在线签约</a>
        <a class="btn btnEnable" ref='download' :href="href" >下载</a>       
    </div>
    <!-- 弹窗组件 -->
    <sign-contract :showPop='show'  ref='ch' :contractNo='contractNo'></sign-contract>
  </div>
</template>

<script>
import SignContract from '../components/sign-contract'
import pdf from 'vue-pdf'
export default {
  name: "ContractPdf",
  components:{
      SignContract,
      pdf
  },
  data(){
      return {
       numPages: "",
　　　　src: '', 
       showSign :true,
       show:false,//弹窗
       href:'',
       pdfData:{},
       contractNo:"",
       contractType:"",//判断是否为L,L对应提款申请书，加上人脸识别的逻辑
       id:'',//人脸识别的url
      }
  },
  created(){
      this.pdfData = JSON.parse( sessionStorage.getItem('pdfData'))
      this.contractType =  this.pdfData.contractType
      //this.contractType ='L'//假数据
      //this.pdfData = this.$store.state.pdfData
      console.log(this.pdfData)
      this.contractNo = this.pdfData.contractNo
      this.tab = this.$route.query.tab;
      var src='';
      if(this.tab == "0"){     
          this.href= 'http://113.105.121.204:8104/factoring-pre/znw/contract/download/'+this.pdfData.pdfFileNo;//a下载时的href
          src="http://113.105.121.204:8104/factoring-pre/znw/contract/download/"+this.pdfData.pdfFileNo; //获取返回的src
      }else{
          this.href= this.pdfData.signedContDownUrl;//a下载时的href
          src= this.pdfData.signedContDownUrl; //获取返回的src        
      }
      this.src = pdf.createLoadingTask(src);
      this.loadPdfHandler();  //渲染pdf  
  
　}, 
  mounted(){
      //已签约合同，隐藏‘在线签约’、‘下载’操作
      this.tab = this.$route.query.tab;
      if(this.tab == "0"){
          this.showSign = true
      }else{
          this.showSign = false
      }
      this.showSign = this.tab == "0" ? true : false ;
      //判断是否为L,L对应提款申请书，加上人脸识别的逻辑
      if(this.contractType=='L'){ 
          this.id = this.$route.query.id;
          if(this.id!=0){
              this.faceIdAuthenty()
          }
      }
  },
  methods:{
      loadPdfHandler() {
          this.src.then(pdf => {this.numPages = pdf.numPages;});
      },
      signOnline(){
          //在线签约
          console.log('在线签约')
          //获取子组件的数据
        if(!this.$refs.ch.showPop){
            this.show = false
        }
        this.show = true

      },
      //人脸识别1
      faceIdAuthenty(){
          const baseUrl = window.location.href
          //console.log(baseUrl)
          const data={
            "custNo":sessionStorage.getItem('custNo'),
            "ruleId":"2",
            "redirectUrl":`${baseUrl}&id=0`,
            "region": "ap-shenzhen-fsi"
            };
          //console.log(data)
          this.custNo = sessionStorage.getItem('custNo')
          const url = this.$api.ROOT +this.$Constants.FACE_IDENTIFY
          this.$indicator.open("请稍候...");   
          this.$http.post(url, data)
            .then(function (res) {                
              const resDate =JSON.parse(res.data) ; 
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .content{
   margin-top:47px ;
   margin: 47px 0 55px 0;
 }
 .por{
   position: relative;
 }
 .bar {
  background-color: #FFC600;
  color: #ffffff;
}
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
