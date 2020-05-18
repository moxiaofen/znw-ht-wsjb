<template>
<div>
 
    <div class='cont-sides'>
        <p class="cont-item">附件信息      
        </p>
        <img  v-if="itemShow" class="add-img" src="../../assets/icon_add.png"  @click="showPopup"/>
    </div>

    <div class="bgcf" v-if="itemShow">
      <div class="affix-lib">
        <div class="affix-type">
           <span >资料类型</span>
        </div>

        <div class="affix-name ell">
         <span >附件名称</span>
        </div>

        <div class="affix-remark ell">
            <span >备注</span>
        </div>
      </div>
      <div v-for="(item,index) in dataFileList" :key="index">
          <div class="affix-lib por">
            <div class="affix-type">
              <span >{{item.dataText}}</span>
            </div>
            <div class="affix-name">
            <span >{{item.fileName}}</span>
            </div>

            <div class="affix-remark">
                <span >{{item.fileDesc}}</span>
            </div>
            <img class='clear-file' @click="clearFile(index)" src="../../assets/gray-del.png"/>
          </div>
      </div>

    </div>


    <!-- 弹窗 -->
    <van-popup v-model="show" bind:close="onClose" class="pop-content">
        <!--资料类型-->
        <div class='top'>
          <span class='common'>资料类型</span>
          <select name="" id=""  v-model="selected"  class="pop-select">
              <!-- option的value赋值对象 -->
              <option v-for="(item,index) in optDate" :value="item" :key="index">{{item.text}}</option>
          </select>  
        </div>

        
        <!--说明-->
        <div class='top'>
          <span class='inputLable'>资料说明</span>
          <input class='inputVal' type="text" ref="rFileDesc" v-model="vFileDesc" placeholder="请输入说明"/>
          <img class='clearCss' v-show="vFileDesc" @click.stop ="clear('vFileDesc')" src="../../assets/clear.png" />
        </div>

        <!--附件名称回填的附件名称-->
        <div class='top'>
          <span class='inputLable'>附件名称</span>
          <input class='inputVal' type="text" ref="rFileName" v-model="vFileName" placeholder="请输入附件名称" />
          <img class='clearCss' readonly="true" v-show="vFileName" @click.stop ="clear('vFileName')" src="../../assets/clear.png" />
        </div>

        <div class="file">
            <img class="img-photo hide" ref='img' alt="handleFileList" :src="src" />
            <a class="file-button" href="javascript:void(0);">上传</a>
            <input type="file" multiple class="file-input" ref="inputImg" @change.stop="handleFile" >
        </div>

        <div class="file tac">
            <a class="file-button confirm" @click="submitHandleFile">确定</a>
            <a class="file-button cancel" @click="onClose">取消</a>
        </div>

    </van-popup>



</div>
</template>

<script>
  import Divider from '@/components/Divider.vue'
    export default {
        components: {
          Divider,
        },
        props:["optDate",'itemShow','dataFileList'],
        computed: {},
        data() {
            return {
              nonet: false,//断网
              enable: true,//立即注册 按钮默认不可用
              show: false,//测试时为true
              //vDataType:this.optDate[0].value,
              //给select赋默认值
              selected:{'value':this.optDate[0].value,'text':this.optDate[0].text},
              vFileDesc:"",
              vFileName:"",
              src:"",
              dataFileList:[],
              rexTip:false,//提示语
            }
        },
        mounted(){
                      
        },
        methods: {
          //清除输入框数据
          clear (str) {
            this[str] = ''
          },     
          //上传多种文件
          handleFile() {
              //console.log()
              const file = this.$refs.inputImg.files[0]
              console.log(file)
              this.vFileName = file.name;
              const rimg = this.$refs.img;
              var reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function (e) {
                      rimg.src = e.target.result;
              }
              var dataFile = {
                dataText : this.selected.text ,
                dataType : this.selected.value ,
                fileName : this.vFileName ,
                fileDesc : this.vFileDesc 
             }
              //获取其他file文件，用new FormData()
            //   this.vFileName = this.$refs.inputImg.files[0].name;
            //   var fd = new FormData();
            //   fd.append('file',this.$refs.inputImg.files[0])
             console.log(dataFile)
             return dataFile
          },

          //企业认证上传列表确定
          submitHandleFile(){
              //提的bug，允许资料说明为空
              // if(!this.vFileDesc){
              //     this.$toast('资料说明不能为空！');  
              //     return                
              // }
              //inputfile的base64字符串去掉','前的部分，不然传给后端的数据有误
              const dataFile = this.handleFile();
              dataFile.fileInput = this.$refs.img.src.split(",")[1];
              this.dataFileList.push(dataFile);
              console.log(this.dataFileList);
              this.show = false;
          },
          //删除企业认证列表
          clearFile(index){
              this.dataFileList.splice(index, 1);
          },

          //弹窗
          showPopup() {
            this.show = true;
            this.vFileDesc = '';
            this.vFileName = '';
            this.src = '';
          },
          onClose() {
            this.show = false
          },                
        
        },

    }
</script>

<style scoped>
@import "../../css/common";

.inputVal{
    padding: 20px 0 10px;
}
</style>
