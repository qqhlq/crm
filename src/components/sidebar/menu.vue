<template>
  <el-menu class="w-sidebar__menu" :default-active="activeMenu" theme="dark" @select="selectMenu">
    <el-menu-item class="w-sidebar__menu-item" index="overview">
      <i class="w-sidebar__menu-item__icon overview"></i>信息概览
    </el-menu-item>
    <el-menu-item class="w-sidebar__menu-item" index="customer">
      <i class="w-sidebar__menu-item__icon customer"></i>客户管理
    </el-menu-item>
    <el-menu-item class="w-sidebar__menu-item" index="delivery">
      <i class="w-sidebar__menu-item__icon delivery"></i>投放管理
    </el-menu-item>
    <el-menu-item class="w-sidebar__menu-item" index="order">
      <i class="w-sidebar__menu-item__icon order"></i>订单管理
    </el-menu-item>
    <el-menu-item class="w-sidebar__menu-item" index="finance">
      <i class="w-sidebar__menu-item__icon finance"></i>财务管理
    </el-menu-item>
    <el-menu-item class="w-sidebar__menu-item" index="auth">
      <i class="w-sidebar__menu-item__icon auth"></i>权限管理
    </el-menu-item>
    <el-menu-item class="w-sidebar__menu-item" index="message">
      <i class="w-sidebar__menu-item__icon message"></i>推送消息
    </el-menu-item>
    <el-menu-item class="w-sidebar__menu-item" index="log">
      <i class="w-sidebar__menu-item__icon log"></i>操作日志
    </el-menu-item>
  </el-menu>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'WSidebarMenu',
    computed: {
      ...mapGetters([
        'activeMenu'
      ])
    },
    methods: {
      ...mapActions([
        'toggleSidebar'
      ]),

      /**
       * 菜单选择
       * @param {Number} index vue-router 路径片段
       */
      selectMenu(path) {
        this.$router.push(`/boss/${path}`)
        this.toggleSidebar()
      }
    }
  }
</script>
<style lang="scss" scoped>

  // 暂时隐藏报表
  .report {
    display: none;
  }

  .w-sidebar__menu {
    &-item {
      text-align: center;
    }
    &-item__icon {
      display: inline-block;
      height: 16px;
      margin-right: 8px;
      position: relative;
      top: 2px;
      transition: background .3s;
      width: 16px;
    }
    .overview {
      background: url('../../assets/ic_data_default.png') no-repeat top left / 100% 100%;
    }
    .customer {
      background: url('../../assets/ic_bussniss_default.png') no-repeat top left / 100% 100%;
    }
    .delivery {
      background: url('../../assets/ic_putin_default.png') no-repeat top left / 100% 100%;
    }
    .order {
      background: url('../../assets/ic_orders_default.png') no-repeat top left / 100% 100%;
    }
    .finance {
      background: url('../../assets/ic_account_default.png') no-repeat top left / 100% 100%;
    }
    .auth {
      background: url('../../assets/ic_permission_default.png') no-repeat top left / 100% 100%;
    }
    .message {
      background: url('../../assets/ic_message_default.png') no-repeat top left / 100% 100%;
    }
    .log {
      background: url('../../assets/ic_log_default.png') no-repeat top left / 100% 100%;
    }
  }
  .w-sidebar__menu-item:hover,
  .el-submenu__title:hover,
  .w-sidebar__menu-item.is-active {
    .overview {
      background: url('../../assets/ic_data_hover.png') no-repeat top left / 100% 100%;
    }
    .customer {
      background: url('../../assets/ic_bussniss_hover.png') no-repeat top left / 100% 100%;
    }
    .delivery {
      background: url('../../assets/ic_putin_hover.png') no-repeat top left / 100% 100%;
    }
    .order {
      background: url('../../assets/ic_orders_hover.png') no-repeat top left / 100% 100%;
    }
    .finance {
      background: url('../../assets/ic_account_hover.png') no-repeat top left / 100% 100%;
    }
    .auth {
      background: url('../../assets/ic_permission_hover.png') no-repeat top left / 100% 100%;
    }
    .message {
      background: url('../../assets/ic_message_hover.png') no-repeat top left / 100% 100%;
    }
    .log {
      background: url('../../assets/ic_log_hover.png') no-repeat top left / 100% 100%;
    }
  }

  // retina 显示屏
  @media only screen and ( -webkit-min-device-pixel-ratio: 1.3 ),
    only screen and (min--moz-device-pixel-ratio: 1.3 ),
    only screen and (-o-min-device-pixel-ratio: 2.6/2 ),
    only screen and (min-device-pixel-ratio: 1.3 ),
    only screen and (min-resolution: 124.8dpi ),
    only screen and ( min-resolution: 1.3dppx ) {

    .w-sidebar__menu {
      .overview {
        background: url('../../assets/ic_data_default@2x.png') no-repeat top left / 100% 100%;
      }
      .customer {
        background: url('../../assets/ic_bussniss_default@2x.png') no-repeat top left / 100% 100%;
      }
      .delivery {
        background: url('../../assets/ic_putin_default@2x.png') no-repeat top left / 100% 100%;
      }
      .order {
        background: url('../../assets/ic_orders_default@2x.png') no-repeat top left / 100% 100%;
      }
      .finance {
        background: url('../../assets/ic_account_default@2x.png') no-repeat top left / 100% 100%;
      }
      .auth {
        background: url('../../assets/ic_permission_default@2x.png') no-repeat top left / 100% 100%;
      }
      .message {
        background: url('../../assets/ic_message_default@2x.png') no-repeat top left / 100% 100%;
      }
      .log {
        background: url('../../assets/ic_log_default@2x.png') no-repeat top left / 100% 100%;
      }
    }

    .w-sidebar__menu-item:hover,
    .el-submenu__title:hover,
    .w-sidebar__menu-item.is-active {
      .overview {
        background: url('../../assets/ic_data_hover@2x.png') no-repeat top left / 100% 100%;
      }
      .customer {
        background: url('../../assets/ic_bussniss_hover@2x.png') no-repeat top left / 100% 100%;
      }
      .delivery {
        background: url('../../assets/ic_putin_hover@2x.png') no-repeat top left / 100% 100%;
      }
      .order {
        background: url('../../assets/ic_orders_hover@2x.png') no-repeat top left / 100% 100%;
      }
      .finance {
        background: url('../../assets/ic_account_hover@2x.png') no-repeat top left / 100% 100%;
      }
      .auth {
        background: url('../../assets/ic_permission_hover@2x.png') no-repeat top left / 100% 100%;
      }
      .message {
        background: url('../../assets/ic_message_hover@2x.png') no-repeat top left / 100% 100%;
      }
      .log {
        background: url('../../assets/ic_log_hover@2x.png') no-repeat top left / 100% 100%;
      }
    }
  }
</style>
