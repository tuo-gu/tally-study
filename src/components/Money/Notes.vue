<template>
  <label class="notes">
    <input v-model.trim="value" placeholder="备注（最多140个字）" />
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value=this.$store.state.editDate.notes||'';
    @Watch('value',{immediate:true})
    onValueChanged(value:string){
        this.$emit('update:value',value)
    }
  }
</script>

<style lang="scss" scoped>

  .notes{
    display: block;
    >input{
      height: 2em;
      width: 100vw;
      border:none;
      padding: 16px;
      box-shadow: 0 0 3px rgba(0,0,0,0.25);
    }
  }
</style>