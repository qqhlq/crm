<template>
  <div class="tree-drop-down-box">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" show-checkbox></el-tree>
    <div class="buttons">
</div>
  </div>
</template>

<script>
  let id = 1000

  export default {
    name: 'BTreeDrop',
    data() {
      return {
        data: [{
          id: 1,
          label: '销售部',
          children: [{
            id: 4,
            label: '赵燕妮',
          },
          {
            id: 4,
            label: '李燕妮',
          }]
        }, {
          id: 2,
          label: '商务部',
          children: [{
            id: 5,
            label: '王燕妮'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
      }
    }
  }
</script>
