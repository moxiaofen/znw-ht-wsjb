<template>
  <div>  
    <pdf :src="src"  > 
    </pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components:{
      pdf
  },
  data(){
      return {
         // pdfUrl:"http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf",
          //src:"http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf",
          src: '',
      }
  },
  created(){
　　　　// 有时PDF文件地址会出现跨域的情况,这里最好处理一下
     this.src = pdf.createLoadingTask(this.src)
     
　　},
    methods:{
      //预览pdf
        previewPDF(url){
            this.src = pdf.createLoadingTask(url)
        },
        downloadPDF(url,fileData, fileName) {
            this.$axios({
                method: "post",
                responseType: "arraybuffer",
                url: url,
                data:fileData
            })
            .then(
            function(res) {
                //调用下载方法，把后端传过来的流传给fileDownload方法
                this.fileDownload(res.data, fileName);
            }.bind(this)
            )
            .catch(
            function(error) {
                this.$Message.error("网络请求出错");
                //调试阶段可以看看报的什么错
                //console.log("error",error)
            }.bind(this)
            );
        },

        fileDownload: function(data, fileName) {
        let blob = new Blob([data], {
            //type类型后端返回来的数据中会有，根据自己实际进行修改
            type: "application/vnd.ms-excel"
        });
        let filename = fileName || "报表.xls";
        if (typeof window.navigator.msSaveBlob !== "undefined") {
            window.navigator.msSaveBlob(blob, filename);
        } else {
            var blobURL = window.URL.createObjectURL(blob);
            var tempLink = document.createElement("a");
            tempLink.style.display = "none";
            tempLink.href = blobURL;
            tempLink.setAttribute("download", filename);
            if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
            }
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);
        }
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
