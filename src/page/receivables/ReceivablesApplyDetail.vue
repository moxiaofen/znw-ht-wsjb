<template>
  <div>
    <van-nav-bar
      class="bar"
      title="应收账款转让详情"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <div class="content">

      <div class='item'>
        <span class='item-left'>付款人（买方）姓名</span>
        <span class='item-right flex1'>{{resData.draweeName}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>授信合同号</span>
        <span class='item-right flex1 word-break'>{{resData.creditContractNo}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>本次申请转让笔数</span>
        <span class='item-right'>{{resData.transferCount}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>本次申请转让金额</span>
        <span class='item-right'>{{resData.transferAmt}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>申请日期</span>
        <span class='item-right'>{{$utils.formatDay(resData.applyDate)}}</span>
      </div>

      <div class='item'>
        <span class='item-left'>转让申请状态</span>
        <span class='item-right'>{{formatStatus(resData.status)}}</span>
      </div>

    </div>

    <!-- 应收款清单列表 -->
    <acct-list :itemShow='false' :acctList='accountList'></acct-list>

  </div>
</template>

<script>
  import LoginButton from '@/components/LoginButton.vue'
  import AcctList from '../components/acct-list'
  export default {
    name: "ReceivablesApplyDetail",
    components: {
      LoginButton,
      AcctList
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网

        id:"",
        resData:{}, 
        accountList:[],
      }
    },
    created() {
        this.queryReceivablesApplyDetail();
    },
    methods: {
      //获取详情
      queryReceivablesApplyDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_RECEIVESAPPLY_DETAIL;
          this.$http.post(url,{"applyNo": this.id}) 
          //this.$http.post(url,{"applyNo": "SJ2019083000323"})  
           .then(function (res) {
                  this.resData = JSON.parse(res.data); 
                  console.log(this.resData) 
                  this.accountList = this.resData.accountList             
              })
              .catch(function () {
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
              });
      },
      formatStatus(num){
        switch(num) {
            case "00":
                return "已录入";
                break;
            case "01":
                return "已生效";
                break;
            case "02":
                return "已转让";
                break;
            case "03":
                return "已融资";
                break;
            default:
              return "已核销"
        } 
      },

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
