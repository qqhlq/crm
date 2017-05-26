<template>
  <div :class="['b-load-select',`b-load-select-${this.headerType}`]">
    <input type="text" class="b-load-select-input" @focus="">
  </div>

</template>

<script>
  export default {
    name: 'BLoadSelect',
    data() {
      return {
        listShow: false
      }
    },
    props: {
      headerType: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入搜索内容'
      },
      moreItem: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .b-load-select {
    width: 100%;
    background-color: #FFF;
    box-shadow: 0 0 6px 0 rgba(0,0,0,.2);
    position: absolute;
    top: 40px;
    z-index: 999;
  }
  .b-load-select-input {
    height: 32px;
    border: 1px solid #ddd;
    border-radius: 3px;
    outline: none;
    padding: 0 10px;

    &:focus,&:hover {
      border-color: #29CC29;
    }
  }
  .b-load-select-product {
    width: 256px;
    padding: 10px;

    input {
      width: 236px;
    }
  }
</style>
