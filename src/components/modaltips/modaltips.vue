<template>
  <div class="b-modaltips-box" :class="[modaltipsOut ? 'openModaltips': 'closeModaltips', modaltipsOutTranstion ? 'openModaltipsTranstion': 'closeModaltipsTranstion']">
    <div>
      <span v-if="success" class="fa fa-check"></span>
      <span v-if="error" class="fa fa-exclamation-circle"></span>
      <span>{{ tips }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BModaltips',
    data() {
      return {
        modaltipsOut: false,
        modaltipsOutTranstion: false,
        success: false,
        error: false,
        tips: ''
      }
    },
    methods: {
      openModaltips(type, tips) {
        let self = this
        self.tips = tips
        if(type === 'success') {
          self.success = true
        } else if(type === 'error') {
          self.error = true
        }

        self.modaltipsOut = true
        setTimeout(() => {
          self.modaltipsOutTranstion = true
          setTimeout(() => {
            self.modaltipsOutTranstion = false
            setTimeout(() => {
              self.modaltipsOut = false
              self.success = false
              self.error = false
            }, 1000)
          }, 1500)
        },0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .closeModaltipsTranstion {
    opacity: 0;
    transition: opacity 1s;
  }

  .openModaltipsTranstion {
    opacity: 1;
    transition: opacity .3s;
  }

  .closeModaltips {
    display: none;
  }

  .openModaltips {
    display: block;
  }
</style>


