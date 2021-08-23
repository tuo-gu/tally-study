<template>
  <div class="tagsList">
    <ul class="types">
      <li :class="type==='-'&&'selected'" @click="selectType('-')">支出</li>
      <li :class="type==='+'&&'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import { Toast } from 'vant';

  Vue.use(Toast);

  @Component
  export default class TimeRange extends Vue {
    type=this.$store.state.onType|| ''
    @Prop()  value!:string;
    selectType(type:string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }else {
        if(this.type===type){
          this.type=''
        }else {
          this.type=type
        }
        if(this.type===''){
          Toast({
            message:'已切换为全览',
            duration:700
          });
        }
        this.$store.commit('selectType',this.type)
        this.$store.commit('updateDateList')
        this.$store.commit('sortDateLists')

      }

    }
  }
</script>

<style lang="scss" scoped>
  .types{
    display: flex;
    justify-content: space-evenly;
    background-color: white;
    font-size: 20px;
    box-shadow: inset 0 -1px 5px #ddd;
    >li{
      display: flex;
      justify-content: center;
      flex-grow: 1;
      padding:4px ;
      color: #999999;
      &.selected {
        box-shadow: inset 0 -1px 4px deepskyblue;
        color: black;
      }
    }
  }
</style>