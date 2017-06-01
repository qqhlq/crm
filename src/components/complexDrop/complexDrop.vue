<template>
  <div class="complexdrop">
    <input class="complexdrop-input" @focus="openComplex" v-model="searchVal" @keyup="searchVetusers($event)">
    <div
      v-if="isSearching"
      @click.stop="closeSearchVetusers"
      class="complex-colse-search">
      <span class="fa fa-times-circle"></span>
    </div>
    <div
      class="comlexdropWrap"
      :class="openComplexDrop ? 'open-transtion' : 'close-transtion'">
      <div class="complexdrop-content">
        <div
          v-if="firstGetVetUsers && (realTimeVetUsers.data.length === 0)"
          class="complex-noData">
          暂无数据
        </div>
        <div
          v-if="searchGetVetUsers && (realTimeVetUsers.data.length === 0)"
          class="complex-searchNoResult">
          无相关数据
        </div>
        <div
          v-if="loading" class="complex-loading" >
          <span class="fa fa-spin fa-spinner"></span>
        </div>
        <ul
          v-if="!loading && (realTimeVetUsers.data.length > 0)">
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
        <button @click="clickConfirm">确认</button>
      </div>
    </div>
    <div class="complexdropCheckeds" :class="{'deploy-more': isput}">
      <div class="items">
        <span v-if="" v-for="checkedNoChanged in checkedNoChangeds.data" class="text-unChecked unDel">
          {{ checkedNoChanged.name }}
          <i
            class="fa fa-close"
            @click="">
          </i>
        </span>
         <span v-for="newCheckedCanChanged in newCheckedCanChangeds.data" class="text-unChecked">
          {{ newCheckedCanChanged.name }}
          <i
            class="fa fa-close"
            @click="delCheckeds(newCheckedCanChanged.val)">
          </i>
        </span>
      </div>
      <span class="put-deploy text-unChecked" :class="{'away-more': isput && (newCheckedCanChangeds.data.length + checkedNoChangeds.length) > 8}" @click="deployCheckeds">更多</span>
      <span class="put-deploy text-unChecked" :class="{'away-more': !isput && (newCheckedCanChangeds.data.length + checkedNoChangeds.length) > 8}" @click="putCheckeds">收起</span>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BComplexDrop',
  data () {
    return {

      // 当前选中数据
      newCheckedCanChangeds: {data: []},

      checkedNoChangeds: {data: []},

      // 完整人员数据
      fullVetUsers: {data: []},

      // 实时人员数据
      realTimeVetUsers: {data: []},

      // 是否第一次请求获得的结果
      firstGetVetUsers: false,

      // 是否搜索获取的结果
      searchGetVetUsers: false,

      // 是否处于加载状态
      loading: true,

      // 下拉框是否打开
      openComplexDrop: false,

      // 是否处于搜索状态
      isSearching: false,

      // 搜索key值
      searchVal:'',

      // 更多还是收起状态
      isput: true
    }
  },
  props: [
    'noChangeds',
    'canChangeds'
  ],
  mounted () {
    let self = this
    self.on({el: self.$el, behavior: self.closeComplex})
    self.realTimeVetUsers.data = self.vetUsersPrep({data: self.vetUsers, checkedNoChangeds: self.checkedNoChangeds.data, checkedCanChangeds: self.newCheckedCanChangeds.data})
  },

  computed: {
    ...mapGetters('groupcomplexDrop',{
      vetUsers: 'vetUsers'
    }),
  },

  created () {
    let self = this
    if(self.canChangeds) {
      self.newCheckedCanChangeds = {data: self.canChangeds}
    }
    if(self.noChangeds) {
      self.checkedNoChangeds = {data: self.noChangeds}
    }
    // 获取处理之后的人员数据数据，并经过相应处理后给实时人员数据赋值

    // 获取
    self.getVetusers({
      param:'',
    }).then(() => {

      //处理和赋值
      self.realTimeVetUsers.data = self.vetUsersPrep({data: self.vetUsers, checkedNoChangeds: self.checkedNoChangeds.data, checkedCanChangeds: self.newCheckedCanChangeds.data})
      self.fullVetUsers = self.realTimeVetUsers.data
      self.firstGetVetUsers = true
      self.loading = false
    })
  },

  methods: {
    ...mapActions({
      on: 'on',
      // 获取人员数据
      getVetusers: 'groupcomplexDrop/getVetusers'

    }),

    // 点击收起选项
    putCheckeds() {
      let self = this
      self.isput = true
    },

    // 点击展开选项
    deployCheckeds() {
      let self = this
      self.isput = false
    },

    // 选项删除
    delCheckeds(id) {
      let self = this
      self.newCheckedCanChangeds = {data: self.delfromArray(id, self.newCheckedCanChangeds.data)}
      if(self.newCheckedCanChangeds.data.length + self.checkedNoChangeds.data.length <= 8) {
        self.isput = true
      }
    },

    // 从数组里面删除某个元素
    delfromArray(id, aArray) {
      for(let i=0; i<aArray.length; i++) {
        if(aArray[i].val === id) {
          aArray.splice(i, 1)
        }
      }
      return aArray
    },

    // 开启搜索模式
    openSearchVetusers() {
      let self = this
      self.loading = true
      self.firstGetVetUsers = false
      self.searchGetVetUsers =  false
      self.isSearching = true
      self.getVetusers({param: {key: self.searchVal}}).then(() => {
        self.realTimeVetUsers.data = self.vetUsersPrep({data: self.vetUsers, checkedNoChangeds: self.checkedNoChangeds.data, checkedCanChangeds: self.newCheckedCanChangeds.data, type: 'search'})
        self.isSearching = true
        self.searchGetVetUsers =  true
        self.loading = false
      })
    },

    // 关闭搜索模式
    closeSearchVetusers() {
      let self = this
      self.searchVal = ''
      self.loading = false
      self.realTimeVetUsers.data = self.vetUsersPrep({data: self.fullVetUsers, checkedNoChangeds: self.checkedNoChangeds.data, checkedCanChangeds: self.newCheckedCanChangeds.data})
      self.isSearching = false
    },

    //键盘事件（回车，删除，空格在满足条件的情况下开启搜索）
    searchVetusers(event) {
      let self = this
      // 回车
      if((event.keyCode || event.which) === 13){
        if(self.searchVal !== '' && self.searchVal !== ' ' && self.searchVal !== null && self.searchVal !== 'clear') {
          self.openSearchVetusers()
        } else {
          self.closeSearchVetusers()
        }

      // 删除键
      }else if((event.keyCode || event.which) === 8) {
        if(self.searchVal !== '' && self.searchVal !== ' ' && self.searchVal !== null && self.searchVal !== 'clear') {
        } else {
          self.closeSearchVetusers()
        }

      //空格
      } else if((event.keyCode || event.which) === 32) {
        if(self.searchVal !== '' && self.searchVal !== ' ' && self.searchVal !== null && self.searchVal !== 'clear') {
          self.openSearchVetusers()
        }
      }
    },

    // 点击改选
    clickChangeCheck(id, name, val, CanChanged, event) {
      if(CanChanged) {
        this.realTimeVetUsers = {data: this.changeRealTimeVetUsers(id, 'checkedCanChanged', this.realTimeVetUsers.data, val)}
      }

    },

    // 点击打开关闭子节点
    clickSwitchChild(id, val) {
      this.realTimeVetUsers = {data: this.changeRealTimeVetUsers(id, 'openChild', this.realTimeVetUsers.data, val)}
    },

    // 实时人员数据修改
    changeRealTimeVetUsers(id, attrName, data, val) {
      for(let i=0; i<data.length; i++) {
        if(data[i].id === id || data[i].id === `${id}`) {
          data[i][attrName] = val
          break
        } else {
          if(data[i].children !== null) {
            if(data[i].children.length > 0) {
              data[i].children = this.changeRealTimeVetUsers(id, attrName, data[i].children, val)
            }
          }
        }
      }
      return data
    },

    // 获取实时人员里选中的数据
    getChecked(vetUsers) {
      let self = this
      let checked = []
      for(let i=0; i<vetUsers.length; i++) {
        if(vetUsers[i].checkedCanChanged) {
          checked.push({val: vetUsers[i].id, name: vetUsers[i].name})
        }
        if(vetUsers[i].children !== null) {
          checked.push.apply(checked, self.getChecked(vetUsers[i].children))
        }
      }
      return checked
    },

    // 判断当前json树里面是否有子元素的匹配某个值
    isInJsonTree(jsonTree, val) {
      let self =this
      let isIn = false
      for(let i=0; i<jsonTree.length; i++) {
        if(jsonTree[i].id === val) {
          isIn = true
          break
        } else {
          if(jsonTree[i].children) {
            if(jsonTree[i].children !== null) {
              isIn = self.isInJsonTree(jsonTree[i].children, val)
              if(isIn) {
                break
              }
            }
          }
        }

      }
      return isIn
    },


    // 获取给定的数组所有在实时人员数据树里面的元素组成的新数组
    getRealTimeCheckedCanChanged(reaTimeVetUsers, checkedCanChanged) {
      let self = this
      let hadDel = 0
      let CheckedCanChangedCopy = checkedCanChanged.concat()
      for(let i=0; i<checkedCanChanged.length; i++) {
        if(self.isInJsonTree(reaTimeVetUsers,  checkedCanChanged[i].val)) {
          CheckedCanChangedCopy.splice(i - hadDel, 1)
          hadDel ++
        }
      }
      return CheckedCanChangedCopy
    },

    // 选中数据修改（点击确认）
    getNewCheckedCanChanged(vetUsers, checkedCanChanged) {
      let self = this
      let newCheckedCanChanged = self.getChecked(vetUsers)

      let CheckedUnChanged = self.getRealTimeCheckedCanChanged(vetUsers, checkedCanChanged)

      CheckedUnChanged.push.apply( CheckedUnChanged, newCheckedCanChanged)
      return CheckedUnChanged
    },

    // 点击确认
    clickConfirm() {
      let self = this
      self.openComplexDrop = false
      self.newCheckedCanChangeds = {data: self.getNewCheckedCanChanged(self.realTimeVetUsers.data, self.newCheckedCanChangeds.data)}
      self.closeSearchVetusers()
      if(self.newCheckedCanChangeds.data.length + self.checkedNoChangeds.data.length <= 8) {
        self.isput = true
        console.log('aa')
      }
    },

    // 关闭下拉框
    closeComplex() {
      let self = this
      self.openComplexDrop = false
      self.closeSearchVetusers()
    },

    // 打开下拉框
    openComplex() {
      let self = this
      self.openComplexDrop = true
      self.closeSearchVetusers()
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
      if(type === 'search') {
        _data = this.allfalseOpen(_data)
      } else {
        _data = this.allfalseClose(_data)
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

  .close-transtion {
    transform-origin:0 0;
    transform: scaleY(0);

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
  }

  .open-transtion {
    transform-origin:0 0;
    transform: scaleY(1);

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
  }
</style>
