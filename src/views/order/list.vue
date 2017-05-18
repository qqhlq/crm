<template>
  <div>
    <div class="w-box">
      <div class="w-box__header">订单列表</div>
      <div class="w-box__content">
        <div class="w-table">
          <el-form class="w-table__query">
            <el-form class="w-table__query" :inline="true" :model="queryForm" @submit.native.prevent="">
              <el-form-item class="w-table__query__item w-table__query__item--select">
                <el-select
                  size="small"
                  v-model="queryForm.platformId"
                  placeholder="投放平台"
                  @change="tableSearch('reset')">
                  <el-option label="全部平台" value=""></el-option>
                  <el-option label="微博广告" value="1"></el-option>
                  <el-option label="小米广告" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="w-table__query__item w-table__query__item--select">
                <el-select
                  size="small"
                  v-model="queryForm.bidModeId"
                  placeholder="出价模式"
                  @change="tableSearch('reset')">
                  <el-option label="全部出价模式" value=""></el-option>
                  <el-option label="手动定价(固定)" value="1"></el-option>
                  <el-option label="自动调价(保证曝光)" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="w-table__query__item w-table__query__item--select">
                <el-select
                  size="small"
                  v-model="queryForm.rtconsumeStatus"
                  placeholder="消耗情况"
                  @change="tableSearch('reset')">
                  <el-option label="全部消耗" value=""></el-option>
                  <el-option label="有消耗" value="1"></el-option>
                  <el-option label="无消耗" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="w-table__query__item w-table__query__item--input">
                <el-input
                  size="small"
                  placeholder="客户名/订单名/ID"
                  icon="search"
                  v-model="queryForm.keyword"
                  @keyup.native.enter="tableSearch('reset')"
                  :on-icon-click="() => { tableSearch('reset') }">
                </el-input>
              </el-form-item>
            </el-form>
          </el-form>
          <div v-loading="loading">
            <el-table
              :data="table"
              style="width: 100%">
              <el-table-column
                show-overflow-tooltip
                min-width="120px"
                prop="orderName"
                label="订单名">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="72px"
                prop="orderId"
                label="订单ID">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="120px"
                prop="customName"
                label="客户名">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="96px"
                prop="groupName"
                label="所属组">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="96px"
                prop="price"
                align="right"
                label="定价(元)">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="128px"
                prop="consume"
                align="right"
                :render-header="renderCousumeHeader">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="72px"
                prop="price"
                align="right"
                label="激活数">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="120px"
                prop="lastBidTime"
                label="最后出价时间">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="104px"
                prop="status"
                :render-header="renderStatusHeader">
              </el-table-column>
            </el-table>
            <div class="w-table__pagination">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-size="10"
                :layout="screenWidth <= 769 ? 'prev, next, jumper' : 'prev, pager, next, jumper'"
                :total="count">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'OrderList',
    computed: {
      ...mapGetters({
        screenWidth: 'screenWidth',
        loading: 'orderList/loading',
        queryForm: 'orderList/queryForm',
        table: 'orderList/table',
        count: 'orderList/count',
        statusOptions: 'orderList/statusOptions'
      })
    },
    methods: {
      ...mapActions({
        updateLoading: 'orderList/updateLoading',
        updateQueryForm: 'orderList/updateQueryForm',
        getList: 'orderList/getList'
      }),

      /**
       * 分页调用方法
       * @param {Number} page 页数
       */
      async handleCurrentChange(page) {
        let self = this
        self.updateQueryForm({
          page
        })
        self.tableSearch()
      },

      /**
       * 表格搜索
       * @param {Array} args 需要重置的字段
       */
      async tableSearch(...args) {
        let self = this
        let query = {}

        if (args.indexOf('resetPage') !== -1) {
          query.page = 1
        }

        if (args.indexOf('reset') !== -1) {
          query.page = 1
          query.status = ''
        }

        self.updateQueryForm(query)
        self.getList()
      },

      /**
       * 渲染今日消耗标题头
       */
      renderCousumeHeader() {
        let self = this
        return (
          <w-table-caret status={self.queryForm.consumeSort} align={'right'} on-click={status => {
            switch (self.queryForm.consumeSort) {
              case '':
                self.updateQueryForm({
                  consumeSort: '1'
                })
                break
              case '1':
                self.updateQueryForm({
                  consumeSort: '2'
                })
                break
              default:
                self.updateQueryForm({
                  consumeSort: ''
                })
                break
            }
            self.tableSearch('resetPage')
          }}>今日消耗(元)</w-table-caret>
        )
      },

      /**
       * 渲染状态标题头
       */
      renderStatusHeader(h) {
        let self = this
        return (
          <w-table-dropdown active={ String(self.queryForm.status) } defaultActive={''} title={ '状态' } items={ this.statusOptions } on-command={ command => {
            self.updateQueryForm({
              status: command
            })
            self.tableSearch('resetPage')
          }}>
            <span style={{
              color: String(self.queryForm.status) !== '' ? '#3388FF' : ''
            }}>状态</span>
          </w-table-dropdown>
        )
      }
    },
    mounted() {
      let self = this
      self.getList()
    }
  }
</script>
