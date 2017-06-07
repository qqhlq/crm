<template>
  <div class="open-table">
    <el-table :data="data" style="width: 100%" max-height="600" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55px"
      ></el-table-column>
      <el-table-column
        prop="name"
        min-width="256px"
        :render-header="renderProduct"
      ></el-table-column>
      <el-table-column
        prop="ownerName"
        min-width="120px"
        label="客户所有人">
      ></el-table-column>
      <el-table-column
        prop="tradeName"
        min-width="160px"
        :render-header="renderTrade"
      ></el-table-column>
      <el-table-column
        prop="cityName"
        min-width="120px"
        :render-header="renderCity"
      ></el-table-column>
      <el-table-column
        prop="lastUpdatetime"
        min-width="140px"
        :render-header="renderTime"
      ></el-table-column>
      <el-table-column
        label="最新动态记录"
        min-width="320px">
        <template scope="scope">
          <p class="b-table-cell" v-html="scope.row.lastUpdateMemo"></p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BOpenMain',
    computed: {
      ...mapGetters({
        data: 'openList/data',
        tableHead: 'openList/tableHead',
        choosed: 'openList/choosed'
      })
    },
    methods: {
      ...mapActions({
        changeState: 'openList/changeState',
        changeValue: 'openList/changeValue',
        changeList: 'openList/changeList',
        changeSelect: 'openList/changeSelect',
        changeChoosed: 'openList/changeChoosed',
        getList: 'openList/getList'
      }),

     /**
      * 根据 选择下拉框选择的选项改变表格
      * @param {Object} 表格头部对象 包括下拉框中的值
      */
      pushValue(key) {
        let self = this
        self.changeValue(key)
        self.getList()
      },

     /**
      * 根据 选择下拉框输入的内容 获取 搜索列表
      * @param {Object} 表格头部对象 包括下拉框中的值
      */
      pushList(key) {
        let self = this
        self.changeList(key)
      },

    /**
      * 根据 改变表格列表的选中状态
      * @param {Object} row 表格头部对象 包括下拉框中的值
      */
      handleSelectionChange(row) {
        let self = this
        let temp = []
        for(let item in row) {
          temp.push(row[item].id)
        }
        self.changeChoosed(temp)
      },

      // 渲染 客户产品名表头信息
      renderProduct() {
        let self = this
        return (
          <div class="b-table-load-select">
            <span onClick={() => {
              self.changeState('product')
            }}
            class={{'green': self.tableHead.product.value !== ''}}>
            客户产品名</span><i class="fa fa-caret-down"></i>
            <transition name="el-zoom-in-top">
              <b-load-select
                v-show={self.tableHead.product.show}
                list={self.tableHead.product}
                onPushValue={self.pushValue}
                onPushList={self.pushList}>
              </b-load-select>
            </transition>
          </div>
        )
      },

      // 渲染 客户所属行业表头信息
      renderTrade() {
        let self = this
        return (
          <div class="b-table-load-select">
            <span onClick={() => {
              self.changeState('trade')
            }}
            class={{'green': self.tableHead.trade.value !== ''}}>
            行业</span><i class="fa fa-caret-down"></i>
            <transition name="el-zoom-in-top">
              <b-load-select
                v-show={self.tableHead.trade.show}
                list={self.tableHead.trade}
                onPushValue={self.pushValue}
                onPushList={self.pushList}>
              </b-load-select>
            </transition>
          </div>
        )
      },

      // 渲染 客户所在城市表头信息
      renderCity() {
        let self = this
        return (
          <div class="b-table-load-select">
            <span onClick={() => {
              self.changeState('city')
            }}
            class={{'green': self.tableHead.city.value !== ''}}>
            城市</span><i class="fa fa-caret-down"></i>
            <transition name="el-zoom-in-top">
              <b-load-select
                v-show={self.tableHead.city.show}
                list={self.tableHead.city}
                onPushValue={self.pushValue}
                onPushList={self.pushList}>
              </b-load-select>
            </transition>
          </div>
        )
      },

      // 渲染 最新动态时间表头信息
      renderTime() {
        let self = this
        return (
          <div class="b-table-data-picker">
            <span onClick={() => {
              self.changeState('date')
            }}
            class={{'green': self.tableHead.date.value !== '' &&  self.tableHead.date.value.toString() !== ','}}>
            最新动态时间</span><i class="fa fa-caret-down"></i>
            <b-date-picker
              v-show={self.tableHead.date.show}
              list= {self.tableHead.date}
              onChangeState={() => {
                self.changeState('date')
                self.getList()
              }}
              >
            </b-date-picker>
          </div>
        )
      }
    }
  }
</script>
<style>
</style>
