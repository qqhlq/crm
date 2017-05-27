<template>
   <el-date-picker
      v-model="list.value"
      type="daterange"
      placeholder="选择日期范围"
      editable>
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
    }
  }
</script>
