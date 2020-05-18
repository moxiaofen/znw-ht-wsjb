<!--测试上传图片进度条的vue-->
<template>
  <div class="circle">
    <img class="upload progress_line" src="/static/assets/upload.png" />
    <canvas id="canvas_1" ref="canvas_1" class="wenzi"></canvas>
    <canvas id="canvas_2" ref="canvas_2" class="huabu"></canvas>


    <div style="position: relative;padding-top: 120px;">
      <span @click="test()" class="word">测试按钮222</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        percent:0,
      }
    },
    methods: {
      juxing(per){
        var that=this;
        var canvas_1= that.$refs.canvas_1;
        var canvas_2= that.$refs.canvas_2;

        var ctx_1 = canvas_1.getContext('2d');
        var ctx_2 = canvas_2.getContext('2d');

        ctx_2.fillStyle = '#999' ;
        ctx_1.fillStyle = '#fff' ;
        var angle = 0;
        var timer;

        (function draw() {
          timer = requestAnimationFrame(draw);
          ctx_1.clearRect(0, 0, canvas_2.width, canvas_2.height);
          ctx_2.beginPath();
          ctx_2.fillRect(0,0 ,300,angle);
          //x，就是隔左边多少的 距离,相当于left，y就是隔上边多少的距离，相当于top
          //        150*100 像素的已填充矩形,,,,x,y,left，top
          //        填充的矩形的左上方的xy坐标和右下方的xy坐标
          //        width: 120px;
          //        height: 90px;
          angle++;
          var percentAge = parseInt((angle / 150) * 100);
          console.info("此时的高度是angle："+angle);
          console.info("此时的百分比是percentAge："+percentAge);

          ctx_1.font = "bold 40px 宋体";
          ctx_1.fillStyle = 'red' ;
          var text = percentAge + '%';
          ctx_1.fillText(text,canvas_2.width/2-25,canvas_2.height/2+40);
          if (angle > (per/100*150)) {
//            if (angle > 150) {//151  > 150
            percentAge = per;
            window.cancelAnimationFrame(timer);
            return percentAge;
//            ctx_2.clearRect(0,0,300,angle);//清除画布
          };
        })()

      },
      //2个方法
      test(){
        let  that=this;
        var ret=that.juxing(100);

        alert("????"+ret);
      },
    },
  }
</script>
<style scoped>
  .wenzi{
    z-index: 3;
    /*position: absolute;*/
    width: 3rem;
    height: 2.2rem;
  }
  .huabu{
    opacity: 0.3;
    width: 3rem;
    height: 2.2rem;
    border: 1px solid red;
    /*position: absolute;*/
    z-index: 2;
    /*整体翻转180度，很重要*/
    transform: rotate(180deg);
  }



  .word{
    width: 100px;
    height: 100px;
    border: 1px solid green;
    font-size: 1rem;
  }
  .circle {
    /*position: relative;*/
    /*width: 100%;*/
    height: 100%;
    background-color: gray;
    /*color: #333;*/
  }
  /*canvas{display: block;margin: 0;position: absolute;background: white;left: 0;top: 0;}*/
  /*#canvas_1{z-index: 1 }*/
  /*#canvas_2{z-index: 2; background: transparent;transform:rotate(-90deg); }*/

  .upload {
    z-index: 1;
    border: 1px solid #e1e1e1;
    border-radius: 2px;
    width: 3rem;
    height: 2.1rem;
    /*position: absolute;*/
  }
  .progress_line {
    display: flex;
    justify-content: center;
  }
</style>
