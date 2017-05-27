<template>
  <header class="boss-navbar">
    <div class="wrap">
      <a class="logo" href="/index">
        <img src="../../assets/login-logo@2x.png">
      </a>
      <div class="nav">
        <div class="navIndex navContentOut"><a href="/index">首页</a></div>
          <div class="navContent" v-if="Boolean(data.data)">
            <div class="navContent-a" ref="navContentAs">
              <div :class="navContentAPosition ? 'navContentaWrapTop' : 'navContentaWrapBottom'">
                <div v-for="(menu,index) in data.data.menus">
                  <a @mouseenter="mouseenterNavContentUl(index)" @mouseleave="mouseleaveNavContentUl(index)" href="javascript:void(0);">{{menu.label}}</a>
                </div>
              </div>
            </div>
            <div class="navContent-ul">
              <div v-if="Boolean(data.data)" v-for="(menu,index) in data.data.menus" @mouseenter="mouseenterNavContentUl(index)" @mouseleave="mouseleaveNavContentUl(index)" :class="{navContentUl: computeBoolean(index)} " :style="computeNavContentUlStyle(index)" :ref="computeNavContentUlRef(index)">
                <ul>
                  <li v-for="child in menu.children">
                    <a :href="child.url">{{child.label}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="more navContentOut" ref="navMore" @click="moreNavContentUl"><a href="javascript:void(0)">更多<span class="fa fa-angle-down"></span></a></div>
          <div class="user">
            <a href="javascript:void(0);"  v-if="Boolean(data.data)" >
              <span class='user-img'><img :src="data.data.userInfo.icon ? '../../assets/none.png' : data.data.userInfo.icon"></span>
              {{data.data.userInfo.userName}}
              <span class="fa fa-angle-down"></span>
              <span class="fa new-message" style="display: none">new</span>
            </a>
            <div>
              <ul>
                <li @click="nolyStationMailIn($event)"><span class="stationMail-news" style="display: none"></span><a href="javascript:void(0)" id="station-mail-out">站内信</a></li>
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
        // 导航假数据
        data: {},

        // 一级导航位置(true:1-6一级菜单,false:7-12一级菜单)
        navContentAPosition: true,

        // 二级导航是否显示 true：显示， false：不显示
        navContentUlInOut: {}
      }
    },
    mounted () {
      // 导航少于等于六个，隐藏更多按钮
      if(Boolean(this.data.data)) {
        if(this.data.data.menus.length >= 6) {
          this.$refs.navMore.style.visibility = 'visible'
        }
      }
    },
    created () {
      // 获取导航数据
      this.data = this.getList()
      // ({url: this.$route.path})
      console.log(this.data)
      // 隐藏所有二级导航
      this.navContentUlInOut = this.navContentUlAllIn()
    },

    methods: {
      ...mapActions({
        // 打开站内信
        stationMailIn: 'stationMailIn',

        // 获取导航和当前页面权限
        getList: 'openList/getList'
      }),

      // 打开站内信，避免冒泡
      nolyStationMailIn(event) {
        event.stopPropagation()
        this.stationMailIn()
      },

      // 计算布尔值
      computeBoolean(index) {
        return (index in this.navContentUlInOut)  &&  Boolean(this.navContentUlInOut[index])
      },

      // 隐藏所有二级导航
      navContentUlAllIn() {
        let aaa = {}
        if(Boolean(this.data.data)) {
          for(var i in this.data.data.menus) {
            aaa[i] = true
          }
        }
        return aaa
      },

      // 计算二级导航样式
      computeNavContentUlStyle(index) {
        return 'left:' + ((index%6*110) - 22) + 'px'
      },

      // 计算二级导航的ref
      computeNavContentUlRef(index) {
        return 'navContentUl' + index
      },

      // 一、二级菜单mouseenter/mouseleave分别弹出隐藏二级菜单
      mouseenterNavContentUl(index) {
        return this.navContentUlInOut[index] = false
        //  this.navContentUlInOut
      },
      mouseleaveNavContentUl(index) {
        return this.navContentUlInOut[index] = true
        //  this.navContentUlInOut
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

<style>
  .navContentaWrapTop {
    transition: top .5s;
    top: 0px;
  }
  .navContentaWrapBottom {
    transition: top .5s;
    top: -52px;
  }

  .navContentUl {
    display: none;
  }


</style>

