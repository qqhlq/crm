<template>
  <div class="crumbs">
    <span v-for="(crumb, index) in crumbs">
      <span v-if="index > 0">&gt;</span>
      <a :href="crumb.link">{{ crumb.name }}</a>
    </span>
  </div>
</template>
<script>
export default {
  name: 'BCrumbs',
  props: {
    crumbs: Array
  }
}
</script>
<style scoped>
</style>
