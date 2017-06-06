<template>
  <div class="bmodaler-wrap" :class="[switchDrop ? 'closeDrop': 'openDrop', switchDropTranstion ? 'closeDropTranstion': 'openDropTranstion']">
    <div class="bmodaler-fram">
      <div @click="closeDrop" class="bmodaler-bak"></div>
      <div class="bmodaler-box" ref="bmodalerBox">
        <div class="bmodaler-header">
          <!--<div class="bmodaler-title">新建客户池分组</div>-->
          <slot name="header"></slot>
          <span class="bmmodaler-close" @click="closeDrop"><i class="fa fa-remove"></i></span>
        </div>
        <div class="bmodaler-content">
          <slot name="content"></slot>
        </div>
        <div class="bmodaler-btn">
          <slot name="btn"></slot>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BModaler',
    data() {
      return {
        // 弹出框开关及隐藏
        switchDropTranstion: true,
        switchDrop: true
      }
    },
    methods: {

      closeDrop() {
        let self = this
        if(!self.switchDrop) {
          self.switchDropTranstion = true
          setTimeout(function() {
            self.switchDrop = true
          }, 300)
        }
        // self.$emit('aaa', 'dd')
      },
      openDrop() {
        let self = this
        if(self.switchDrop) {
          self.switchDropTranstion = false
          self.switchDrop = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .closeDropTranstion {
    opacity: 0;
    transition: opacity .3s;
  }

  .openDropTranstion {
    opacity: 1;
    transition: opacity .3s;
  }

  .closeDrop {
    display: none;
  }

  .openDrop {
    display: block;
  }



</style>

