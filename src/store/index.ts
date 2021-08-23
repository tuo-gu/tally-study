import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    hash :{
      money: '消费',
      communication: '通讯',
      food: '食物',
      funny: '娱乐',
      shop: '购物',
      hotel: '住房',
      traffic: '交通',
      redpacket: '红包',
      education: '教育',
      medical: '医疗',
      trip:'旅游',
      debts:'还债',
      give:'借出',
      invest:'投资',
      other:'其他',
      salary:'薪资',
      matter:'理财',
      borrow:'借入',
      collect:'收债'
    },
    recordList:[] as RecordItem[],
    dateList:[] as string[],
    dateListAdd:[] as string[],
    dateListReduce:[] as string[],
    sortHoursRecordList:[] as RecordItem[],
    editDate:{} as RecordItem,
    editDateClone:{} as RecordItem,
    onType:'',
    popup:true
  },
  //localStorage的结果排序代码删除了
})
export default store;
