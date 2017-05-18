<template>
  <div>
    <div class="w-box">
      <div class="w-box__header">
        客户列表
        <el-button type="primary" size="small" class="enter-customer" @click="createCustomer">录入客户</el-button>
      </div>
      <div class="w-box__content">
        <div class="w-table">
          <el-form class="w-table__query" :inline="true" :model="queryForm" @submit.native.prevent="">
            <el-form-item>
              <el-button size="small" @click="updateCustomTableModal({ visiable: true })">自定义列</el-button>
            </el-form-item>
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
                v-model="queryForm.userId"
                filterable
                placeholder="请选择"
                @change="tableSearch('reset')">
                <el-option
                  v-for="(value, key) in users"
                  :key="key"
                  :label="value"
                  :value="key">
                </el-option>
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
          <div v-loading="loading">
            <el-table
              :data="table"
              style="width: 100%">
              <el-table-column
                show-overflow-tooltip
                min-width="72px"
                prop="customId"
                label="客户ID">
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
                prop="productName"
                label="产品名">
              </el-table-column>
              <el-table-column
                v-if="customTableModal.base.balance"
                align="right"
                show-overflow-tooltip
                min-width="80px"
                prop="balance"
                label="余额(元)">
              </el-table-column>
              <el-table-column
                v-if="customTableModal.base.operators"
                show-overflow-tooltip
                min-width="120px"
                prop="operators"
                label="运营人员">
              </el-table-column>
              <el-table-column
                v-if="customTableModal.base.posttime"
                show-overflow-tooltip
                min-width="120px"
                prop="posttime"
                label="创建时间">
              </el-table-column>
              <el-table-column
                v-if="customTableModal.platform.weibo"
                show-overflow-tooltip
                width="280px"
                prop="price"
                label="微博广告资质">
                <template scope="scope">
                  <el-row class="list-row empty" v-if="scope.row.waxPlaform === null">
                    <el-col :span="12">WAX：未开通</el-col>
                    <el-col :span="12">客户展示：未开通</el-col>
                  </el-row>
                  <el-row class="list-row no-empty" v-else>
                    <el-col :span="12">
                      <div v-if="scope.row.waxPlaform.verifyStatus === -1">
                        <div>WAX：等待送审</div>
                        <div>
                          <el-button class="list-btn" type="text">编辑</el-button>
                          <el-button class="list-btn" type="text" @click="platformVerify(scope.row.waxPlaform.customId, 1)">送审</el-button>
                        </div>
                      </div>
                      <div class="single" v-if="scope.row.waxPlaform.verifyStatus === 0 || scope.row.waxPlaform.verifyStatus === 1">
                        <div>WAX：正在审核</div>
                      </div>
                      <div v-if="scope.row.waxPlaform.verifyStatus === 2">
                        <div>WAX：审核通过</div>
                        <div>
                          <el-button class="list-btn" type="text">编辑</el-button>
                        </div>
                      </div>
                      <div v-if="scope.row.waxPlaform.verifyStatus === 3">
                        <div>WAX：审核不通过</div>
                        <div>
                          <el-button class="list-btn" type="text">编辑</el-button>
                          <el-button class="list-btn" type="text" @click="platformVerify(scope.row.waxPlaform.customId, 1)">重新送审</el-button>
                        </div>
                      </div>
                      <div
                         class="single"
                        v-if="[-1, 0, 1, 2, 3].indexOf(scope.row.waxPlaform.verifyStatus) === -1">
                        <div>WAX：未开通</div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="single" v-if="scope.row.waxPlaform.status === -1">
                        <div>WeAD：未开通</div>
                      </div>
                      <div v-if="scope.row.waxPlaform.status === 0">
                        <div>WeAD：正在审核</div>
                        <div>
                          <el-button class="list-btn" type="text" @click="updateWeadStatus(scope.row.waxPlaform.customId, 1)">修改</el-button>
                        </div>
                      </div>
                      <div v-if="scope.row.waxPlaform.status === 1">
                        <div>WeAD：审核通过</div>
                        <div>
                          <el-button class="list-btn" type="text" @click="updateWeadStatus(scope.row.waxPlaform.customId, 1)">修改</el-button>
                        </div>
                      </div>
                      <div v-if="[-1, 0, 1].indexOf(scope.row.waxPlaform.status) === -1">
                        <div>WeAD：审核不通过</div>
                        <div>
                          <el-button class="list-btn" type="text" @click="updateWeadStatus(scope.row.waxPlaform.customId, 1)">修改</el-button>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column
                v-if="customTableModal.platform.xiaomi"
                show-overflow-tooltip
                width="280px"
                prop="price"
                label="小米广告资质">
                <template scope="scope">
                  <el-row class="list-row empty" v-if="scope.row.maxPlaform === null">
                    <el-col :span="12">MAX：未开通</el-col>
                    <el-col :span="12">客户展示：未开通</el-col>
                  </el-row>
                  <el-row class="list-row no-empty" v-else>
                    <el-col :span="12">
                      <div v-if="scope.row.maxPlaform.verifyStatus === -1">
                        <div>MAX：等待送审</div>
                        <div>
                          <el-button class="list-btn" type="text">编辑</el-button>
                          <el-button class="list-btn" type="text" @click="platformVerify(scope.row.maxPlaform.customId, 2)">送审</el-button>
                        </div>
                      </div>
                      <div class="single" v-if="scope.row.maxPlaform.verifyStatus === 0 || scope.row.maxPlaform.verifyStatus === 1">
                        <div>MAX：正在审核</div>
                      </div>
                      <div v-if="scope.row.maxPlaform.verifyStatus === 2">
                        <div>MAX：审核通过</div>
                        <div>
                          <el-button class="list-btn" type="text">编辑</el-button>
                        </div>
                      </div>
                      <div v-if="scope.row.maxPlaform.verifyStatus === 3">
                        <div>MAX：审核不通过</div>
                        <div>
                          <el-button class="list-btn" type="text">编辑</el-button>
                          <el-button class="list-btn" type="text" @click="platformVerify(scope.row.maxPlaform.customId, 2)">重新送审</el-button>
                        </div>
                      </div>
                      <div
                        class="single"
                        v-if="[-1, 0, 1, 2, 3].indexOf(scope.row.maxPlaform.verifyStatus) === -1">
                        <div>WAX：未开通</div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="single" v-if="scope.row.maxPlaform.status === -1">
                        <div>WeAD：未开通</div>
                      </div>
                      <div v-if="scope.row.maxPlaform.status === 0">
                        <div>WeAD：正在审核</div>
                        <div>
                          <el-button class="list-btn" type="text" @click="updateWeadStatus(scope.row.waxPlaform.customId, 2)">修改</el-button>
                        </div>
                      </div>
                      <div v-if="scope.row.maxPlaform.status === 1">
                        <div>WeAD：审核通过</div>
                        <div>
                          <el-button class="list-btn" type="text" @click="updateWeadStatus(scope.row.waxPlaform.customId, 2)">修改</el-button>
                        </div>
                      </div>
                      <div v-if="[-1, 0, 1].indexOf(scope.row.maxPlaform.status) === -1">
                        <div>WeAD：审核不通过</div>
                        <div>
                          <el-button class="list-btn" type="text" @click="updateWeadStatus(scope.row.waxPlaform.customId, 2)">修改</el-button>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </template>
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
    name: 'CustomerList',
    computed: {
      ...mapGetters({
        screenWidth: 'screenWidth',
        users: 'customerList/users',
        loading: 'customerList/loading',
        customTableModal: 'customerList/customTableModal',
        queryForm: 'customerList/queryForm',
        table: 'customerList/table',
        count: 'customerList/count'
      })
    },
    methods: {
      ...mapActions({
        updateLoading: 'customerList/updateLoading',
        updateQueryForm: 'customerList/updateQueryForm',
        getList: 'customerList/getList',
        getUser: 'customerList/getUser',
        platformVerify: 'customerList/platformVerify',
        updateCustomTableModal: 'customerList/updateCustomTableModal',
        updateStatusModal: 'customerList/updateStatusModal'
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

        self.updateQueryForm(query)
        self.getList()
      },

      /**
       * 平台送审
       * @param {Number} customId 客户ID
       * @param {Number} platformId 平台ID
       * @param {Number} verifyStatus 平台状态
       */
      async platformVerify(customId, platformId) {
        let self = this
        self.$confirm('此操作将送审该客户资质，是否送审？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let data = await self.platformVerify({
            customId,
            platformId,
            verifyStatus: 0
          })
        }).catch((e) => {
          self.$message('已取消送审')
        })
      },

      /**
       * WeAD客户状态修改
       * @param {Number} customId 客户ID
       * @param {Number} platformId 平台ID
       */
      async updateWeadStatus(customId, platformId) {
        let self = this
        self.updateStatusModal({
          visiable: true,
          dialog: {
            customId,
            platformId,
            status: '',
            reason: ''
          }
        })
      },

      /**
       * 创建新客户
       */
      async createCustomer() {
        let self = this
        self.$router.push('/boss/customer/create/base')
      }
    },
    mounted() {
      let self = this
      self.getList()
      self.getUser()
    }
  }
</script>
<style lang="scss" scoped>
  .enter-customer {
    margin-top: -17px;
    position: absolute;
    right: 16px;
    top: 50%;
  }
  .list-row {
    line-height: 1;

    &.empty {
      margin: 19px 0;
    }
    &.no-empty {
      margin: 7px 0;

      .single {
        margin: 12px 0;
      }
    }
  }
  .list-btn {
    padding: 10px 0 0;
  }
</style>
