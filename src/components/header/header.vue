<template>
  <header class="boss-navbar">
    <div class="wrap">
      <a class="logo" href="/index">
        <img src="../../assets/login-logo@2x.png">
      </a>
      <div class="nav">
        <div class="navIndex navContentOut"><a href="/index">首页</a></div>
          <div class="navContent">
            <div class="navContent-a" ref="navContentAs">
              <div :class="navContentAPosition ? 'navContentaWrapTop' : 'navContentaWrapBottom'">
                <div v-for="(menu,index) in data.data.menus">
                  <a @mouseenter="mouseenterNavContentUl(index)" @mouseleave="mouseleaveNavContentUl(index)" href="javascript:void(0);">{{menu.label}}</a>
                </div>
              </div>
            </div>
            <div class="navContent-ul">
              <div v-for="(menu,index) in data.data.menus" @mouseenter="mouseenterNavContentUl(index)" @mouseleave="mouseleaveNavContentUl(index)" :class="{navContentUl: computeBoolean(index)} " :style="computeNavContentUlStyle(index)" :ref="computeNavContentUlRef(index)">
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
            <a href="javascript:void(0);">
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
        data: {'code':200,'message':'','data':{'menus':[{'id':139,'label':'会议室','parentId':-1,'haveRight':false,'expand':false,'icon':'','url':'','type':1,'children':[{'id':141,'label':'会议室预订','parentId':139,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/new/meetting/meetting','type':1,'children':[]}]},{'id':144,'label':'图书馆','parentId':-1,'haveRight':false,'expand':false,'icon':'','url':'','type':1,'children':[{'id':146,'label':'借书','parentId':144,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/new/library/borrow-list','type':1,'children':[]},{'id':148,'label':'图书管理','parentId':144,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/new/library/book-management','type':1,'children':[]},{'id':150,'label':'借书管理','parentId':144,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/new/library/borrow-management','type':1,'children':[]}]},{'id':1,'label':'数据统计','parentId':-1,'haveRight':false,'expand':false,'icon':'','url':'','type':1,'children':[{'id':6,'label':'产品汇总','parentId':1,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/report/summary','type':1,'children':[]}]},{'id':203,'label':'审批流','parentId':-1,'haveRight':false,'expand':false,'icon':'','url':'','type':1,'children':[{'id':205,'label':'流程管理','parentId':203,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/approval/process-list','type':1,'children':[]},{'id':215,'label':'发起申请','parentId':203,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/approval/sponsor-list','type':1,'children':[]},{'id':229,'label':'待审批','parentId':203,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/approval/aManage-pending','type':1,'children':[]},{'id':231,'label':'抄送','parentId':203,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/approval/aManage-copy','type':1,'children':[]},{'id':217,'label':'已审批','parentId':203,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/approval/aManage-had','type':1,'children':[]}]},{'id':106,'label':'环评','parentId':-1,'haveRight':false,'expand':false,'icon':'fa fa-hand-spock-o','url':'','type':1,'children':[{'id':108,'label':'我的得分','parentId':106,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/grade/my-score','type':1,'children':[]}]},{'id':114,'label':'资产管理','parentId':-1,'haveRight':false,'expand':false,'icon':'','url':'','type':1,'children':[{'id':116,'label':'我的记录','parentId':114,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/new/asset/my-record','type':1,'children':[]},{'id':118,'label':'现有资产','parentId':114,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/new/asset/exist-asset','type':1,'children':[]},{'id':120,'label':'领用记录','parentId':114,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/new/asset/use-record','type':1,'children':[]},{'id':165,'label':'办公家具','parentId':114,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/asset/office-furniture','type':1,'children':[]},{'id':167,'label':'办公电脑','parentId':114,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/asset/computer-detail-list','type':1,'children':[]}]},{'id':240,'label':'直达通到','parentId':-1,'haveRight':false,'expand':false,'icon':'','url':'','type':1,'children':[{'id':243,'label':'资源大全','parentId':240,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/index?page=ziyuan','type':1,'children':[]},{'id':245,'label':'客户线索','parentId':240,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/index?page=kehu','type':1,'children':[]},{'id':247,'label':'查询工具','parentId':240,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/index?page=chaxun','type':1,'children':[]},{'id':249,'label':'内部工具','parentId':240,'haveRight':false,'expand':false,'icon':'','url':'/boss/new/index?page=neibu','type':1,'children':[]}]},{'id':3,'label':'系统管理','parentId':-1,'haveRight':false,'expand':false,'icon':'','url':'','type':1,'children':[{'id':192,'label':'反馈管理','parentId':3,'haveRight':false,'expand':false,'icon':'','url':'/boss/portal/list','type':1,'children':[]},{'id':198,'label':'公告管理','parentId':3,'haveRight':false,'expand':false,'icon':'','url':'/boss/portal/notice-list','type':1,'children':[]},{'id':14,'label':'人员管理','parentId':3,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/system/user-list','type':1,'children':[]},{'id':15,'label':'部门管理','parentId':3,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/system/depart-list','type':1,'children':[]},{'id':16,'label':'角色管理','parentId':3,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/system/role-list','type':1,'children':[]},{'id':18,'label':'菜单管理','parentId':3,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/system/menu-list','type':1,'children':[]},{'id':19,'label':'操作日志','parentId':3,'haveRight':false,'expand':false,'icon':'fa fa-circle-o','url':'/boss/system/opera-log','type':1,'children':[]}]}],'haveRight':false,'userInfo':{'userId':1111130,'userName':'黄联祈','icon':null,'departId':250684,'departName':'产品研发部_技术组','position':'前端开发工程师','departDepth':3,'type':'develop','joinTime':'2016-12-05','departMgr':false,'mgrList':[],'sysMgr':false},'actions':[]}},

        // 导航接口
        url: 'http://dev-b.wesdom.cc/admin/user/list_menus.do',

        // 一级导航位置(true:1-6一级菜单,false:7-12一级菜单)
        navContentAPosition: true,

        // 二级导航是否显示 true：显示， false：不显示
        navContentUlInOut: {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: true,
          7: true,
          8: true,
          9: true,
          10: true,
          11: true
        }
      }
    },
    mounted () {
      // 导航少于等于六个，隐藏更多按钮
      if(this.data.data.menus.length >= 6) {
        this.$refs.navMore.style.visibility = 'visible'
      }

      // 隐藏所有二级导航
      this.navContentUlAllIn()
    },
    methods: {
      ...mapActions({
        // 打开站内信
        stationMailIn: 'stationMailIn'
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
        for(var i in this.data.data.menus) {
          this.navContentUlInOut[i] = true
        }
        console.log(this.navContentUlInOut)
        return this.navContentUlInOut
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

