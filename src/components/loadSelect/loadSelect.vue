<template>
  <div :class="['b-load-select',`b-load-select-${list.head}`]">
    <input type="text" class="b-load-select-input" v-model="list.key" @focus="getList" @keyup="getList">
    <ul class="b-load-select-list" v-if="list.searchList.length === 0">
      <li class="b-load-select-empty">
        查无此客户
      </li>
    </ul>
    <ul class="b-load-select-list" v-else>
      <li v-for="item in list.searchList" @click="getChoose">
          {{item.value}}
      </li>
    </ul>
  </div>

</template>

<script>

  export default {
    name: 'BLoadSelect',
    props: {
      list: {
        type: Object,
        default: {}
      }
    },
    methods: {
      getChoose() {
        this.$emit('pushTable',this.list)
      },
      getList() {
        this.$emit('pushList',this.list)
      }
    }
  }
</script>
