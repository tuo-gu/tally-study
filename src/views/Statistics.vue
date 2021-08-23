<template>
  <Layout>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      close-on-click-action
    />
    <TypeChoose/>
    <div class="textTip" v-if="dateList.length===0">
      <Tags :tagsType="null"/>
      还没有内容
    </div>

    <ul class="dateList">
      <li v-for="dateItem in dateList"
          :key="dateItem" >
        <div class="date">{{dateItem}}
          <hr/>
        </div>
        <ul class="list">
            <li v-show="item.weekTime===dateItem &&( onTypeNull||item.type===onType)"
              v-for="(item,index) in sortHoursRecordList"
              :key="index" @click="getItem(item)" >

              <div class="inform">
                <Tags :tagsType="item.tags[0]" :class="'--'+item.tags[0]"/>
                <p>
              <span>
                <span>{{hash[item.tags[0]]}}
                  <span v-if="item.notes.length>0">-</span>
                    <span v-if="item.notes.length>0">{{item.notes}}</span>
                </span>
                <span>{{item.createAt}}</span>
              </span>
                  <span>
                <span v-if="item.type==='+'">+ </span>
                <span v-if="item.type==='-'">- </span>
                {{item.amount}}
              </span>
                </p>
              </div>
          </li>
        </ul>
      </li>
    </ul>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import TypeChoose from '@/components/Statistics/TypeChoose.vue';
  import {ActionSheet} from 'vant';

  Vue.use(ActionSheet);

  @Component({
    components: {TypeChoose},
    computed: {
      onTypeNull() {
        if (this.$store.state.onType === '') {
          return true
        }
      },
      onType() {
        return this.$store.state.onType
      },
      sortHoursRecordList() {
        return this.$store.state.sortHoursRecordList;
      },
      hash() {
        return this.$store.state.hash;
      },
      dateList() {
        if (this.$store.state.onType ==='') {
          return this.$store.state.dateList;
        } else {
          if (this.$store.state.onType ==='+') {
            return this.$store.state.dateListAdd;
          }
          if(this.$store.state.onType ==='-'){
            return this.$store.state.dateListReduce;
          }
        }

      },
    }
  })
  export default class Statistics extends Vue{
    created() {
      this.$store.commit('fetchRecord')
      this.$store.commit('updateDateList')
      this.$store.commit('sortDateLists')
      this.$store.commit('clearEditDate')
    }

    itemValue:RecordItem={
      tags:[],
      notes:'',
      type:'',
      amount:0,
    }
    show= false
    getItem(item:RecordItem){
      this.show=true
      this.itemValue=item

    }
    deleteDate(value:RecordItem){
      this.$store.commit('deleteDate',value)
    }

    actions=[
      {id:1, name: '编辑' ,color:'blue'},
      {id:2, name: '删除' ,color: 'red'}
      ]
    onSelect(item: { id: number; }) {
      if(item.id===1){
        this.$router.push({
          path: '/money',
          query: {
            editValue: this.itemValue as unknown as string
          }
        })
      }
      if(item.id===2){
        this.deleteDate(this.itemValue)
      }
    }
  }
</script>
<style lang="scss" scoped>
   @import "~@/assets/style/helper.scss";
   @import "~@/assets/style/iconColor.scss";
   .textTip{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     color: #888888;
     margin-top: 30vh;
     .icon{
       fill:currentColor;
     }
   }
   .dateList{
     margin: 5px 0;
     padding: 0 5px;
     box-shadow: 0 1px 5px #ddd;
     >li{
       margin-top: 5px;
     }
     .date{
       font-size: 1em;
       color: #999;
       white-space: nowrap;
     }
   }
   .date{
     display: flex;

     hr{
       align-self: center;
       flex-grow: 1;
       display: inline-block;
       margin: auto 10px;
       border-top: 1px solid #ccc;
       border-bottom: none;
       border-right: none;
       border-left: none;

     }
   }
  .list{
    overflow: hidden;
    li{
      padding-left: 5px;
      margin: 5px 0;
      .inform{
        display: flex;
        >.icon{
          flex-shrink: 0;
          width: 2.5em;
          height: 2.5em;
          border-radius: 47%;
        }
        >p{
          display: flex;
          flex-grow: 1;
          justify-content: space-between;
          align-items: center;
          margin: 0 10px;
          >span:nth-child(1){
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content:center;
            font-family: $font-hei;
            >span:nth-child(1){

              white-space: nowrap;
              width: 40vw;
              overflow: hidden;
              text-overflow: ellipsis;
              >span:nth-child(2){
                flex-shrink: 3;
                color: #999;
              }
            }
            >span:nth-child(2){
              font-size: 0.8em;
              color: #999;
            }
          }
          >span:nth-child(2){
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

          }
        }
      }
    }
  }

</style>

