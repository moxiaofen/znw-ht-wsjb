<template>
  <div>
    <van-nav-bar
      class="bar"
      title="ABS资产详细信息"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">
      <!--与顶部保持距离-->
      <div class='item'>
        <span class='item-left'>资产编号</span>
        <span class='item-right'>{{resData.assetsNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>ABS名称</span>
        <span class='item-right'>{{resData.absName}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>券商</span>
        <span class='item-right'>{{resData.securitiesTrader}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>律师事务所</span>
        <span class='item-right'>{{resData.lawFirm}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>信用评级</span>
        <span class='item-right'>{{resData.creditRating}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>信用评级机构</span>
        <span class='item-right'>{{resData.creditRatingOrg}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>会计师事务所</span>
        <span class='item-right'>{{resData.accountingFirm}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>发行场所</span>
        <span class='item-right'>{{resData.issuingPlace}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>基础资产类型</span>
        <span class='item-right' ref="rAssetsType">没返回这字段</span>
      </div>

      <div class='item'>
        <span class='item-left'>担保增信机构</span>
        <span class='item-right'>{{resData.guaranteeOrg}}</span>
      </div>
      
      <!-- 基础资产信息 -->
      <broker-list :tip='tip' :brokerList='assetsList'></broker-list>
      
      <!-- 资料信息 -->
      <file-list :tipFile='tipFile' :fileList='fileList'></file-list>

    </div>
  </div>
</template>

<script>
  import BrokerList from '../components/broker-list'
  import FileList from '../components/file-list'

  export default {
    components: {
      BrokerList,
      FileList
    },
    data() {
      return {
        nonet: false, //断网

        id:"",
        resData:{}, 
        assetsList:[],
        tip:false,
        fileList:[],
        tipFile:false,    
      }
    },
    created() {
        this.queryBrokerDetail();
    },
    methods: {
      //获取详情
      queryBrokerDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_BROKER_DETAIL;
          this.$http.post(url,{"assetsNo": this.id})
          //this.$http.post(url,{"assetsNo": 'ABSCI2019081600000027'})
              .then(function (res) {
                  this.resData = JSON.parse(res.data); 
                  console.log(this.resData)  
                  this.assetsList = this.resData.assetsList  
                  this.tip = (this.assetsList.length<1) ? true:false;
                  this.fileList = this.resData.fileList 
                  this.tipFile = (this.fileList.length<1) ? true:false; 
                  console.log(this.assetsList)

              })
              .catch(function () {
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
              });
      }
    },

  }
</script>

<style scoped>
@import "../../css/common";
  .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .content {
    margin-top: 46px;
    position: relative;
  }
 
</style>
