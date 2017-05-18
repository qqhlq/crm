<template>
  <el-dropdown class="w-table-dropdown" ref="dropdown" trigger="click" @command="handleCommand">
    <span class="el-dropdown-link">
      <slot></slot>
      <i class="el-icon-arrow-down"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :class="{
        'w-table-dropdown__item': true,
        'w-table-dropdown__item--active': String(item.value) !== defaultActive ? (String(item.value) === String(active) ? 'active' : '') : ''
      }" v-for="item in items" :key="item.value" :command="item.value">
        {{ item.name }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
  export default {
    name: 'WTableDropdown',
    props: {
      items: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      active: {
        type: String,
        required: true
      },
      defaultActive: {
        type: String,
        default: '0'
      }
    },
    methods: {
      handleCommand(command) {
        this.$emit('command', command)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/core/var";

  .w-table-dropdown {
    cursor: pointer;
  }

  .el-icon-arrow-down,
  .el-icon-arrow-up {
    color: $color-light-gray;
    font-size: 12px;
    margin-left: 5px;
  }

  .w-table-dropdown__item--active,
  .w-table-dropdown__item--active:hover {
    background-color: $color-primary;
    color: $color-white;
  }
</style>
