<template>
  <div class="table-header">
    <ul v-if="choosed.length !== 0">
      <li>
        <i class="fa fa-mail-forward"></i>
        <span>领取</span>
      </li>
      <li>
        <i class="fa fa-anchor"></i>
        <span>分配</span>
      </li>
      <li>
        <i class="fa fa-trash"></i>
        <span>删除</span>
      </li>
    </ul>
    <div v-if="choosed.length === 0" class="b-poollist">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{poolList.value.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item of poolList.list" :command="item.id.toString()" :key="item.id">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="btn-green-mid">
      新建客户
    </div>
    <div class="table-search">
      <b-autocomplete
        :list ="search.productName"
        @getSearchList = "getSearchList"
        @chooseSearchList = "chooseSearchList">
      </b-autocomplete>
      <b-select
        :list ="search.tradeName"
        @getList = "getList">
      </b-select>
      <b-autocomplete
        :list ="search.cityName"
        @getSearchList = "getSearchList"
        @chooseSearchList = "chooseSearchList">
      </b-autocomplete>
      <b-date-picker
        :list ="search.updateTime"
        @getList = "getList">
      </b-date-picker>
    </div>
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
        poolList: 'commonList/poolList'
      })
    },
    methods: {
      ...mapActions({
        getSearchList: 'commonList/getSearchList',
        chooseSearchList: 'commonList/chooseSearchList',
        getList: 'commonList/getList',
        getPoolList: 'commonList/getPoolList',
        getTradeList: 'commonList/getTradeList',
        changePoolValue: 'commonList/changePoolValue'
      }),
      handleCommand(value) {
        let self = this
        self.changePoolValue(value)
      }
    },
    mounted() {
      let self = this
      self.getTradeList()
      self.getPoolList()
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


