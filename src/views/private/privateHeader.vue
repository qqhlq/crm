<template>
  <div class="table-header">
    <div class="table-opera">
      <ul v-if="choosed.length !== 0" class="table-operation">
        <li v-if="role===3||role===2||role===1||role===0">
          <i class="fa fa-mail-forward"></i>
          <span>领取</span>
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
      <span v-if="choosed.length === 0">私人池</span>
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
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'PrivateHeader',
    computed: {
      ...mapGetters({
        choosed: 'privateList/choosed',
        search: 'privateList/search',
        role: 'role'
      })
    },
    methods: {
      ...mapActions({
        getSearchList: 'privateList/getSearchList',
        chooseSearchList: 'privateList/chooseSearchList',
        getList: 'privateList/getList',
        getMenusList: 'getMenusList'
      })
    },
    mounted() {
      let self = this
      self.getList()
      self.getMenusList({url: self.$route.path})
    }
  }
</script>

