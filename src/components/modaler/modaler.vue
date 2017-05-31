<template>
  <div class="bmodaler-wrap" :class="[switchDrop ? 'colseDrop': 'openDrop', switchDropTranstion ? 'colseDropTranstion': 'openDropTranstion']">
    <div class="bmodaler-bak"></div>
    <div class="bmodaler-box-wrap">
      <div class="bmodaler-box">
        <div class="bmodaler-header">
          <div class="bmodaler-title">新建客户池分组</div>
          <span class="bmmodaler-close" @click="colseDrop"><i class="fa fa-remove"></i></span>
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
    name: 'BModaler',
    data() {
      return {
        // 弹出框开关及隐藏
        switchDropTranstion: false,
        switchDrop: false
      }
    },
    methods: {
      colseDrop() {
        let that = this
        if(!this.switchDrop) {
          this.switchDropTranstion = true
          setTimeout(function() {
            // 这里的this指的不是vue实例，调用data不能用this
            that.switchDrop = true
            console.log(this.switchDrop)
          }, 300)
        }
      },
      openDrop() {
        let that = this
        if(this.switchDrop) {
          this.switchDropTranstion = false
          setTimeout(function() {
            that.switchDrop = false
          }, 300)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .colseDropTranstion {
    opacity: 0;
    transition: opacity .3s;
  }

  .openDropTranstion {
    opacity: 1;
    transition: opacity .3s;
  }

  .colseDrop {
    display: none;
  }

  .openDrop {
    display: block;
  }



</style>

