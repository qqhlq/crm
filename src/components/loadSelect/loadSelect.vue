<template>
  <div :class="['b-load-select',`b-load-select-${this.headType}`]">
    <input type="text" class="b-load-select-input">
  </div>

</template>

<script>
  export default {
    name: 'BLoadSelect',
    props: {
      headType: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入搜索内容'
      },
      searchList: {
        type: Array,
        default: () => {
          return []
        }
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
    padding: 10px;
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

    input {
      width: 236px;
    }
  }
  .b-load-select-ower {
    width: 256px;

    input {
      width: 236px;
    }
  }
  .b-load-select-trade {
    width: 160px;

    input {
      width: 140px;
    }
  }
  .b-load-select-city {
    width: 160px;

    input {
      width: 140px;
    }
  }

</style>
