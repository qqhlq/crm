<template>
  <div class="table-header">
    <ul v-if="state === 1">
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
    <div v-if="state === 0 && authority === 0" class="table-header-authority">
        <el-select v-model="value" placeholder="请选择" @change="tableSelectChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <span v-if="state === 0 && authority !== 0 ">全部</span>
    <div class="btn-green-mid">
      新建客户
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BTableHeader',
    computed: {
      ...mapGetters({
        authority: 'openList/authority',
        state: 'openList/state',
        options: 'openList/options',
        value: 'openList/value'
      })
    },

    methods: {
      ...mapActions({
        tableSelectChange: 'openList/tableSelectChange'
      }),
    }
  }
</script>
