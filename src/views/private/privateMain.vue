<template>
  <div class="private-table">
    <el-table :data="data" style="width: 100%" max-height="600" @selection-change="handleSelectionChange">

      <!-- 选中状态列 -->
      <el-table-column
        type="selection"
        width="55px">
      </el-table-column>

      <!-- 客户产品名列 -->
      <el-table-column
        fixed
        min-width="235px"
        label="客户产品名">
        <template scope="scope">
          <a class="b-table-link" :href="`/crm/customerDetail?id=${scope.row.id}&type=private`">{{scope.row.name}}</a>
        </template>
      </el-table-column>

      <!-- 客户所有人列 -->
      <el-table-column
        prop="ownerName"
        min-width="110px"
        label="客户所有人">
      </el-table-column>

      <!-- 客户级别列 -->
      <el-table-column
        prop="levelName"
        min-width="120px"
        label="客户级别">
      </el-table-column>

      <!-- 电话列 -->
      <el-table-column
        prop="phone"
        min-width="140px"
        label="电话">
      </el-table-column>

      <!-- 认领时间列 -->
      <el-table-column
        prop="ownertime"
        min-width="130px"
        label="认领时间">
      </el-table-column>

      <!-- 剩余时间列 -->
      <el-table-column
        prop="resttime"
        min-width="110px"
        label="剩余时间">
      </el-table-column>

      <!-- 今日动态列 -->
      <el-table-column
        min-width="260px"
        label="今日动态">
        <template scope="scope">
          <p class="b-poper" v-html="scope.row.todayStatusDesc"></p>
        </template>
      </el-table-column>

      <!-- 最新动态时间 -->
      <el-table-column
        prop="lastUpdatetime"
        min-width="130px"
        label="最新动态时间">
      </el-table-column>

       <!-- 最新动态纪录 -->
      <el-table-column
        min-width="270px"
        label="最新动态纪录">
         <template scope="scope">
           <el-tooltip :content="scope.row.lastUpdateMemo" placement="top" effect="light">
            <p class="b-poper" v-html="scope.row.lastStatusDesc"></p>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'PrivateMain',
    computed: {
      ...mapGetters({
        data: 'privateList/data',
      })
    },
    methods: {
      ...mapActions({
        changeChoosed: 'privateList/changeChoosed'
      }),

     /**
      * 根据 改变表格列表的选中状态
      * @param {Object} row 表格头部对象 包括下拉框中的值
      */
      handleSelectionChange(row) {
        let self = this
        let temp = []
        for(let item in row) {
          temp.push({id: row[item].id, customPoolId: row[item].customPoolId})
        }
        self.changeChoosed(temp)
      },
    }
  }
</script>

<style>

</style>
