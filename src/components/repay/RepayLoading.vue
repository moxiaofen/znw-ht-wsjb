<!--授信申请等待的页面-->
<template>
    <div>
      <div class='middle'>

        <div>
          <img  class='imgcss' src='/static/assets/repay_loadin.png'></img>
        </div>

        <div class='record'>申请授信中…</div>

        <img src='/static/assets/select_progress.png' class="btn_apply"></img>
      </div>
</div>
</template>


<style scoped>
  page{
    background:#f5f5f5;
  }

.btn_apply{
  width: 90%;
  margin-top: 2rem;
}

  .middle{
    /* width: 1334px; */
    height: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    /* margin-left:144px; */

  }

  .record{

    font-size:30px;
    color:#666666;
    line-height:42px;
    margin-top: 0.5rem;
  }
  .imgcss{
    width: 110px;
    height: 100px;
    margin: auto;

  }

</style>
