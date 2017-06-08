<template>
  <div :class="['b-date-picker',list.head]">
    <el-date-picker
      v-model="list.value"
      type="daterange"
      popper-class="b-date-picker-box"
      @change="changeDate">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: 'BDatePicker',
    props: {
      list: {
        type: Object,
        default: {}
      }
    },
    methods: {
      changeDate(value) {
        let self = this
        self.$emit('getList')
      }
    }
  }
</script>
