<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="tally"/>
      记账
    </router-link>
    <router-link to="statistics" class="item" active-class="selected">
      <Icon name="static"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  nav{
    display: flex;
    justify-content: space-evenly;
    box-shadow: 0 0 3px rgba(0,0,0,0.25);
    >.item{
      padding: 2px 0;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .icon{
      width: 32px;
      height: 32px;
    }
    >.item.selected{
      color: $color-heightLight;
    }
  }

</style>