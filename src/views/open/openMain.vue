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
        prop="owerName"
        min-width="120px"
        :render-header="renderOwer"
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
        prop="lastUpdateMemo"
        label="最新动态记录"
        min-width="320px"
      ></el-table-column>
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
        changeTable: 'openList/changeTable',
        changeList: 'openList/changeList',
        changeSelect: 'openList/changeSelect',
        changeChoosed: 'openList/changeChoosed'
      }),

     /**
      * 根据 选择下拉框选择的选项改变表格
      * @param {Object} 表格头部对象 包括下拉框中的值
      */
      pushTable(key) {
        this.changeTable(key)
      },

     /**
      * 根据 选择下拉框输入的内容 获取 搜索列表
      * @param {Object} 表格头部对象 包括下拉框中的值
      */
      pushList(key) {
        this.changeList(key)
      },

     /**
      * 根据 表格中列表的选择框选中状态改变 更新选中状态列表
      * @param {Object}
      */
      pushSelect(x, y) {
        console.log(x,y)
      },

      handleSelectionChange(row) {
        let temp = []
        for(let item in row) {
          temp.push(row[item].id)
        }
        this.changeChoosed(temp)
      },

      // 渲染 客户产品名表头信息
      renderProduct() {
        let self = this
        return (
          <div class="b-table-load-select">
            <span onClick={() => {
              this.changeState('product')
            }}>客户产品名</span><i class="fa fa-caret-down"></i>
            <transition name="el-zoom-in-top">
              <b-load-select
                v-show={this.tableHead.product.show}
                list={this.tableHead.product}
                onPushTable={this.pushTable}
                onPushList={this.pushList}>
              </b-load-select>
            </transition>
          </div>
        )
      },

      // 渲染 客户所有人表头信息
      renderOwer() {
        let self = this
        return (
          <div class="b-table-load-select">
            <span onClick={() => {
              this.changeState('ower')
            }}>客户所有人</span><i class="fa fa-caret-down"></i>
            <transition name="el-zoom-in-top">
              <b-load-select
                v-show={this.tableHead.ower.show}
                list={this.tableHead.ower}
                onPushTable={this.pushTable}
                onPushList={this.pushList}>
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
              this.changeState('trade')
            }}>行业</span><i class="fa fa-caret-down"></i>
            <transition name="el-zoom-in-top">
              <b-load-select
                v-show={this.tableHead.trade.show}
                list={this.tableHead.trade}
                onPushTable={this.pushTable}
                onPushList={this.pushList}>
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
              this.changeState('city')
            }}>城市</span><i class="fa fa-caret-down"></i>
            <transition name="el-zoom-in-top">
              <b-load-select
                v-show={this.tableHead.city.show}
                list={this.tableHead.city}
                onPushTable={this.pushTable}
                onPushList={this.pushList}>
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
              this.changeState('date')
            }}>最新动态时间</span><i class="fa fa-caret-down"></i>
            <b-date-picker
              v-show={this.tableHead.date.show}
              list= {this.tableHead.date}
              onChangeState={() => {
                this.changeState('data')
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
