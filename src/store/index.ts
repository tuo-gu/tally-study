import Vue from 'vue'
import Vuex from 'vuex'
import {recordModel} from '@/recordModel';

Vue.use(Vuex)

const localStorageNameKey = 'recordList';
const options = {weekday: "long", year: "numeric", month: "2-digit", day: "2-digit"}
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
  mutations:{
    editDateCloneFn(state){
      state.editDateClone = recordModel.clone(state.editDate);
    },
    changePopup(state){
      state.popup=false
    },

    clearEditDate(state){
      state.editDate={} as RecordItem;
      state.editDateClone={} as RecordItem;
    },
    fetchRecord(state) {
      state.recordList= JSON.parse(window.localStorage.getItem(localStorageNameKey) || '[]') as RecordItem[];
    },
    updateDateList(state){
      function sortRecordList(arr:RecordItem[]):any[]{
        if(arr.length<=1){return arr}
        const pivotIndex=Math.floor(arr.length/2)
        const pivot=arr.splice(pivotIndex,1)[0]
        const left=[] as any[]
        const right=[] as any[]
        for(let i=0;i<arr.length;i++){
          // @ts-ignore
          if(arr[i].createAt >pivot.createAt ){
            left.push(arr[i])
          }else{
            right.push(arr[i])
          }
        }
        return sortRecordList(left).concat([pivot],sortRecordList(right))
      }
      state.sortHoursRecordList= sortRecordList(state.recordList)
    },
    clearDateList(state){
      state.dateListAdd=[]
      state.dateListReduce=[]
      state.dateList=[]
    },
    sortDateLists(state){
      store.commit('clearDateList')
      store.commit('fetchRecord')
      for(let i=0;i<state.recordList.length;i++){
        const record=state.recordList[i]
        if(record.weekTime!==undefined){
          const index=record.weekTime.toString()
          if(state.onType==='+'){
            if(record.type===state.onType
              &&state.dateListAdd.indexOf(index)<0){
              state.dateListAdd.push(index)
            }
          }
          if(state.onType==='-'){
            if(record.type===state.onType
              &&state.dateListReduce.indexOf(index)<0){
              state.dateListReduce.push(index)
            }
          }
          if(state.dateList.indexOf(index)<0){
            state.dateList.push(index)
          }
        }
      }

      function sort(arr:string[]):string[]{
        if(arr.length<=1){return arr}
        const pivotIndex=Math.floor(arr.length/2)
        const pivot=arr.splice(pivotIndex,1)[0]
        const left=[]
        const right=[]
        for(let i=0;i<arr.length;i++){
          if(arr[i]>pivot){
            left.push(arr[i])
          }else{
            right.push(arr[i])
          }
        }
        return sort(left).concat([pivot],sort(right))
      }

      state.dateListAdd= sort(state.dateListAdd)
      state.dateListReduce= sort(state.dateListReduce)
      state.dateList= sort(state.dateList)
    },
    createRecord(state,record){
      const recordClone = recordModel.clone(record);
      const time = new Date();
      if(!(JSON.stringify(state.editDate)==='{}')){
        recordClone.weekTime =state.editDate.weekTime
        recordClone.createAt = state.editDate.createAt

      }else {
        recordClone.weekTime =recordClone.weekTime
          || time.toLocaleString('zh', options);
        recordClone.createAt = recordClone.createAt
          || time.getHours().toString() + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes().toString();

      }
      state.recordList.push(recordClone);
    },
    save(state) {
      window.localStorage.setItem(localStorageNameKey, JSON.stringify(state.recordList));
    },
    remove(){
      window.localStorage.removeItem(localStorageNameKey);
    },
    updateEditDate(state,value:RecordItem){
      state.editDate=value
    },
    confirmCommit(state,value){
      state.editDate.weekTime=value
    },
    confirmHoursCommit(state,value){
      state.editDate.createAt=value
    },
    selectType(state,value:string){
      state.onType=value
    }
  }
})
export default store;
