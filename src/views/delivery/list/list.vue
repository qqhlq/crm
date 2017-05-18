<template>
  <div>
    <div class="w-box">
      <div class="w-box__header">投放列表</div>
      <div class="w-box__content">
        <div class="w-table">
          <el-form class="w-table__query" :inline="true" :model="queryForm" @submit.native.prevent="">
            <el-form-item class="w-table__query__item w-table__query__item--datepicker">
              <el-date-picker
                size="small"
                type="daterange"
                @change="tableSearch({ page: 1 })"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                v-model="queryForm.date">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="w-table__query__item">
              <el-button native-type="button" @click="tableExport()" size="small">导出</el-button>
            </el-form-item>
          </el-form>
          <div v-loading="loading">
            <el-table
              :data="table"
              style="width: 100%">
              <el-table-column type="expand">
                <template scope="props">
                  <div class="table-dropdown">
                    <div class="table-dropdown__info">
                      <div>客户名：深圳数睿科技有限公司</div>
                      <div>创建时间：2017-01-01 20:00</div>
                    </div>
                    <div class="table-dropdown__platform">已开通平台：微博广告、小米广告</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="96px"
                prop="customId"
                label="客户ID">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="144px"
                prop="customName"
                label="产品名">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="144px"
                label="金额(元)">
                <template scope="scope">
                  <div>账户余额：{{ scope.row.balance }}</div>
                  <div>当前限额：{{ scope.row.quota }}</div>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="120px"
                align="right"
                prop="rtConsume"
                label="实时消耗(元)">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                min-width="136px"
                align="right"
                prop="consume"
                label="所选时段消耗(元)">
              </el-table-column>
              <el-table-column
                width="88px"
                prop="price"
                label="操作">
                <template scope="scope">
                  <el-button native-type="button" size="small" type="text" @click="setMonitor(scope.row.customId)">设置监控</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="w-table__pagination">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="queryForm.page"
                :page-size="10"
                :layout="screenWidth <= 769 ? 'prev, next, jumper' : 'prev, pager, next, jumper'"
                :total="tableCount">
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
  import moment from 'moment'

  export default {
    name: 'DeliveryList',
    computed: {
      ...mapGetters({
        screenWidth: 'screenWidth',
        loading: 'deliveryList/loading',
        queryForm: 'deliveryList/queryForm',
        pickerOptions: 'deliveryList/pickerOptions',
        table: 'deliveryList/table',
        tableCount: 'deliveryList/tableCount'
      })
    },
    methods: {
      ...mapActions({
        getTable: 'deliveryList/getTable',
        changeSearchQuery: 'deliveryList/changeSearchQuery'
      }),

      /**
       * 表格搜索
       * @param {Object} query 标识当前要重置哪些搜索条件
       */
      async tableSearch(query = null) {
        let self = this
        let date = {
          startDate: '',
          endDate: ''
        }

        self.loading = true

        if (self.queryForm.date && self.queryForm.date[0] !== null) {
          date = {
            startDate: moment(self.queryForm.date[0]).format('YYYY-MM-DD'),
            endDate: moment(self.queryForm.date[1]).format('YYYY-MM-DD')
          }
        }

        self.changeSearchQuery(query === null ? date : self.$wMerge({}, query, date))
        await self.getTable(self.queryForm)
        self.loading = false
      },

      /**
       * 分页搜索
       * @param {Number} val 当前页数
       */
      handleCurrentChange(val) {
        this.queryForm.page = val
        this.tableSearch()
      },

      /**
       * 数据导出
       */
      tableExport() {
        let self = this
        let url = '/manage/deal/listAllCustoms.do?export=true'
        let query = self.$wMerge({}, self.queryForm, { date: null })

        delete query.export
        delete query.date

        for (let item in query) {
          url += `&${item}=${query[item]}`
        }

        location.href = url
      },

      /**
       * 设置监控
       */
      setMonitor(cid) {
        this.$router.push(`/boss/delivery/monitor/${cid}`)
      }
    },
    mounted() {
      let self = this
      let end = new Date()
      let start = new Date()

      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      self.changeSearchQuery({ date: [start, end] })
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../styles/mixins/clearfix";

  .table-dropdown {
    line-height: 1;

    &__info {
      @include clearfix;

      div {
        float: left;
      }
      div + div {
        margin-left: 32px;
      }
    }
    &__platform {
      margin-top: 16px;
    }
  }
</style>
