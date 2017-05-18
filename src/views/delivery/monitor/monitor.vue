<template>
  <div>
    <el-breadcrumb separator="/" class="w-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/boss/delivery' }">投放管理</el-breadcrumb-item>
      <el-breadcrumb-item>设置监控 (客户ID:{{ this.$route.params.cid }})</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="w-box">
      <div class="w-box__header">设置监控 (客户ID:{{ this.$route.params.cid }})</div>
      <div class="w-box__content">
        <div class="section">
          <h2 class="title">基本信息</h2>
          <el-form :model="baseInfo"  class="w-form" label-width="72px" :label-position="screenWidth <= 769 ? 'top' : 'right'">
            <el-form-item class="w-form__item" label="客户名" prop="customName">
              <el-input :disabled="true" class="w-form__item__input" size="small" v-model.trim="baseInfo.customName"></el-input>
            </el-form-item>
            <el-form-item class="w-form__item" label="产品名" prop="productName">
              <el-input :disabled="true" class="w-form__item__input" size="small" v-model.trim="baseInfo.productName"></el-input>
            </el-form-item>
            <el-form-item class="w-form__item" label="选择平台" prop="platformId">
              <el-select
                v-model="baseInfo.platformId"
                class="w-form__item__select"
                size="small"
                placeholder="选择平台">
                  <el-option
                    v-for="(value, key) in platforms"
                    :label="value"
                    :value="key"
                    :key="key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="section">
          <h2 class="title">账户级设置</h2>
          <weibo-account v-if="baseInfo.platformId === '1'"></weibo-account>
          <xiaomi-account v-if="baseInfo.platformId === '2'"></xiaomi-account>
        </div>
        <div class="section">
          <h2 class="title">订单级设置</h2>
          <weibo-order v-if="baseInfo.platformId === '1'"></weibo-order>
          <xiaomi-order v-if="baseInfo.platformId === '2'"></xiaomi-order>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import WeiboAccount from './weibo/account'
  import WeiboOrder from './weibo/order'
  import XiaomiAccount from './xiaomi/account'
  import XiaomiOrder from './xiaomi/order'

  export default {
    name: 'DeliveryMonitor',
    components: {
      WeiboAccount,
      WeiboOrder,
      XiaomiAccount,
      XiaomiOrder
    },
    computed: {
      ...mapGetters({
        platforms: 'platforms',
        screenWidth: 'screenWidth',
        baseInfo: 'deliveryMonitor/baseInfo'
      })
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../styles/core/var";

  .section + .section {
    padding-top: 20px;
  }
  .title {
    color: $color-base-black;
    font-size: 14px;
    font-weight: normal;
    margin: 0 0 20px;
  }
</style>
