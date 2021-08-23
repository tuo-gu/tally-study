<template>
  <Layout classPrefix="layout">
    <Types :value.sync="record.type" />
    <Output :output="outputSave" />
    <TagsType :tags="[tags,tags1,tags2,tags3,tags4]" :type="record.type"
              @update:selected="onUpdateTags"/>
    <Notes @update:value="onUpdateNotes"/>
    <Time @update:dateSaveYear="onUpdateDateYear" @update:dateSaveHours="onUpdateDateHours"/>
    <div class="space">
    </div>
    <NumberPad :value.sync="record.amount"  @update:submit="onSubmit"
               @update:output="onUpdateOutput"/>

  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Types from '@/components/Money/Types.vue';
  import Output from '@/components/Money/Output.vue';
  import TagsType from '@/components/Money/Tags-type.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Time from '@/components/Money/Time.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import tagList from '@/constants/iconArray';
  @Component({
    components: {NumberPad, Time, Notes, TagsType, Output, Types},
    computed:{
      recordList(){
        return this.$store.state.recordList;
      },
    }
  })
  export default class Money extends Vue{

    outputSave='0.00'
    record:RecordItem={ tags:[],notes:'', type:'-',amount:0 };
    tags=tagList.tags
    tags1=tagList.tags1
    tags2=tagList.tags2
    tags3=tagList.tags3
    tags4=tagList.tags4
    editValue=this.$route.query.editValue
    created(){
     this.$store.commit('fetchRecord')
     if(this.editValue){this.$store.commit('updateEditDate',this.editValue)}
     if(this.$store.state.editDate.type){
       this.record.type=this.$store.state.editDate.type
     }
      if(JSON.stringify(this.$store.state.editDate)!=='{}'){
        this.$store.commit('editDateCloneFn')
      }
    }
    onUpdateTags(value:string[]){
      this.record.tags=value
    }
    onUpdateOutput(value:string){
      this.outputSave=value;
    }
    onUpdateNotes(value:string){
      this.record.notes=value;
    }
    onUpdateDateYear(value:string){
      this.record.weekTime =value
    }
    onUpdateDateHours(value:Date){
      this.record.createAt=value.toString()
    }
    onSubmit(){
      if(this.record.amount===0){
        return;
      }
      if(JSON.stringify(this.$store.state.editDate)!=='{}'){
        this.$store.commit('deleteDate',this.$store.state.editDateClone)
      }
      setTimeout(()=>{
        this.$store.commit('createRecord',this.record)
      },0)


      setTimeout(()=>{
        this.$router.push({ path: `/statistics`});
      },0)
    }
    @Watch('recordList')
    onRecordListChange(){
      this.$store.commit('save');
    }
  }
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.space {
  display: flex;
  flex-grow: 1;
  flex-shrink: 10;
}
</style>
