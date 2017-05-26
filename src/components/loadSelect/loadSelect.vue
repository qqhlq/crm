<template>
  <div :class=" ['el-autocomplete-label', `el-autocomplete-${this.headerType}`]">
    <el-autocomplete
      v-model="state4"
      :fetch-suggestions="querySearchAsync"
      :popper-class="`el-autocomplete-suggestion-${this.headerType}`"
      :placeholder="this.placeholder"
      @select="handleSelect"
    >
    </el-autocomplete>
  </div>
</template>

<script>
  export default {
    name: 'BLoadSelect',
    data() {
      return {
        restaurants: [],
        state4: '',
        timeout:  null,
      }
    },
    methods: {
      loadAll() {
        return this.moreItem
      },
      querySearchAsync(queryString, cb) {
        let restaurants = this.restaurants
        let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 100)
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect(item) {
        this.$emit({
          headerType: this.headerType,
          headerValue: item.value
        })
      }
    },
    props: {
      headerType: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入搜索内容'
      },
      moreItem: {
        type: Array,
        default: []
      }
    },
    mounted() {
      this.restaurants = this.loadAll()
    }
  }
</script>
