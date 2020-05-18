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
    <div class="content">
        <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
    </div>
    <div class="btn-cont">
        <a  v-show="showSign"  class="btn btnEnable mr15" href="javascript:void(0);" @click="signOnline">在线签约</a>
        <!-- <a class="btn btnEnable" ref='download' href="javascript:void(0);" @click="downloadFile">下载</a>  -->
        <a class="btn btnEnable" ref='download' :href="href" >下载</a>         
    </div>
    <!-- 弹窗组件 -->
    <sign-contract :showPop='show'  ref='ch' :contractNo='contractNo' ></sign-contract>

  </div>
</template>

<script>
  import SignContract from '../components/sign-contract'
  import PDFJS from "pdfjs-dist";
  import pdfjsLib from "pdfjs-dist";

//import PDFJS from 'pdfjs-dist';
PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js';


  export default {
    components: {
      SignContract,
    },
    data() {
      return {
         numPages: "",
  　　　　//src: 'http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf', 
         //src :'',
         showSign :true,

         show:false,//弹窗
          
          pdfDoc: null,
          pages: 0,
          url:'',


          href:'',
          pdfData:{},
          contractNo:"",
          contractType:"",//判断是否为L,L对应提款申请书，加上人脸识别的逻辑
          id:'',//人脸识别的url

      
      }
    },

    mounted() {
      this.initThePDFJSLIB();
     // document.title = this.title;

      //this.pdfData = JSON.parse( sessionStorage.getItem('pdfData'))
      // this.url="http://113.105.121.204:8104/factoring-pre/znw/contract/download/"+this.pdfData.pdfFileNo; 
      // console.log(this.url);
      // this.loadFile(this.url);

     this.pdfData = JSON.parse( sessionStorage.getItem('pdfData'))
     this.contractType =  this.pdfData.contractType
     this.contractNo = this.pdfData.contractNo
    this.tab = this.$route.query.tab;
    //var src='';
    if(this.tab == "0"){     
        this.href= 'http://113.105.121.204:8104/factoring-pre/znw/contract/download/'+this.pdfData.pdfFileNo;//a下载时的href

        this.url="http://113.105.121.204:8104/factoring-pre/znw/contract/download/"+this.pdfData.pdfFileNo; //获取返回的src

     }else{
        this.href= this.pdfData.signedContDownUrl;//a下载时的href

        this.url= this.pdfData.signedContDownUrl; //获取返回的src        
     }
     this.loadFile(this.url);
    //  this.src = pdf.createLoadingTask(src);
    //  this.loadPdfHandler();  //渲染pdf  
    },
    methods: {

      // 初始化pdfjs
      initThePDFJSLIB: function() {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.js";
      },
      renderPage(num) {
        this.pdfDoc.getPage(num).then(page => {
          let canvas = document.getElementById("the-canvas" + num);
          let ctx = canvas.getContext("2d");
          let dpr = window.devicePixelRatio || 1;
          let bsr =
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;
          let ratio = dpr / bsr;
          let viewport = page.getViewport(
            screen.availWidth / page.getViewport(1).width
          );
          canvas.width = viewport.width * ratio;
          canvas.height = viewport.height * ratio;
          canvas.style.width = viewport.width + "px";
          canvas.style.height = viewport.height + "px";
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
          let renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };
          page.render(renderContext);
          if (this.pages > num) {
            this.renderPage(num + 1);
          }
        });
      },
      loadFile(url) {
        PDFJS.getDocument(url).then(pdf => {
          this.pdfDoc = pdf;
          this.pages = this.pdfDoc.numPages;
          this.$nextTick(() => {
            this.renderPage(1);
          });
        });
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
      //下载
      downloadFile(){
         // window.open('http://113.105.121.204:8104/factoring-pre/znw/contract/download/ATTI2020032700001575')
         window.open(this.url)     
      },
    }


  }
</script>

<style scoped>
 .content{
   margin-top:47px ;
   margin: 47px 0 55px 0;
 }
 .por{
   position: relative;
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
