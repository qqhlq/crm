<template>
  <div>
    <b-crumbs :crumbs="[{name: 'CRM'}, {name: '分组管理'}]"></b-crumbs>
    <div class="crm-content">
      <div class="b-group-header">
        <div class="left">
          <span class="headtit">客户池分组</span>
        </div>
        <div class="right">
          <button @click="openNewGroupModal" class="green">新建分组</button>
        </div>
      </div>
      <div class="b-group-content">
        <table class="b-group-table">
          <thead>
            <tr>
              <th class="group-name">分组名称</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="groupList.data.records" v-for="record in groupList.data.records">
              <td class="group-name"><span class="name">{{ record.name }}</span></td>
              <td>
                <a href="javascript:void(0)" @click="getNowGroupData(1, record.id)">修改组名</a>
                <a href="javascript:void(0)" @click="getNowGroupData(2, record.id)">设置管理员</a>
                <a href="javascript:void(0)" @click="getNowGroupData(3, record.id)">设置成员</a>
                <a href="javascript:void(0)" @click="openDelGroupModal(record.id)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="b-crm-left-pageTurn">
        <div>
          <span @click="" class="fa fa-chevron-circle-left"></span>
          <span class="pageNumber"><input><span>/ 1</span></span>
          <span @click="" class="fa fa-chevron-circle-right"></span>
        </div>
      </div>
    </div>
    <b-modaler ref="newGroup" class="newGroup-modal">
      <div class="modal-green-header" slot="header" style="margin-bottom: 30px;">新建客户池分组</div>
      <div slot="content">
        <b-process-bar :active="newGroupSteps" @getClickSteps="newGroupPrevToSteps"></b-process-bar>
        <div :class="newGroupSteps === 1 ? 'stepIn': 'stepOut'">
          <div :class="{empty: (newGroupData.groupName.value === '') && newGroupData.groupName.isEmpty}">
            <div class="modal-grey-header" style="margin-top: 28px;">客户池公海池分组名称:</div>
            <div class="new-group-input" @click="closeTips('newGroupData', 'groupName')">
              <input placeholder="请填写分组名" v-model="newGroupData.groupName.value">
            </div>
            <div class="error-tips" :class="(newGroupData.groupName.value === '') && newGroupData.groupName.isEmpty ? 'openTips': 'closeTips'">请输入客户产品名</div>
          </div>
        </div>
        <div :class="newGroupSteps === 2 ? 'stepIn': 'stepOut'">
          <div :class="{empty: (newGroupData.groupAdmins.value.length === 0) && newGroupData.groupAdmins.isEmpty}">
            <div class="modal-grey-header" style="margin-top: 28px;">一、设置分组管理人员:</div>
            <div class="modal-grey-explain">建议设置为公司中较高权利的管理人员，需要管理所有销售自建的回收客户，拥有“分配”权限。</div>
            <div class="new-group-input" @click="closeTips('newGroupData', 'groupAdmins')">
              <b-complex-drop
                :canChangeds = "newGroupData.groupAdmins.value"
                :interfaceType = "2"
                style="width: 460px;" slot="content"
                @getCheckeds="getNewGroupAdmins">
              </b-complex-drop>
            </div>
            <div class="error-tips" :class="(newGroupData.groupAdmins.value.length === 0) && newGroupData.groupAdmins.isEmpty ? 'openTips': 'closeTips'">请选择分组管理员</div>
          </div>
          <div :class="{empty: (newGroupData.groupDefaultAdmins.value.length === 0) && newGroupData.groupDefaultAdmins.isEmpty}">
            <div class="modal-grey-header" style="margin-top: 28px;">二、设置默认分组管理员：</div>
            <div class="modal-grey-explain">客户回收时，默认分组管理员自动成为回收客户的负责人。</div>
            <div class="new-group-input"  @click="closeTips('newGroupData', 'groupDefaultAdmins')">
              <b-complex-drop
                :canChangeds = "newGroupData.groupDefaultAdmins.value"
                :interfaceType = "2"
                style="width: 460px;"
                slot="content"
                @getCheckeds="getNewGroupDefaultAdmins">
              </b-complex-drop>
            </div>
            <div class="error-tips" :class="(newGroupData.groupDefaultAdmins.value.length === 0) && newGroupData.groupDefaultAdmins.isEmpty ? 'openTips': 'closeTips'">请选择默认分组管理员</div>
          </div>
        </div>
        <div :class="newGroupSteps === 3 ? 'stepIn': 'stepOut'">
          <div :class="{empty: (newGroupData.groupMembers.value.length === 0) && newGroupData.groupMembers.isEmpty}">
            <div class="modal-grey-header" style="margin-top: 28px;">设置分组成员：</div>
            <div class="modal-grey-explain">说明文字</div>
            <div class="new-group-input" @click="closeTips('newGroupData', 'groupMembers')">
              <b-complex-drop
                :canChangeds = "newGroupData.groupMembers.value"
                :interfaceType = "2"
                style="width: 460px;"
                slot="content"
                @getCheckeds="getNewGroupMembers">
              </b-complex-drop>
            </div>
            <div class="error-tips" :class="(newGroupData.groupMembers.value.length === 0) && newGroupData.groupMembers.isEmpty ? 'openTips': 'closeTips'">请选择默认分组管理员</div>
          </div>
        </div>
      </div>
      <div class="modal-center-btn" slot="btn">
        <button v-if="newGroupSteps > 1" @click="newGroupPrevSteps" class="grey">上一步</button>
        <button v-if="newGroupSteps < 3" @click="newGroupNextSteps" class="green">下一步</button>
        <button v-if="newGroupSteps === 3" @click="newCustomSumbit" class="green">确定</button>
      </div>
    </b-modaler>
    <b-modaler ref="editorGroup" class="newGroup-modal">
      <div class="modal-green-header" slot="header" style="margin-bottom: 30px;">修改客户池分组</div>
      <div slot="content">
        <b-process-bar :active="editorGroupSteps"></b-process-bar>
        <div :class="editorGroupSteps === 1 ? 'stepIn': 'stepOut'">
          <div :class="{empty: (editorGroupData.groupName.value === '') && editorGroupData.groupName.isEmpty}">
            <div class="modal-grey-header" style="margin-top: 28px;">客户池公海池分组名称:</div>
            <div class="new-group-input" @click="closeTips('editorGroupData', 'groupName')">
              <input placeholder="请填写分组名" v-model="editorGroupData.groupName.value">
            </div>
          </div>
          <div class="error-tips" :class="(editorGroupData.groupName.value === '') && editorGroupData.groupName.isEmpty ? 'openTips': 'closeTips'">请输入客户产品名</div>
        </div>
        <div :class="editorGroupSteps === 2 ? 'stepIn': 'stepOut'">
          <div :class="{empty: (editorGroupData.groupAdmins.value.length === 0) && editorGroupData.groupAdmins.isEmpty}">
            <div class="modal-grey-header" style="margin-top: 28px;">一、设置分组管理人员:</div>
            <div class="modal-grey-explain">建议设置为公司中较高权利的管理人员，需要管理所有销售自建的回收客户，拥有“分配”权限。</div>
            <div class="new-group-input" @click="closeTips('editorGroupData', 'groupAdmins')">
              <b-complex-drop
                :canChangeds = "editorGroupData.groupAdmins.value"
                :interfaceType = "2"
                :interfaceParam = "{'customPoolId': editorGroupData.groupId}"
                style="width: 460px;" slot="content"
                @getCheckeds="editorGroupAdmins">
              </b-complex-drop>
            </div>
            <div class="error-tips" :class="(editorGroupData.groupAdmins.value.length === 0) && editorGroupData.groupAdmins.isEmpty ? 'openTips': 'closeTips'">请选择分组管理员</div>
          </div>
          <div :class="{empty: (editorGroupData.groupDefaultAdmins.value.length === 0) && editorGroupData.groupDefaultAdmins.isEmpty}">
            <div class="modal-grey-header" style="margin-top: 28px;">二、设置默认分组管理员：</div>
            <div class="modal-grey-explain">客户回收时，默认分组管理员自动成为回收客户的负责人。</div>
            <div class="new-group-input" @click="closeTips('editorGroupData', 'groupDefaultAdmins')">
              <b-complex-drop
                :canChangeds = "editorGroupData.groupDefaultAdmins.value"
                :interfaceType = "2"
                :interfaceParam = "{'customPoolId': editorGroupData.groupId}"
                style="width: 460px;" slot="content"
                @getCheckeds="editorGroupDefaultAdmins">
              </b-complex-drop>
            </div>
            <div class="error-tips" :class="(editorGroupData.groupDefaultAdmins.value.length === 0) && editorGroupData.groupDefaultAdmins.isEmpty ? 'openTips': 'closeTips'">请选择默认管理员</div>
          </div>
        </div>
        <div :class="editorGroupSteps === 3 ? 'stepIn': 'stepOut'">
          <div :class="{empty: (editorGroupData.groupMembers.value.length === 0) && editorGroupData.groupMembers.isEmpty}">
            <div class="modal-grey-header" style="margin-top: 28px;">设置分组成员：</div>
            <div class="modal-grey-explain">说明文字</div>
            <div class="new-group-input" @click="closeTips('editorGroupData', 'groupMembers')">
              <b-complex-drop
                :canChangeds = "editorGroupData.groupMembers.value"
                :interfaceType = "2"
                :interfaceParam = "{'customPoolId': editorGroupData.groupId}"
                style="width: 460px;" slot="content"
                @getCheckeds="editorGroupMembers">
              </b-complex-drop>
            </div>
            <div class="error-tips" :class="(editorGroupData.groupMembers.value.length === 0) && editorGroupData.groupMembers.isEmpty ? 'openTips': 'closeTips'">请选择分组成员</div>
          </div>
        </div>
      </div>
      <div class="modal-center-btn" slot="btn">
        <button @click="editorGroupSumbit" class="green">确定</button>
      </div>
    </b-modaler>
    <b-modaltips ref="openBModaltips"></b-modaltips>
    <b-page-bottom></b-page-bottom>
    <b-modaler ref="delGroupModal" class="min-modal">
      <div class="modal-teps" slot="content">您确认删除该客户公海池分组吗？</div>
      <div class="modal-center-btn" slot="btn">
        <button @click="checkdelGroup" class="green">确认</button>
        <button @click="closeDelGroupModal" class="grey">取消</button>
      </div>
    </b-modaler>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Group',
    data() {
      return {

        // 新建客户进度
        newGroupSteps: 1,

        // 修改客户进度
        editorGroupSteps: 1,

        // 分组列表数据
        groupList: { data: {records: []}},

        // 新建客户数据
        newGroupData: {
          groupName: {
            isEmpty: false,
            value: ''
          },
          groupAdmins: {
            isEmpty: false,
            value: []
          },
          groupDefaultAdmins: {
            isEmpty: false,
            value: []
          },
          groupMembers: {
            isEmpty: false,
            value: []
          }
        },

        // 编辑客户数据
        editorGroupData: {
          groupId: '',
          editorType: '',
          groupName: {
            isEmpty: false,
            value: ''
          },
          groupAdmins: {
            isEmpty: false,
            value: []
          },
          groupDefaultAdmins: {
            isEmpty: false,
            value: []
          },
          groupMembers: {
            isEmpty: false,
            value: []
          }
        },

        // 当前被删除组id
        delGroupId: ''
      }
    },
    created() {
      let self = this
      self.getGroupLsit()
    },
    computed: {
      ...mapGetters('crmGroup',{
        groupListData: 'groupListData',
        groupAdminsData: 'groupAdminsData',
        groupMembersData: 'groupMembersData',
        addnewGroupData: 'addnewGroupData',
        changeGroupAdminsData: 'changeGroupAdminsData',
        changeGroupMembersData: 'changeGroupMembersData',
        changeGroupNameData: 'changeGroupNameData',
        delGroupData: 'delGroupData'
      }),
    },
    methods: {
      ...mapActions('crmGroup', {
        // 获取分组列表
        getGroupList: 'getGroupList',
        getGroupAdmins: 'getGroupAdmins',
        getGroupMembers: 'getGroupMembers',
        addNewGroup: 'addNewGroup',
        changeGroupAdmins: 'changeGroupAdmins',
        changeGroupMembers: 'changeGroupMembers',
        changeGroupName: 'changeGroupName',
        delGroup: 'delGroup',

      }),
      // 显示提示框
      openMOdaltips(type, tips) {
        let self = this
        self.$refs.openBModaltips.openModaltips(type, tips)
      },

      // 取消空值提示
      closeTips(type, key) {
        let self = this
        if(self[type][key].isEmpty) {
          self[type][key].isEmpty = false
        }
      },

      // 获取列表数据
      getGroupLsit() {
        let self = this
        self.getGroupList({param: {page: 1}}).then(() => {
          self.groupList = self.groupListData
        })
      },

      // 打开关闭删除分组弹出框
      openDelGroupModal(delGroupId) {
        let self = this
        self.delGroupId = delGroupId
        self.$refs.delGroupModal.openDrop()
      },
      closeDelGroupModal() {
        let self = this
        self.delGroupId = ''
        self.$refs.delGroupModal.closeDrop()
      },

      // 删除分组
      checkdelGroup() {
        let self = this
        self.delGroup({param: {customPoolId: self.delGroupId}}).then(() => {
          if(self.delGroupData.data) {
            self.openMOdaltips('success', '分组已被删除')
            self.closeDelGroupModal()
            self.getGroupLsit()
          } else {
            self.openMOdaltips('error', '分组删除失败')
          }
        })
      },

      // 打开关闭新建分组弹出框
      openNewGroupModal() {
        let self = this
        self.$refs.newGroup.openDrop()
      },
      closeNewGroupModal() {
        let self = this
        self.$refs.newGroup.closeDrop()
      },

      // 新建客户获取管理员
      getNewGroupAdmins(value) {
        let self = this
        self.newGroupData.groupAdmins.value = value
      },

      // 新建客户获取默认管理员
      getNewGroupDefaultAdmins(value) {
        let self = this
        self.newGroupData.groupDefaultAdmins.value = value
      },

      // 新建客户获取成员
      getNewGroupMembers(value) {
        let self = this
        self.newGroupData.groupMembers.value = value
      },

      // 新建分组下一步
      newGroupNextSteps() {
        let self = this
        let canNext = true

        // 分组名， 管理员， 默认管理员控制判断
        if(self.newGroupSteps === 1) {
          if(self.newGroupData.groupName.value === '' ) {
            self.newGroupData.groupName.isEmpty = true
            canNext = false
          }
        }

        if(self.newGroupSteps === 2) {
          if(self.newGroupData.groupAdmins.value.length === 0) {
            self.newGroupData.groupAdmins.isEmpty = true
            canNext = false
          }

          if(self.newGroupData.groupDefaultAdmins.value.length === 0) {
            self.newGroupData.groupDefaultAdmins.isEmpty = true
            canNext = false
          }
        }

        if(canNext && self.newGroupSteps < 3) {
          self.newGroupSteps =  self.newGroupSteps + 1
        }
      },

      // 新建分组上一步
      newGroupPrevSteps() {
        let self = this
        if(self.newGroupSteps > 1) {
          self.newGroupSteps =  self.newGroupSteps - 1
        }
      },

      // 新建分组跳到某一步
      newGroupPrevToSteps(value) {
        let self = this
        let canNext = true

        // 分组名， 管理员， 默认管理员控制判断
        if(value > self.newGroupSteps) {
          if(self.newGroupSteps === 1) {
            if(self.newGroupData.groupName.value === '' ) {
              self.newGroupData.groupName.isEmpty = true
              canNext = false
            } else if(value === 3) {
              if(self.newGroupData.groupAdmins.value.length === 0) {
                self.openMOdaltips('success', '请先设置分组管理员')
                canNext = false
                // self.moda
              } else if(self.newGroupData.groupDefaultAdmins.value.length === 0) {
                self.openMOdaltips('success', '请先设置分组管理员')
                canNext = false
              }
            }
          }

          if(self.newGroupSteps === 2) {
            if(self.newGroupData.groupAdmins.value.length === 0) {
              self.newGroupData.groupAdmins.isEmpty = true
              canNext = false
            }

            if(self.newGroupData.groupDefaultAdmins.value.length === 0) {
              self.newGroupData.groupDefaultAdmins.isEmpty = true
              canNext = false
            }
          }
        }

        if(canNext) {
          self.newGroupSteps = value
        }
      },

      // 新建客户确认提交
      newGroupSumbit() {
        let self = this

        let canSubmit = true
        // 成员空值判断
        if(self.newGroupData.groupMembers.value.length === 0) {
          self.newGroupData.groupMembers.isEmpty = true
          canSubmit = false
        }
      },

      // 打开关闭编辑分组弹出框
      openEditorGroupModal(editorGroupSteps) {
        let self = this
        self.editorGroupSteps = editorGroupSteps
        self.$refs.editorGroup.openDrop()
      },
      closeEditorGroupModal() {
        let self = this
        self.$refs.editorGroup.closeDrop()
      },

      // 获取当前分组数据
      getNowGroupData(type, groupId) {
        let self = this

        // 清空编辑数据
        self.editorGroupData.groupId = ''
        self.editorGroupData.editorType = ''
        self.editorGroupData.groupName.value = ''
        self.editorGroupData.groupAdmins.value = []
        self.editorGroupData.groupDefaultAdmins.value = []
        self.editorGroupData.groupMembers.value = []

        self.editorGroupData.groupId = groupId
        self.editorGroupData.editorType = type
        if(type === 1){
          // 获取当前组名字
          for(let i=0; i<self.groupList.data.records.length; i++) {
            if(self.groupList.data.records[i].id === groupId) {
              self.editorGroupData.groupName.value = self.groupList.data.records[i].name
            }
          }
        } else if(type === 2) {

          // 请求管理员数据
          self.getGroupAdmins({param: {customPoolId: groupId}}).then(() => {

            let groupAdmins = []
            for(let i=0; i<self.groupAdminsData.data.managers.length; i++) {
              groupAdmins.push({val: `${self.groupAdminsData.data.managers[i].userId}`, name: self.groupAdminsData.data.managers[i].userName})
            }

            let groupDefaultAdmins = []
            for(let i=0; i<self.groupAdminsData.data.defaults.length; i++) {
              groupDefaultAdmins.push({val: `${self.groupAdminsData.data.defaults[i].userId}`, name: self.groupAdminsData.data.defaults[i].userName})
            }

            self.editorGroupData.groupAdmins.value = groupAdmins
            self.editorGroupData.groupDefaultAdmins.value = groupDefaultAdmins
          })
        } else if(type === 3) {

          // 请求成员数据
          self.getGroupMembers({param: {customPoolId: groupId}}).then(() => {
            let gruopMembers = []
            for(let i=0; i<self.groupMembersData.data.length; i++) {
              gruopMembers.push({val: `${self.groupMembersData.data[i].userId}`, name: self.groupMembersData.data[i].userName})
            }

            self.editorGroupData.groupMembers.value = gruopMembers
          })
        }

        self.openEditorGroupModal(type)

      },

      // 编辑分组跳到某一步
      editorGroupPrevToSteps(value) {

        let self = this
        let canNext = true

        // 分组名， 管理员， 默认管理员控制判断
        if(value > self.editorGroupSteps) {
          if(self.editorGroupSteps === 1) {
            if(self.editorGroupData.groupName.value === '' ) {
              self.editorGroupData.groupName.isEmpty = true
              canNext = false
            } else if(value === 3) {
              if(self.editorGroupData.groupAdmins.value.length === 0) {
                self.openMOdaltips('success', '请先设置分组管理员')
                canNext = false
                // self.moda
              } else if(self.editorGroupData.groupDefaultAdmins.value.length === 0) {
                self.openMOdaltips('success', '请先设置分组管理员')
                canNext = false
              }
            }
          }

          if(self.editorGroupSteps === 2) {
            if(self.editorGroupData.groupAdmins.value.length === 0) {
              self.editorGroupData.groupAdmins.isEmpty = true
              canNext = false
            }

            if(self.editorGroupData.groupDefaultAdmins.value.length === 0) {
              self.editorGroupData.groupDefaultAdmins.isEmpty = true
              canNext = false
            }
          }
        }

        if(canNext) {
          self.editorGroupSteps = value
        }
      },

      // 编辑客户获取管理员
      editorGroupAdmins(value) {
        let self = this
        self.editorGroupData.groupAdmins.value = value
      },

      // 编辑客户获取默认管理员
      editorGroupDefaultAdmins(value) {
        let self = this
        self.editorGroupData.groupDefaultAdmins.value = value
      },

      // 编辑客户获取成员
      editorGroupMembers(value) {
        let self = this
        self.editorGroupData.groupMembers.value = value
      },

      // 提交修改分组
      editorGroupSumbit() {
        let self = this
        if(self.editorGroupData.editorType === 1) {
          if(self.editorGroupData.groupName.value === '' ) {
            self.editorGroupData.groupName.isEmpty = true
          } else {
            self.changeGroupName({param: {customPoolId: self.editorGroupData.groupId, name: self.editorGroupData.groupName.value}}).then(() => {
              if(self.changeGroupNameData.data) {
                self.openMOdaltips('success', '修改成功')
                self.closeEditorGroupModal()
                self.getGroupLsit()
              } else {
                self.openMOdaltips('error', '修改失败')
              }
            })
          }
        } else if(self.editorGroupData.editorType === 2) {

          let canSumbit = true

          if(self.editorGroupData.groupAdmins.value.length === 0) {
            self.editorGroupData.groupAdmins.isEmpty = true
            canSumbit = false
          }

          if(self.editorGroupData.groupDefaultAdmins.value.length === 0) {
            self.editorGroupData.groupDefaultAdmins.isEmpty = true
            canSumbit = false
          }

          if(canSumbit) {

            let groupAdmins        = []
            let groupDefaultAdmins = []

            for(let i=0; i<self.editorGroupData.groupAdmins.value.length; i++) {
              groupAdmins.push(self.editorGroupData.groupAdmins.value[i].val)
            }

            for(let i=0; i<self.editorGroupData.groupDefaultAdmins.value.length; i++) {
              groupDefaultAdmins.push(self.editorGroupData.groupDefaultAdmins.value[i].val)
            }

            groupAdmins = JSON.stringify(groupAdmins)
            groupDefaultAdmins = JSON.stringify(groupDefaultAdmins)

            self.changeGroupAdmins({param: {customPoolId: self.editorGroupData.groupId, managerIds: groupAdmins, defaultIds: groupDefaultAdmins}}).then(() => {

              if(self.changeGroupAdminsData.data) {
                self.openMOdaltips('success', '修改成功')
                self.closeEditorGroupModal()
              } else {
                self.openMOdaltips('error', '修改失败')
              }
            })
          }
        } else if(self.editorGroupData.editorType === 3) {
          if(self.editorGroupData.groupMembers.value.length === 0) {
            self.editorGroupData.groupMembers.isEmpty = true
          } else {

            let groupMembers = []
            for(let i=0; i<self.editorGroupData.groupMembers.value.length; i++) {
              groupMembers.push(self.editorGroupData.groupMembers.value[i].val)
            }

            groupMembers = JSON.stringify(groupMembers)
            self.changeGroupMembers({param: {customPoolId: self.editorGroupData.groupId, memberIds: groupMembers}}).then(() => {
              if(self.changeGroupMembersData.data) {
                self.openMOdaltips('success', '修改成功')
                self.closeEditorGroupModal()
                self.getGroupLsit()
              } else {
                self.openMOdaltips('error', '修改失败')
              }
            })
          }
        }
      },


      // 提交新建分组
      newCustomSumbit() {
        let self = this
        let groupName = ''
        let groupAdmins = []
        let groupDefaultAdmins = []
        let groupMembers = []

        groupName = self.newGroupData.groupName.value

        for(let i=0; i<self.newGroupData.groupAdmins.value.length; i++) {
          groupAdmins.push(self.newGroupData.groupAdmins.value[i].val)
        }
        for(let i=0; i<self.newGroupData.groupDefaultAdmins.value.length; i++) {
          groupDefaultAdmins.push(self.newGroupData.groupDefaultAdmins.value[i].val)
        }
        for(let i=0; i<self.newGroupData.groupMembers.value.length; i++) {
          groupMembers.push(self.newGroupData.groupMembers.value[i].val)
        }

        groupAdmins = JSON.stringify(groupAdmins)
        groupDefaultAdmins = JSON.stringify(groupDefaultAdmins)
        groupMembers = JSON.stringify(groupMembers)

        self.addNewGroup({param: {name: groupName, managerIds: groupAdmins, defaultIds: groupDefaultAdmins, memberIds: groupMembers}})
          .then(() => {
            if(self.addnewGroupData.data) {
              self.openMOdaltips('success', '分组新建成功')
              self.closeNewGroupModal()
              self.getGroupLsit()
            } else {
              self.openMOdaltips('error', '分组新建失败')
            }
          })

        self.newGroupData = {
          groupName: {
            isEmpty: false,
            value: ''
          },
          groupAdmins: {
            isEmpty: false,
            value: []
          },
          groupDefaultAdmins: {
            isEmpty: false,
            value: []
          },
          groupMembers: {
            isEmpty: false,
            value: []
          }
        }
      }



    }
  }
</script>

<style lang="scss" scoped>

  .stepIn {
    display: block;
  }

  .stepOut {
    display: none;
  }

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
