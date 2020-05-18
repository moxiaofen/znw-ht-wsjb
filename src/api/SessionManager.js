//意见反馈
const FeedBack = 'FeedBack'
//新商盟授权页面
const BusinessAccess = 'BusinessAccess'
const Register = 'Register'
const QuickWriteOne = 'QuickWriteOne'
const QuickWriteThree = 'QuickWriteThree'
const QuickWriteTwo = 'QuickWriteTwo'
const WriteOne = 'WriteOne'
const WriteTwo = 'WriteTwo'

export default{
  BusinessAccess,
  FeedBack,
  Register,
  QuickWriteOne,
  QuickWriteThree,
  QuickWriteTwo,
  WriteOne,
  WriteTwo,
  clearCheckBox(target){
    sessionStorage.removeItem(target.$options.name + 'checked');
  },
  clearFeedBack(target){
    sessionStorage.removeItem(target.$options.name + 'checked');
  },
  clearBusinessAccess(target){
    sessionStorage.removeItem(this.BusinessAccess + 'checked');
    sessionStorage.removeItem(this.BusinessAccess + 'password');
    sessionStorage.removeItem(this.BusinessAccess + 'phone');
    sessionStorage.removeItem(this.BusinessAccess + 'code');
    sessionStorage.removeItem('account');
  },
  // clearAll(target){
  //   sessionStorage.removeItem(target.$options.name + 'checked')
  // },
  clearRegister(){
    sessionStorage.removeItem(this.Register + 'checked');
    sessionStorage.removeItem(this.Register + 'code');
    sessionStorage.removeItem(this.Register + 'phone');
  },
  saveRegister(target, code, phone){
    sessionStorage.setItem(this.Register + 'code', code);
    sessionStorage.setItem(this.Register + 'phone', phone);
  },
  saveWrite(relation){
    sessionStorage.setItem(this.WriteOne + 'cacheUrgent', relation);
  },
    clearWrite(){

    sessionStorage.removeItem("cacheHouseImageId");//把返回来的房产图片id也缓存起来，防止丢失，记得清除

    sessionStorage.removeItem("cacheCarImageId");//把返回来的车辆图片id也缓存起来，防止丢失，记得清除

    sessionStorage.removeItem('cacheRecommedCode');//推荐人代码
    sessionStorage.removeItem('cacheLawName');
    sessionStorage.removeItem('cacheIdcard');
    sessionStorage.removeItem('cacheUrgentRelation');
    sessionStorage.removeItem('cacheUrgentName');
    sessionStorage.removeItem('cacheUrgentPhone');
    sessionStorage.removeItem('cacheAccountName');
    sessionStorage.removeItem('cacheLicen');
    sessionStorage.removeItem('cacheYancao');
    sessionStorage.removeItem('cacheNewAccount');
    sessionStorage.removeItem('cacheAccountPwd');
    sessionStorage.removeItem('cacheZuoji');
    sessionStorage.removeItem('cacheQuhao');
    sessionStorage.removeItem('cacheInputYanCode');
    sessionStorage.removeItem('cacheApplyYanCode');
    sessionStorage.removeItem('cacheStreet');
    sessionStorage.removeItem('cacheHouse');
    sessionStorage.removeItem('cacheCar');
    sessionStorage.removeItem('cacheStream');
      sessionStorage.removeItem('cacheCarGarbage');//清除掉  删除按钮的缓存
      sessionStorage.removeItem('cacheHouseGarbage');//清除掉  删除按钮的缓存
    sessionStorage.removeItem('cacheUpHidden');//第一次流水初始化的上传图片，true是显示
    sessionStorage.removeItem(this.WriteOne + 'cacheUrgent');//紧急联系人
    sessionStorage.removeItem(this.WriteTwo +'cacheProCityArea');//地址
    sessionStorage.removeItem(this.WriteTwo + 'checked');
  },
  saveQuickWrite(relation){
    sessionStorage.setItem(this.QuickWriteThree +'cacheUrgent', relation)
  },
  clearQuickWrite(){
    sessionStorage.removeItem("quickCacheHouseImageId");//把返回来的房产图片id也缓存起来，防止丢失，记得清除

    sessionStorage.removeItem("quickCacheCarImageId");//把返回来的车辆图片id也缓存起来，防止丢失，记得清除
    sessionStorage.removeItem('quickCacheRecommedCode');//推荐人代码
    sessionStorage.removeItem('quickCacheLawName');
    sessionStorage.removeItem('quickCacheIdcard');
    sessionStorage.removeItem('quickCacheUrgentRelation');
    sessionStorage.removeItem('quickCacheUrgentName');
    sessionStorage.removeItem('quickCacheUrgentPhone');
    sessionStorage.removeItem('quickCacheAccountName');
    sessionStorage.removeItem('quickCacheLicen');
    sessionStorage.removeItem('quickCacheYancao');
    sessionStorage.removeItem('cacheAccountName');
    sessionStorage.removeItem('quickCacheAccountPwd');
    sessionStorage.removeItem('quickCacheZuoji');
    sessionStorage.removeItem('quickCacheQuhao');
    sessionStorage.removeItem('quickCacheInputYanCode');
    sessionStorage.removeItem('quickCacheApplyYanCode');
    sessionStorage.removeItem('quickCacheStreet');
    sessionStorage.removeItem('quickCacheAccountShopName');//商户门店名称
    sessionStorage.removeItem('quickCacheHouse');
    sessionStorage.removeItem('quickCacheCar');
    sessionStorage.removeItem('quickCacheStream');
    sessionStorage.removeItem('quickCacheUpHidden');//第一次流水初始化的上传图片，true是显示
    sessionStorage.removeItem('quickCacheCarGarbage');//清除掉  删除按钮的缓存
    sessionStorage.removeItem('quickCacheHouseGarbage');//清除掉  删除按钮的缓存
    sessionStorage.removeItem(this.QuickWriteThree +'cacheUrgent');//紧急联系人
    sessionStorage.removeItem(this.QuickWriteTwo +'cacheProCityArea');//地址
    sessionStorage.removeItem(this.QuickWriteOne + 'checked');
    sessionStorage.removeItem(this.QuickWriteTwo + 'checked');
  },
}
