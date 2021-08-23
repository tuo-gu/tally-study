<template>
  <div class="date">
    <div class="hours">
        <span  @click="showPopup2">
          <Tags tags-type="time"/>
         <span>：{{calenderHours}}</span>
        </span>
      <van-popup v-model="showHours"
                 position="bottom" :style="{ height: '30%' }"
                 get-container="#app"
      >
        <van-datetime-picker
          v-model="currentTime"
          type="time"
          title="选择时间"
          :min-hour="0o1"
          :max-hour="23"
          visible-item-count="3"
          @cancel="cancelHours"
          @confirm="confirmHours"
        />
      </van-popup>
    </div>
    <div class="year">
        <span  @click="showPopup">
          <Tags tags-type="calendar"/>
          <span>：{{calenderYear}}</span>
        </span>
        <van-popup v-model="show"
                   position="bottom" :style="{ height: '30%' }"
                   get-container="#app"
        >
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            visible-item-count="3"
            @cancel="cancel"
            @confirm="confirm"
          />
        </van-popup>
      </div>

  </div>
</template>

<script >
  import Vue from 'vue'
  import {Popup} from 'vant';
  import { DatetimePicker } from 'vant';

  Vue.use(DatetimePicker);
  Vue.use(Popup);

  export default {
    data() {
      return {
        show: false,
        showHours:false,
        minDate: new Date(2015, 0, 1),
        maxDate: new Date(2030, 10, 1),
        currentDate:new Date(),
        currentTime: '12:00',
        options : {weekday: "long", year: "numeric", month: "2-digit", day: "2-digit"},
        transformTime:'',
        calenderYear:'今天',
        calenderHours:''
      };
    },
    created(){
      const initTime=this.currentDate.getHours().toString()+':'+(this.currentDate.getMinutes()<10 ?'0':'')
        +this.currentDate.getMinutes().toString();
      this.calenderHours=this.$store.state.editDate.createAt||initTime;
      this.calenderYear=this.$store.state.editDate.weekTime||'今天';
      this.currentTime=this.$store.state.editDate.createAt|| initTime;
    },
    methods: {
      showPopup() {
        this.show = true;
      },
      showPopup2() {
        this.showHours = true;
      },
      cancel(){
        this.show=!this.show;
      },
      cancelHours(){
        this.showHours=!this.showHours;
      },
      confirm(value){
        this.show=!this.show;
        this.transformTime=value.toLocaleString('zh', this.options);
        this.$emit('update:dateSaveYear',this.transformTime)
        this.calenderYear=this.transformTime
        if(!(JSON.stringify(this.$store.state.editDate)==='{}')){
          this.$store.commit('confirmCommit',this.transformTime)
        }
      },
      confirmHours(value){
        this.showHours=!this.showHours;
        this.cancelHours=value
        this.$emit('update:dateSaveHours',value)
        this.calenderHours=value
        if(!(JSON.stringify(this.$store.state.editDate)==='{}')){
          this.$store.commit('confirmHoursCommit',value)
        }
      },

    },
  }
</script>

<style lang="scss" scoped>
  .date{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    .icon{
      width: 1.5em;
      fill:deepskyblue;
    }
  }

  .hours{
    >span{
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-right: 1em;
      >span{
        color: #888888;
      }
    }
  }
  .year{
    >span{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      >span{
        color: #888888;
      }
    }
  }
</style>