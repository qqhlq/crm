<template>
  <div class="new-custom">
    <div class="new-custom-line" :class="{empty: (name === '') && nameIsEmpty}">
      <div class="line-wrap">
        <label>
          <span class="new-custom-hint">*</span>
          <span class="new-custom-lineName">客户产品名</span>
        </label>
        <span class="new-custom-editor" @click="closeTips('name')">
          <input placeholder="请输入客户产品名" v-model="name">
        </span>
      </div>
      <div class="errortips" :class="(name === '') && nameIsEmpty ? 'openTips': 'closeTips'">请输入客户产品名</div>
      <div class="errortips" :class="(name !== '') && nameIsHad ? 'openTips': 'closeTips'">已存在同名客户</div>
    </div>
    <div class="new-custom-line" :class="{empty: (levelId === '') && levelIdIsEmpty}">
      <div class="line-wrap">
        <label>
          <span class="new-custom-hint">*</span>
          <span class="new-custom-lineName">客户级别</span>
        </label>
        <span class="new-custom-editor" @click="closeTips('levelId')">
          <el-select v-model="levelId" clearable filterable placeholder="请选择客户级别" style="width: 320px;">
            <el-option
              v-for="item in customLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="errortips" :class="(levelId === '') && levelIdIsEmpty ? 'openTips': 'closeTips'">请选择客户级别</div>
    </div>
    <div class="new-custom-line" :class="{empty: (tradeId === '') && tradeIdIsEmpty}">
      <div class="line-wrap">
        <label>
          <span class="new-custom-hint">*</span>
          <span class="new-custom-lineName">行业</span>
        </label>
        <span class="new-custom-editor" @click="closeTips('tradeId')">
          <el-select v-model="tradeId" clearable filterable placeholder="请选择行业" style="width: 320px;">
            <el-option
              v-for="item in tradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="errortips" :class="(tradeId === '') && tradeIdIsEmpty ? 'openTips': 'closeTips'">请选择行业</div>
    </div>
    <div class="new-custom-line"  :class="{empty: (productLineId === '') && productLineIdIsEmpty}">
      <div class="line-wrap">
        <label>
          <span class="new-custom-hint">*</span>
          <span class="new-custom-lineName">跟进产品线</span>
        </label>
        <span class="new-custom-editor" @click="closeTips('productLineId')">
          <el-select v-model="productLineId" clearable filterable  placeholder="请选择跟进产品线" style="width: 320px;">
            <el-option
              v-for="item in productlineOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="errortips" :class="(productLineId === '') && productLineIdIsEmpty ? 'openTips': 'closeTips'">请选择跟进产品线</div>
    </div>
    <div class="new-custom-line"  :class="{empty: (type === '') && typeIsEmpty}">
      <div class="line-wrap">
        <label>
          <span class="new-custom-hint">*</span>
          <span class="new-custom-lineName">客户分类</span>
        </label>
        <span class="new-custom-editor" @click="closeTips('type')">
          <el-select v-model="type" clearable filterable placeholder="请选择客户分类" style="width: 320px;">
            <el-option
              v-for="item in customTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="errortips" :class="(type === '') && typeIsEmpty ? 'openTips': 'closeTips'">请选择客户分类</div>
    </div>
    <div class="new-custom-line"  :class="{empty: (contacts === '') && contactsIsEmpty}">
      <div class="line-wrap">
        <label>
          <span class="new-custom-hint">*</span>
          <span class="new-custom-lineName">联系人</span>
        </label>
        <span class="new-custom-editor" @click="closeTips('contacts')">
          <input placeholder="请输入联系人姓名" v-model="contacts">
        </span>
      </div>
      <div class="errortips" :class="(contacts === '') && contactsIsEmpty ? 'openTips': 'closeTips'">请输入联系人</div>
    </div>
    <div class="new-custom-line"  :class="{empty: (cityCode === '') && cityCodeIsEmpty}">
      <div class="line-wrap">
        <label>
          <span class="new-custom-hint">*</span>
          <span class="new-custom-lineName">省市</span>
        </label>
        <span class="new-custom-editor" @click="closeTips('cityCode')">
          <el-select @change="changeCitys"  v-model="provinceCode" clearable filterable placeholder="请选择省份" style="width: 155px; margin-right: 10px;" class="noEmpety">
            <el-option
              v-for="item in provinceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="cityCode" clearable filterable placeholder="请选择城市" style="width: 155px;">
            <el-option
              v-for="item in CityOptions.data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="errortips" :class="(cityCode === '') && cityCodeIsEmpty ? 'openTips': 'closeTips'" style="padding-left: 165px">请选择城市</div>
    </div>
    <div class="new-custom-line">
      <div class="line-wrap">
        <label>
          <span class="new-custom-lineName">详细地址</span>
        </label>
        <span class="new-custom-editor">
          <input placeholder="请输入详细地址" v-model="address">
        </span>
      </div>
    </div>
    <div class="new-custom-line"  :class="{empty: (phone === '') && phoneIsEmpty, error: (phone !== '') && phoneIsError}">
      <div class="line-wrap">
        <label>
          <span class="new-custom-hint">*</span>
          <span class="new-custom-lineName">电话</span>
        </label>
        <span class="new-custom-editor" @click="closeTips('phone')">
          <input placeholder="请输入电话" v-model="phone">
        </span>
      </div>
      <div class="errortips" :class="(phone === '') && phoneIsEmpty ? 'openTips': 'closeTips'">请输入电话</div>
      <div class="errortips" :class="(phone !== '') && phoneIsError ? 'openTips': 'closeTips'">格式错误</div>
    </div>
    <div class="new-custom-line"  :class="{empty: (otherContact === '') && otherContactIsEmpty}">
      <div class="line-wrap">
        <label>
          <span class="new-custom-hint">*</span>
          <span class="new-custom-lineName">微信/QQ</span>
        </label>
        <span class="new-custom-editor" @click="closeTips('otherContact')">
          <input placeholder="请输入微信/QQ" v-model="otherContact">
        </span>
      </div>
      <div class="errortips" :class="(otherContact === '') && otherContactIsEmpty ? 'openTips': 'closeTips'">请输入微信/QQ</div>
    </div>
    <div class="new-custom-line">
      <div class="line-wrap">
        <label>
          <span class="new-custom-lineName">微博</span>
        </label>
        <span class="new-custom-editor">
          <input placeholder="请输入微博" v-model="weibo">
        </span>
      </div>
    </div>
    <div class="new-custom-line">
      <div class="line-wrap">
        <label>
          <span class="new-custom-lineName">备注</span>
        </label>
        <span class="new-custom-editor">
          <input placeholder="请输入备注" v-model="memo">
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BNewCustom',
  data() {
    return {
      // 行业（选项）
      tradeOptions: [],

      // 行业选值
      tradeId: '',

      // 产品线（选项）
      productlineOptions: [],

      // 产品线选值
      productLineId: '',

      // 省份选项
      provinceOptions: [],

      // 省份选取值
      provinceCode: '',

      // 城市选项
      CityOptions: {data: []},

      // 城市选取值
      cityCode: '',

      // 客户级别选项
      customLevelOptions: [{
        value: 1,
        label: 'A(重点客户)'
      }, {
        value: 2,
        label: 'B(普通客户)',
        disabled: true
      }, {
        value: 3,
        label: 'C(非重点客户)'
      }],

      // 客户级别选值
      levelId: '',

      // 客户分类选项
      customTypeOptions: [{
        value: 1,
        label: '直客'
      }, {
        value: 2,
        label: '代理',
        disabled: true
      }],

      // 客户分类选值
      type: '',

      //客户产品名
      name: '',

      // 联系人
      contacts: '',

      // 详细地址
      address: '',

      // 微信/QQ
      otherContact: '',

      // 电话
      phone: '',

      // 微博
      weibo: '',

      // 备注
      memo: '',

      // 空值提示
      nameIsEmpty: false,
      levelIdIsEmpty: false,
      tradeIdIsEmpty: false,
      productLineIdIsEmpty: false,
      typeIsEmpty: false,
      contactsIsEmpty: false,
      cityCodeIsEmpty: false,
      phoneIsEmpty: false,
      otherContactIsEmpty: false,

      // 错误提示
      phoneIsError: false,

      // 客户名称已存在提示
      nameIsHad: false,

      // 是否清空城市选择
      iSEmptyCityCode: false,

      // 客户详情
      customerDetail: {}

    }
  },

  computed: {
    ...mapGetters('newCustom',{
      tradeData: 'tradeData',
      productlineData: 'productlineData',
      provinceData: 'provinceData',
      cityData: 'cityData',
    }),
  },

  created () {
    let self = this
    // 请求行业接口
    self.getTradeOptions().then(() => {
      let tradeData = self.tradeData.data
      for(let i=0; i<tradeData.length; i++) {
        self.tradeOptions.push({value: tradeData[i].id, label: tradeData[i].text})
      }

      // 赋值
      if(self.customerDetail) {
        if(self.customerDetail.tradeId) {
          self.tradeId = self.customerDetail.tradeId
        }
      }
    }),

    // 请求产品线接口
    self.getProductlineOptions().then(() => {
      let productlineData = self.productlineData.data
      for(let i=0; i<productlineData.length; i++) {
        self.productlineOptions.push({value: productlineData[i].id, label: productlineData[i].text})
      }

      // 赋值
      if(self.customerDetail) {
        if(self.customerDetail.productLineId) {
          self.productLineId = self.customerDetail.productLineId
        }
      }
    })

    // 请求省份接口
    self.getProvinceOptions().then(() => {
      let provinceData = self.provinceData.data
      for(let i=0; i<provinceData.length; i++) {
        self.provinceOptions.push({value: provinceData[i].id, label: provinceData[i].text})
      }

      // 赋值
      if(self.customerDetail) {
        if(self.customerDetail.provinceCode) {
          self.provinceCode = self.customerDetail.provinceCode
        }
      }
    })
  },
  methods: {

    ...mapActions({
      // 获取行业
      getTradeOptions: 'newCustom/getTradeOptions',

      getProductlineOptions: 'newCustom/getProductlineOptions',

      // 获取省份
      getProvinceOptions: 'newCustom/getProvinceOptions',

      // 获取城市
      getCitysOptions: 'newCustom/getCitysOptions',

      // 新建客户
      // addNewCustom: 'newCustom/addNewCustom',

    }),

    // 获取城市
    changeCitys({cb = () => {}, firstTime = false}) {
      let self = this
      // 请求省份接口
      // if()
      if(self.provinceCode === '') {
        self.cityCode   = ''
        self.CityOptions = {data: []}
      } else {
        self.getCitysOptions({param: {provinceId: self.provinceCode}}).then(() => {
          let cityData = self.cityData.data
          let citys    = []

          for(let i=0; i<cityData.length; i++) {
            citys.push({value: cityData[i].id, label: cityData[i].text})
          }
          self.CityOptions = {data: citys}

          if(self.iSEmptyCityCode) {
            self.cityCode   = ''
          } else {
            if(self.provinceCode !== null && self.provinceCode !== '') {
              if(self.customerDetail.cityCode) {
                self.cityCode = self.customerDetail.cityCode
              }
            }
          }
          self.iSEmptyCityCode = true
        })
      }
    },

    // 为详情赋值
    changeCustomerDetail(customerDetail) {
      let self = this
      self.customerDetail = customerDetail
      if(self.customerDetail.name) {
        self.name = self.customerDetail.name
      }
      if(self.customerDetail.levelId) {
        self.levelId = self.customerDetail.levelId
      }
      if(self.customerDetail.tradeId) {
        self.tradeId = self.customerDetail.tradeId
      }
      if(self.customerDetail.productLineId) {
        self.productLineId = self.customerDetail.productLineId
      }
      if(self.customerDetail.type) {
        self.type = self.customerDetail.type
      }
      if(self.customerDetail.contacts) {
        self.contacts = self.customerDetail.contacts
      }
      if(self.customerDetail.provinceCode) {
        self.provinceCode = self.customerDetail.provinceCode
      }
      if(self.customerDetail.cityCode) {
        self.cityCode = self.customerDetail.cityCode
      }
      if(self.customerDetail.address) {
        self.address = self.customerDetail.address
      }
      if(self.customerDetail.phone) {
        self.phone = self.customerDetail.phone
      }
      if(self.customerDetail.otherContact) {
        self.otherContact = self.customerDetail.otherContact
      }
      if(self.customerDetail.weibo) {
        self.weibo = self.customerDetail.weibo
      }

      if(self.customerDetail.memo) {
        self.memo = self.customerDetail.memo
      }
    },

    // 验证手机格式
    checkTelError() {
      let self = this
      let isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
      let isMob=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/

      if(self.phone !== '') {
        if(isMob.test(self.phone) || isPhone.test(self.phone)) {
          self.phoneIsError = false
        } else {
          self.phoneIsError = true
        }
      }
    },

    // 取消提示
    closeTips(type) {
      let self = this
      if(self[type + 'IsEmpty']) {
        self[type + 'IsEmpty'] = false
      }
      if(self[type + 'IsError']){
        self[type + 'IsError'] = false
      }
    },

    // 空值验证
    checkValueEmpty(type) {
      let self = this
      if(self[type] === '') {
        self[type + 'IsEmpty'] = true
      } else {
        self[type + 'IsEmpty'] = false
      }
    },

    // 客户名称唯一性验证
    checkNameIsHad() {

    },

    // 提交
    async addEditor() {
      let self = this
      self.checkValueEmpty('name')
      self.checkValueEmpty('levelId')
      self.checkValueEmpty('tradeId')
      self.checkValueEmpty('productLineId')
      self.checkValueEmpty('type')
      self.checkValueEmpty('contacts')
      self.checkValueEmpty('cityCode')
      self.checkValueEmpty('phone')
      self.checkValueEmpty('otherContact')

      self.checkTelError()

      if( !self.nameIsEmpty &&
          !self.levelIdIsEmpty &&
          !self.tradeIdIsEmpty &&
          !self.productLineIdIsEmpty &&
          !self.typeIsEmpty &&
          !self.contactsIsEmpty &&
          !self.cityCodeIsEmpty &&
          !self.phoneIsEmpty &&
          !self.otherContactIsEmpty &&
          !self.phoneIsError
        ) {

        self.$emit('getCustomEditorData',{hadValue: true, param: {
          name: self.name,
          levelId: self.levelId,
          tradeId: self.tradeId,
          productLineId: self.productLineId,
          type: self.type,
          contacts: self.contacts,
          cityCode: self.cityCode,
          address: self.address,
          phone: self.phone,
          otherContact: self.otherContact,
          weibo: self.weibo,
          memo: self.memo
        }})
      } else {
        self.$emit('getCustomEditorData',{hadValue: false, param: {}})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .closeTips {
    transform-origin:0 0;
    transform: scaleY(0);
    height: 0;

    -ms-transform-origin:0 0; 		/* IE 9 */
    -ms-transform: scaleY(0); 	/* IE 9 */

    -webkit-transform-origin:0 0;	/* Safari 和 Chrome */
    -webkit-transform: scaleY(0); 	/* Safari 和 Chrome */

    -moz-transform-origin:0 0;		/* Firefox */
    -moz-transform: scaleY(0); 	 	/* Firefox */

    -o-transform-origin:0 0;
    -o-transform: scaleY(0);


    transition: transform .3s;
    -ms-transition: -ms-transform .3s;
    -moz-transition: -moz-transform .3s;
    -webkit-transition: -webkit-transform .3s;
    -o-transition: -o-transform .3s;
    transition: height .3s;
    -ms-transition: height .3s;
    -moz-transition: height .3s;
    -webkit-transition: height .3s;
    -o-transition: height .3s;
  }

  .openTips {
    transform-origin:0 0;
    transform: scaleY(1);
    height: 20px;

    -ms-transform-origin:0 0; 		/* IE 9 */
    -ms-transform: scaleY(1); 	/* IE 9 */

    -webkit-transform-origin:0 0;	/* Safari 和 Chrome */
    -webkit-transform: scaleY(1); 	/* Safari 和 Chrome */

    -moz-transform-origin:0 0;		/* Firefox */
    -moz-transform: scaleY(1); 	 	/* Firefox */

    -o-transform-origin:0 0;
    -o-transform: scaleY(1);

    transition: transform .3s;
    -ms-transition: -ms-transform .3s;
    -moz-transition: -moz-transform .3s;
    -webkit-transition: -webkit-transform .3s;
    -o-transition: -o-transform .3s;
    transition: height .3s;
    -ms-transition: height .3s;
    -moz-transition: height .3s;
    -webkit-transition: height .3s;
    -o-transition: height .3s;
  }
</style>
