<template>
  <div>
    <b-crumbs :crumbs="[{name: 'CRM'}, {name: '客户公海池'}, {name: '客户详情'}]"></b-crumbs>
    <div class="crm-content">
      <div class="cd-header">
        <div class="cd-header-name">{{ customerDetail.name }}</div>
        <div class="cd-header-operate">
          <!--<button @click="openMOdaltips('success', 'chengong')"><span class="fa fa-mail-forward"></span>领取</button>-->
          <button @click="openAllotCustomModal"><span class="fa fa-anchor"></span>分配</button>
          <button @click="openDelCustomModal"><span class="fa fa-trash"></span>删除</button>
        </div>
      </div>
      <div class="cd-simple-info">
        <table>
          <thead>
            <tr>
              <th>客户所有人</th>
              <th>客户级别</th>
              <th>电话</th>
              <th>微信/QQ</th>
              <th>剩余时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ customerDetail.ownerName }}</td>
              <td>{{ customerDetail.levelName }}</td>
              <td>{{ customerDetail.phone }}</td>
              <td>{{ customerDetail.otherContact }}</td>
              <td>{{ customerDetail.ownertime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="cd-detail-wrap">
      <div class="crm-content cd-detail-info">
        <div class="detail-wrap">
          <div class="cd-detail-header">
            <div class="header-name">基本信息</div>
            <div class="header-oprate">
              <button @click="openEditorCustomModal">编辑</button>
            </div>
          </div>
          <div class="detail-content">
            <table>
              <tbody>
                <tr>
                  <td>
                    <h3>客户产品名</h3>
                    <p>{{ customerDetail.name }}</p>
                  </td>
                  <td>
                    <h3>客户级别</h3>
                    <p>{{ customerDetail.levelName }}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>行业</h3>
                    <p>{{ customerDetail.tradeName }}</p>
                  </td>
                  <td>
                    <h3>跟进产品</h3>
                    <p>{{ customerDetail.productName }}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>客户分类</h3>
                    <p>{{ customerDetail.tradeName }}</p>
                  </td>
                  <td>
                    <h3>联系人</h3>
                    <p>{{ customerDetail.contacts }}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>省市</h3>
                    <p>{{ customerDetail.cityName }}</p>
                  </td>
                  <td>
                    <h3>详细地址</h3>
                    <p>{{ customerDetail.address }}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>电话</h3>
                    <p>{{ customerDetail.phone }}</p>
                  </td>
                  <td>
                    <h3>微信/QQ</h3>
                    <p>{{ customerDetail.otherContact }}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>微博</h3>
                    <p>{{ customerDetail.weibo }}</p>
                  </td>
                  <td>
                    <h3>备注</h3>
                    <p>{{ customerDetail.memo }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
          <div class="cd-detail-header">
            <div class="header-name">其他信息</div>
          </div>
          <div class="detail-content">
            <table>
              <tbody>
                <tr>
                  <td>
                    <h3>客户创建人</h3>
                    <p>{{ customerDetail.creatorName }}</p>
                  </td>
                  <td>
                    <h3>创建时间</h3>
                    <p>{{ customerDetail.posttime }}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>客户所有人</h3>
                    <p>{{ customerDetail.ownerName }}</p>
                  </td>
                  <td>
                    <h3>领取时间</h3>
                    <p>{{ customerDetail.ownertime }}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>剩余时间</h3>
                    <p>{{ customerDetail.resttime }}</p>
                  </td>
                  <td>
                    <h3>所属公海池</h3>
                    <p>{{ customerDetail.customPoolName }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="crm-content cd-dynamic">
        <div class="cd-detail-header">
          <div class="header-name">动态</div>
        </div>
        <div class="cd-dynamic-text">
          <div class="cd-dynamic-select">
            <span>*</span>
            <el-select v-model="dynamicValue" clearable placeholder="请选择" style="width: 400px;">
              <el-option
                v-for="item in dynamicOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="cd-dynamic-textarea">
            <textarea v-model="dynamicText" placeholder="请输入跟进记录(50个字以内)"></textarea>
            <span v-if="(dynamicText.replace(/[^\x00-\xff]/g, '__').length - 100) > 0">超出{{Math.ceil((dynamicText.replace(/[^\x00-\xff]/g, '__').length - 100)/2)}}个字</span>
          </div>
          <!--<textarea v-model="dynamicText"></textarea>-->
          <div @click="releaseFollowDynamicConfirm" class="cd-dynamic-submit"><button>发布</button></div>
        </div>
        <div class="cd-dynamic-content">
          <div class="cd-dynamic-content-wrap">
            <div v-if="dynamicList.records">
              <p v-for="record in dynamicList.records">
                <span class="fa fa-circle"></span>
                <i>{{ record.posttime }}</i>
                <span class="recordContent" v-html="record.memo"></span>
              </p>
            </div>
          </div>
          <div class="b-crm-left-pageTurn">
            <div>
              <span @click="getDynamicListPage(dynamicList.page - 1)" class="fa fa-chevron-circle-left"></span>
              <span class="pageNumber"><input :value="dynamicList.page"><span>/ {{ dynamicList.pageCount}}</span></span>
              <span @click="getDynamicListPage(dynamicList.page + 1)" class="fa fa-chevron-circle-right"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--分配客户弹出框-->
    <b-modaler ref="allotCustomModal">
      <div class="modal-grey-header" slot="header">将该客户分配给：</div>
      <b-complex-drop style="width: 460px;" slot="content" @getCheckeds="getCheckeds"></b-complex-drop>
      <div class="modal-center-btn" slot="btn">
        <button @click="allotCustomConfirm" class="green">确认</button>
        <button @click="closeAllotCustomModal" class="grey">取消</button>
      </div>
    </b-modaler>
    <!--领取客户弹出框-->
    <b-modaler ref="getCustomModal" class="min-modal">
      <div class="modal-teps" slot="content">您已成功领取该客户，请前往私人池进行跟进</div>
      <div class="modal-center-btn" slot="btn">
        <button class="green">确认</button>
        <button @click="closeDelCustomModal" class="grey">取消</button>
      </div>
    </b-modaler>
    <!--删除客户弹出框-->
    <b-modaler ref="delCustomModal">
      <div class="modal-teps" slot="content">您确定删除该客户吗？</div>
      <div class="modal-center-btn" slot="btn">
        <button @click="delCustomConfirm" class="green">确认</button>
        <button @click="closeDelCustomModal" class="grey">取消</button>
      </div>
    </b-modaler>
    <!--编辑客户弹出框-->
    <b-modaler ref="editorCustom" class="editorCustom-modal">
      <div class="modal-green-header" slot="header">编辑客户</div>
      <b-new-custom @getCustomEditorData="getCustomEditorData" slot="content" ref="CustomEditor"></b-new-custom>
      <div class="modal-center-btn" slot="btn">
        <button @click="updateCustomConfirm" class="green">确定</button>
      </div>
    </b-modaler>
    <b-modaltips ref="openBModaltips"></b-modaltips>
    <b-page-bottom></b-page-bottom>
  </div>
</template>
<script>

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'customerDetail',
    data() {
      return {

        // 跟进动作（选项）
        dynamicOptions: [],

        // 跟进动作选取值
        dynamicValue: '',

        // 客户动态列表
        dynamicList: '',

        // 客户详情
        customerDetail: {},

        // 被分配的用户
        allotedUsers: [],

        // 动态内容
        dynamicText: '',

        // 编辑结果
        updateParam: {}
      }
    },
    computed: {
      ...mapGetters('customerDetail',{
        customerDetailData: 'customerDetailData',
        dynamicTypesData: 'dynamicTypesData',
        delCustomdata: 'delCustomdata',
        allotCustomdata: 'allotCustomdata',
        releaseFollowDynamicdata: 'releaseFollowDynamicdata',
        tradeData: 'tradeData',
        productlineData: 'productlineData',
        provinceData: 'provinceData',
        cityData: 'cityData',
        dynamicListData: 'dynamicListData',
        updateCustomData: 'updateCustomData'
      }),
    },
    created () {
      let self = this

      // 请求客户详情接口
      self.getCustomerDetail({param: {customId: self.$route.query.id}}).then(() => {
        self.customerDetail = self.customerDetailData.data
        self.customerDetail.lastUpdatetime = self.getLocalTime(self.customerDetail.lastUpdatetime)
        self.customerDetail.ownertime = self.getLocalTime(self.customerDetail.ownertime).split(' ')[0]
        self.customerDetail.posttime = self.getLocalTime(self.customerDetail.posttime).split(' ')[0]
        self.customerDetail.resttime = self.getTimeDiff(self.customerDetail.resttime)
        self.$refs.CustomEditor.changeCustomerDetail(self.customerDetail)
      })

      // 请求跟进动作接口
      self.getDynamicOptions().then(() => {
        let dynamicData = self.dynamicTypesData.data
        for(let i=0; i<dynamicData.length; i++) {
          self.dynamicOptions.push({value: dynamicData[i].id, label: dynamicData[i].text})
        }
      })

      // 请求客户动态列表接口
      self.getDynamicList({param: {customId: self.$route.query.id, page: 1}}).then(() => {
        self.dynamicList = self.dynamicListData.data
        for(let i=0; i<self.dynamicList.records.length; i++) {
          self.dynamicList.records[i].posttime = self.getLocalTime(self.dynamicList.records[i].posttime)
        }

      })
    },
    methods: {
      ...mapActions({
        on: 'on',
        // 获取人员数据
        getCustomerDetail: 'customerDetail/getCustomerDetail',

        // 获取跟进动作
        getDynamicOptions: 'customerDetail/getDynamicOptions',

        // 获取客户动态列表
        getDynamicList: 'customerDetail/getDynamicList',

        // 删除客户
        delCustom: 'customerDetail/delCustom',

        // 分配客户
        allotCustom: 'customerDetail/allotCustom',

        // 发布跟进动态
        releaseFollowDynamic: 'customerDetail/releaseFollowDynamic',

        // 修改客户
        updateCustom: 'customerDetail/updateCustom',

      }),

      // 时间戳转日期
      getLocalTime(timeString) {
        let thisTime = new Date(timeString)
        let year     = thisTime.getFullYear()
        let month    = thisTime.getMonth()+1
        let date     = thisTime.getDate()
        let hour     = thisTime.getHours()
        let minute   = thisTime.getMinutes()
        let second   = thisTime.getSeconds()

        if(month < 10) {
          month = '0' + month
        }

        if(date < 10) {
          date = '0' + date
        }

        if(hour < 10) {
          hour = '0' + hour
        }

        if(minute < 10) {
          minute = '0' + minute
        }

        if(second < 10) {
          second = '0' + second
        }

        return   `${year}-${month}-${date} ${hour}:${minute}`//:${second}
      },

      // 获取与当前时间的时间差
      getTimeDiff(timeString) {
        let Nowtimestamp = Date.parse(new Date())
        let diffTimetamp = timeString - Nowtimestamp
        if(diffTimetamp > 0) {

          //计算出相差天数
          let days = Math.floor(diffTimetamp/(24*3600*1000))

          //计算天数后剩余的毫秒数
          var leave1 = diffTimetamp%(24*3600*1000)

          //计算出小时数
          var hours = Math.floor(leave1/(3600*1000))

          //计算小时数后剩余的毫秒数
          var leave2 = leave1%(3600*1000)

          //计算相差分钟数
          var minutes = Math.floor(leave2/(60*1000))

          //计算分钟数后剩余的毫秒数
          var leave3 = leave2%(60*1000)

          //计算相差秒数
          var seconds = Math.round(leave3/1000)

          return `${days}天${days}小时` //${days}钟${days}秒

        } else {
          diffTimetamp = -diffTimetamp
           //计算出相差天数
          let days = Math.floor(diffTimetamp/(24*3600*1000))

          //计算天数后剩余的毫秒数
          var leave1=diffTimetamp%(24*3600*1000)

          //计算出小时数
          var hours = Math.floor(leave1/(3600*1000))

          //计算小时数后剩余的毫秒数
          var leave2 = leave1%(3600*1000)

          //计算相差分钟数
          var minutes = Math.floor(leave2/(60*1000))

          //计算分钟数后剩余的毫秒数
          var leave3 = leave2%(60*1000)

          //计算相差秒数
          var seconds = Math.round(leave3/1000)

          return `-${days}天${days}小时` //${days}钟${days}秒
        }
      },

      // 打开关闭分配客户弹出框
      openAllotCustomModal() {
        let self = this
        self.$refs.allotCustomModal.openDrop()
      },

      closeAllotCustomModal() {
        let self = this
        self.$refs.allotCustomModal.closeDrop()
      },

      // 打开关闭领取客户弹出框
      openGetCustomModal() {
        let self = this
        self.$refs.getCustomModal.openDrop()
      },

      closeGetCustomModal() {
        let self = this
        self.$refs.getCustomModal.closeDrop()
      },

      // 打开关闭删除客户弹出框
      openDelCustomModal() {
        let self = this
        self.$refs.delCustomModal.openDrop()
      },

      closeDelCustomModal() {
        let self = this
        self.$refs.delCustomModal.closeDrop()
      },

      // 打开关闭编辑客户弹出框
      openEditorCustomModal() {
        let self = this
        self.$refs.editorCustom.openDrop()
      },

      closeEditorCustomModal() {
        let self = this
        self.$refs.editorCustom.closeDrop()
      },

      // 获取复杂下拉框选中数据
      getCheckeds(checkeds) {
        let self = this
        self.allotedUsers = checkeds

      },

      // 确认分配客户
      allotCustomConfirm() {
        let self = this
        if(self.allotedUsers.length > 1) {
          self.openMOdaltips('error', '客户只能分配给单一用户')
        } else if(self.allotedUsers.length < 1) {
          self.openMOdaltips('error', '请选择被分配的用户')
        } else {
          self.allotCustom({param: {customIds: `${JSON.stringify([self.$route.query.id])}`, userId: self.allotedUsers[0].val}})
            .then(() => {
              if(self.delCustomdata.data) {
                self.openMOdaltips('success', '客户分配成功')
                self.closeAllotCustomModal()
              } else {
                self.openMOdaltips('error', '客户分配失败')
                self.closeAllotCustomModal()
              }
            })
        }
      },

      // 确认删除客户
      delCustomConfirm() {
        let self = this
        self.closeDelCustomModal()
        self.delCustom({param: {customIds: `${JSON.stringify([self.$route.query.id])}`}})
          .then(() => {
            if(self.delCustomdata.data) {
              self.openMOdaltips('success', '客户删除成功')
            } else {
              self.openMOdaltips('error', '客户删除失败')
            }
          })
      },

      // 显示提示框
      openMOdaltips(type, tips) {
        let self = this
        self.$refs.openBModaltips.openModaltips(type, tips)
      },

      // 确认发布跟进动态
      releaseFollowDynamicConfirm() {
        let self = this
        if(self.dynamicText.replace(/[^\x00-\xff]/g, '__').length > 50) {
          self.openMOdaltips('error', '跟进记录必须保持在50个字以内')
        } else if(self.dynamicValue === null || self.dynamicValue === '' || self.dynamicValue === 'clear') {
          self.openMOdaltips('error', '请选择跟进程度')
        } else if(self.dynamicText === null || self.dynamicText === '') {
          self.openMOdaltips('error', '请填写跟进内容')
        } else {
          self.releaseFollowDynamic({param: {actionId: self.dynamicValue, customId: self.$route.query.id, memo: self.dynamicText}})
            .then(() => {

              // 清空已发布的内容
              self.dynamicValue = ''
              self.dynamicText = ''
              self.getDynamicListPage(1)

            })
        }
      },

      // 获取动态并进行分页处理
      getDynamicListPage(page) {
        let self = this
        if(page <= self.dynamicList.pageCount && page >= 1) {
          self.getDynamicList({param: {customId: self.$route.query.id, page: page}}).then(() => {
            self.dynamicList = self.dynamicListData.data
            for(let i=0; i<self.dynamicList.records.length; i++) {
              self.dynamicList.records[i].posttime = self.getLocalTime(self.dynamicList.records[i].posttime)
            }
          })
        }
      },

      // 获取编辑数据
      getCustomEditorData(updateParam) {
        let self = this
        self.updateParam = updateParam
      },

      // 确认提价客户编辑
      updateCustomConfirm() {
        let self = this
        self.$refs.CustomEditor.addEditor()
        if(self.updateParam.hadValue) {
          self.updateCustom({param: self.updateParam.param}).then(() => {
            if(self.updateCustomData.data) {
              self.openMOdaltips('success', '修改成功')
              self.closeEditorCustomModal()
            } else {
              self.openMOdaltips('error', '修改失败')
            }
          })
        }

      }

    }
  }
</script>

<style scoped>

</style>

