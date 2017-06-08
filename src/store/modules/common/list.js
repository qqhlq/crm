import * as types from '../../mutation-types'
import Vue from 'vue'

// 公海池页面

let state = {
  choosed: [],
  page: 1,
  totalPage: 1,
  customPoolName: '',
  data: [],
  poolList: {
    list: [],
    value: ''
  },
  search: {
    productName: {
      head: 'productName',
      placeholder: '请输入产品名',
      searchList: [],
      icon: 'search',
      value: ''
    },
    tradeName: {
      head: 'tradeName',
      placeholder: '所在行业',
      searchList: [],
      value: ''
    },
    cityName: {
      head: 'cityName',
      placeholder: '所在城市',
      searchList: [],
      icon: 'search',
      value: '',
      code: ''
    },
    updateTime: {
      head: 'updateTime',
      value: ''
    }
  },

  addNewCustomData: {},
}

let getters = {
  choosed: state => state.choosed,
  page: state => state.page,
  totalPage: state => state.totalPage,
  data: state => state.data,
  poolList: state => state.poolList,
  search: state => state.search,
  addNewCustomData: state => state.addNewCustomData,
  customPoolName: state => state.customPoolName
}

let mutations = {
  // 选择框的选择选项 改变纪录的已选择的选项列表
  [types.COMMON_TABLE_CHOOSED_LIST_CHANGE](state, param) {
    state.choosed = param
  },

  // 更改页数
  [types.COMMON_TABLE_PAGE_CHANGE](state, param) {
    state.page = param
  },

  // 更改下拉输入框的搜索列表
  [types.COMMON_TABLE_SEARCH_LIST](state, param) {
    state.search[param.head] = param
  },

  [types.COMMON_TABLE_GET_POOLLIST](state, param) {
    state.poolList.list = param
    state.poolList.value = param[0]
  },

  [types.COMMON_TABLE_CHANGE_POOLLIST_VALUE](state, param) {
    for(let item of state.poolList.list) {
      if(item.id === Number(param)) {
        state.poolList.value = item
      }
    }
  },
  [types.COMMON_TABLE_CHANGE](state, param) {
    state.data = param.records
    state.page = param.page
    state.totalPage = param.pageCount
    state.customPoolName = param.customPoolName
  },
  [types.COMMON_TABLE_GET_TRADE_LIST](state, param) {
    state.search.tradeName.searchList = param
  },
  [types.CHOOSE_SEARCHLIST_CITYNAME](state, param) {
    for(let i in param.searchList) {
      if(param.searchList[i].text === param.value) {
        param.code = param.searchList[i].id
      }
    }
  },

//
  [types.COMMON_TABLE_ADD_CUSTOM](state, param) {
    state.addNewCustomData = param
  },
  [types.COMMON_TABLE_DELETE_CITYCODE](state) {
    state.search.cityName.code = ''
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
    commit(types.COMMON_TABLE_CHOOSED_LIST_CHANGE, param)
  },

  /**
   * 更改当前页数 刷新表格
   *
   * @param {any} { dispatch, commit }
   * @param {any} param
   */
  async changePage({ dispatch, commit }, param) {
    await commit(types.COMMON_TABLE_PAGE_CHANGE, param)
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
      endDate: '',
      customPoolId: ''
    }
    if(state.search.cityName.value === '') {
      await commit(types.COMMON_TABLE_DELETE_CITYCODE)
    }
    if(state.search.updateTime.value !== '' && state.search.updateTime.value.toString() !== ',') {
      obj.startDate = state.search.updateTime.value[0].toLocaleString().split(' ')[0]
      obj.endDate = state.search.updateTime.value[1].toLocaleString().split(' ')[0]
    }
    obj.name = state.search.productName.value
    obj.tradeId =state.search.tradeName.value
    obj.cityCode = state.search.cityName.code
    obj.page = state.page
    obj.customPoolId = state.poolList.value.id
    let data = await Vue.wGet('/crm/custom/list.do',obj)
    for(let i of data.data.records) {
      i.lastUpdateMemo = i.lastUpdateMemo || '暂无具体跟进纪录'
      i.lastUpdatetime = (Vue.wFormatTime(i.lastUpdatetime))
    }
    commit(types.COMMON_TABLE_CHANGE, data.data)
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
    commit(types.COMMON_TABLE_SEARCH_LIST, _param)
  },

  /**
   * 选中搜索的结果时 刷新表格
   *
   * @param {any} { dispatch, state, commit }
   * @param {any} param
   */
  async chooseSearchList({ dispatch, state, commit }, param) {
    if(param.head === 'cityName') {
      commit(types.CHOOSE_SEARCHLIST_CITYNAME, param)
    }
    dispatch('getList')
  },
  async getPoolList({ dispatch, state, commit }, param) {
    let data = await Vue.wGet('/crm/custom_pool/list.do',{page: 1})
    await commit (types.COMMON_TABLE_GET_POOLLIST, data.data.records)
    dispatch('getList')

  },

  /**
   * 更改公海池分组 的下拉选择
   *
   * @param {any} { dispatch, state, commit }
   * @param {any} param
   */
  async changePoolValue({ dispatch, state, commit }, param) {
    await commit (types.COMMON_TABLE_CHANGE_POOLLIST_VALUE, param)
    dispatch('getList')
  },

  /**
   * 获取行业列表
   *
   * @param {any} { dispatch, state, commit }
   * @param {any} param
   */
  async getTradeList({ dispatch, state, commit }, param) {
    let data = await Vue.wGet('/crm/custom/trade_option.do')
    for(let item of data.data) {
      item.label = item.text
      item.value = item.id
    }
    commit(types.COMMON_TABLE_GET_TRADE_LIST, data.data)
  },


  /**
   * 新建客户
   * @param {Object} payload
   */

  async addNewCustom({ commit }, payload) {
    let _data=  await Vue.wGet('/crm/custom/add.do', payload.param)
    commit(types.COMMON_TABLE_ADD_CUSTOM, {data:_data})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
