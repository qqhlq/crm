<template>
  <div class="table-header">
      <ul v-if="tableType === 0 && tableState === 1">
          <li>
            <i class="fa fa-mail-forward"></i>
            <span>领取</span>
          </li>
          <li>
            <i class="fa fa-anchor"></i>
            <span>分配</span>
          </li>
          <li>
            <i class="fa fa-trash"></i>
            <span>删除</span>
          </li>
      </ul>
      <ul v-if="tableType === 1 && tableState === 1">
          <li>
            <i class="fa fa-random"></i>
            <span>转移</span>
          </li>
          <li>
            <i class="fa fa-mail-reply"></i>
            <span>退回</span>
          </li>
          <li>
            <i class="fa fa-trash"></i>
            <span>删除</span>
          </li>
      </ul>
      <div v-if="tableType === 0 && tableState === 0 && authority === 0" class="table-header-authority">
         <el-select v-model="value" placeholder="请选择" @change="tableSelectChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span v-if="tableType === 1 && tableState === 0">私人池</span>
      <span v-if="tableType === 0 && tableState === 0 && authority !== 0 ">全部</span>
      <div class="btn-green-mid">
        新建客户
      </div>
  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BTableHeader',
    data () {
      return {
        options: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '销售组'
          },
          {
            value: 2,
            label: '渠道组'
          },
          {
            value: 3,
            label: '商务组'
          }
        ],
        value: 0
      }
    },
    computed: {
      ...mapGetters({
        tableType: 'openList/tableType',
        authority: 'openList/authority',
        tableState: 'openList/tableState'
      })
    },

/*    methods: {
      ...mapActions({
        change: 'openList/tableSelectChange'
      }),
    }*/

    methods: {
      tableSelectChange () {

      }
    }
  }
</script>
