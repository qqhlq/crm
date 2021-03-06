export default {
  isStationMailOut: state => state.isStationMailOut,
  menusData: state => state.menusData,
  role: state => state.role,
  navContentUlInOutGetter: state => {
    // 隐藏所有二级菜单
    let navContentUlInOutGetter ={}
    for(var i in state.menusData.data.menus) {
      navContentUlInOutGetter[i] = true
    }
    return navContentUlInOutGetter
  },
  checkCustomsLimitData: state=> state.checkCustomsLimitData,

  stationmailGetBlacklogData: state=> state.stationmailGetBlacklogData,
  stationmailGetRemindData:   state=> state.stationmailGetRemindData,
  stationmailGetListreadData: state=> state.stationmailGetListreadData,
  stationmailDelRemindData:   state=> state.stationmailDelRemindData,
  stationmailReadRemindData:  state=> state.stationmailReadRemindData,
}
