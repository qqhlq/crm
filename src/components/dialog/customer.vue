<template>
  <div>
    <el-dialog title="自定义列" size="tiny" :custom-class="'w-dialog-form'" :visible.sync="customTableModal.visiable" :before-close="() => { closeCustomTableModal() }">
      <el-form class="w-form--modal" label-position="top" :model="customTableModal">
        <el-form-item class="w-form__item" label="基本信息">
          <el-checkbox-group v-model="customTableModal.dialog.base">
            <el-checkbox label="客户ID" name="base" disabled checked></el-checkbox>
            <el-checkbox label="客户名" name="base" disabled checked></el-checkbox>
            <el-checkbox label="产品名" name="base" disabled checked></el-checkbox>
            <el-checkbox label="余额(元)" name="base"></el-checkbox>
            <el-checkbox label="运营人员" name="base"></el-checkbox>
            <el-checkbox label="创建时间" name="base"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="w-form__item" label="平台资质">
          <el-checkbox-group v-model="customTableModal.dialog.platform">
            <el-checkbox label="微博广告" name="platform"></el-checkbox>
            <el-checkbox label="小米广告" name="platform"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCustomTableModal">取消</el-button>
        <el-button type="primary" @click="modifyCustomTableModal">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" size="tiny" :custom-class="'w-dialog-form'" :visible.sync="statusModal.visiable" :before-close="() => { closeStatusModal() }">
      <el-form class="w-form--modal" ref="statusModal" :rules="statusModal.rules" label-position="top" :model="statusModal.dialog">
        <el-form-item
          prop="status"
          class="w-form__item"
          :label="`客户展示状态（${String(statusModal.dialog.platformId) === '1' ? '微博广告' : '小米广告'}）`">
          <el-select
            class="w-form__item__select"
            size="small"
            v-model="statusModal.dialog.status"
            placeholder="请选择审核状态">
            <el-option label="正在审核" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="审核不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="reason"
          :style="{
            display: statusModal.dialog.status === '2' ? 'block' : 'none'
          }"
          class="w-form__item"
          label="填写原因">
          <el-input class="w-form__item__select" type="textarea" v-model="statusModal.dialog.reason" placeholder="请填写原因"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeStatusModal()">取消</el-button>
        <el-button type="primary" @click="modifyStatus">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'WDialogCustomer',
    computed: {
      ...mapGetters({
        customTableModal: 'customerList/customTableModal',
        statusModal: 'customerList/statusModal'
      })
    },
    methods: {
      ...mapActions({
        updateCustomTableModal: 'customerList/updateCustomTableModal',
        updateStatusModal: 'customerList/updateStatusModal'
      }),

      /**
       * 关闭自定义列弹窗
       */
      async closeCustomTableModal() {
        let self = this
        self.updateCustomTableModal({
          visiable: false
        })
        self.$message('已取消自定义列')
      },

      /**
       * 更改客户列表列显示
       */
      async modifyCustomTableModal() {
        let self = this
        let base = {}
        let platform = {}

        if (self.customTableModal.dialog.base.indexOf('余额(元)') !== -1) {
          base.balance = true
        } else {
          base.balance = false
        }

        if (self.customTableModal.dialog.base.indexOf('运营人员') !== -1) {
          base.operators = true
        } else {
          base.operators = false
        }

        if (self.customTableModal.dialog.base.indexOf('创建时间') !== -1) {
          base.posttime = true
        } else {
          base.posttime = false
        }

        if (self.customTableModal.dialog.platform.indexOf('微博广告') !== -1) {
          platform.weibo = true
        } else {
          platform.weibo = false
        }

        if (self.customTableModal.dialog.platform.indexOf('小米广告') !== -1) {
          platform.xiaomi = true
        } else {
          platform.xiaomi = false
        }

        self.updateCustomTableModal({
          visiable: false,
          base,
          platform
        })

        self.$message.success('自定义列成功')
      },

      /**
       * 关闭状态弹窗
       */
      async closeStatusModal() {
        let self = this
        self.updateStatusModal({
          visiable: false
        })
        self.$message('已取消修改')
      },

      /**
       * 修改状态
       */
      async modifyStatus() {
        let self = this

        if (String(self.statusModal.dialog.status) === '2') {
          self.updateStatusModal({
            rules: {
              status: [{
                required: true,
                message: '请选择客户展示状态',
                trigger: 'change'
              }],
              reason: [{
                required: true,
                message: '请填写原因',
                trigger: 'blur'
              }]
            }
          })
        } else {
          self.updateStatusModal({
            rules: {
              status: [{
                required: true,
                message: '请选择客户展示状态',
                trigger: 'change'
              }]
            }
          })
        }

        this.$refs.statusModal.validate(async valid => {
          if (valid) {
            let data = await self.$wPost('/manage/custom/approvePlatform.do', self.statusModal.dialog)

            if (data.data === true) {
              self.$message.success('修改成功')
            } else {
              self.$message.error('修改失败，请重新尝试')
            }

            this.$refs.statusModal.resetFields()
            self.updateStatusModal({
              visiable: false,
              rules: {}
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .modal {
    background: green;
  }
</style>
