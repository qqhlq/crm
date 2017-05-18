<template>
  <el-form :model="weiboAccount"  class="w-form" label-width="72px" :label-position="screenWidth <= 769 ? 'top' : 'right'">
    <el-form-item class="w-form__item" label="监控链接" prop="link">
      <span class="edit-monitor">
        <span :class="[
          'edit-monitor__url',
          weiboAccount.clickUrl === null || weiboAccount.clickUrl === '' ? 'edit-monitor__url--empty' : ''
        ]">
          {{ weiboAccount.clickUrl === null || weiboAccount.clickUrl === '' ? '未填写' : '已填写'  }}
        </span>
        <el-button type="text" class="edit-monitor__btn" @click="editMonitorUrl(weiboAccount.clickUrl)">
          <i class="el-icon-edit"></i>
        </el-button>
      </span>
      <el-button size="small" class="test" @click="enterTest(weiboAccount.clickUrl)">进入测试</el-button>
    </el-form-item>
    <el-form-item class="w-form__item" label="上报类型" prop="reportType">
      <el-radio-group v-model="weiboAccount.reportType" @input="changeReportType">
        <el-radio :label="1">曝光</el-radio>
        <el-radio :label="2">点击</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'WeiboAccount',
    computed: {
      ...mapGetters({
        screenWidth: 'screenWidth',
        baseInfo: 'deliveryMonitor/baseInfo',
        weiboAccount: 'deliveryMonitor/weiboAccount'
      })
    },
    methods: {
      ...mapActions({
        setBaseInfo: 'deliveryMonitor/setBaseInfo',
        getAccount: 'deliveryMonitor/getAccount',
        updateMonitorUrl: 'deliveryMonitor/updateMonitorUrl',
        updateReportType: 'deliveryMonitor/updateReportType'
      }),

      /**
       * 编辑监控链接
       * @param {String} url 监控链接
       */
      async editMonitorUrl(url) {
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
            type: 1,
            clickUrl: value,
            platformId: 1,
            customId: this.$route.params.cid
          })

          if (data.data === true) {
            self.$message.success('监控链接填写成功')
          } else {
            self.$message.error('监控链接填写失败，请重新尝试')
          }
        }).catch((e) => {
          self.$message('已取消监控链接填写')
        })
      },

      /**
       * 更改上报类型
       * @param {String} reportType 上报类型
       */
      async changeReportType(reportType) {
        let self = this
        let data = await self.updateReportType({
          platformId: 1,
          customId: this.$route.params.cid,
          reportType: self.weiboAccount.reportType
        })
        if (data.data === true) {
          self.$message.success('上报类型修改成功')
        } else {
          self.$message.error('上报类型修改失败，请重新尝试')
        }
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
    async mounted() {
      let self = this
      await self.getAccount({
        customId: this.$route.params.cid,
        platformId: 1
      })
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../../styles/core/var";

  .test {
    margin-left: 16px;
  }
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
