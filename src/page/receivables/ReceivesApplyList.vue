<template>
  <div class="bg por">
    <van-nav-bar
      class="bar"
      title="应收账款转让申请"
      left-arrow
      fixed
      border='false'
      @click-left="$router.back(-1)"
    />
    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有更多了......"
          @load="onLoadList">
          <div class="navbar-tab">
            <ul>
              <li v-for="(item,index) in receivesApplyList" :key='index' @click="toDetail(item.applyNo)" >
                <div class="item">
                  <div class="item-left">
                    <div class=" item-line1 tal">
                      <div>
                        <p class="contract-name">{{item.draweeName}}</p>
                        <p class="contract-no word-break">{{item.creditContractNo}}</p>
                      </div>
                    </div>
                    <div class="item-line2">
                      <span class="contract-amount">{{item.transferAmt}}</span>
                    </div>
                    <div class="item-line3">
                      <span class="contract-data">{{$utils.formatDay(item.applyDate)}}</span>
                    </div>
                  </div>
                  <div class="item-right flex1 mglt5">
                      <span class="hide">{{formatStatus(item.status) }}</span>
                      <!-- <span class="hide">{{item.status}}</span> -->
                      <img class="img-type" ref='rImgStatus' :src="imgStatusSrc">
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
    </van-pull-refresh>
    <!-- 新增 -->
    <div class="btn-box-fix">
        <LoginButton name="新增" :isInputNonEmpty="true" @click.native="addItem" borderRadius="6px"></LoginButton>
    </div>
    <credit-list :showPop='show'  ref='ch' :creditList='creditList'></credit-list>
  </div>
</template>

<script>
  import LoginButton from '@/components/LoginButton.vue'
  import CreditList from '../components/credit-list'
  export default {
    components: {
      LoginButton,
      CreditList
    },
    data() {
      return {
        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        receivesApplyList: [], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
        imgStatusSrc:'../../../static/assets/add.png',//图片格式化
        //弹窗
        show:false,
        creditList:[],       
      }
    },
    created() {
        if(!sessionStorage.getItem('custNo')){
          this.$toast('请先登录');          
          return
        }
        if(!JSON.parse(sessionStorage.getItem('loginSession')).factoringCustNo ){
          this.$toast('此客户还没认证');          
          return
        }
        this.queryReceivesApplyList();
    },
    methods: {
      toDetail(num) {
        this.$router.push({
          path: this.$RM.ReceivablesApplyDetail,
          query:{id: num}        
        })
      },
      //获取列表
      queryReceivesApplyList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_RECEIVESAPPLY_LIST;
           //this.$http.post(url,{"custNo":"C000210","accountTransfer":{"pageNo":this.pageIndex,"pageSize":this.pageSize}})
           const data = {
                "custNo":sessionStorage.getItem('custNo'),
                "accountTransfer":{
                  "draweeName":"",
                  "pageNum":this.pageIndex,
                  "pageLength":this.pageSize
                }
           }
           this.$http.post(url,data)
           .then(function (res) {
               console.log(res)
               const data = JSON.parse(res.data);
               if(data.respCode == '999999'){
                  this.$toast(data.respMsg)
               }else{
                  const records = data.records
                  console.log(records)
                  console.log(records[1])
                  if (records == null || records.length === 0) {
                    // 加载结束
                    this.upFinished = true
                    return
                  }
                  if (records.length < this.pageSize) {
                    // 最后一页不足10条的情况
                    this.upFinished = true
                  }
                  // 处理数据
                  if (this.pageIndex === 1) {
                    this.receivesApplyList = records
                  } else {
                    this.receivesApplyList = this.receivesApplyList.concat(records)
                  }
               }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryReceivesApplyList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryReceivesApplyList()
      },
      formatStatus(num){
        var num = Number(num.slice(0,2)) ;
        switch(num) {
            case "00":
                return this.imgStatusSrc = require('../../assets/iv_check_uncommit.png')
                break;
            case "01":
                return this.imgStatusSrc = require('../../assets/iv_check_loading.png')
                break;
            case "02":
                return this.imgStatusSrc = require('../../assets/upload_photo.png')
                break;
            case "03":
                return this.imgStatusSrc = require('../../assets/iv_check_sucess.png')
                break;
            default:
              return this.imgStatusSrc = require('../../assets/iv_check_fail.png')
        } 
      },
      //新增
      addItem(){
          //获取子组件的数据
          if(!this.$refs.ch.showPop){
              this.show = false
          }
          this.show = true;
          this.queryContractList();
      },
      //获取新增时的数据
      queryContractList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_CONTRACT_LIST;
           const data = {
             "custNo":sessionStorage.getItem('custNo'),
             "contractStatus":"",
             "pageNo":this.pageIndex,
             "pageSize":this.pageSize
           }
           this.$http.post(url,{"creditContract":data})
           .then(function (res) {
               const data = JSON.parse(res.data);
               this.creditList = data.records            
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },   
    },
  }
</script>

<style scoped>
@import "../../css/common";
.item{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.item-left{
  font-weight: normal;
}
.item-line2{
  margin: 10px 0;
}
.mglt5{
  margin-left: 5px;
  margin-top: 5px;
}
</style>
