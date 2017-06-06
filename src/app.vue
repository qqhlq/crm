<template>
  <div id="app">
    <b-header></b-header>
    <b-station-mail></b-station-mail>
    <!--<b-crumbs :is-two-level="true" :first-name="'CRM'" :twoth-name="'公海池'"></b-crumbs>
    <b-process-bar :active="1"></b-process-bar>
    <b-modaler>
      <b-complex-drop style="width: 460px;"></b-complex-drop>
    </b-modaler>-->
    <div class="b-wrapper">
      <router-view class="b-content"></router-view>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'App',
    data () {
      return {
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
        })
      }

    },
    mounted() {

    }
  }
</script>
<style scoped>
  .b-wrapper {
    width: 1200px;
    margin: 0 auto;
  }
</style>
