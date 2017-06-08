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
    <span v-if="choosed.length === 0">私人池</span>
    <div class="btn-green-mid">
      新建客户
    </div>
    <div class="table-search">
      <b-autocomplete
        :list ="search.productName"
        @getSearchList = "getSearchList"
        @chooseSearchList = "chooseSearchList">
      </b-autocomplete>
      <b-autocomplete
        :list ="search.ownerName"
        @getSearchList = "getSearchList"
        @chooseSearchList = "chooseSearchList">
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
        search: 'privateList/search'
      })
    },
    methods: {
      ...mapActions({
        getSearchList: 'privateList/getSearchList',
        chooseSearchList: 'privateList/chooseSearchList',
        getList: 'privateList/getList'
      })
    },
    mounted() {
      let self = this
      self.getList()
    }
  }
</script>

