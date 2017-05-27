<template>
  <el-date-picker
    v-model="list.value"
    type="daterange"
    popper-class="b-data-picker-box"
    :picker-options="list.pickerOptions"
    @change="changeDate">
  </el-date-picker>
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
      changeDate() {
        this.$emit('changeState','date')
      }
    }
  }
</script>
