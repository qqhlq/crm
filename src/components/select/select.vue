<template>
  <div :class="['b-select',list.head]">
    <el-select v-model="list.value" :placeholder="list.placeholder" @change="changeSelect">
    <el-option
      v-for="item in list.searchList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
</template>

<script>
  export default {
    name: 'BSelect',
    props: {
      list: {
        type: Object,
        default: {}
      }
    },
    methods: {
      changeSelect(value) {
        let self = this
        self.$emit('getList')
      }
    }
  }
</script>

<style lang="scss">
  .b-select {
    margin: 20px 0px 20px 30px;
    float: left;

    &.levelName {
      width: 150px;
    }
    &.restTime {
      width: 150px;
    }
  }
</style>
