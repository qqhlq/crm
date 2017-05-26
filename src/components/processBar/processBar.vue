<template>
  <div class="processBarWrap" :active="active" style="margin-top: 150px;">
    <div class="plinePointWrap">
      <div class="pline">
        <div :class="{'on': (active >= 2)}"></div>
        <div :class="{'on': (active >= 3)}"></div>
      </div>
      <div class="ppoint">
        <div class="ppLeft" :class="{'on': (active >= 1)}"></div>
        <div class="ppMiddle" :class="{'on': (active >= 2)}"></div>
        <div class="ppRight" :class="{'on': (active >= 3)}"></div>
      </div>
    </div>
    <div class="ppointName">
      <div class="pnLeft" :class="{'on': (active >= 1)}">建立分组</div>
      <div class="pnMiddle" :class="{'on': (active >= 2)}" >设置管理员</div>
      <div class="pnRight" :class="{'on': (active >= 3)}">设置成员</div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BProcessBar',

    props: [
      'active'
    ]
    // data() {
    //   return {
    //     active: 1
    //   }
    // }
  }
</script>

<style>
</style>


