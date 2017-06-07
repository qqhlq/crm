import * as types from '../../mutation-types'
import Vue from 'vue'

// 私人池页面

let state = {
  choosed: [],
  data: [],
  th: {
    productName: {
      head: 'name',
      placeholder: '请输入产品名',
      show: false,
      searchList: [null],
      value: '',
      key: ''
    },
    ownerName: {
      head: 'ownerName',
      placeholder: '请输入客户所有人',
      show: false,
      searchList: [null],
      value: '',
      key: ''
    },
    levelName: {
      head: 'levelName',
      placeholder: '请输入客户级别',
      show: false,
      searchList: [null],
      value: '',
      key: ''
    },
    ownerTime: {
      head: 'ownerTime',
      placeholder: '请输入认领时间',
      show: false,
      searchList: [null],
      value: '',
      key: ''
    },
    restTime: {
      head: 'restTime',
      placeholder: '请输入剩余时间',
      show: false,
      searchList: [null],
      value: '',
      key: ''
    }
  }
}

let getters = {
  choosed: state => state.choosed,
  data: state => state.data,
  th: state => state.th
}

let mutations = {

  /**
   *私人池 表头附加項显示切换
   *
   * @param {any} state
   * @param {any} param
   */
  [types.PRIVATE_TABLE_HEAD_STATE](state, param) {
    for (let item in state.th) {
      if (param === item) {
        state.th[item].show = !state.th[item].show
      } else {
        state.th[item].show = false
      }
    }
  }
}

let actions = {

  /**
   * 改变表格头部显示状态
   *
   * @param {Object} { commit }
   * @param {String} param
   */
  async changeThState({ commit }, param) {
    commit(types.PRIVATE_TABLE_HEAD_STATE, param)

    if (param === 'date') {
      setTimeout(() => {
        let ele = document.getElementsByClassName('el-date-editor')[0].getElementsByTagName('input')[0]
        if (state.tableHead.date.show === true) {
          ele.focus()
        }
      }, 0)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

