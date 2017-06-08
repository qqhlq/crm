import * as types from '../../mutation-types'
import Vue from 'vue'

// 私人池页面

let state = {
  choosed: [],
  page: 1,
  totalPage: 1,
  data: [],
  search: {
    productName: {
      head: 'productName',
      placeholder: '请输入产品名',
      searchList: [],
      icon: 'search',
      value: ''
    },
    ownerName: {
      head: 'ownerName',
      placeholder: '请输入客户所有人',
      searchList: [],
      icon: 'search',
      value: ''
    },
    levelName: {
      head: 'levelName',
      placeholder: '请输入客户级别',
      searchList: [
        {
          value: 1,
          label: 'A(重点客户)'
        },
        {
          value: 2,
          label: 'B(普通客户)'
        },
        {
          value: 3,
          label: 'C(非重点客户)'
        }
      ],
      value: ''
    },
    ownerTime: {
      head: 'ownerTime',
      value: ''
    },
    restTime: {
      head: 'restTime',
      placeholder: '请输入剩余时间',
      searchList: [
        {
          value:1,
          label: '0-3天'
        },
        {
          value:2,
          label: '3-10天'
        },
        {
          value:3,
          label: '10-30天'
        },
        {
          value:4,
          label: '30-45天'
        }
      ],
      icon: 'caret-bottom',
      value: ''
    }
  }
}

let getters = {
  choosed: state => state.choosed,
  page: state => state.page,
  totalPage: state => state.totalPage,
  data: state => state.data,
  search: state => state.search
}

let mutations = {

  // 选择框的选择选项 改变纪录的已选择的选项列表
  [types.PRIVATE_TABLE_CHOOSED_LIST_CHANGE](state, param) {
    state.choosed = param
  },

  // 更改页数
  [types.PRIVATE_TABLE_PAGE_CHANGE](state, param) {
    state.page = param
  },

  // 更改下拉输入框的搜索列表
  [types.PRIVATE_TABLE_SEARCH_LIST](state, param) {
    state.search[param.head] = param
  },
  [types.PRIVATE_TABLE_CHANG](state, param) {
    state.data = param.records
    state.page = param.page
    state.totalPage = param.pageCount
  }
}

let actions = {

  /**
   * 更改表格右侧的选择状态
   *
   * @param {any} { commit }
   * @param {any} param
   */
  async changeChoosed({ commit }, param) {
    commit(types.PRIVATE_TABLE_CHOOSED_LIST_CHANGE, param)
  },

  /**
   * 更改当前页数 刷新表格
   *
   * @param {any} { dispatch, commit }
   * @param {any} param
   */
  async changePage({ dispatch, commit }, param) {
    await commit(types.PRIVATE_TABLE_PAGE_CHANGE, param)
    dispatch('getList')
  },

  /**
   * 汇总赛选条件 获取表格数据
   *
   * @param {any} { state, commit }
   */
  async getList({ state, commit }) {
    let obj = {
      startDate: '',
      endDate: ''
    }
    if(state.search.ownerTime.value !== '' && state.search.ownerTime.value.toString() !== ',') {
      obj.startDate = state.search.ownerTime.value[0].toLocaleString().split(' ')[0]
      obj.endDate = state.search.ownerTime.value[1].toLocaleString().split(' ')[0]
    }
    obj.name = state.search.productName.value
    obj.ownerName = state.search.ownerName.value
    obj.resttimeId =state.search.restTime.value
    obj.levelName = state.search.levelName.value
    obj.page = state.page
    let data = await Vue.wGet('/crm/custom/self_list.do',obj)
    for(let i of data.data.records) {
      i.ownertime = (Vue.wFormatTime(i.ownertime))
      i.lastUpdatetime = (Vue.wFormatTime(i.lastUpdatetime))
    }
    commit(types.PRIVATE_TABLE_CHANG, data.data)

  },

  /**
   * 改变 搜索 自动完成的列表
   *
   * @param {any} { state, commit }
   * @param {any} param
   */
  async getSearchList({ state, commit }, param) {
    let obj = {
      name: param.value,
      public: false
    }
    let url
    switch (param.head) {
      case 'productName':
        url = '/crm/custom/custom_name_option.do'
        break
      case 'ownerName':
        url = '/crm/custom/onwer_option.do'
        break
      case 'tradeName':
        url = ' /crm/custom/trade_option.do'
        break
      case 'cityName':
        url = '/crm/custom/city_option.do'
        break
      default:
        break
    }
    let data = await Vue.wGet(url, obj)
    let _param = param
    _param.searchList = data.data
    for(let item of _param.searchList) {
      item.value = item.text
    }
    commit(types.PRIVATE_TABLE_SEARCH_LIST, _param)
  },

  /**
   * 选中搜索的结果时 刷新表格
   *
   * @param {any} { dispatch, state, commit }
   * @param {any} param
   */
  async chooseSearchList({ dispatch, state, commit }, param) {
    dispatch('getList')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

