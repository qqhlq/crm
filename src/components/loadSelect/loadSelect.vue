<template>
  <div :class="['b-load-select',`b-load-select-${list.head}`]">
    <input type="text" class="b-load-select-input" v-model="list.key" @focus="getList" @keyup="handle">
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
        self.list.key = e.currentTarget.innerText
        self.list.value = id
        self.$emit('pushValue',self.list)
      },
      getList() {
        let self = this
        self.$emit('pushList',self.list)
      },
      handle(e) {
        let self = this
        console.log(e.currentTarget.value)
        if(e.currentTarget.value === '') {
          self.list.key = ''
          self.list.value = ''
          this.$emit('pushValue',self.list)
        }
        self.getList()
      }
    },
    mounted() {
      let self = this
      if(self.list.head !== 'product') {
        this.$emit('pushList',self.list)
      }
    }
  }
</script>
