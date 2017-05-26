import * as types from './mutation-types'
import Vue from 'vue'

export default {
  switchStationMail({ commit, state }, payload) {
    commit(types.IS_STATIONMAIL_OUT, {'isStationMailOut': !(state.isStationMailOut)})
  },
  stationMailOut({ commit, state }, payload) {
    commit(types.IS_STATIONMAIL_OUT, {'isStationMailOut': false})
  },
  stationMailIn({ commit, state }, payload) {
    commit(types.IS_STATIONMAIL_OUT, {'isStationMailOut': true})
  },
}
