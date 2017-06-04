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
    <div v-if="choosed.length === 0 && authority === 0" class="table-header-authority">
        <el-select v-model="options.value" placeholder="请选择" @change="SelectChange">
        <el-option
          v-for="item in options.list"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <span v-if="choosed.length === 0 && authority !== 0 ">全部</span>
    <div class="btn-green-mid">
      新建客户
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BOpenHeader',
    computed: {
      ...mapGetters({
        authority: 'openList/authority',
        options: 'openList/options',
        choosed: 'openList/choosed'
      })
    },

    methods: {
      ...mapActions({
        tableSelectChange: 'openList/tableSelectChange',
        getTableOptions: 'openList/getTableOptions',
        getList: 'openList/getList'
      }),
      SelectChange(value) {
        let self = this
        self.tableSelectChange(value)
        self.getList()
      }
    },
    mounted() {
      let self = this
      self.getTableOptions()
    }
  }
</script>
