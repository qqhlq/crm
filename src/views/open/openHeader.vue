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
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{options.value}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  v-for="item in options.list" :key="item.id" :command="item.name">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
    name: 'OpenHeader',
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
      handleCommand(value) {
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
