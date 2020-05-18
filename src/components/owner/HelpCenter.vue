#帮助中心
<template>
  <div>
    <ToolBar>帮助中心</ToolBar>
    <Divider></Divider>
    <HelpList v-for="item in content" :key="item.id" :item="item">
    </HelpList>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import HelpList from '../HelpList.vue'
  import Divider from '../Divider.vue'
  export default {
    components: {ToolBar, HelpList, Divider},
    data () {
      return {
        content: [],
        data: [{
          id: 1,
          content_title: '平台背景',
          content_desc: '公司以普惠金融和新零售为使命，致力于通过互联网创新技术、大数据分析、以及专业的风控技术来消除银行和小微零售商户合作的壁垒。公司期望助力银行零售战略转型，为小微零售商户提供品质与可持续的金融服务，构建合作共赢的生态环境。'
        }, {
          id: 2,
          content_title: '怎么查看自己的申请进度？',
          content_desc: '申请款项的使用周期是多少？'
        }, {
          id: 3,
          content_title: '申请通过后，多久可以放款？',
          content_desc: '申请通过后，多久可以放款？'
        }, {
          id: 4,
          content_title: '提现申请成功后款项多久可以到账？',
          content_desc: '提现申请成功后款项多久可以到账？'
        }, {
          id: 5,
          content_title: '怎么设定我的放款银行卡和还款银行卡？',
          content_desc: '怎么设定我的放款银行卡和还款银行卡？'
        }, {
          id: 6,
          content_title: '怎么计算我的贷款利率？',
          content_desc: '怎么计算我的贷款利率？'
        }, {
          id: 7,
          content_title: '为什么我的申请被拒？',
          content_desc: '为什么我的申请被拒？'
        }, {
          id: 8,
          content_title: '申请款项的使用周期是多少？',
          content_desc: '申请款项的使用周期是多少？'
        }, {
          id: 9,
          content_title: '授信金额怎么增大？款项利率怎么降低？',
          content_desc: '授信金额怎么增大？款项利率怎么降低？'
        }
        ]
      }
    },
    mounted(){
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }
      this.$indicator.open();
      this.$api.post(this.$Constants.GET_HELP_LIST, {
        "appId": window.appId,
        "reqId": this.$StringUtils.getReqId(),
        "timestamp": Date.now(),
      }, function (result) {
        this.$indicator.close();
        this.content = result.data
      }.bind(this), function (err) {
        this.$indicator.close()
      }.bind(this))
    }
  }
</script>
<style scoped>
  li img {
    display: flex;
    align-items: flex-end;
  }
</style>
