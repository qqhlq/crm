<template>
  <div class="w-table-caret" @click="handleClick" :style="{ float: align }">
    <span class="w-table-caret__title">
      <slot></slot>
    </span>
    <span class="w-table-caret__caret-wrapper">
      <i :class="[
        'w-table-caret__sort-caret ascending',
        status === '1' ? 'active' : ''
      ]"></i>
      <i :class="[
        'w-table-caret__sort-caret descending',
        status === '2' ? 'active' : ''
      ]"></i>
    </span>
  </div>
</template>
<script>
  export default {
    name: 'WTableCaret',
    props: {
      align: {
        type: String,
        default: 'left'
      },
      status: {
        type: String,
        default: 0
      }
    },
    methods: {
      handleClick() {
        this.$emit('click', this.status)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/core/var";

  .w-table-caret {
    cursor: pointer;
    > span {
      float: left;
    }
    &__caret-wrapper {
      display: inline-block;
      vertical-align: middle;
      margin-left: 1px;
      width: 16px;
      height: 20px;
      overflow: visible;
      overflow: initial;
      position: relative;
    }
    &__sort-caret {
      border: 0;
      content: "";
      display: inline-block;
      height: 0;
      position: absolute;
      left: 3px;
      width: 0;
      z-index: 2;

      &.ascending {
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-top: none;
        border-bottom: 5px solid $color-light-gray;
        top: 5px;

        &.active {
          border-bottom: 5px solid $color-extra-light-black;
        }
      }
      &.descending {
        bottom: 3px;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-top: 5px solid $color-light-gray;
        border-bottom: none;

        &.active {
          border-top: 5px solid $color-extra-light-black;
        }
      }
    }
  }
</style>
