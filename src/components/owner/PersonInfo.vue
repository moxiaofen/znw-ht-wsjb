<!--我的信息界面-->
<template>
  <div class="PersonInfo">
    <ToolBar>我的信息
      <span slot="right" class="barRight" @click="editSave">{{isEdit?'保存':'编辑'}}</span>
    </ToolBar>
    <Divider></Divider>
    <EditInfoItem :isEdit="false" v-for="item in unEditableList1" :editContent="item.content" :key="item.id"
                  :desc="item.desc">
    </EditInfoItem>
    <Divider class="divider_2"></Divider>
    <Divider class="divider20"></Divider>
    <EditInfoItem :isEdit="false" v-for="item in unEditableList2" :editContent="item.content" :key="item.id"
                  :desc="item.desc">
    </EditInfoItem>
    <Divider class="divider_2"></Divider>
    <Divider class="divider20"></Divider>
    <ChooseInfoItem :isEdit="isRelationEdit" @click.native="choose"
                    :class="{edit:isEdit,save:!isEdit}" ref="relation">紧急联系人关系
    </ChooseInfoItem>
    <ChooseInfoItem :isEdit="isEdit"
                    placeHolder="请输入紧急联系人姓名" :class="{edit:isEdit,save:!isEdit}" :isInput="isEdit"
                    maxLength="6" ref="name">
      紧急联系人姓名
    </ChooseInfoItem>
    <ChooseInfoItem :isEdit="isEdit"
                    placeHolder="请输入紧急联系人方式" :class="{edit:isEdit,save:!isEdit}" :isInput="isEdit"
                    maxLength="11" ref="phone">
      紧急联系人联系方式
    </ChooseInfoItem>
    <Divider class="divider_2"></Divider>
    <ContactRelationPicker ref="picker" @onValueChange="onValueChange"></ContactRelationPicker>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import EditInfoItem from '../EditInfoItem.vue'
  import ChooseInfoItem from '../ChooseInfoItem.vue'
  import ContactRelationPicker from '../ContactRelationPicker.vue'
  export default{
    components: {ToolBar, Divider, EditInfoItem, ChooseInfoItem, ContactRelationPicker},
    data(){
      return {
        isEdit: false,
        isRelationEdit: false,
        // 新商盟信息
        accNumber: '',
        creditCode: '',
        idNo: '',
        legalPersonName: '',
        merchantName: '',
        regAddress: '',
        newBusinessAccount: '',
        phoneNo: '',
        tobaccoLicenseNo: '',
      }
    },
    computed: {
      unEditableList1(){
        return [
          {
            id: 0,
            desc: '法人姓名',
            content: this.$StringUtils.encryptText(this.legalPersonName)
          },
          {
            id: 1,
            desc: '身份证',
            content: this.$StringUtils.encryptIdNumber(this.idNo)
          }, {
            id: 2,
            desc: '联系方式',
            content: this.$StringUtils.encryptPhone(this.phoneNo)
          }
        ]
      },
      unEditableList2(){
        return [
          {
            id: 3,
            desc: '商户名称',
            content: this.$StringUtils.encryptText(this.merchantName)
          },
          {
            id: 4,
            desc: '营业执照注册号',
            content: this.$StringUtils.encryptText(this.creditCode)
          }, {
            id: 5,
            desc: '烟草许可证号',
            content: this.$StringUtils.encryptText(this.tobaccoLicenseNo)
          }, {
            id: 6,
            desc: '商户门店地址',
            content: this.regAddress
          }
        ]
      }
    },
    mounted() {

      //进入新界面重置session失效时间
      //15分钟之后失效，强制登陆
      if(this.$StringUtils.isEmpty(this.$storeData.fetchSession())){
        return
      }

      this.$indicator.open('加载中')
      this.$api.post(this.$Constants.GET_USER_INFO,
        {
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId()
        }, function (result) {
          this.$indicator.close()
          console.log(JSON.stringify(result));
          if (result && result.data) {
            this.phoneNo = result.data.phoneNo
            this.idNo = result.data.idNo
            this.legalPersonName = result.data.legalPersonName
            this.tobaccoLicenseNo = result.data.tobaccoLicenseNo
            this.creditCode = result.data.creditCode
            this.merchantName = result.data.merchantName
            this.regAddress = result.data.regAddress
            this.$refs.relation.editContent = result.data.homeReRelation
            this.$refs.name.editContent = result.data.homeReName
            this.$refs.phone.editContent = result.data.homeRePhone
          }
        }.bind(this), function (err) {
          this.$indicator.close()
        }.bind(this))
    },
    methods: {
      onValueChange: function (value) {
        this.$refs.relation.editContent = value
      },
      editSave: function () {
        if (this.isEdit) {
          this.saveContact()
        } else {
          this.isEdit = !this.isEdit
          this.isRelationEdit = !this.isRelationEdit
        }
      },
      onAddressChange(picker, values) {
        picker.setSlotValues(1, address[values[0]]);
        this.addressProvince = values[0];
        this.addressCity = values[1];
      },
      choose: function () {
        if (this.isRelationEdit) {
          this.$refs.picker.popupVisible = true
        }
      },
      saveContact(){
        if (this.$StringUtils.isEmpty(this.$refs.relation.editContent)) {
          this.$toast('紧急联系人不能为空')
          return
        }
        if (this.$StringUtils.isEmpty(this.$refs.name.editContent)) {
          this.$toast('紧急联系人姓名不能为空')
          return
        } else {
          if (this.$refs.name.editContent.length < 2 || !this.$regx.isChinese(this.$refs.name.editContent)) {
            this.$toast('紧急联系人姓名必须为2-6位中文')
            return
          }
        }
        if (this.$StringUtils.isEmpty(this.$refs.phone.editContent)) {
          this.$toast('紧急联系人电话号码不能为空')
          return
        } else {
          if (!this.$regx.isPhone(this.$refs.phone.editContent)) {
            this.$toast('紧急联系人电话号码格式错误')
            return
          }
        }
        this.$indicator.open('保存中')
        this.$api.post(this.$Constants.UPDATE_CONTACT,
          {
            "appId": window.appId,
            "reqId": this.$StringUtils.getReqId(),
            "timestamp": Date.now(),
            "openId": this.$StringUtils.getOpenId(),
            "data": {
              "homereRelation": this.$refs.relation.editContent,
              "homereName": this.$refs.name.editContent,
              "homerePhone": this.$refs.phone.editContent
            }
          }, function (result) {
            this.$indicator.close();
            if (result && result.ret == '0') {
              Countly.init({
                app_key: this.$Constants.APPKEY,
                url: this.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: this.$Constants.SaveClick,
                "segmentation": {
                  appId: window.appId,
                }
              });

              this.$toast('我的信息修改保存成功！')
            }
            this.isEdit = !this.isEdit
            this.isRelationEdit = !this.isRelationEdit
          }.bind(this), function (err) {
            this.$indicator.close()
          }.bind(this))
      }
    }
  }
</script>
<style scoped>
  .PersonInfo {
    background: #f5f5f5;
    height: 100%;
  }

  .divider20 {
    margin-top: 20px;
  }

  .divider_2 {
    margin-top: -2px
  }

  .barRight {
    font-size: 30px;
    color: #333333;
    position: absolute;
    right: 0;
    padding-right: 30px;
  }

  .edit {
    color: #333333;
  }

  .save {
    color: #999999;
  }

  .page-picker-wrapper {
    background-color: #fff;
    text-align: center;
  }

</style>
