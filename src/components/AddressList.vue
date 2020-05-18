<template>
  <mt-popup class="mint-popup-4" v-model="popupVisible" position="bottom">
    <ToolBar isShowNav="false">
      所在地区
      <img src="../../static/assets/right_arrow.png" slot="right" style="margin-right: 0.3rem">
    </ToolBar>
    <div class="mint-title">
      <span class="unselected" :class="{selected:curPos>1}"
            @click="switchList(1)">{{province.pos != -1 ? province.name : '请选择'}}</span>
      <span v-if="curPos>1" class="unselected" style="margin-left: 0.5rem"
            :class="{selected:curPos>2}" @click="switchList(2)">{{city.pos != -1 ? city.name : '请选择'}}</span>
      <span v-if="curPos>2" class="unselected" style="margin-left: 0.5rem"
            @click="switchList(3)">{{zone.pos != -1 ? zone.name : '请选择'}}</span>
    </div>
    <ul>
      <li v-for="(item,index) in list" @click="chooseAddress(index)" class="mint-address-item">
        <span class="mint-address-text">{{item}}</span>
        <img v-if="isShowSelected(index)" src="../../static/assets/right_arrow.png" class="mint-selected-img">
      </li>
    </ul>
  </mt-popup>
</template>
<script>
  const PROVINCE = 1, CITY = 2, ZONE = 3
  import ToolBar from './ToolBar.vue'
  export default{
    components: {ToolBar},
    data(){
      return {
        curPos: PROVINCE,
        popupVisible: false,
        province: {name: '', pos: -1},
        city: {name: '', pos: -1},
        zone: {name: '', pos: -1},
        list: ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮']
      }
    },
    methods: {
      isShowSelected: function (index) {
        switch (this.curPos) {
          case PROVINCE:
            return this.province.pos == index
          case CITY:
            return this.city.pos == index
          case ZONE:
            return this.zone.pos == index
        }
      },
      switchList: function (index) {
        this.curPos = index
      },
      chooseAddress: function (index) {
        switch (this.curPos) {
          case PROVINCE:
            this.province.name = this.list[index]
            this.province.pos = index
            break
          case CITY:
            this.city.name = this.list[index]
            this.city.pos = index
            break
          case ZONE:
            this.zone.name = this.list[index]
            this.zone.pos = index
            break
        }
        if (this.curPos < ZONE) {
          this.curPos += 1;
        } else {
          this.popupVisible = false;
        }
      }
    }
  }
</script>
<style scoped>
  .mint-popup-4 {
    width: 100%;
    height: 50%;
    overflow: scroll;
  }

  .mint-popup-4 .mint-title {
    background: #ffffff;
    height: 0.88rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border: 1px solid #e1e1e1;
    border-right-width: 0px;
    border-left-width: 0px;
  }

  .mint-popup-4 .mint-title .unselected {
    font-size: 0.30rem;
    color: #ff6400;
    margin-left: 0.30rem;
    line-height: 0.88rem;
    border-bottom: 0.05rem solid #ff6400;
    text-align: left;
  }

  .mint-popup-4 .mint-title .selected {
    font-size: 0.30rem;
    color: #666666;
    line-height: 0.88rem;
    border-bottom: none;
    text-align: left;
  }

  .mint-popup-4 .mint-address-item {
    margin-left: 0.30rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: flex-start;
  }

  .mint-popup-4 .mint-address-item .mint-address-text {
    font-size: 0.30rem;
    color: #666666;
    line-height: 0.38rem;
    text-align: left;
    flex-grow: 1;
  }

  .mint-popup-4 .mint-address-item .mint-selected-img {
    margin: auto 0.30rem auto auto;
  }

  .mint-popup-4 .picker-slot-wrapper, .mint-popup-4 .picker-item {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
</style>
