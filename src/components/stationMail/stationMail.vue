<template>
  <div :class="isStationMailOut ? 'stationMailOut': 'stationMailIn'" class="stationMail" id="stationMail">
    <div class="tit-button" id="tit-button">
      <span class="left" @click="goToBlacklog" :class="(stationMailContentType === 0) ? 'on' : 'off'">待办</span>
      <span class="right" @click="goToRemind" :class="stationMailContentType === 1 || stationMailContentType === 2 ? 'on' : 'off'">提醒</span>
    </div>
    <div class="con-Wrap">
      <div class="cw-tit"></div>
      <div v-if="stationMailLoading" class="cw-con stationMail-loading" id="stationMail-loading">
        <span class="fa fa-spin fa-spinner"></span>
      </div>
      <div v-if="!stationMailLoading" class="cw-con" id="stationMail-conWrap">
        <div v-if="letters.letters.length > 0">
          <a v-for="letter in letters.letters" class="con-li">
            <span v-if="stationMailContentType === 0 || stationMailContentType === 1" class="fa remind"></span>
            <span class="con-text">{{ letter.content }}</span>
            <span class="con-bottom">
              <span v-if="letter.lmodify" class="date">{{ letter.lmodify }}</span>
              <button v-if="stationMailContentType === 1" @click="readRemind(letter.id)" class="remindHadRead">标记已读</button>
              <button v-if="stationMailContentType === 2" @click="delRemind(letter.id)" class="backlogDelete">删除</button>
            </span>
          </a>
        </div>
        <p v-if="letters.letters.length === 0" class="tips">暂无消息</p>
      </div>
      <div class="cw-bottom">
        <div v-if="stationMailContentType === 1" @click="goToListread" class="aChange" id="stationMail-aChange"><a href="javascript:void(0)">查看已读提醒</a></div>
        <div v-if="stationMailContentType === 2" @click="goToRemind" class="aChange" id="stationMail-aChange"><a href="javascript:void(0)">返回</a></div>
        <div class="pageChange" id="stationMail-page">
          <button class="prev-page left" @click="prevPage">
            <i class="fa fa-chevron-circle-left"></i>
          </button>
          <button class="next-page right" @click="nextPage">
            <i class="fa fa-chevron-circle-right"></i>
          </button>
        </div>
      </div>
    </div>
    <b-modaltips ref="openBModaltips"></b-modaltips>
  </div>
</template>
<script>

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BStationMail',
    data() {
      return  {
        pageCount: 0,
        page: 1,

        // 站内信显示内容： 0 待办， 1 未读， 2已读
        stationMailContentType: 0,

        // 站内信加载提示
        stationMailLoading: false,

        // 站内信列表数据
        letters: {page: 0, pageCount: 1, letters: []}
      }
    },
    mounted () {
      let self = this
      self.on({el: self.$el, adEl: document, behavior: self.stationMailOut})
      this.getBlacklog(1)
    },
    computed: {
      ...mapGetters({
        isStationMailOut: 'isStationMailOut',
        stationmailGetBlacklogData: 'stationmailGetBlacklogData',
        stationmailGetRemindData: 'stationmailGetRemindData',
        stationmailGetListreadData: 'stationmailGetListreadData',
        stationmailDelRemindData: 'stationmailDelRemindData',
        stationmailReadRemindData: 'stationmailReadRemindData'
      })
    },
    methods: {
      ...mapActions({
        // 关闭站内信
        stationMailOut: 'stationMailOut',
        on: 'on',
        stationmailGetBlacklog: 'stationmailGetBlacklog',
        stationmailGetRemind: 'stationmailGetRemind',
        stationmailGetListread: 'stationmailGetListread',
        stationmailDelRemind: 'stationmailDelRemind',
        stationmailReadRemind: 'stationmailReadRemind',
      }),

      // 显示提示框
      openMOdaltips(type, tips) {
        let self = this
        self.$refs.openBModaltips.openModaltips(type, tips)
      },

      // 获取待办列表
      getBlacklog(page) {
        let self = this
        self.stationMailLoading = true
        self.stationmailGetBlacklog({param: {page: page}}).then(() => {
          self.letters = self.stationmailGetBlacklogData.data
          self.stationMailLoading = false
        })
      },

      // 获取未读提醒列表
      getRemind(page) {
        let self = this
        self.stationMailLoading = true
        self.stationmailGetRemind({param: {page: page}}).then(() => {
          self.letters = self.stationmailGetRemindData.data
          self.stationMailLoading = false
        })
      },

      // 获取已读提醒列表
      getListread(page) {
        let self = this
        self.stationMailLoading = true
        self.stationmailGetListread({param: {page: page}}).then(() => {
          self.letters = self.stationmailGetListreadData.data
          self.stationMailLoading = false
          console.log(self.letters)
        })
      },

      // 切换到待办
      goToBlacklog() {
        let self = this
        if(self.stationMailContentType !== 0) {
          self.stationMailContentType = 0
          self.getBlacklog(1)
        }
      },

      // 切换到未读提醒
      goToRemind() {
        let self = this
        if(self.stationMailContentType !== 1) {
          self.stationMailContentType = 1
          self.getRemind(1)
        }
      },

      // 切换到已读提醒
      goToListread() {
        let self = this
        if(self.stationMailContentType !== 2) {
          self.stationMailContentType = 2
          self.getListread(1)
        }
      },

      // 向前翻页
      prevPage() {
        let self = this
        if(self.stationMailContentType === 0) {
          if(self.letters.page > 1) {
            self.getBlacklog(self.letters.page - 1)
          }
        } else if(self.stationMailContentType === 1) {
          if(self.letters.page > 1) {
            self.getRemind(self.letters.page - 1)
          }
        } else if(self.stationMailContentType === 2) {
          if(self.letters.page > 1) {
            self.getListread(self.letters.page - 1)
          }
        }
      },


      // 向后翻页
      nextPage() {
        let self = this
        if(self.stationMailContentType === 0) {
          if(self.letters.page < self.letters.pageCount) {
            self.getBlacklog(self.letters.page + 1)
          }
        } else if(self.stationMailContentType === 1) {
          if(self.letters.page < self.letters.pageCount) {
            self.getRemind(self.letters.page + 1)
          }
        } else if(self.stationMailContentType === 2) {
          if(self.letters.page < self.letters.pageCount) {
            self.getListread(self.letters.page + 1)
          }
        }
      },


      // 删除已读提醒
      delRemind(id) {
        let self =this
        self.stationmailDelRemind({param: {id: id}}).then(() => {
          if(self.stationmailDelRemindData.data) {
            if(self.letters.letters.length === 1 && self.letters.page > 1) {
              self.getListread(self.letters.page - 1)
            } else {
              self.getListread(self.letters.page)
            }
          } else {
            self.openMOdaltips('error', '删除失败')
          }
        })
      },

      // 标记未读提醒为已读
      readRemind(id) {
        let self =this
        self.stationmailReadRemind({param: {id: id}}).then(() => {
          if(self.stationmailReadRemindData.data) {
            if(self.letters.letters.length === 1 && self.letters.page > 1) {
              self.getRemind(self.letters.page - 1)
            } else {
              self.getRemind(self.letters.page)
            }
          } else {
            self.openMOdaltips('error', '标记失败')
          }
        })
      }
    }

  }
</script>

<style>
  .stationMailOut {
    right: 0;
    transition: right .3s;
  }
  .stationMailIn {
    right: -280px;
    transition: right .3s;
  }
</style>

