<template>
  <div class="bmodaler-wrap">
    <div class="bmodaler-bak"></div>
    <div class="bmodaler-box-wrap">
      <div class="bmodaler-box">
        <div class="bmodaler-header">
          <div class="bmodaler-title">新建客户池分组</div>
          <span class="bmmodaler-close"><i class="fa fa-remove"></i></span>
        </div>
        <div class="bmodaler-content">
          <slot></slot>
        </div>
        <div class="bmodaler-btn">
          <div>
            <button></button>
            <button></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BModaler'
  }
</script>

<style>
</style>

