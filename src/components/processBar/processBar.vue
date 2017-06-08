<template>
  <div class="processBarWrap" :active="active">
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
    <div @click="changeActive(1)" class="firstSteps stpesclick"></div>
    <div @click="changeActive(2)" class="towthSteps stpesclick"></div>
    <div @click="changeActive(3)" class="threethSteps stpesclick"></div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BProcessBar',
    data() {
      return {

      }
    },
    props: [
      'active'
    ],
    methods: {
      changeActive(value) {
        let self = this
        self.$emit('getClickSteps', value)
      }
    }
  }
</script>

<style>
</style>


