<template>
  <div :class="isStationMailOut ? 'stationMailOut': 'stationMailIn'" class="stationMail" id="stationMail">
    <div class="tit-button" id="tit-button">
      <span class="on left">待办</span>
      <span class="off right">提醒</span>
    </div>
    <div class="con-Wrap">
      <div class="cw-tit"></div>
      <div class="cw-con stationMail-loading" id="stationMail-loading" style="display: none;">
        <span class="fa fa-spin fa-spinner"></span>
      </div>
      <div class="cw-con" id="stationMail-conWrap" style="display: none;"></div>
      <div class="cw-bottom">
        <div class="aChange" id="stationMail-aChange"><a href="javascript:void(0)" data-next='2'>查看已读提醒</a></div>
        <div class="pageChange" id="stationMail-page">
          <button class="prev-page left">
            <i class="fa fa-chevron-circle-left"></i>
          </button>
          <button class="next-page right">
            <i class="fa fa-chevron-circle-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BStationMail',
    data() {
      return  {
        data: {
          pageCount: 0,
          page: 1,
          letters: []
        }
      }
    },
    methods: {
      ...mapActions({
        // 关闭站内信
        stationMailOut: 'stationMailOut'
      }),

      // 访问接口
      getBacklogs() {
        this.$wGet('/admin/letter/backlog.do',{page: 1}).then(data => {
          console.log(data)
        })
        // console.log('a')
      }

    },
    mounted () {
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)){
          this.stationMailOut()
        }
      })

      this.getBacklogs()
    },
    computed: {
      ...mapGetters({
        isStationMailOut: 'isStationMailOut'
      })
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

