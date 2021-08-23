<template>
  <div class="output">
   {{output}}<span>元</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Output extends Vue{
    @Prop(String) output:string |undefined ;
  }
</script>

<style lang="scss" scoped>
  .output{
    display: flex;
    flex-shrink: 5;
    justify-content: flex-end;
    padding: 20px 4px;
    font-size: 36px;
    font-family:"digital dismay",monospace;
    align-items:baseline;
    >span{
      font-size:16px;
      padding: 0 4px;
    }
  }
</style>