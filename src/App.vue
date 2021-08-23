<template>
  <main id="app">
    <router-view/>
  </main>

</template>

<style lang="scss">
  @import "~@/assets/style/helper.scss";
  @import "~@/assets/style/reset.scss";

  body{
  line-height:1.5;
  font-family: $font-hei;
  font-size: 16px;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    max-width: 500px;
    margin: 0 auto;
  }

</style>
