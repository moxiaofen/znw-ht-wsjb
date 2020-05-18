<!--进件中,操作指引的页面-->
<template>
<div>
  <ToolBar>操作指引 </ToolBar>
  <img class="imgOperaion" src="/static/assets/operationTop.png"/>
  <div class="content">

      <div class='section'>
       <span class="bold"> 一、房产证明上传</span>
        <div class='section-desrci'>
        可上传房产证和不动产证
      </div>

        <div class='section-title'>
          <span class="bold">1、房产证</span>
        </div>
        <div class='section-word'>
          样本示例如下，如样本所示，需显示6个红色方框内字段及箭头所示房产局鲜章，页面需要清晰完整。
        </div>
        <div class=''>
          <img class='section-house' src='/static/assets/house.png'></img>
        </div>

        <div class='section-title'>
          <span class="bold"> 2、不动产证</span>
        </div>
        <div class='section-word'>
          样本示例如下，如样本所示，需显示7个红色方框内字段及箭头所示红色鲜章，页面需要清晰完整。
        </div>
        <div class=''>
          <img class='section-nodong' src='/static/assets/nodong.png'></img>
        </div>

      </div>


      <div class='section'>
        <span class="bold">  二、车辆证明上传</span>

        <div class='section-desrci'>
        上传机动车行驶证完整照片，样本示例如下，需显示7个红色方框内字段以及箭头所示交警支队鲜章，页面需要清晰完整。
      </div>
        <div class=''>
          <img class='section-drive' src='/static/assets/drive.png'></img>
        </div>
      </div>

      <div class='section'>
        <span class="bold">三、流水上传</span>
        <div class='section-title'>
          <span class="bold"> 1、微信流水</span>
      </div>
        <div class='section-wechattitle'>
          方法1：点击微信【我的】进入【钱包】，点击【收付款】，点击【二维码收款】，点击进入【收款小账本】小程序。点击【收入统计】——【月报】，点击选择时间的按钮，截屏保存信息。
        </div>
        <div class='section-wechattitle'>
          方法2：进入【收款小账本】小程序，点击【收入统计】——【月报】，点击选择时间的按钮，截屏保存信息。
        </div>
        <div class='section-word'>
          样本示例如下：
        </div>
        <div class=''>
          <img class='wechatorder' src='/static/assets/wechatorder.png'></img>
        </div>




        <div class='section-title'>
          <span class="bold"> 2、支付宝流水</span>
        </div>

        <div class='section-wechattitle'>
          点击支付宝【我的】，进入【账单】，筛选【转账】之后截屏保存显示页面
        </div>

        <div class='section-word'>
          样本示例如下：
        </div>
        <div class=''>

          <img class='wechatorder' src='/static/assets/payorder.png'></img>
        </div>
      </div>
    </div>

  </div>


</template>
<script>
  import ToolBar from '../ToolBar.vue'
  export default {
    components: {ToolBar},
    data(){
      return {
      }
    },
    //生命周期方法
    mounted(){
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }

    }
  }
</script>
<style scoped>
.content
{
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  margin-top: 0.4rem;
  width: 9rem;
}

.imgOperaion{
  height: 3rem;
  width: 100%;
}
.section {
  font-size: 36px;
  color: #333;
  line-height: 54px;
  text-align: left;
}
.bold{
  font-weight: bold;
}
.section-desrci {
  font-size: 26px;
  color: #999;
  line-height: 40px;
  text-align: left;
  margin-top: 16px;
}

.section-title {
  font-size: 30px;
  color: #333;
  text-align: justify;
  line-height: 42px;
  margin-top: 20px;

}

.section-word {
  margin-top: 16px;
  font-size: 26px;
  color: #999;
  text-align: justify;
  line-height: 40px;
}

.section-nodong {
  margin-top: 20px;
  background: #fff;
  width: 670px;
  height: 480px;
}

.section-house {
  margin-top: 20px;
  background: #fff;
  width: 670px;
  height: 480px;
}

.section-drive {
  margin-top: 20px;
  background: #fff;
  width: 670px;
  height: 250px;
}

.section-wechattitle {
  margin-top: 20px;
  font-size: 30px;
  color: #333;
  text-align: justify;
  line-height: 44px;
}

.wechatorder {
  margin-top: 20px;
  background: #fff;
  width: 300px;
  height: 534px;
  border: 1px solid #c9c9c9;
}

</style>
