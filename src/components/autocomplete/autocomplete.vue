<template>
  <div :class="['b-autocomplete', list.head]">
    <el-autocomplete
      v-model="list.value"
      :fetch-suggestions="querySearchAsnc"
      :placeholder="list.placeholder"
      @select="handleSelect"
      :icon="list.icon"
      :on-icon-click="getList">
    </el-autocomplete>
  </div>
</template>

<script>
  export default {
    name: 'BAutocomplete',
    props: {
      list: {
        type: Object,
        default: {}
      }
    },
    methods: {
      querySearchAsnc(queryString, cb) {
        let self = this
        self.$emit('getSearchList', self.list)
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(self.list.searchList)
        }, 100)
      },
      handleSelect(item) {
        let self = this
        self.$emit('chooseSearchList', self.list)
      },
      getList() {
        let self = this
        self.$emit('getList', self.list)
      }
    }
  }
</script>
