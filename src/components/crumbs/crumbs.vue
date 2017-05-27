<template>
  <div class="crumbs">
    <a href="javascript:void(0)">CRM</a>
    &gt;
    <a href="javascript:void(0)" :class="{crumbsHidden: isTwoLevel}">分组管理</a>
  </div>
</template>
<script>
export default {
  name: 'BCrumbs',
  props: {
    isTwoLevel: Boolean
  }
}
</script>
<style>
  .crumbsHidden {
    direction: none;
  }
</style>
