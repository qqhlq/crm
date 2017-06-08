<template>
  <header class="boss-navbar">
    <div class="wrap">
      <a class="logo" href="/index">
        <img src="../../assets/login-logo@2x.png">
      </a>
      <div class="nav">
        <div class="navIndex navContentOut"><a href="/index">首页</a></div>
        <div class="navContent" v-if="Boolean(menusData.data)">
          <div class="navContent-a">
            <div :class="navContentAPosition ? 'navContentaWrapTop' : 'navContentaWrapBottom'">
              <div v-for="(menu,index) in menusData.data.menus">
                <a @mouseenter="mouseenterNavContentUl(index)" @mouseleave="mouseleaveNavContentUl(index)" href="javascript:void(0);">{{ menu.label }}</a>
              </div>
            </div>
          </div>
          <div class="navContent-ul">
            <div
              v-for="(menu,index) in menusData.data.menus"
              @mouseenter="mouseenterNavContentUl(index)"
              @mouseleave="mouseleaveNavContentUl(index)"
              :class="{navHidden: computeBoolean(index)} "
              :style="computeNavContentUlStyle(index)">
              <ul>
                <li v-for="child in menu.children">
                  <a :href="child.url">{{ child.label }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="more navContentOut"
          :class="{navHidden2: !hasmore}"
          @click="moreNavContentUl">
          <a href="javascript:void(0)">
            更多<span class="fa fa-angle-down"></span>
          </a>
        </div>
        <div class="user">
          <a href="javascript:void(0);" v-if="Boolean(menusData.data)" >
            <span class='user-img'><img :src="menusData.data.userInfo.icon ? '../../assets/none.png' : menusData.data.userInfo.icon"></span>
            {{ menusData.data.userInfo.userName }}
            <span class="fa fa-angle-down"></span>
            <span class="fa new-message" style="display: none">new</span>
          </a>
          <div>
            <ul>
              <li @click.stop="nolyStationMailIn()"><span class="stationMail-news" style="display: none"></span><a href="javascript:void(0)" id="station-mail-out">站内信</a></li>
              <li><a href="/boss/new/system/mail-list">通讯录</a></li>
              <li><a href="javascript:void(0)">修改密码</a></li>
              <li><a href="javascript:void(0)">退出</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BHeader',

    data() {
      return {
        // 一级导航位置(true:1-6一级菜单,false:7-12一级菜单)
        navContentAPosition: true,

        // 二级导航是否显示 true：显示， false：不显示
        navContentUlInOut: {},

        // 是否显示更多
        hasmore: true
      }
    },
    computed: {
      ...mapGetters({
        menusData: 'menusData',
        navContentUlInOutGetter: 'navContentUlInOutGetter'
      }),
    },

    created () {
      // 获取导航数据
      this.getMenusList({url: this.$route.path})
    },

    methods: {
      ...mapActions({
        // 打开站内信
        stationMailIn: 'stationMailIn',

        // 获取导航和当前页面权限
        getMenusList: 'getMenusList'
      }),

      // 打开站内信，避免冒泡
      nolyStationMailIn(event) {
        this.stationMailIn()
      },

      // 计算布尔值
      computeBoolean(index) {
        if(index in this.navContentUlInOut) {
          return (index in this.navContentUlInOut)  &&  Boolean(this.navContentUlInOut[index])
        } else {
          return (index in this.navContentUlInOutGetter)  &&  Boolean(this.navContentUlInOutGetter[index])
        }
      },

      // 隐藏所有二级导航
      navContentUlAllIn() {
        let NavContentUlAllIn = {}
        if(Boolean(this.data.data)) {
          for(let i in this.data.data.menus) {
            NavContentUlAllIn[i] = true
          }
        }
        return NavContentUlAllIn
      },

      // 计算二级导航样式
      computeNavContentUlStyle(index) {
        return `left:${((index%6*110) - 22)}px`
      },

      // 一、二级菜单mouseenter/mouseleave分别弹出隐藏二级菜单
      mouseenterNavContentUl(index) {
        if(index in this.navContentUlInOut) {
          return this.navContentUlInOut[index] = false
        } else {
          this.$set(this.navContentUlInOut,index, false)
        }
        // return this.navContentUlInOut[index] = false
      },
      mouseleaveNavContentUl(index) {
        if(index in this.navContentUlInOut) {
          return this.navContentUlInOut[index] = true
        } else {
          this.$set(this.navContentUlInOut,index, true)
        }
      },

      // 更多点击事件
      moreNavContentUl(event){
        if(this.navContentAPosition) {
          this.navContentAPosition = false
        } else {
          this.navContentAPosition = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navContentaWrapTop {
    transition: top .5s;
    top: 0px;
  }
  .navContentaWrapBottom {
    transition: top .5s;
    top: -52px;
  }

  .navHidden {
    display: none;
  }
  .navHidden2 {
    visibility: none;
  }


</style>

