<template>
  <ul class="types">
    <li :class="types==='-'&&'selected'" @click="selectType('-')">支出</li>
    <li :class="types==='+'&&'selected'" @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  @Component
  export default class Types extends Vue{
    @Prop(String) value:string|undefined
    types=this.$store.state.editDate.type|| '-';
    selectType(type:string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.types=type
      this.$emit('update:value',type)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .types{
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 3px rgba(0,0,0,0.25);
    font-size: 20px;
    >li{
      display: flex;
      justify-content: center;
      flex-grow: 1;
      padding:4px ;
      &.selected{
        box-shadow:  0 2px 1px $color-heightLight;
      }
    }
  }
</style>