<template>
  <div class="table-header">
    <div class="table-opera">
      <ul v-if="choosed.length !== 0" class="table-operation">
        <li v-if="role===3||role===2||role===1||role===0" @click="getCustomConfirm">
          <i class="fa fa-mail-forward"></i>
          <span>领取</span>
        </li>
        <li v-if="role===2||role===1||role===0" @click="openAllotCustomModal">
          <i class="fa fa-anchor"></i>
          <span>分配</span>
        </li>
        <li v-if="role===0" @click="openDelCustomModal">
          <i class="fa fa-trash"></i>
          <span>删除</span>
        </li>
      </ul>
      <div v-if="choosed.length === 0 && role===0" class="b-poollist">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{poolList.value.text}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item of poolList.list" :command="item.id.toString()" :key="item.id">{{item.text}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <span v-if="role===3||role===2||role===1">{{role}}</span>
      <div @click="openAddnewCustomModal" class="btn-green-mid">
        新建客户
      </div>
    </div>
    <div class="table-search">
      <b-autocomplete
        :list ="search.productName"
        @getSearchList = "getSearchList"
        @chooseSearchList = "chooseSearchList"
        @getList = "getList">
      </b-autocomplete>
      <b-select
        :list ="search.tradeName"
        @getList = "getList">
      </b-select>
      <b-autocomplete
        :list ="search.cityName"
        @getSearchList = "getSearchList"
        @chooseSearchList = "chooseSearchList"
        @getList = "getList">
      </b-autocomplete>
      <b-date-picker
        :list ="search.updateTime"
        @getList = "getList">
      </b-date-picker>
    </div>


    <!--分配客户弹出框-->
    <b-modaler ref="allotCustomModal">
      <div class="modal-grey-header" slot="header">将所选客户分配给：</div>
      <div slot="content">
        <b-complex-drop
          :interfaceType="3"
          :interfaceParam="{'customPoolId': poolList.value.id}"
          style="width: 460px;"
          @getCheckeds="getAllotedUsers">
        </b-complex-drop>
      </div>
      <div class="modal-center-btn" slot="btn">
        <button @click="allotCustomConfirm" class="green">确认</button>
        <button @click="closeAllotCustomModal" class="grey">取消</button>
      </div>
    </b-modaler>
    <!--领取客户弹出框-->
    <b-modaler ref="getCustomModal" class="min-modal">
      <div class="modal-teps" slot="content">您已成功领取 {{ getCustomCount }} 个客户，请前往私人池进行跟进。</div>
      <div class="modal-center-btn" slot="btn">
        <button @click="gotoPrivate" class="green">确认</button>
        <button @click="closeGetCustomModal" class="grey">取消</button>
      </div>
    </b-modaler>
    <!--删除客户弹出框-->
    <b-modaler ref="delCustomModal" class="min-modal">
      <div class="modal-teps" slot="content">您确定将所选客户删除吗？</div>
      <div class="modal-center-btn" slot="btn">
        <button @click="delCustomConfirm" class="green">确认</button>
        <button @click="closeDelCustomModal" class="grey">取消</button>
      </div>
    </b-modaler>
    <!--新建客户弹出框-->
    <b-modaler ref="addnewCustom" class="editorCustom-modal">
      <div class="modal-green-header" slot="header">新建客户</div>
      <b-new-custom @getCustomEditorData="getNewCustomData" slot="content" ref="CustomEditor"></b-new-custom>
      <div class="modal-center-btn" slot="btn">
        <button @click="addNewCustomConfirm" class="green">确定</button>
      </div>
    </b-modaler>
    <b-modaltips ref="openBModaltips"></b-modaltips>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'CommonHeader',
    data() {
      return {
        // 成功领取的客户数量
        getCustomCount: 0,

        allotedUsers: [],

        newCustomData: {}
      }
    },

    computed: {
      ...mapGetters({
        choosed: 'commonList/choosed',
        search: 'commonList/search',
        poolList: 'commonList/poolList',
        role: 'role',
        checkCustomsLimitData: 'checkCustomsLimitData',
        getCustomData: 'customerDetail/getCustomData',
        allotCustomdata: 'customerDetail/allotCustomdata',
        delCustomdata: 'customerDetail/delCustomdata',
        addNewCustomData: 'commonList/addNewCustomData',
        customPoolName: 'commonList/customPoolName',

      })
    },
    methods: {
      ...mapActions({
        getSearchList: 'commonList/getSearchList',
        chooseSearchList: 'commonList/chooseSearchList',
        getList: 'commonList/getList',
        getPoolList: 'commonList/getPoolList',
        getTradeList: 'commonList/getTradeList',
        changePoolValue: 'commonList/changePoolValue',
        getMenusList: 'getMenusList',
        checkCustomLimit: 'checkCustomLimit',
        delCustom: 'customerDetail/delCustom',
        allotCustom: 'customerDetail/allotCustom',
        getCustom: 'customerDetail/getCustom',
        addNewCustom: 'commonList/addNewCustom'
      }),
      handleCommand(value) {
        let self = this
        self.changePoolValue(value)
      },

      // 打开关闭领取客户弹出框
      openGetCustomModal(count) {
        let self = this
        self.getCustomCount = count
        self.$refs.getCustomModal.openDrop()
      },
      closeGetCustomModal() {
        let self = this
        self.$refs.getCustomModal.closeDrop()
      },

      // 确认领取客户
      getCustomConfirm() {
        let self = this
        let customCount = self.choosed.length
        self.getCustom({param: {customIds: `${JSON.stringify(self.choosed)}`}})
          .then(() => {
            if(self.getCustomData.data) {
              self.openGetCustomModal(customCount)
            } else {
              self.openMOdaltips('error', '客户领取失败')
            }
          })
      },

      // 跳转私人池
      gotoPrivate() {
        let self = this
        self.$router.go('/crm/private')
      },

      // 获取分配目标人
      getAllotedUsers(checkeds) {
        let self = this
        self.allotedUsers = checkeds
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

      // 确认分配客户
      allotCustomConfirm() {
        let self = this
        if(self.allotedUsers.length > 1) {
          self.openMOdaltips('error', '客户只能分配给单一用户')
        } else if(self.allotedUsers.length < 1) {
          self.openMOdaltips('error', '请选择被分配的用户')
        } else {
          self.allotCustom({param: {customIds: `${JSON.stringify(self.choosed)}`, userId: self.allotedUsers[0].val}})
            .then(() => {
              if(self.allotCustomdata.data) {
                self.openMOdaltips('success', '客户分配成功')
                self.closeAllotCustomModal()
                self.getDynamicListPage(1)
              } else {
                self.openMOdaltips('error', '客户分配失败')
              }
            })
        }
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

      // 确认删除客户
      delCustomConfirm() {
        let self = this
        self.delCustom({param: {customIds: `${JSON.stringify(self.choosed)}`}})
          .then(() => {
            if(self.delCustomdata.data) {
              self.openMOdaltips('success', '客户删除成功')
              self.closeDelCustomModal()
              self.getList()
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

      // 打开关闭新建客户弹出框
      openAddnewCustomModal() {
        let self = this
        self.checkCustomLimit().then(() => {
          if(self.checkCustomsLimitData.data) {
            self.$refs.addnewCustom.openDrop()
          } else {
            self.openMOdaltips('error',self.checkCustomsLimitData.message)
          }
        })
      },
      closeAddnewCustomModal() {
        let self = this
        self.$refs.addnewCustom.closeDrop()
      },

      // 获取新建客户数据
      getNewCustomData(newCustomData) {
        let self = this
        self.newCustomData = newCustomData
      },

      // 新建客户
      addNewCustomConfirm() {
        let self = this
        self.$refs.CustomEditor.addEditor() //空值验证

        if(self.newCustomData.hadValue) {
          self.addNewCustom({param: self.newCustomData.param}).then(() => {
            if(self.addNewCustomData.data) {
              self.openMOdaltips('success', '新建客户成功')
              self.closeAddnewCustomModal()
              self.getList()
            } else {
              self.openMOdaltips('error', '新建客户失败')
            }
          })
        }
      }

    },
    mounted() {
      let self = this
      self.getTradeList()
      self.getPoolList()
      self.getMenusList({url: self.$route.path})
    }
  }
</script>

<style lang="scss">
  .b-poollist {
    height: 40px;
    line-height: 40px;
    display: inline-block;
    margin: 20px 0px 20px 30px;
  }
</style>


