<template>
  <div class="open-table">
    <el-table :data="data" style="width: 100%" max-height="600">
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
    productName: 'BTableMain',
    computed: {
      ...mapGetters({
        data: 'openList/data',
        serchList: 'openList/serchList',
        tableHead: 'openList/tableHead'
      })
    },
    methods: {
      ...mapActions({
        changeState: 'openList/changeState'
      }),
      renderProduct() {
        let self = this
        return (
          <div class="el-table-load-select el-table-ower">
            <span onClick={() => {
              this.changeState('product')
            }}>客户产品名</span><i class="fa fa-caret-down"></i>
            <b-load-select
              placeholder={this.tableHead.product.placeholder}
              width={this.tableHead.product.width}
              head-type={'product'}
              search-list={this.searchList}
              v-show={this.tableHead.product.show}
              >
            </b-load-select>
          </div>
        )
      },
      renderOwer() {
        let self = this
        return (
          <div class="el-table-load-select el-table-product">
            <span onClick={() => {
              this.changeState('ower')
            }}>客户所有人</span><i class="fa fa-caret-down"></i>
            <b-load-select
              placeholder={this.tableHead.ower.placeholder}
              width={this.tableHead.ower.width}
              head-type={'ower'}
              search-list={this.searchList}
              v-show={this.tableHead.ower.show}>
            </b-load-select>
          </div>
        )
      },
      renderTrade() {
        let self = this
        return (
          <div class="el-table-load-select el-table-trade">
            <span onClick={() => {
              this.changeState('trade')
            }}>行业</span><i class="fa fa-caret-down"></i>
            <b-load-select
              placeholder={this.tableHead.trade.placeholder}
              head-type={'trade'}
              search-list={this.searchList}
              v-show={this.tableHead.trade.show}>
            </b-load-select>
          </div>
        )
      },
      renderCity() {
        let self = this
        return (
          <div class="el-table-load-select el-table-cityName">
            <span onClick={() => {
              this.changeState('city')
            }}>城市</span><i class="fa fa-caret-down"></i>
            <b-load-select
              placeholder={this.tableHead.city.placeholder}
              head-type={'city'}
              search-list={this.searchList}
              width={this.tableHead.city.width}
              v-show={this.tableHead.city.show}>
            </b-load-select>
          </div>
        )
      },
      renderTime() {
        let self = this
        return (
          <div class="el-table-load-select el-table-cityName">
            <span onClick={() => {
              this.changeState('time')
            }}>最新动态时间</span><i class="fa fa-caret-down"></i>
          </div>
        )
      }
    }
  }
</script>
<style>
</style>
