<template>
  <div>
    <el-form class="w-table__query" :inline="true" :model="queryForm" @submit.native.prevent="">
      <el-form-item class="w-table__query__item w-table__query__item--input">
        <el-input
          size="small"
          placeholder="订单ID/订单名"
          icon="search"
          v-model="queryForm.keyword"
          @keyup.native.enter="tableSearch('resetPage')"
          :on-icon-click="() => {
            tableSearch('resetPage')
          }">
        </el-input>
      </el-form-item>
    </el-form>
    <div v-loading="loading">
      <el-table
        :data="table">
        <el-table-column
          show-overflow-tooltip
          min-width="72px"
          prop="orderId"
          label="订单ID">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          min-width="120px"
          prop="orderName"
          label="订单名">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          width="120"
          prop="price"
          label="监控链接">
          <template scope="scope">
            <span class="edit-monitor">
              <span :class="[
                'edit-monitor__url',
                scope.row.monitorUrl === null || scope.row.monitorUrl === '' ? 'edit-monitor__url--empty' : ''
              ]">
                {{ scope.row.monitorUrl === null || scope.row.monitorUrl === '' ? '未填写' : '已填写'  }}
              </span>
              <el-button type="text" class="edit-monitor__btn" @click="editMonitorUrl(scope.row.monitorUrl, scope.row.orderId)">
                <i class="el-icon-edit"></i>
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          width="88"
          prop="price"
          fixed="right"
          label="操作">
          <template scope="scope">
            <el-button native-type="button" size="small" type="text" @click="enterTest(scope.row.monitorUrl)">进入测试</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'MonitorBill',
    computed: {
      ...mapGetters({
        screenWidth: 'screenWidth',
        baseInfo: 'deliveryMonitor/baseInfo',
        loading: 'deliveryMonitor/weiboOrderLoading',
        queryForm: 'deliveryMonitor/weiboOrderQueryForm',
        table: 'deliveryMonitor/weiboOrderTable',
        count: 'deliveryMonitor/weiboOrderCount'
      })
    },
    methods: {
      ...mapActions({
        getOrder: 'deliveryMonitor/getOrder',
        setOrderQueryForm: 'deliveryMonitor/setOrderQueryForm',
        updateMonitorUrl: 'deliveryMonitor/updateMonitorUrl'
      }),

      /**
       * 表格搜索
       * @param {Array} args 需要重置的字段
       */
      tableSearch(...args) {
        let self = this
        let query = {}

        if (args.indexOf('resetPage') !== -1) {
          query.page = 1
        }

        self.getOrder(self.$wMerge({}, {
          customId: this.$route.params.cid,
          platformId: 1
        }, query))
      },

      /**
       * 编辑监控链接
       * @param {String} url 监控链接
       * @param {String} oid 订单ID
       */
      async editMonitorUrl(url, oid) {
        let self = this
        self.$prompt('请填写监控链接', '监控链接', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'w-message-box--oneinput',
          inputErrorMessage: '请输入正确的监控链接',
          inputValue: url,
          inputValidator(value) {
            if (value === '' || value === null) {
              return true
            }
            if (!self.$wVerifyUrl(value)) {
              return '请输入正确的监控链接'
            }
            return true
          }
        }).then(async ({ value }) => {
          value = value === null ? '' : value

          let data = await self.updateMonitorUrl({
            type: 2,
            platformId: 1,
            monitorUrl: value,
            orderId: oid
          })

          if (data.data === true) {
            self.$message.success('监控链接填写成功')
          } else {
            self.$message.error('监控链接填写失败，请重新尝试')
          }

        }).catch((e) => {
          console.log(e)
          self.$message('已取消监控链接填写')
        })
      },

      /**
       * 跳转到测试页面
       * @param {String} url 监控链接
       */
      enterTest(url) {
        let self = this
        let cid = self.$route.params.cid
        let customName = encodeURIComponent(self.baseInfo.customName)
        let productName = encodeURIComponent(self.baseInfo.productName)
        this.$router.push(`/boss/delivery/test/${cid}?customName=${customName}&productName=${productName}&url=${encodeURIComponent(url)}`)
      }
    },
    mounted() {
      let self = this
      self.getOrder({
        customId: this.$route.params.cid,
        platformId: 1
      })
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../../styles/core/var";

  .edit-monitor {
    &__url {
      color: $color-light-black;
      font-size: 13px;

      &--empty {
        color: $color-light-gray;
      }
    }
    &__btn {
      font-size: 10px;
    }
  }
</style>
