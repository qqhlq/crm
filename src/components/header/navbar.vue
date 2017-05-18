<template>
  <nav class="w-header__navbar">
    <el-button type="text" class="w-header__navbar__sidebar-toggle" @click="toggleSidebar">
      <i class="fa fa-bars"></i>
    </el-button>
    <el-menu class="w-header__navbar__menu" mode="horizontal" @select="selectMenu">
      <el-menu-item class="w-header__navbar__menu-item w-header__navbar__menu-item--username" index="0">
        <span class="w-header__navbar__menu-item--pconly">admin@wead.mobi</span>
      </el-menu-item>
      <el-submenu index="1" class="w-header__navbar__menu-sub-item w-header__navbar__menu-sub-item--consume">
        <template slot="title">
          <i class="fa fa-flash"></i> <span class="w-header__navbar__menu-item--pconly">总消耗</span>
        </template>
        <div>10000元</div>
      </el-submenu>
      <el-menu-item class="w-header__navbar__menu-item  w-header__navbar__menu-item--notice" index="2">
        <i class="fa fa-bell"></i> <span class="w-header__navbar__menu-item--pconly">通知</span>
      </el-menu-item>
      <el-submenu index="3" class="w-header__navbar__menu-sub-item w-header__navbar__menu-sub-item--settle">
        <template slot="title">
          <i class="fa fa-cog"></i> <span class="w-header__navbar__menu-item--pconly">设置</span>
        </template>
        <el-menu-item index="3-1">修改密码</el-menu-item>
        <el-menu-item index="3-2">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </nav>
</template>
<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'WHeaderNavbar',
    methods: {
      ...mapActions([
        'toggleSidebar'
      ]),

      /**
       * 退出登录
       */
      async signout() {
        let data = await this.$wGet('/logout.do')
        if (data.data === true) {
          location.href = '/'
        } else {
          this.$message({ message: '退出登录失败', type: 'warning' })
        }
      },

      /**
       * 菜单选择
       * @param {Number} index 0:进入管理系统，1:退出登录
       */
      selectMenu(index) {
        // switch (String(index)) {
        //   case '0':
        //     location.href = '/wdsp/boss/overview/index2'
        //     break
        //   default:
        //     this.signout()
        //     break
        // }
      }
    }
  }
</script>
<style lang="scss">
  // 由于这里需要覆盖一些 elementUI 的样式，scoped 会在每一个选择器后都添加一个属性选择器，
  // 这让我们无法覆盖 elementUI 的样式，所以这里的 <style> 不使用 scoped

  @import "../../styles/core/var";
  @import "../../styles/mixins/clearfix";

  .w-header .w-header__navbar {
    @include clearfix;

    margin-left: 144px;
    transition: margin-left .3s;

    // 侧边栏开关
    &__sidebar-toggle {
      color: $color-base-black;
      display: none;
      float: left;
      height: 60px;
      line-height: 60px;
      padding: 0 12px;
    }

    // 导航区
    &__menu {
      float: right;
    }
    &__menu-item {
      &--username {
        &.is-active,
        &:hover {
          color: $color-base-black;
        }
      }
    }
    &__menu-sub-item {
      &--consume .el-menu > div {
        color: $color-base-black;
        font-size: 14px;
        text-align: center;
      }
    }
  }

  // 小尺寸设备显示
  @media (max-width: 768px) {
    .w-header .w-header__navbar {
      background: $color-dark-white;
      margin-left: 0;

      &__sidebar-toggle {
        display: block;
        height: 48px;
        line-height: 48px;
      }

      &__menu {
        background: transparent;
      }

      &__menu-item {
        height: 48px;
        line-height: 48px;
        padding: 0 12px;

        &--pconly {
          display: none;
        }
      }
      &__menu-sub-item {
        .el-submenu__title {
          height: 48px;
          line-height: 48px;
          padding: 0 12px;
        }
        .el-menu {
          left: auto;
          right: 0;
          top: 53px;
        }
        &--consume .el-menu > div {
          min-width: 100px;
        }
      }
    }
  }
</style>
