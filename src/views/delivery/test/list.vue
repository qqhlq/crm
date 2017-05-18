<template>
  <div class="w-box">
    <div class="w-box__header">测试列表</div>
    <div class="w-box__content">
      <div v-loading="loading">
        <el-table
          :data="table">
          <el-table-column
            show-overflow-tooltip
            min-width="320px"
            prop="deviceNo"
            label="设备号">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="136px"
            prop="posttime"
            label="上报时间">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            min-width="64px"
            prop="serviceRate"
            align="right"
            label="回调状态">
            <template scope="scope">
              <el-tag type="primary" v-if="String(scope.row.status) === '0'">等待</el-tag>
              <el-tag type="primary" v-if="String(scope.row.status) === '1'">成功</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="80"
            prop="price"
            fixed="right"
            label="操作">
            <template scope="scope">
              <el-button native-type="button" size="small" type="text" @click="removeList(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="w-table__pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="form.page"
            :page-size="10"
            :layout="screenWidth <= 769 ? 'prev, next, jumper' : 'prev, pager, next, jumper'"
            :total="count">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'TestList',
    computed: {
      ...mapGetters({
        screenWidth: 'screenWidth',
        loading: 'deliveryTest/listLoading',
        table: 'deliveryTest/listTable',
        count: 'deliveryTest/listCount',
        form: 'deliveryTest/listForm'
      })
    },
    methods: {
      ...mapActions({
        getList: 'deliveryTest/getList',
        setListQuery: 'deliveryTest/setListQuery',
        removeListItem: 'deliveryTest/removeListItem'
      }),

      /**
       * 分页调用方法
       * @param {Number} page 页数
       */
      async handleCurrentChange(page) {
        let self = this
        self.setListQuery({
          page
        })
        self.getList()
      },

      /**
       * 删除测试记录
       * @param {Number} id 记录ID
       */
      async removeList(id) {
        let self = this

        self.$confirm('此操作将删除该测试信息，是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let data = await self.removeListItem({ id })
          if (data.data === true) {
            self.$message.success('删除成功')
          } else {
            self.$message.error('删除失败，请重新尝试')
          }
        }).catch(() => {
          self.$message('已取消删除')
        })
      }
    },
    mounted() {
      let self = this
      self.setListQuery({
        page: 1,
        customId: this.$route.params.cid,
        url: this.$route.query.url,
        export: false
      })
      self.getList()
    }
  }
</script>
