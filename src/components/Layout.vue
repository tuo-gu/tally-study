<template>

    <div class="layout-wrapper">
        <van-popup v-model="show" round>
            <img src="../assets/wxcode.png" alt="二维码">
        </van-popup>
        <div class="content" :class="classPrefix&&`${classPrefix}-content`">
          <slot/>
        </div>
        <Nav/>
    </div>

</template>

<script >
  import Vue from 'vue';
  import { Popup } from 'vant';

  Vue.use(Popup);
  export default {
      name: 'Layout',
      data() {
          return {
              show: false,
          };
      },
      props: ['classPrefix'],
      created(){
          this.showPopup()
      },
      mounted(){
        document.querySelector('.layout-wrapper').style.height=window.innerHeight+'px'
      },
      methods: {
          showPopup() {
              if(this.$store.state.popup){
                  if(document.documentElement.clientWidth>500){
                      this.show = true;
                  }
                  this.$store.commit('changePopup')
              }

          },
      },
  };
</script>

<style lang="scss" scoped>
   img{
       width: 200px;
       height:260px ;
   }
  .layout-wrapper{
    /*height:100vh;*/
    display: flex;
    flex-direction:column;
    overflow: hidden;
  }
  .content{
    flex-grow: 1;
    overflow:auto;
    overflow-x:hidden;

  }
</style>