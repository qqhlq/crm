<template>
  <el-date-picker
    v-model="list.value"
    type="daterange"
    popper-class="b-data-picker-box"
    :picker-options="pickerOptions"
    @change="changeDate">
  </el-date-picker>
</template>

<script>
  export default {
    name: 'BDatePicker',
    data () {
      return {
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '清空',
              onClick(picker) {
                picker.$emit('pick', '')
              }
            }
          ]
        }
      }
    },
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
