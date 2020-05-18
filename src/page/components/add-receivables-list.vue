<template>
<div>

      <div class='cont-sides'>
          <p class="cont-item">应收账款清单      
          </p>
          <img  v-if="itemShow" class="add-img" src="../../assets/icon_add.png"  @click="addReceives"/>
      </div>
      <ul class="bgcf">
        <li class="del-item-list" v-for="(item,index) in receivablesList" :key='index' @click="toDetail(item.acctCode,'finance',item)"> 
          <van-swipe-cell>
            <div class="receivables-lib">
                <div class=" item-receivables-line1">
                  <div>
                    <span class="receivables-name  ell2 word-break">{{item.draweeName}}</span>
                    <span class="receivables-no">{{item.tradeContractNo}}</span>
                  </div>
                </div>
                <div class="item-receivables-line2">
                  <span class="receivables-amount">{{item.contractAmt}}</span>
                </div>
                <div class="item-receivables-line3">
                  <span class="receivables-data">{{$utils.formatDay(item.paymentEndDate)}}</span>
                </div>
            </div>
            <template #right>
              <van-button square type="danger" text="删除" @click="del(index)" />
            </template>
          </van-swipe-cell>

        </li>
      </ul>

</div>
</template>

<script>
  import Divider from '@/components/Divider.vue'
    export default {
        components: {
          Divider,
        },
        props:['itemShow','acctList'],
        computed: {},
        data() {
          return {
            receivablesList:[],
          }
        },
        created() {
            this.getRouteDate();
        },
        methods: {
          toDetail(num) {
            this.$router.push({
              path: this.$RM.ReceivablesDetail,
              query:{id: num}        
            })
          },
          //获取列表
          getRouteDate(){
              // this.routeData =JSON.parse(sessionStorage.getItem('FianancingApply')) 
              //this.routeData = this.$store.state.fianancingApply;
              // if(sessionStorage.getItem('FianancingApplyTypt')==0){
              // //if(this.$store.state.fianancingApplyTypt == 0){  
              //     this.$store.state.addReceivablesList = [];
              //     this.receivablesList = []
              // }else{
              //     this.receivablesList = this.$store.state.addReceivablesApplyList
              // }
              
              if(sessionStorage.getItem('addReceivales')=='0'){//从应收账款转让跳转过来的
                  this.receivablesList = this.$store.state.addReceivablesApplyList
              }else{
                  // this.$store.state.addReceivablesList = [];
                  // this.receivablesList = []
                  this.receivablesList = this.$store.state.addReceivablesList
              }

          },

          addReceives(){
            //sessionStorage.setItem('addReceivales',0)//区别其他，设置addReceivales为0
            this.$router.push({
              path: this.$RM.AddReceivables
            }) 
          },
          // formatDay2(str){
          //   if(str){
          //       var fstr = ''+str.slice(0,4)+'-'+str.slice(4,6)+'-'+str.slice(6,8)
          //       return fstr;
          //   }
          // },
          del(index){
              console.log(index)            
              if(sessionStorage.getItem('addReceivales')=='0'){//从应收账款转让跳转过来的
                  this.$store.state.addReceivablesApplyList.shift(index)
              }else{
                  this.$store.state.addReceivablesList.shift(index)
              }
          },

        }
    }
</script>

<style scoped>
@import "../../css/common";
.van-button{
  height: 100%;
}
  /* .add-img {
    width: 25px;
    height: 25px;
    padding: 10px 15px 9px
  } 
  .cont-sides{
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fafafa;
  }

  .receivables-lib {

    border-bottom: 1px solid #000;
  }

  .img-type {
    width: 40px;
    height: 40px;
  }

  .item-receivables-line1 {
    letter-spacing: 1px;
    color: #c9c9c9;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-receivables-line2 {
    display: flex;
  }

  .item-receivables-line3 {
    display: flex;
    margin-top: 5px;
  }

  .receivables-name {
    color: #1f1f1f;
    margin-left: 16px;
    font-size: 18px;
  }

  .receivables-no {
    color: #969696;
    font-size: 12px;
  }



  .receivables-data {
    margin-left: 16px;
    color: #343434;
    font-size: 13px;
  }

  .receivables-amount {
    font-size: 19px;
    margin-left: 16px;
    color: #ff0000;
  } */


</style>
