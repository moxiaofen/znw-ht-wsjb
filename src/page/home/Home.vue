<template>
  <div class="bg">
    <mt-swipe :auto="4000" style="height: 200px" class="mt-swipe">
      <mt-swipe-item :key="item.id" v-for="item in imgList">
        <img :src="item.img" alt=""  style="height: 200px;width:100%">
      </mt-swipe-item>
    </mt-swipe>

    <ul class="gridBox">
      <li class="item" @click="toPage(index+1)" v-for="(grid,index) in gridList" :key='index'>
        <img class="img" :src="grid.src" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==index+1}">{{grid.title}}</span>
      </li>
    </ul>
    <keep-alive>
        <ul class="cardBox">
          <li v-for="(item,index) in products" :key='index' @click="toApply(item)">
            <div class="item">
              <div class=" item-line1">
                <div class="item-headline">
                  <span class="contract-name">{{item.projectName}}</span>
                  <span class="contract-no">{{item.projectNo}}</span>
                </div>
              </div>
              <div class="item-line2">
                <div class="item-line2-div">
                  <div class="item-box-dev">
                    <img class="item-img" src="../../assets/icon_available.png" alt="">
                    <span class="item-title">授信总额度（元）</span>
                  </div>
                  <span class="item-title2">{{item.creditLimitAmt}}</span>
                </div>
                <div class="item-line2-div">
                  <div class="item-box-dev">
                    <img class="item-img" src="../../assets/icon_residue.png" alt="">
                    <span class="item-title">剩余额度（元）</span>
                  </div>
                  <span class="item-title3">{{item.creditlimitBal}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
    </keep-alive>
  </div>
</template>

<script>
    export default {
        name: "home",
        components: {},
        computed: {},
        data() {
            return {
                activeGuid: null,
                products:[],
                imgList: [
                    {
                        id: 1,
                        img: require('../../assets/bg_first.png')
                    },
                    {
                        id: 2,
                        img: require('../../assets/bg_second.png')
                    },
                    {
                        id: 3,
                        img: require('../../assets/bg_third.png')
                    },
                    {
                        id: 4,
                        img: require('../../assets/bg_fourth.png')
                    },
                    {
                        id: 5,
                        img: require('../../assets/bg_fifth.png')
                    },
                ],
                gridList: [
                    {
                        gridId: 1,
                        src: require('../../assets/icon_login.png'),
                        title: "登录/注册"
                    },
                    {
                        gridId: 2,
                        src: require('../../assets/icon_recomment.png'),
                        title: "合同管理"
                    },
                    {
                        gridId: 3,
                        src: require('../../assets/icon_progress.png'),
                        title: "融资意向"
                    },
                    {
                        gridId: 4,
                        src: require('../../assets/icon_pay.png'),
                        title: "业务办理"
                    }
                ],           
            }
        },
        mounted() {
            this.queryProductList(); 
            //身份认证返回，清除保存的页面数据
            // sessionStorage.setItem('keepAliveFlag',0)      
        },
        methods: {
            toPage(num) {
                this.activeGuid = num
                // // 登录/注册
                if (num == 1) {
                    this.$router.push({
                        path: this.$RM.LoginPage
                    }) 
                }
                // // 合同管理
                if (num == 2) {
                    this.$router.push({
                        path: this.$RM.ContractPage
                    })
                }
                // 融资意向
                if (num == 3) {
                    this.$router.push({
                        path: this.$RM.FianancingEOI
                    })
                }
                // 应收款 改为 业务办理 
                if (num == 4) {
                    this.$router.push({
                        path: this.$RM.Receivables
                    })
                }
            },
            toApply(item) {
                sessionStorage.setItem('FianancingApply',JSON.stringify(item))
                //this.$store.commit('setFianancingApply',item)//vuex数据
                //localStorage.setItem('FianancingApply',JSON.stringify(item))//localStorage保存久点
                sessionStorage.setItem('FianancingApplyTypt',0)
                console.log(item)
                this.$router.push({
                    path: this.$RM.FianancingApply
                })
            },
            //获取产品列表
            queryProductList() {
                //开始请求登录接口
                const url = this.$api.ROOT + this.$Constants.QUERY_PRODUCT_LIST;
                this.$http.post(url,{})//operType操作类型0.注册，1.登陆
                    .then(function (res) {
                        const data = JSON.parse(res.data);
                        this.products = data.product;
                        //console.log(data)
                    })
                    .catch(function () {
                        this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
                    });
            },


        }
    }
</script>
<style >
 .mt-swipe .mint-swipe-indicator.is-active{
    background: #fec901 !important;
  }
  .mint-swipe-indicator{
    opacity: 1;
    background:rgba(0, 0, 0, 0.3)
  }
</style>
<style scoped>
@import "../../css/common";
.banner{
  width: 100%;
}
  .cardBox .item{
    padding: 8px 0;
  }

.cardBox .item{
   text-align: center;
   margin-top: 5px;
}
.item-headline{
  text-align: left;
}

   .item-box-dev {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 5px;
  }
    .item-line2-div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
    .item-img {
    height: 20px;
    width: 20px;
  }

.item-line1 {
    padding-left: 16px;
    font-weight: 600;
  }
.item-line2{
  margin-top: 0;
}

  .item-title {
    margin-left: 8px;
    font-size: 17px;
    color: #343434;
  }

  .item-title2 {
    font-size: 17px;
    color: red;
  }
  .item-title3 {
    font-size: 17px;
    color: #006666;
  }



</style>
