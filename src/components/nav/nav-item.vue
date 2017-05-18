<template>
  <div :class="['w-nav-item', `w-nav-item--${navType}`]">
    <div @click="handleClick">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'WNavItem',
    data() {
      return {
        navType: this.type
      }
    },
    props: {
      type: {
        type: String,
        default: 'default'
      }
    },
    methods: {
      handleClick(evt) {
        if (this.navType !== 'disabled') {
          this.$parent.resetNavItem()
          this.navType = 'select'
          this.$emit('click', evt)
        }
      }
    },
    mounted() {
      this.$parent.addNavItem(this)
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/core/var";

  .w-nav-item {
    float: left;
    margin-top: 24px;
    padding: 0 16px;
    width: 33.33333333%;

    > div {
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }

    // 默认
    &--default > div {
      background-color: $color-white;
      border-color: $color-white;
      color: $color-light-black;
      cursor: pointer;
    }

    // 选中状态
    &--select > div {
      background-color: $color-primary;
      border-color: $color-primary;
      color: $color-white;
    }

    // 禁止状态
    &--disabled > div {
      background-color: transparent;
      border-color: $color-light-gray;
      color: $color-light-gray;
      cursor: not-allowed;
    }
  }

  // 小尺寸设备
  @media (max-width: 768px) {
    .w-nav-item {
      padding: 0 8px;
    }
  }
</style>
