<template>
  <div>
    <el-breadcrumb separator="/" class="w-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/boss/delivery' }">投放管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/boss/delivery/monitor/${this.$route.params.cid}` }">设置监控 (客户ID:{{ this.$route.params.cid }})</el-breadcrumb-item>
      <el-breadcrumb-item>进入测试</el-breadcrumb-item>
    </el-breadcrumb>
    <report></report>
    <list></list>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import List from './list'
  import Report from './report'

  export default {
    name: 'DeliveryTest',
    components: {
      List,
      Report
    }
  }
</script>
<style lang="scss" scoped>

</style>
