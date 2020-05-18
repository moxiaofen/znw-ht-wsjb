<!-- 仿京东，城市三级联动选项 -->
<template>
  <section class="myAddress">
    <section>
      <section class="cont" @click.stop="choseAdd()">
        <section>
          <input type="text" readonly='readonly' v-model="lastAdd" placeholder='请选择' class="addCss"/>
          <img src="/static/assets/right.png" alt="">
        </section>

        <div style="clear: both"></div>
      </section>
    </section>
    <!-- 居住地址三级联动选项 -->
    <section class="showChose" v-show="showChose" @click.stop="">
      <div class="mask" @touchmove.prevent></div>
      <section class="eleaddress">
        <section class="title" @touchmove.prevent>
          <span class="areaCss">所在地区</span>
          <!--<img class='clearCss' @click="closeAdd()" src="/static/assets/clear.png"/>-->
          <span class='clearCss' @click.stop="closeAdd()">确定</span>

        </section>
        <!-- 来条灰色横线 -->
        <div class='line_bottom'></div>

        <section class="title" @touchmove.prevent>
          <div class="area" @click.stop="provinceSelected()" :class="Province?'':'active'">
            <!--{{Province ? Province : info[province - 1].name}}-->
            {{Province ? Province : "请选择"}}


          </div>
          <div class="area" @click.stop="citySelected()" :class="City?'':'active'" v-show="Province">
            {{City ? City : '请选择'}}


          </div>
          <div class="area" @click.stop="districtSelected()" :class="District?'':'active'" v-show="City">
            {{District ? District : '请选择'}}


          </div>
        </section>
        <!-- 来条灰色横线 -->
        <div class='line_bottom'></div>

        <ul>
          <li class="addList" v-for="(v,k) in info"
              @click.stop="getProvinceId(v.id, v.name, k)"
              v-show="showProvince"
              :class="v.selected ? 'active' : ''" v-model="wProvince">{{v.name}}

          </li>
          <li class="addList" v-for="(v,k) in showCityList"
              @click.stop="getCityId(v.id, v.name, k)"
              v-show="showCity"
              :class="v.selected ? 'active' : ''" v-model="wCity">{{v.name}}

          </li>
          <li class="addList" v-for="(v,k) in showDistrictList"
              @click.stop="getDistrictId(v.id, v.name, k)"
              v-show="showDistrict"
              :class="v.selected ? 'active' : ''" v-model="wArea">

            <div :class="v.selected ? 'selected' : ''" class="test">
              <span> {{v.name}}</span>
              <!--<span :class="v.selected ? 'active ' : ''">    你好</span>-->

              <!--//我要的需求是，选中的那一个，加上一个数据，-->
              <!--而不是所有的列表，都加上数据，-->
              <!--所以，关键点是，找到 选中的 那一个，-->
              <!--函数以及样式。-->


            </div>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>
<script>
  export default {
    name: 'eleaddress',
    data() {
      return {

        wProvince: null,//监控变量，用来传值
        wCity: null,//监控变量，用来传值
        wArea: null,//监控变量，用来传值
        tempAdd: [],//临时地址的数组
        lastAdd: "",//最后的地址
        pageTitle: '所在地区',
        eleaddress: '',
        showChose: false,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showCityList: false,
        showDistrictList: false,
        province: 1,
//        city: 3,
//        district: 57,
//        GetProvinceId: 1,
        District: false,
        Province: false,
        City: false,
        areaProvince: '',
        areaCity: '',
        areaDistrict: '',
        // v-for循环判断是否为当前选中的
        selected: false,
        info: []
      }
    },
    methods: {
      getCityData(){
        //获取app.vue里缓存的省市区数据
        let cachaCityData = localStorage.getItem("cacheCityJson");
        if (this.$StringUtils.isEmpty(cachaCityData)) {
          let that=this;
          that.$http.get('/static/map/city.json').then(res => {
            that.info =res.body;
          });
        }

        this.info = JSON.parse(cachaCityData);


      },
      choseAdd: function () {
        this.showChose = true;
        var html = document.getElementsByTagName('html')[0]
        html.style.overflow = 'hidden'
        var body = document.getElementsByTagName('body')[0]
        body.style.overflow = 'hidden'
      },
      closeAdd: function () {
        this.showChose = false;
        var html = document.getElementsByTagName('html')[0]
        html.style.overflow = 'auto'
        var body = document.getElementsByTagName('body')[0]
        body.style.overflow = 'auto'
      },
      //省级选择
      getProvinceId: function (code, input, index) {

        this.province = code;
        this.Province = input;
        this.showProvince = false;
        this.showCity = true;
        this.showDistrict = false;
        this.showCityList = this._filter(this.info, 'childs', this.province);

        this.info.map(a => a.selected = false);
        this.info[index].selected = true;
        this.areaProvince = input;
        this.wProvince = this.areaProvince;//把选中的 省 赋值给wactch监控变量
        this.tempAdd.length = 1;//解决重复地址的bug
        this.tempAdd.push(this.wProvince);

      },
      //市级选择
      getCityId: function (code, input, index) {


        this.city = code;
        this.City = input;
        this.showProvince = false;
        this.showCity = false;
        this.showDistrict = true;
        this.showDistrictList = this._filter(this.showCityList, 'childs', this.city);
        // 选择当前添加active
        this.showCityList.map(a => a.selected = false);
        this.showCityList[index].selected = true;
        this.areaCity = input;
        this.wCity = this.areaCity;//把选中的 城市赋值给wactch监控变量
        this.tempAdd.length = 2;//解决重复地址的bug
        this.tempAdd.push(this.wCity);

      },
      //区级选择
      getDistrictId: function (code, input, index) {

        this.district = code;
        this.District = input;
        // 选择当前添加active
        this.showDistrictList.map(a => a.selected = false);
        this.showDistrictList[index].selected = true;
        // 选取市区选项之后关闭弹层
        this.showChose = true;
        this.areaDistrict = input;
        this.wArea = this.areaDistrict;//把选中的 区 赋值给wactch监控变量
        this.tempAdd.length = 3;//解决重复地址的bug
        this.tempAdd.push(this.wArea);

        this.lastAdd = this.tempAdd.join(" ")
        //完整的地址存入缓存
        sessionStorage.setItem(this.$parent.$options.name + 'cacheProCityArea', this.lastAdd);


      },


      provinceSelected: function () {
        // 清除市级和区级列表
        this.showCityList = false;
        this.showDistrictList = false;
        // 清除市级和区级选项
        this.City = false;
        this.District = false;
        // 选项页面的切换
        this.showProvince = true;
        this.showCity = false;
        this.showDistrict = false;
      },
      citySelected: function () {
        this.showProvince = false;
        this.showCity = true;
        this.showDistrict = false;
      },
      districtSelected: function () {
        this.showProvince = false;
        this.showCity = false;
        this.showDistrict = true;
      },
      _filter(add, name, code) {
        let result = [];
        for (let i = 0; i < add.length; i++) {
          if (code == add[i].id) {
            result = add[i][name];
          }
        }
        return result;
      },
    },
    mounted(){

      //获取永久缓存里的省市区数据
      this.getCityData();

      //如果地址有缓存，先显示出来
      var cacheProCityArea = sessionStorage.getItem(this.$parent.$options.name + 'cacheProCityArea');
      console.info("如果地址有缓存，先显示出来>>>>" + cacheProCityArea)
      if (cacheProCityArea != null && cacheProCityArea != '') {
        this.lastAdd = cacheProCityArea;
      }
    },

    watch: {
      wProvince: function (wProvince) {
        this.$emit('getProvince', wProvince)
      },
      wCity: function (wCity) {
        this.$emit('getCity', wCity)
      },
      wArea: function (wArea) {
        this.$emit('getArea', wArea)
      }
    }
  }
</script>
<style scoped>
  .myAddress {
    width: 100%;
    background-color: white;
    color: #333;
    margin-top: 0.25rem;
  }

  .myAddress .cont {
    /*border-bottom: 1px solid rgba(245, 245, 245, 0.8);*/
  }

  .myAddress .cont span {
    display: inline-block;
    font-size: 0.4rem;
    color: #333;
    line-height: 0.88rem;
    margin-left: 0.32rem;
  }

  .myAddress .cont section {
    /*float: left;*/
    display: flex;
  }

  .myAddress .cont img {
    float: right;
    width: 0.34rem;
    height: 0.5rem;
    margin: auto;
  }

  .showChose {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 120;
    background: rgba(56, 57, 62, 0.8);
  }

  .mask {
    z-index: 121;
    width: 100%;
    height: 44%;
  }

  .eleaddress {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    z-index: 121;
    background: #fff;
    width: 100%;
    height: 56%;
  }

  .area {
    display: inline-block;
    font-size: 0.4rem;
    line-height: 0.88rem;
    width: 2.6rem;
    margin-left: 0.3rem;
    color: #333;
  }

  .addList {
    font-size: 0.4rem;
    line-height: 1.1rem;
    color: #333;
  }

  /* 修改的格式 */
  .eleaddress ul {
    height: 100%;
    margin-left: 3%;
    margin-right: 3%;
    max-height: 100%;
    overflow: auto;
  }

  .eleaddress .title .active {
    color: #ff6400;
    border-bottom: 0.02rem solid #ff6400;
    width: 1.5rem;
  }

  .eleaddress ul .active {
    /*color: #ff6400;*/

    /*border-bottom: 1px solid #ff9933;*/
  }

  .clearCss {
    width: 1rem;
    height: 0.5rem;
    float: right;
    margin-top: 0.5rem;
    margin-right: 0.3rem;
    font-size: 0.45rem;
    /*border: 1px solid pink;*/
  }

  .line_bottom {
    border-bottom: 0.013333rem solid #c9c9c9;
    width: 100%;
  }

  .areaCss {
    font-size: 0.48rem;
    color: #000000;
    line-height: 1.5rem;
    margin-left: 4rem;
  }

  .test {
    display: flex;
    justify-content: space-between;
  }

  .eleaddress ul li .selected:after {
    content: '';
    width: 16px;
    height: 30px;
    transform: rotate(45deg);
    border-style: solid;
    margin-right: 10px;
    margin-top: 7px;
    border-width: 2px;
    border-color: transparent #ff6400 #ff6400 transparent;
  }

  .addCss {
    border: 0;
    font-size: 0.4rem;
    width: 5.7rem;
    height: 0.8rem;
    line-height: 0.8rem;
    margin-left: -0.2rem;
  }

  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .addCss::-webkit-input-placeholder {
    font-size: 29px;
    color: #999;
    padding-left: 0.1rem;
  }
</style>
