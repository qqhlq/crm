<template>
  <div class="table-header">
    <div class="table-opera">
      <ul v-if="choosed.length !== 0" class="table-operation">
        <li v-if="role===3||role===2||role===1||role===0"  @click="openTransferCustomModal">
          <i class="fa fa fa-random"></i>
          <span>转移</span>
        </li>
        <li v-if="role===2||role===1||role===0" @click="openReturnCustomModal">
          <i class="fa fa-mail-reply"></i>
          <span>退回</span>
        </li>
        <li v-if="role===0" @click="openDelCustomModal">
          <i class="fa fa-trash"></i>
          <span>删除</span>
        </li>
      </ul>
      <span v-if="choosed.length === 0">私人池</span>
      <div  @click="openAddnewCustomModal" class="btn-green-mid">
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
      <b-autocomplete
        v-if="role===0"
        :list ="search.ownerName"
        @getSearchList = "getSearchList"
        @chooseSearchList = "chooseSearchList"
        @getList = "getList">
      </b-autocomplete>
      <b-select
        :list ="search.levelName"
        @getList = "getList">
      </b-select>
      <b-date-picker
        :list ="search.ownerTime"
        @getList = "getList">
      </b-date-picker>
      <b-select
        :list ="search.restTime"
        @getList = "getList">
      </b-select>
    </div>

    <!--转移客户弹出框-->
    <b-modaler ref="transferCustomModal">
      <div class="modal-grey-header" slot="header">将该客户转移给：</div>
      <b-complex-drop

        style="width: 460px;"
        slot="content"
        @getCheckeds="getTransferedUsers">
      </b-complex-drop>
      <div class="modal-center-btn" slot="btn">
        <button @click="transferCustomConfirm" class="green">确认</button>
        <button @click="closeTransferCustomModal" class="grey">取消</button>
      </div>
              <!--:interfaceType="3"-->
        <!--:interfaceParam="{'customPoolId': poolList.value.id}"-->
    </b-modaler>
    <!--退回客户弹出框-->
    <b-modaler ref="returnCustomModal" class="return-custom-modal">
      <div slot="content">
        <div :class="{empty: (returnCustomReason.value === '') && returnCustomReason.isEmpty}">
          <div class="check-return-tit">您确定退回该客户吗？</div>
          <div @click="closeTips('returnCustomReason') ">
            <textarea v-model="returnCustomReason.value" placeholder="请填写退回原因"></textarea>
          </div>
          <div class="errortips" :class="(returnCustomReason.value === '') && returnCustomReason.isEmpty ? 'openTips': 'closeTips'">请填写退回原因</div>
        </div>
      </div>
      <div class="modal-center-btn" slot="btn">
        <button @click="returnCustomConfirm" class="green">确认</button>
        <button @click="closeReturnCustomModal" class="grey">取消</button>
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
    name: 'PrivateHeader',
    data() {
      return {
        // 成功领取的客户数量
        getCustomCount: 0,

        // 被转移的用户
        transferedUsers: [],

        // 新建客户数据
        newCustomData: {},

        // 退回客户原因
        returnCustomReason:{
          value: '',
          isEmpty: false
        }
      }
    },
    computed: {
      ...mapGetters({
        choosed: 'privateList/choosed',
        search: 'privateList/search',
        role: 'role',
        returnCustomData: 'customerDetail/returnCustomData',
        transferCustomData: 'customerDetail/transferCustomData',
        delCustomdata: 'customerDetail/delCustomdata',
        addNewCustomData: 'commonList/addNewCustomData'
      })
    },
    methods: {
      ...mapActions({
        getSearchList: 'privateList/getSearchList',
        chooseSearchList: 'privateList/chooseSearchList',
        getList: 'privateList/getList',
        getMenusList: 'getMenusList',
        delCustom: 'customerDetail/delCustom',
        transferCustom: 'customerDetail/transferCustom',
        returnCustom: 'customerDetail/returnCustom',
        addNewCustom: 'commonList/addNewCustom'
      }),

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
        self.$refs.addnewCustom.openDrop()
      },
      closeAddnewCustomModal() {
        let self = this
        self.$refs.addnewCustom.closeDrop()
      },

      // 显示提示框
      openMOdaltips(type, tips) {
        let self = this
        self.$refs.openBModaltips.openModaltips(type, tips)
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
      },

      // 确认转移客户
      transferCustomConfirm() {
        let self = this
        if(self.transferedUsers.length > 1) {
          self.openMOdaltips('error', '客户只能转移给单一用户')
        } else if(self.transferedUsers.length < 1) {
          self.openMOdaltips('error', '请选择被转移的用户')
        } else {
          self.transferCustom({param: {customIds: `${JSON.stringify(self.choosed)}`, targetId: self.transferedUsers[0].val}})
            .then(() => {
              if(self.transferCustomData.data) {
                self.openMOdaltips('success', '客户转移成功')
                self.closeAllotCustomModal()
                self.getList()
              } else {
                self.openMOdaltips('error', '客户转移失败')
              }
            })
        }
      },

      // 打开关闭转移客户弹出框
      openTransferCustomModal() {
        let self = this
        self.$refs.transferCustomModal.openDrop()
      },
      closeTransferCustomModal() {
        let self = this
        self.$refs.transferCustomModal.closeDrop()
      },

      // 获取转移目标人
      getTransferedUsers(checkeds) {
        let self = this
        self.transferedUsers = checkeds
      },

      // 打开关闭退回客户弹出框
      openReturnCustomModal() {
        let self = this
        self.$refs.returnCustomModal.openDrop()
      },
      closeReturnCustomModal() {
        let self = this
        self.$refs.returnCustomModal.closeDrop()
      },

      // 确认退回客户
      returnCustomConfirm() {
        let self = this
        if(self.returnCustomReason.value === '') {
          self.returnCustomReason.isEmpty = true
        } else {
          self.returnCustom({param: {customIds: `${JSON.stringify(self.choosed)}`, reason: self.returnCustomReason.value}})
            .then(() => {
              if(self.returnCustomData.data) {
                self.openMOdaltips('success', '客户退回成功')
                self.closeReturnCustomModal()
                self.getList()
              } else {
                self.openMOdaltips('error', '客户退回失败')
              }
            })
        }
      },

      // 取消空值提示
      closeTips(type) {
        let self = this
        if(self[type].isEmpty) {
          self[type].isEmpty = false
        }
      },
    },
    mounted() {
      let self = this
      self.getList()
      self.getMenusList({url: self.$route.path})
    },


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


