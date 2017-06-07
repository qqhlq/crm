<template>
  <div class="private-table">
    <el-table :data="data" style="width: 100%" max-height="600" @selection-change="handleSelectionChange">

      <!-- 选中状态列 -->
      <el-table-column
        type="selection"
        width="55px">
      </el-table-column>

      <!-- 客户产品名列 -->
      <el-table-column
        fixed
        prop="name"
        min-width="200px"
        :render-header="renderProduct">
      </el-table-column>

      <!-- 客户所有人列 -->
      <el-table-column
        prop="ownerName"
        min-width="110px"
        :render-header="renderOwer">
      </el-table-column>

      <!-- 客户级别列 -->
      <el-table-column
        prop="levelName"
        min-width="120px"
        :render-header="renderLevel">
      </el-table-column>

      <!-- 电话列 -->
      <el-table-column
        prop="phone"
        min-width="140px"
        label="电话">
      </el-table-column>

      <!-- 认领时间列 -->
      <el-table-column
        prop="ownertime"
        min-width="130px"
        :render-header="renderOwnerTime">
      </el-table-column>

      <!-- 剩余时间列 -->
      <el-table-column
        prop="resttime"
        min-width="110px"
        :render-header="renderRestTime">
      </el-table-column>

      <!-- 今日动态列 -->
      <el-table-column
        prop="todayStatusDesc"
        min-width="260px"
        label="今日动态">
      </el-table-column>

      <!-- 最新动态时间 -->
      <el-table-column
        prop="lastUpdatetime"
        min-width="130px"
        label="最新动态时间">
      </el-table-column>

       <!-- 最新动态纪录 -->
      <el-table-column
        prop="lastUpdateMemo"
        min-width="270px"
        label="最新动态纪录">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'PrivateMain',
    computed: {
      ...mapGetters({
        data: 'privateList/data',
        th: 'privateList/th'
      })
    },
    methods: {
      ...mapActions({
        changeThState: 'privateList/changeThState'
      }),

      //  表格列表选中输入框选中状态
      handleSelectionChange() {

      },

      // 更改 load-select的列表
      pushThList(value) {

      },

      // 更改load-select选中的值
      pushThValue(value) {

      },

      //  渲染 客户产品名表头
      renderProduct(h) {
        let self = this
        return (
          <div class="b-table-load-select">
            <span onClick={() => {
              self.changeThState('productName')
            }}
            class={{'green': self.th.productName.value !== ''}}>
            客户产品名</span><i class="fa fa-caret-down"></i>
            <transition name="el-zoom-in-top">
              <b-load-select
                v-show={self.th.productName.show}
                list={self.th.productName}
                onPushThValue={self.pushThValue}
                onPushThList={self.pushThList}>
              </b-load-select>
            </transition>
          </div>
        )
      },
      renderOwer(h) {
        let self = this
        return (
          <div class="b-table-load-select">
            <span onClick={() => {
              self.changeThState('ownerName')
            }}
            class={{'green': self.th.ownerName.value !== ''}}>
            客户所有人</span><i class="fa fa-caret-down"></i>
            <transition name="el-zoom-in-top">
              <b-load-select
                v-show={self.th.ownerName.show}
                list={self.th.ownerName}
                onPushThValue={self.pushThValue}
                onPushThList={self.pushThList}>
              </b-load-select>
            </transition>
          </div>
        )
      },
      renderLevel() {
        return (
          <span>客户级别</span>
        )
      },
      renderOwnerTime() {
        return (
          <span>认领时间</span>
        )
      },
      renderRestTime() {
        return (
          <span>剩余时间</span>
        )
      }
    }
  }
</script>

<style>

</style>
