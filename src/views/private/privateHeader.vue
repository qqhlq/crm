<template>
  <div class="table-header">
    <ul v-if="choosed.length !== 0">
      <li>
        <i class="fa fa-mail-forward"></i>
        <span>领取</span>
      </li>
      <li>
        <i class="fa fa-anchor"></i>
        <span>分配</span>
      </li>
      <li>
        <i class="fa fa-trash"></i>
        <span>删除</span>
      </li>
    </ul>
    <span v-if="choosed.length === 0">私人池</span>
    <div class="btn-green-mid">
      新建客户
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'PrivateHeader',
    computed: {
      ...mapGetters({
        choosed: 'openList/choosed'
      })
    },
  }
</script>

