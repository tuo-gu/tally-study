<template>
  <svg class="icon" >
    <use :xlink:href="`#${tagsType}`"></use>
  </svg>
</template>
<script lang="ts">
  // eslint-disable-next-line no-undef
  let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}
  export default {
    name: 'Tags',
    props:['tagsType']
  };
</script>

<style lang="scss" scoped>
  .icon{
    width: 2.5em;
    height: 2.5em;
  }
</style>