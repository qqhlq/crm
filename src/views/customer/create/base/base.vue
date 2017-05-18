<template>
  <div>
    <el-breadcrumb separator="/" class="w-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/boss/customer' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>录入客户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="w-box">
      <div class="w-box__header">
        第一步：基础资质
      </div>
      <div class="w-box__content">
        <el-form :model="base.form" ref="form" :rules="base.rules" class="w-form" label-width="80px" :label-position="screenWidth <= 769 ? 'top' : 'right'">
          <el-form-item class="w-form__item" label="公司名" prop="customName" required>
            <el-input class="w-form__item__input" size="small" v-model="base.form.customName" placeholder="请填写公司名"></el-input>
          </el-form-item>
          <el-form-item class="w-form__item" label="产品名" prop="productName" required>
            <el-input class="w-form__item__input" size="small" v-model="base.form.productName" placeholder="请填写产品名"></el-input>
          </el-form-item>
          <el-form-item class="w-form__item" label="网站地址" prop="url" required>
            <el-input class="w-form__item__input" size="small" placeholder="请填写网站地址"></el-input>
          </el-form-item>
          <el-form-item class="w-form__item" label="DSP行业" prop="tradeId" required>
            <el-select
              class="w-form__item__select"
              size="small"
              v-model="base.form.tradeId"
              placeholder="DSP行业">
                <el-option
                  v-for="(value, key) in base.trade"
                  :label="value"
                  :value="key"
                  :key="key">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="w-form__item" label="联系人" prop="contactName" required>
            <el-input class="w-form__item__input" size="small" placeholder="请填写联系人名称"></el-input>
          </el-form-item>
          <el-form-item class="w-form__item" label="联系电话" prop="phone" required>
            <el-input class="w-form__item__input" size="small" placeholder="请填写联系电话"></el-input>
          </el-form-item>
          <el-form-item class="w-form__item" label="电子邮箱" prop="salesEmail" required>
            <el-input class="w-form__item__input" size="small" placeholder="请填写电子邮箱"></el-input>
          </el-form-item>
          <el-form-item class="w-form__item" label="邮寄地址" prop="address" required>
            <el-input
              class="w-form__item__input"
              type="textarea"
              :rows="1"
              autosize
              placeholder="请填写邮寄地址">
            </el-input>
          </el-form-item>
          <el-form-item class="w-form__item" label="营业执照" prop="businessLicense" required>
            <el-upload
              class="w-form__item__upload"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">图片格式：JPG、PNG</div>
            </el-upload>
          </el-form-item>
          <el-form-item class="w-form__item" label="ICP备案" prop="icpLicense" required>
            <el-upload
              class="w-form__item__upload"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">图片格式：JPG、PNG</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button size="small" native-type="button" type="primary" @click="nextStep">下一步</el-button>
            <el-button size="small" native-type="button">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'CreateBase',
    computed: {
      ...mapGetters({
        screenWidth: 'screenWidth',
        base: 'customerCreate/base'
      })
    },
    methods: {
      ...mapActions({
        getBaseTrade: 'customerCreate/getBaseTrade'
      }),

      /**
       * 跳转到下一步
       */
      nextStep() {
        let self = this
        // self.$router.push('/boss/customer/create/platform')
      }
    },
    mounted() {
      let self = this
      self.getBaseTrade()
    }
  }
</script>
