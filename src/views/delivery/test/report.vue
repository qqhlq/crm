<template>
  <div class="w-box">
    <div class="w-box__header">
      测试信息
      <el-tooltip class="w-tooltip" effect="dark" placement="top">
        <div slot="content">1. 填写测试链接后，选择测试设备类型，输入对应设备号；<br>2. 点击“上报”，出现测试记录，状态为“等待回调”；<br>3. 使用测试链接，下载并激活对应APP；<br>4. 刷新页面，回调状态为“已成功”；<br>5. 符合以上步骤，监控链接可使用。</div>
        <i class="fa fa-question-circle"></i>
      </el-tooltip>
    </div>
    <div class="w-box__content">
      <el-form :model="form" class="w-form" label-width="70px" :label-position="screenWidth <= 769 ? 'top' : 'right'">
        <el-form-item class="w-form__item" label="客户名" prop="customName">
          <el-input :disabled="true" class="w-form__item__input" size="small" placeholder="未设置" v-model.trim="form.customName"></el-input>
        </el-form-item>
        <el-form-item class="w-form__item" label="产品名" prop="productName">
          <el-input :disabled="true" class="w-form__item__input" size="small" placeholder="未设置" v-model.trim="form.productName"></el-input>
        </el-form-item>
        <el-form-item class="w-form__item" label="上报类型" prop="os">
          <el-radio-group v-model="form.os">
            <el-radio label="0">Android</el-radio>
            <el-radio label="1">iOS</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="w-form__item" label="设备号" prop="deviceNo">
          <el-input class="w-form__item__input" size="small" placeholder="请输入设备号，iOS设备号为idfa，安卓为IMEI码" v-model.trim="form.deviceNo"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button size="small" native-type="button" @click="submit()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'TestReport',
    computed: {
      ...mapGetters({
        screenWidth: 'screenWidth',
        form: 'deliveryTest/reportForm',
        listForm: 'deliveryTest/listForm'
      })
    },
    methods: {
      ...mapActions({
        updateForm: 'deliveryTest/updateForm',
        addTest: 'deliveryTest/addTest',
        getList: 'deliveryTest/getList',
        setListQuery: 'deliveryTest/setListQuery'
      }),

      /**
       * 提交测试信息
       */
      async submit() {
        let self = this
        let data = await self.addTest({
          customId: self.$route.params.cid,
          url: decodeURIComponent(self.$route.query.url),
          deviceNo: self.form.deviceNo,
          os: self.form.os
        })

        if (data.data === true) {
          self.setListQuery({
            page: 1,
            customId: this.$route.params.cid,
            url: this.$route.query.url,
            export: false
          })
          self.getList()
          console.log(self.listForm)
        } else {
          this.$message.error('上报操作失败，请重新尝试')
        }
      }
    },
    mounted() {
      let self = this
      self.updateForm({
        customName: this.$route.query.customName,
        productName: this.$route.query.productName
      })
    }
  }
</script>
