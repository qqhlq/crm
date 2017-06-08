<template>
  <div class="table-header">
    <div class="table-opera">
      <ul v-if="choosed.length !== 0" class="table-operation">
        <li v-if="role===3||role===2||role===1||role===0">
          <i class="fa fa-mail-forward"></i>
          <span @click="openGetCustomModal">领取</span>
        </li>
        <li v-if="role===2||role===1||role===0">
          <i class="fa fa-anchor"></i>
          <span>分配</span>
        </li>
        <li v-if="role===0">
          <i class="fa fa-trash"></i>
          <span>删除</span>
        </li>
      </ul>
      <div v-if="choosed.length === 0 && role===0" class="b-poollist">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{poolList.value.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item of poolList.list" :command="item.id.toString()" :key="item.id">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <span v-if="role===3||role===2||role===1">{{customPoolName}}</span>
      <div class="btn-green-mid">
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
    <!--领取客户弹出框-->
    <b-modaler ref="getCustomModal" class="min-modal">
      <div class="modal-teps" slot="content">您已成功领取该客户，请前往私人池进行跟进</div>
      <div class="modal-center-btn" slot="btn">
        <button class="green">确认</button>
        <button @click="closeGetCustomModal" class="grey">取消</button>
      </div>
    </b-modaler>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'CommonHeader',
    computed: {
      ...mapGetters({
        choosed: 'commonList/choosed',
        search: 'commonList/search',
        poolList: 'commonList/poolList',
        customPoolName: 'commonList/customPoolName',
        role: 'role'
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
        getMenusList: 'getMenusList'
      }),
      handleCommand(value) {
        let self = this
        self.changePoolValue(value)
      },

      // 打开关闭领取客户弹出框
      openGetCustomModal() {
        let self = this
        self.$refs.getCustomModal.openDrop()
      },
      closeGetCustomModal() {
        let self = this
        self.$refs.getCustomModal.closeDrop()
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


