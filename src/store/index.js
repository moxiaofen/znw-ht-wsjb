import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './action'
// import getters from './getters'

Vue.use(Vuex)

const state = {
	addReceivablesList:[],//融资申请-新增应收账款
	addReceivablesApplyList:[],
	acctItem:{},//应收账款列表数据----待检测
	paymentItem:{},//台账管理，提款信息列表数据---待检测
	repaymentItem:{},//台账管理，回款信息列表数据---待检测
	fianancingApply:{},//首页到融资申请页面的数据---待检测
	fianancingApplyTypt:'',//融资申请页面的标志 : 判断 addReceivablesList-新增应收账款
	//addReceivales--add-receivables-list 页面跳转
	pdfData:{},//pdf数据
	brokerItem:{},//ABS基础资产信息列表数据---待检测
	refactoringItem:{},//再保理基础资产信息列表数据---待检测



}

const getters = {
	

	

    


}


const mutations = {
	setAcctItem(state,item){
		return state.acctItem = item
	},

	setPaymentItem(state,item){
		return state.paymentItem = item
	},

	setRepaymentItem(state,item){
		return state.repaymentItem = item
	},

	setFianancingApply(state,item){
		return state.fianancingApply = item
	},

	setPdfData(state,item){
		return state.pdfData = item
	},
	
	setBrokerItem(state,item){  //session
		return state.brokerItem = item
	},
	setRefactoringItem(state,item){
		return state.refactoringItem = item
	},




}



const actions = {
	getAddCount(context,num){
		context.commit('addCount',num)
	},
	getDelCount(context,num){
		context.commit('delCount',num)
	}


}


export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})