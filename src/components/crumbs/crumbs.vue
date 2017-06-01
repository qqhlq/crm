<template>
  <div class="crumbs">
    <a :href="firstLink">{{ firstName }}</a>
    &gt;
    <a :href="twothLink" :class="{crumbsHidden: isTwoLevel}">{{ twothName }}</a>
  </div>
</template>
<script>
export default {
  name: 'BCrumbs',
  props: {
    isTwoLevel: Boolean,
    firstName: String,
    twothName: String,
    firstLink: String,
    twothLink: String
  }
}
</script>
<style>
  .crumbsHidden {
    direction: none;
  }
</style>
