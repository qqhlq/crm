<template>
  <div class="complexdrop">
    <input class="complexdrop-input">
    <div class="comlexdropWrap">
      <div class="complexdrop-content">
        <ul
          v-if="realTimeVetUsers.data.length > 0">
          <li
            v-for="realTimeVetUser in realTimeVetUsers.data"
            :class="[(realTimeVetUser.children !==null && realTimeVetUser.children.length > 0) ? 'parent-node' : 'child-node', realTimeVetUser.openChild ? 'open-clild' : 'close-clild']">
            <a class="switch-clild"
              @click="(realTimeVetUser.children !==null && realTimeVetUser.children.length > 0) && clickSwitchChild(realTimeVetUser.id, !realTimeVetUser.openChild)">
              <i class="fa fa-plus"></i>
              <i class="fa fa-minus"></i>
            </a>
            <span class="node-name text-unChecked"
              unselectable="on"
              @click="(realTimeVetUser.children !==null && realTimeVetUser.children.length > 0) && clickSwitchChild(realTimeVetUser.id, !realTimeVetUser.openChild)">
              {{ realTimeVetUser.name }}
            </span>
            <ul
              v-if="(realTimeVetUser.children !==null && realTimeVetUser.children.length > 0)">
              <li
                v-for="(child, index1) in realTimeVetUser.children"
                @click.stop="clickChangeCheck(child.id, child.name, !child.checkedCanChanged, !child.checkedNoChanged)"
                :class="[(child.children !==null && child.children.length > 0) ? 'parent-node' : 'child-node', {'checked': (child.checkedNoChanged || child.checkedCanChanged)}]">
                <span class="check-node">
                  <input type="checkbox">
                  <i class="fa fa-check"></i>
                </span>
                <span class="node-name text-unChecked" unselectable="on">{{ child.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="complexdrop-btn">
        <button>确认</button>
      </div>
    </div>
    <div class="complexdropCheckeds">
      <div class="items">
        <span v-for="checkedNoChanged in checkedNoChangeds" class="text-unChecked unDel">
          {{ checkedNoChanged.name }}
          <i
            class="fa fa-close"
            @click="">
          </i>
        </span>
         <span v-for="newCheckedCanChanged in newCheckedCanChangeds" class="text-unChecked">
          {{ newCheckedCanChanged.name }}
          <i
            class="fa fa-close"
            @click="">
          </i>
        </span>
        <!--<span class="text-unChecked unDel">张先锋<i class="fa fa-close"></i></span>
        <span class="text-unChecked unDel">张先锋<i class="fa fa-close"></i></span>
        <span class="text-unChecked unDel">张先锋打发打发<i class="fa fa-close"></i></span>
        <span class="text-unChecked unDel">张先锋<i class="fa fa-close"></i></span>
        <span class="text-unChecked">张先锋<i class="fa fa-close"></i></span>
        <span class="text-unChecked">张先<i class="fa fa-close"></i></span>
        <span class="text-unChecked">张先锋<i class="fa fa-close"></i></span>
        <span class="text-unChecked">张先锋<i class="fa fa-close"></i></span>
        <span class="text-unChecked">张先锋打发打发<i class="fa fa-close"></i></span>-->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BComplexDrop',
  data () {
    return {
      newCheckedCanChangeds: {data: []},
      realTimeCheckedCanchangeds: {data: []},
      fullVetUsers: {data: []},
      realTimeVetUsers: {data: []}
    }
  },
  props: [
    'checkedNoChangeds',
    'checkedCanChangeds'
  ],
  mounted () {
    this.newCheckedCanChangeds = this.checkedCanChangeds
  },
  computed: {
    ...mapGetters('groupcomplexDrop',{
      vetUsers: 'vetUsers'
    }),
  },
  created () {
    // 获取处理之后的人员数据数据，并经过相应处理后给实时人员数据赋值
    // 获取
    let that = this
    this.getVetusers({
      param:'',
    }).then(() => {
      //处理和赋值
      that.realTimeVetUsers.data = that.vetUsersPrep({data: that.vetUsers, checkedNoChangeds: that.checkedNoChangeds, checkedCanChangeds: that.checkedCanChangeds})
      that.fullVetUsers = that.realTimeVetUsers.data
    })

  },
  methods: {
    ...mapActions('groupcomplexDrop', {
      // 获取人员数据
      getVetusers: 'getVetusers',

      // 处理人员数据（添加默选和已选）
      vetUsersPrep: 'vetUsersPrep'
    }),

    // 打开弹出框

    // 搜索
    searchVetusers() {
      this.getVetusers()
    },

    // 点击改选
    clickChangeCheck(id, name, value, CanChanged, event) {
      if(CanChanged) {
        this.realTimeVetUsers = {data: this.changeRealTimeVetUsers(id, 'checkedCanChanged', this.realTimeVetUsers.data, value)}
      }

    },

    // 点击打开关闭子节点
    clickSwitchChild(id, value) {
      this.realTimeVetUsers = {data: this.changeRealTimeVetUsers(id, 'openChild', this.realTimeVetUsers.data, value)}
    },

    // 实时人员数据修改
    changeRealTimeVetUsers(id, attrName, data, value) {
      for(let i=0; i<data.length; i++) {
        if(data[i].id === id || data[i].id === `${id}`) {
          data[i][attrName] = value
          break
        } else {
          if(data[i].children !== null) {
            if(data[i].children.length > 0) {
              data[i].children = this.changeRealTimeVetUsers(id, attrName, data[i].children, value)
            }
          }
        }
      }
      return data
    },

    // 选中数据修改（点击确认）
    changeRealTimeVetUsers(id, name, data, value) {
      if(value) {
        data.push({'val': id, 'name': name})
      } else {
        for(let i=0; i<data.length; i++) {
          if(data[i].id === id) {
            this.splice(i, 1)
          }
        }
      }
      return data
    },

    // 点击确认
    clickConfirm() {
      let self = this
      self.newCheckedCanChangeds = self.realTimeCheckedCanchangeds
    },

    // 关闭下拉框
    closeComplexDrop() {

    },

    // 打开下拉框
    openComplexDrop() {

    },
    // 所有数据已选和默选都置为空,子节点关闭
    allfalseClose(data){
      for(let i=0; i<data.length; i++) {
        data[i].checkedNoChanged = false
        data[i].checkedCanChanged = false
        data[i].openChild = false
        if(data[i].children !== null) {
          data[i].children = this.allfalseClose(data[i].children)
        }
      }
      return data
    },

    // 所有数据已选和默选都置为空,子节点打开
    allfalseOpen(data){
      for(let i=0; i<data.length; i++) {
        data[i].checkedNoChanged = false
        data[i].checkedCanChanged = false
        data[i].openChild = true
        if(data[i].children !== null) {
          data[i].children = this.allfalseClose(data[i].children)
        }
      }
      return data
    },

    // 添加已选(选中的打开父节点)
    addCheckedNoChanged(data, checkedNoChanged, NoChanged){
      let isOpenParent = false
      for(let i=0; i<data.length; i++) {
        let getReturn = {}
        if(NoChanged || data[i].id === checkedNoChanged.val) {
          data[i].checkedNoChanged = true
          isOpenParent = true
        }
        if(data[i].children) {
          if(data[i].children !== null) {
            getReturn = this.addCheckedNoChanged(data[i].children, checkedNoChanged, data[i].id === checkedNoChanged.val)
            data[i].children = getReturn.data
          }
          if(getReturn.isOpenParent) {
            data[i].openChild = true
          }
        }
      }
      return {
        data: data,
        isOpenParent: isOpenParent
      }
    },

    // 添加默选(选中的打开父节点)
    addCheckedCanChanged(data, checkedCanChanged, CanChanged){
      let isOpenParent = false
      for(let i=0; i<data.length; i++) {
        let getReturn = {}
        if(CanChanged || data[i].id === checkedCanChanged.val) {
          data[i].checkedCanChanged = true
          isOpenParent = true
        }
        if(data[i].children) {
          if(data[i].children !== null) {
            getReturn = this.addCheckedCanChanged(data[i].children, checkedCanChanged, data[i].id === checkedCanChanged.val)
            data[i].children = getReturn.data
          }
          if(getReturn.isOpenParent) {
            data[i].openChild = true
          }
        }
      }
      return {
        data: data,
        isOpenParent: isOpenParent
      }
    },

    // 数据预处理
    vetUsersPrep({data, checkedNoChangeds, checkedCanChangeds, type='full'}){
      let _data = data
      if(type = 'search') {
        _data = this.allfalseClose(_data)
      } else {
        _data = this.allfalseOpen(_data)
      }

      for(let i=0; i<checkedNoChangeds.length; i++) {
        _data = this.addCheckedNoChanged(_data, checkedNoChangeds[i], false).data

      }
      for(let i=0; i<checkedCanChangeds.length; i++) {
        _data = this.addCheckedCanChanged(_data, checkedCanChangeds[i], false).data
      }


      return _data
    },
  },

}
</script>
<style lang="scss" scoped>

</style>
