<template>
  <div :class="['b-load-select',`b-load-select-${list.head}`]">
    <input type="text" class="b-load-select-input" v-model="list.key" @focus="getList" @keyup="getList">
    <ul class="b-load-select-list" v-if="list.searchList.length === 0">
      <li class="b-load-select-empty">
        查无此客户
      </li>
    </ul>
    <ul class="b-load-select-list" v-else-if="list.searchList[0] !== null">
      <li v-for="item in list.searchList" @click="getChoose" :data-id="item.id">
          {{item.text}}
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
      getChoose(e) {
        let self = this
        let id = e.currentTarget.getAttribute('data-id')
        self.list.value = id
        this.$emit('pushValue',self.list)
      },
      getList() {
        let self = this
        this.$emit('pushList',self.list)
      }
    }
  }
</script>
