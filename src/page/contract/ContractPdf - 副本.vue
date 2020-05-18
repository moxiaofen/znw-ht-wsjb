<template>
  <div class="bg por">

    <ToolBar page_title="合同管理详情" :isWhile="false" ></ToolBar>
    <div class="content">
      <!-- <pdf
          :src="src" 
          v-for="item in numPages" :key="item"  :page="item"  
      ></pdf> -->
       <PDF ref="pdf"></PDF>
      <!-- <pdf :src="src"></pdf> -->

    </div>
    <div class="btn-cont" v-show="showSign">

        <a class="btn btnEnable" href="javascript:void(0);" @click="signOnline">在线签约</a>
        <a class="btn btnEnable" href="javascript:void(0);" @click="previewWeekly">预览</a>
        <a class="btn btnEnable" href="javascript:void(0);" @click="downloadWeekly">下载</a>
    </div>
    <!-- 弹窗组件 -->
    <sign-contract :showPop='show'  ref='ch' ></sign-contract>

  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import SignContract from '../components/sign-contract'
  import PDF from '../components/PDF'

  export default {
    components: {
      ToolBar,
      //pdf,
      SignContract,
      PDF
    },
    data() {
      return {
         numPages: "",
  　　　　//src: 'http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf', 
         src :'',
         showSign :true,

         show:false,//弹窗
      
      }
    },
    created() {  
        this.queryContractPdf();

        this.src = pdf.createLoadingTask(this.src);
        this.loadPdfHandler(); 
          
    },
    methods: {
      //获取详情---待处理，后台返回的数据格式有误
      getPdfCode () {
        let that = this;
        const url = this.$api.ROOT + this.$Constants.GET_CONTRACT_LIST;
        axios({
          method: 'get',
          url: url,
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
          responseType: 'blob'  //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
        }).then(response => {
          console.log(response)
          that.src  = that.getObjectURL(response.data);
        }).catch(function (error) {
          console.log(error);
        });
      },

      // 将返回的流数据转换为url
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          try {
            url = window.webkitURL.createObjectURL(file);
          } catch (error) {

          }
        } else if (window.URL != undefined) { // mozilla(firefox)
          try {
            url = window.URL.createObjectURL(file);
          } catch (error) {

          }
        }
        return url;
      },

      queryContractPdf() {
          this.tab = this.$route.query.tab;
          this.pdfData = JSON.parse( sessionStorage.getItem('pdfData'))
          //this.pdfData = this.$store.state.pdfData 
          //this.data =JSON.parse(this.$route.query.data) ;
          console.log(this.pdfData)
          // if(this.tab == "00"){
          //     this.showSign = true
          // }else{
          //     this.showSign = false
          // }
          this.showSign = this.tab == "0" ? true : false ;
          console.log(this.tab)
          console.log(this.showSign)
          //http://113.105.121.204:8108/topiscf-bas/app/viewContractPdf?pdfUrl=http://127.0.0.1:8104/factoring-pre/znw/contract/download/ATTI2020032700001575
          var downUrl="http://127.0.0.1:8104/factoring-pre/znw/contract/download/"+this.pdfData.pdfFileNo;
          this.src = this.$api.ROOT + "com/viewContractPdf.htm?pdfUrl="+downUrl
          console.log(this.src)
        // pdfReq({url:basePath + "/com/viewContractPdf.htm?pdfUrl="+downUrl,scale:1.35});
          //this.src = this.$api.ROOT + this.pdfId.slice(1);//通过url获取返回的pdf的链接
          console.log(this.src)

          // const url = this.$api.ROOT + this.$Constants.QUERY_FINANCING_DETAIL;
          // this.$http.post(url,{"applyNo": this.pdfId})
          //     .then(function (res) {
          //         const data = JSON.parse(res.data);
          //         this.resData = JSON.parse(data);                     
          //     })
          //     .catch(function () {
          //         this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          //     });
      },
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
      previewWeekly(){
          //调用子组件的预览方法

          this.pdfData = JSON.parse( sessionStorage.getItem('pdfData'))
          console.log(this.pdfData)
          //http://113.105.121.204:8108/topiscf-bas/app/viewContractPdf?pdfUrl=http://127.0.0.1:8104/factoring-pre/znw/contract/download/ATTI2020032700001575
          var downUrl="http://127.0.0.1:8104/factoring-pre/znw/contract/download/"+this.pdfData.pdfFileNo;
          this.src = this.$api.ROOT + "com/viewContractPdf.htm?pdfUrl="+downUrl
          //this.src = this.$api.ROOT + this.pdfId.slice(1);
          //完整的地址应该是发布到服务器的地址，不应该是localhost:8080这样的
          //Vue.prototype.ApiUrl 用来读取服务器地址 比如:
          //http://192.168.8.152:8080/MixShowView-Web/reports/preview/1
          this.$refs.pdf.previewPDF(this.src)
      },
      //下载
      downloadWeekly(id,fileName){


          this.pdfData = JSON.parse( sessionStorage.getItem('pdfData'))
          console.log(this.pdfData)
          //http://113.105.121.204:8108/topiscf-bas/app/viewContractPdf?pdfUrl=http://127.0.0.1:8104/factoring-pre/znw/contract/download/ATTI2020032700001575
          var downUrl="http://127.0.0.1:8104/factoring-pre/znw/contract/download/"+this.pdfData.pdfFileNo;
          this.src = this.$api.ROOT + "com/viewContractPdf.htm?pdfUrl="+downUrl
          //this.src = ''
          //调用子组件的下载方法
          this.$refs.pdf.downloadPDF(this.src,this.pdfData.contractPath)

      }


    },


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
</style>
