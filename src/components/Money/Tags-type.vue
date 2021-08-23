<template>
  <div class="tags">
    <van-swipe >
      <van-swipe-item>
        <div v-show="type==='-'">
          <ul>
            <li v-for="tag in tags[0] " :key="tag" @click="select(tag)"
                :class="selectedTags.indexOf(tag)>=0&&'selected'">
              <Tags :tagsType="tag" :class="selectedTags.indexOf(tag)>=0&&'--'+tag"/>
              <span>{{hash[tag]}}</span>
            </li>
          </ul>
          <ul>
            <li v-for="tag1 in tags[1] " :key="tag1" @click="select(tag1)"
                :class="selectedTags.indexOf(tag1)>=0&&'selected'">
              <Tags :tagsType="tag1" :class="selectedTags.indexOf(tag1)>=0&&'--'+tag1"/>
              <span>{{hash[tag1]}}</span>
            </li>
          </ul>
        </div>
        <div v-show="type==='+'" >
          <ul>
            <li v-for="tag3 in tags[3] " :key="tag3" @click="select(tag3)"
                :class="selectedTags.indexOf(tag3)>=0&&'selected'">
              <Tags :tagsType="tag3" :class="selectedTags.indexOf(tag3)>=0&&'--'+tag3"/>
              <span>{{hash[tag3]}}</span>
            </li>
          </ul>
          <ul class="classLeft">
            <li v-for="(tag4,index) in tags[4] " :key="index" @click="select(tag4)"
                :class="selectedTags.indexOf(tag4)>=0&&'selected'">
              <Tags :tagsType="tag4" :class="selectedTags.indexOf(tag4)>=0&&'--'+tag4"/>
              <span>{{hash[tag4]}}</span>
            </li>
          </ul>
        </div>
      </van-swipe-item>
      <van-swipe-item v-if="type==='-'">
        <div  >
          <ul>
            <li v-for="tag2 in tags[2]" :key="tag2" @click="select(tag2)"
                :class="selectedTags.indexOf(tag2)>=0&&'selected'">
              <Tags :tagsType="tag2" :class="selectedTags.indexOf(tag2)>=0&&'--'+tag2"/>
              <span>{{hash[tag2]}}</span>
            </li>
          </ul>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {Swipe, SwipeItem, Toast} from 'vant';
Vue.use(Toast);
Vue.use(Swipe);
Vue.use(SwipeItem);

@Component({
  computed:{
    hash(){
      return this.$store.state.hash;
    }
  }
})

export default class  extends Vue {
  @Prop(String) type:string|undefined;
  @Prop(Array) readonly tags: string[] | undefined;

  @Watch('type')
  onTypeChange(){
    if(this.type==='+'){
      this.selectedTags.pop();
      this.selectedTags.push('salary');
    }else {
      this.selectedTags.pop();
      this.selectedTags.push('money');
    }
  }
  selectedTags: string [] =this.$store.state.editDate.tags|| ['money'];
  mounted(){
    this.$emit('update:selected', this.selectedTags)
  }

  select(tag: string) {
    if(this.selectedTags[0]!==tag){
      if(tag.length===0){
        tag="other"
      }
      this.selectedTags.pop();
      this.selectedTags.push(tag);
      this.$emit('update:selected', this.selectedTags)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  @import "~@/assets/style/iconColor.scss";

  ::v-deep .van-swipe__indicator{
    background-color: #999;
    opacity: 0.5;
  }
  ::v-deep .van-swipe__indicator--active{
    background-color: #555;
    opacity: 1;
  }

  .tags{
    color: #999;

    >div{
      padding-bottom: 8px;
    }
    ul{
      display: flex;
      padding: 4px 0;
      >li {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        padding: 8px 0;
        fill: currentColor;
        &.selected{
          >.icon{
            border-radius: 45%;
          }
          >span{
            color: #000;
          }
        }
        >span{
          padding: 0 0.5em;
          margin-top: 4px;
        }
      }
    }
  }
</style>