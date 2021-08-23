<template>
  <div>
    <div class="numberPad">
      <button  @click="inputContent">7</button>
      <button  @click="inputContent">8</button>
      <button  @click="inputContent">9</button>
      <button  @click="inputContent">←</button>
      <button  @click="inputContent">4</button>
      <button  @click="inputContent">5</button>
      <button  @click="inputContent">6</button>
      <button  @click="computeNumber">-</button>
      <button  @click="inputContent">1</button>
      <button  @click="inputContent">2</button>
      <button  @click="inputContent">3</button>
      <button  @click="computeNumber">+</button>
      <button  @click="inputContent">清空</button>
      <button  @click="inputContent">0</button>
      <button  @click="inputContent">.</button>
      <button  @click="computeNumber" class="ok">
        <span :class="logo">
          <Tags :tagsType="logo"/>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import {Toast} from 'vant';
  Vue.use(Toast)
  @Component
  export default class NumberPad extends Vue{
    @Prop() readonly value!:string;
    created(){
      if(this.$store.state.editDate.amount){
        return this.output=this.$store.state.editDate.amount.toString()
      }

    }
    output='0.00';
    outputReverse='00.0';
    result=0;
    logo='submit';
    @Watch('output')
    onOutputChange(value:string){
      this.$emit('update:output',value);
      this.outputReverse=this.output.split('').reverse().join('').toString();

      if(this.output.length===1&&this.output==='-'||this.output==='+'){
        this.output='0';
      }
      if(this.output==='NaN'){
        this.output='0';
      }
    }
    @Watch('outputReverse')
    outputReverseChange(){
      if(this.outputReverse.indexOf('-')<0 && this.outputReverse.indexOf('+')<0
      ){this.logo='submit';return;}
      else if(this.outputReverse.slice(-1)==='-' && this.outputReverse.indexOf('+')<0
        &&this.outputReverse.split('-').length<3){
        this.logo='submit';return;
      }
      else {this.logo='equal'}
    }

    inputContent(event:MouseEvent){
      const button=(event.target as HTMLButtonElement);
      const input=button.textContent as string;

      if(input==='清空'){
        this.output='0.00';
        return;
      }
      if(input==='←'){
        if(this.output.length===1){
          this.output='0';
          return;
        }
        this.output=this.output.slice(0,-1);
        return;
      }
      if(this.output.length===12){alert('最多输入12位');return;}
      if(this.output==='0.00'||this.output==='0'){//0.00 | 0
        if(this.output==='0'&&input === '0') {return;}//0+0=0
        if(input==='.'){this.output='0.';return;}//0->0.
        if('0123456789'.indexOf(input)>=0){//0-9
          this.output=input;
          return;
        }
      }
      //精确度控制
      if(!('0123456789'.indexOf(input)>=0 &&this.outputReverse.indexOf('.')>=3)){
        if('0123456789'.indexOf(input)>=0&&this.outputReverse.indexOf('.')>=2&&
          this.outputReverse.slice(0,this.outputReverse.indexOf('.')).indexOf('+')<0&&
          this.outputReverse.slice(0,this.outputReverse.indexOf('.')).indexOf('-')<0){
          Toast({
            message: '精确度为小数点后两位',
            position: 'bottom',
          });
          return;}
      }
      if(input==='.'&&this.output.indexOf('.')>=0 &&
        (this.outputReverse.indexOf('+')<0 && this.outputReverse.indexOf('-')<0)
      ){return;}//没有+-的时候，禁用两次..
      if(input==='.'&&
        (this.outputReverse.slice(0,1)==='+'||this.outputReverse.slice(0,1)==='-')
      ){return;}//禁用+/-后面接.
      if(this.outputReverse.indexOf('.') <this.outputReverse.indexOf('-')){//预防两次. .

        if(this.outputReverse.indexOf('.') >this.outputReverse.indexOf('+')
        &&this.outputReverse.indexOf('+')>=0){

          this.output+=input;
          return;
        }
        if(input==='.'&& this.outputReverse.indexOf('.')>0){
          return;
        }
        if(input==='.'&& this.outputReverse.indexOf('.')>=0
          && this.outputReverse.indexOf('.') <this.outputReverse.indexOf('-')){
          return;
        }
        this.output+=input;
        return;
      }
      else if(this.outputReverse.indexOf('.') <this.outputReverse.indexOf('+')){
        if(input==='.'&&this.outputReverse.indexOf('.')>=0){return;}
        this.output+=input;
        return;
      }
      else {
        this.output+=input;
      }
    }
    computeNumber(event:MouseEvent){
      const button=(event.target as HTMLButtonElement);
      const input=button.textContent as string;
      if(input===''){
        if(this.logo==='submit'){
          if(Number(this.output)===0){
            alert('金额不能为0');
          }
          else if(Number(this.output)<0){
            alert('金额不能为负数');
          }
          else{this.$emit('update:value',Number(this.output))
            this.$emit('update:submit')
          return;}
        }
        else {//equal
          if(this.outputReverse.slice(0,1)==='-'||this.outputReverse.slice(0,1)==='+'){
            this.output=this.output.slice(0,-1);
            return;
          }
        }
      }
      if(this.output.length===12){alert('最多输入12位');return;}
      if((input==='+'&&'+'.indexOf(this.output.slice(-1))>=0)||
        (input==='-'&&'-'.indexOf(this.output.slice(-1))>=0)
      ){return;}
      if((input==='+'&& this.output.slice(-1)==='-')){
        this.output=this.output.slice(0,-1)+input;
      }else if((input==='-'&& this.output.slice(-1)==='+')){
        this.output=this.output.slice(0,-1)+input;
      }
      else if((input==='+'||input==='-'||input==='')&&this.output.indexOf('+')>=0
        &&this.output.slice(0,1)==='-') {//-数开头的加
        const arr:string[]=this.output.split('+');
        const item1=Number(arr[0]);
        const item2=Number(arr[1]);
        this.output=(item1+item2).toFixed(2)+input;
        return;
      }else if((input==='+'||input==='-'||input==='') &&this.output.indexOf('+')<0
        &&this.output.slice(0,1)==='-') {//-数开头的减

        if(this.outputReverse.indexOf('-')!==0&&//按删除键'单个负数情况'
          this.output.split('-').length<3 //处理-数-数视为一个-数的情况
        ){
          this.output+=input;
          return;
        }
        const arr:string[]=this.output.split('-');
        const item1=Number(-arr[1]);
        const item2=Number(arr[2]);
        this.output=(item1-item2).toFixed(2)+input;
        return;
      }//顺序：下面运算不得出现在上面运算之前
      else if((input==='+'||input==='-'||input==='')&&this.output.indexOf('+')>=0
        &&this.output.slice(0,1)!=='-'){//两个整数相加
        const arr:string[]=this.output.split('+');
        const item1=Number(arr[0]);
        const item2=Number(arr[1]);
        this.output=(item1+item2).toFixed(2)+input;
      }else if((input==='+'||input==='-'||input==='')&&this.output.indexOf('-')>=0
        &&this.output.slice(0,1)!=='-'){//两个整数相减
        const arr:string[]=this.output.split('-');
        const item1=Number(arr[0]);
        const item2=Number(arr[1]);
        this.output=(item1-item2).toFixed(2)+input;
      }
      else {
        this.output+=input;
      }
      return;
    }
  }

</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .numberPad{
    display: flex;
    flex-wrap: wrap;
    padding:0 16px;
    height: 30vh;
    button{
      border-style: none;
    }
    >.ok {
      font-size: 20px;
      width: 25%;
      height: 25%;
      background: #fff;
      overflow: hidden;
      >span{
        &.equal{
          > .icon {
            width: 1.5em;
            height: 1.5em;
            fill: deepskyblue;
          }
        }
        &.submit{
          > .icon {
            border-radius: 50%;
            padding: 0 0 0 4px;
            margin-left: 2px;
            width: 1.6em;
            height: 1.6em;
            background-color: $color-heightLight;
            fill: #fff;
          }
        }
      }
    }
    >button{
      font-size: 20px;
      width: 25%;
      height: 25%;
      background: #fff;
      overflow: hidden;
    }
  }

</style>