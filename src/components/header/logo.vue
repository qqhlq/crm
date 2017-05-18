<template>
  <a href="javascript:void(0);" class="w-header__logo">
    <img src="../../assets/logo.png" alt="WeAD">
  </a>
</template>
<script>
  export default {
    name: 'WHeaderLogo'
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/core/var";
  @import "../../styles/mixins/clearfix";

  .w-header__logo {
    float: left;
    height: 60px;
    line-height: 60px;
    text-align: center;
    width: 144px;
    transition: width .3s;

    > img {
      vertical-align: middle;
    }
  }

  // 小尺寸设备显示
  @media (max-width: 768px) {
    .w-header__logo {
      display: block;
      float: none;
      width: 100%;
    }
  }
</style>
