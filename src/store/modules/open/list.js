import * as types from '../../mutation-types'
import Vue from 'vue'

// 公海池页面

let state = {
  // 权限
  authority: 0,
  // 头部选项状态
  state: 0,
  // 公海池下拉选项
  options: {
    list: [],
    show: false,
    value: 0
  },
  optionsSelected: '',
  // 公海池 表格数据
  data: [],
  // 页码
  page: 1,
  totalPage: 8,
  // 公海池表格 表格头信息
  tableHead: {
    product: {
      show: false,
      placeholder: '请输入产品名',
      width: '256',
      searchList: [null],
      head: 'product',
      select: false,
      value: '',
      key: ''
    },
    ower: {
      show: false,
      placeholder: '请输入姓名',
      width: '100',
      searchList: [null],
      head: 'ower',
      select: false,
      value: '',
      key: ''
    },
    trade: {
      show: false,
      placeholder: '请输入行业',
      width: '100',
      searchList: [null],
      head: 'trade',
      select: false,
      value: '',
      key: ''
    },
    city: {
      show: false,
      placeholder: '请输入城市',
      width: '100',
      searchList: [null],
      head: 'city',
      select: false,
      value: '',
      key: ''
    },
    date: {
      show: false,
      value: '',
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
  choosed: []
}

let getters = {
  authority: state => state.authority,
  state: state => state.state,
  options: state => state.options,
  data: state => state.data,
  page: state => state.page,
  totalPage: state => state.totalPage,
  serchList: state => state.serchList,
  tableHead: state => state.tableHead,
  choosed: state => state.choosed
}

let mutations = {

  //  切换表格头附加项的显示与隐藏
  [types.OPEN_TABLE_HEAD_STATE_CHANGE](state, payload) {
    for (let item in state.tableHead) {
      if (payload === item) {
        state.tableHead[item].show = !state.tableHead[item].show
      } else {
        state.tableHead[item].show = false
      }
    }
  },

  // 根据附加项输入的值 改变附加項的搜索列表
  [types.OPEN_TABLE_HEAD_LIST_CHANGE](state, param) {
    let name = param.head
    state.tableHead[name] = param
  },

  // 选择框的选择选项 改变纪录的已选择的选项列表
  [types.OPEN_TABLE_CHOOSED_LIST_CHANGE](state, param) {
    state.choosed = param
  },

  // 改变当前页数
  [types.OPEN_TABLE_PAGE_CHANGE](state, param) {
    state.page = param
  },

  // 改变表格
  [types.OPEN_TABLE_CHANGE](state, param) {
    state.data = param.records
    state.page = param.page
    state.totalPage = param.pageCount
  },

  // 获取公海次组 列表
  [types.OPEN_TABLE_OPTIONS](state, param) {
    state.options.list = param
    state.options.value = param[0].id
  },

  // 改变公海池组 的选中
  [types.OPEN_TABLE_OPTIONS_SELECTED](state, param) {
    state.options.value = param
  }
}

let actions = {

  /**
   * 改变表格头部显示状态
   *
   * @param {Object} { commit }
   * @param {String} payload
   */
  async changeState({ commit }, payload) {
    commit(types.OPEN_TABLE_HEAD_STATE_CHANGE, payload)

    if (payload === 'date') {
      setTimeout(() => {
        let ele = document.getElementsByClassName('el-date-editor')[0].getElementsByTagName('input')[0]
        if (state.tableHead.date.show === true) {
          ele.focus()
        }
      }, 0)
    }
  },

  /**
   * 点击下拉选项
   *
   * @param {Object} { commit }
   * @param {Object} param
   */
  async changeValue({ commit }, param) {
    commit(types.OPEN_TABLE_HEAD_STATE_CHANGE, param)
    commit(types.OPEN_TABLE_HEAD_LIST_CHANGE, param)
  },

  /**
   * 改变搜索下拉框列表内容
   *
   * @param {Object} { commit }
   * @param {Object} param
   */
  async changeList({ commit }, param) {
    let key = param.key
    let head = param.head
    let url, data={}
    switch (head) {
      case 'product':
        url = '/crm/custom/custom_name_option.do'
        break
      case 'ower':
        url = '/crm/custom/onwer_option.do'
        break
      case 'trade':
        url = ' /crm/custom/trade_option.do'
        break
      case 'city':
        url = '/crm/custom/city_option.do'
        break
      default:
        break
    }

    // 接口部分
    data =  await Vue.wGet(url,{
      'name': key,
      'public': false
    })

    param.searchList = data.data
    commit(types.OPEN_TABLE_HEAD_LIST_CHANGE, param)
  },

  /**
   * 改变纪录已勾选选择框的列表
   *
   * @param {Object} { commit }
   * @param {Array} param
   */
  async changeChoosed({ commit }, param) {
    commit(types.OPEN_TABLE_CHOOSED_LIST_CHANGE, param)
  },

  /**
   * 改变当前页数
   *
   * @param {Object} { commit }
   * @param {Number} param
   */
  async changePage({ commit }, param) {
    commit(types.OPEN_TABLE_PAGE_CHANGE, param)
  },

  /**
   * 刷新列表
   *
   * @param {Object} { commit }
   * @returns
   */
  async getList({ commit }) {
    let startDate
    let endDate
    if(state.tableHead.date.value !== '' && state.tableHead.date.value.toString() !== ',') {
      startDate = state.tableHead.date.value[0].toLocaleString().split(' ')[0]
      endDate = state.tableHead.date.value[1].toLocaleString().split(' ')[0]
    }

    let param = {
      name: state.tableHead.product.value,
      tradeId: state.tableHead.trade.value,
      cityCode: state.tableHead.city.value,
      startDate,
      endDate,
      page: state.page,
      customPoolId: state.options.value
    }
    let data =  await Vue.wGet('/crm/custom/list.do', param)
    commit(types.OPEN_TABLE_CHANGE, data.data)
  },


  /**
   * 更改选中的公海池组ID
   *
   * @param {Object} { commit }
   * @param {String} param
   */
  async tableSelectChange({ commit }, param) {
    commit(types.OPEN_TABLE_OPTIONS_SELECTED, param)
  },

  /**
   * 生产公海池组列表
   *
   * @param {Object} { commit }
   */
  async getTableOptions({ commit }) {
    let data =  await Vue.wGet('/crm/custom_pool/list.do', {page: 1})
    commit(types.OPEN_TABLE_OPTIONS, Array.from(data.data.records))
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
