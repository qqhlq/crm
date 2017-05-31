<template>
  <div id="app">
    <b-header></b-header>
    <b-crumbs :is-two-level="true"></b-crumbs>
    <b-station-mail></b-station-mail>
    <b-process-bar :active="3"></b-process-bar>
    <b-modaler>
      <b-complex-drop
        :checked-no-changeds="checkedNoChangeds"
        :checked-can-changeds="checkedCanChangeds"
        style="width: 460px;">
      </b-complex-drop>
    </b-modaler>
    <div class="w-wrapper">
      <router-view class="w-content"></router-view>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'App',
    data () {
      return {
        checkedNoChangeds: [{'val':'321293','name':'张鑫'}],
        checkedCanChangeds: [{'val':'326659','name':'张先锋'},{'val':'432653','name':'邢苏妮'}]
      }
    },
    computed: {
      ...mapGetters([
      ])
    },
    methods: {
      ...mapActions([
      ]),

      getBacklogs() {
        this.$wGet('/admin/letter/backlog.do',{page: 1}).then(data => {
          console.log(data)
        })
      }

    },
    mounted() {

    }
  }
</script>
<style lang="scss">
  @import "./styles/core/var";

  * {
    box-sizing: border-box !important;
  }
  body {
    background: #ebebeb;
    font-family: "Microsoft Yahei", "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: 0;
    position: relative;
    overflow: hidden;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
  }
  h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6 {
    font-family: "Microsoft Yahei", "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }


</style>
