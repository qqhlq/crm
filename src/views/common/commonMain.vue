<template>
  <div class="common-table">
    <el-table :data="data" style="width: 100%" max-height="600" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55px">
      </el-table-column>
      <el-table-column
        min-width="256px"
        label="客户产品名">
        <template scope="scope">
          <a class="b-table-link" :href="`/crm/customerDetail?id=${scope.row.id}&type=common`">{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="ownerName"
        min-width="120px"
        label="客户所有人">
      </el-table-column>
      <el-table-column
        prop="tradeName"
        min-width="160px"
        label="行业">
      </el-table-column>
      <el-table-column
        prop="cityName"
        min-width="120px"
        label="城市">
      </el-table-column>
      <el-table-column
        prop="lastUpdatetime"
        min-width="140px"
        label="最新动态时间">
      </el-table-column>
      <el-table-column
        label="最新动态记录"
        min-width="320px">
        <template scope="scope">
          <el-tooltip :content="scope.row.lastUpdateMemo" placement="top" effect="light">
            <p class="b-poper" v-html="scope.row.lastUpdateStatusDesc"></p>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'CommonMain',
    computed: {
      ...mapGetters({
        data: 'commonList/data',
      })
    },
    methods: {
      ...mapActions({
        changeChoosed: 'commonList/changeChoosed',
      }),

    /**
      * 根据 改变表格列表的选中状态
      * @param {Object} row 表格头部对象 包括下拉框中的值
      */
      handleSelectionChange(row) {
        let self = this
        let temp = []
        for(let item in row) {
          temp.push(row[item].id)
        }
        self.changeChoosed(temp)
      }
    }
  }
</script>
<style>
</style>
