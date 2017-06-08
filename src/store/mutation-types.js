/**
 * types 命名规范
 * 1. 模块的 type 以模块名开头
 * 2. 使用常量定义。变量名全部大写
 */
// 公共部分
export const HEADER_MEANSDATA = 'HEADER_MEANSDATA'

// 公有池
export const COMMON_TABLE_CHOOSED_LIST_CHANGE = 'common/COMMON_TABLE_CHOOSED_LIST_CHANGE'
export const COMMON_TABLE_PAGE_CHANGE = 'common/COMMON_TABLE_PAGE_CHANGE'
export const COMMON_TABLE_SEARCH_LIST = 'common/COMMON_TABLE_SEARCH_LIST'
export const COMMON_TABLE_SEARCH_LIST_CHOOSE = 'common/COMMON_TABLE_SEARCH_LIST_CHOOSE'
export const COMMON_TABLE_GET_POOLLIST = 'common/COMMON_TABLE_GET_POOLLIST'
export const COMMON_TABLE_CHANGE_POOLLIST_VALUE = 'common/COMMON_TABLE_CHANGE_POOLLIST_VALUE'
export const COMMON_TABLE_CHANGE = 'common/COMMON_TABLE_CHANGE'
export const COMMON_TABLE_GET_TRADE_LIST = 'common/COMMON_TABLE_GET_TRADE_LIST'
export const COMMON_TABLE_ADD_CUSTOM = 'common/COMMON_TABLE_ADD_CUSTOM'
export const CHOOSE_SEARCHLIST_CITYNAME = 'common/CHOOSE_SEARCHLIST_CITYNAME'



// 私人池
export const PRIVATE_TABLE_CHOOSED_LIST_CHANGE = 'private/PRIVATE_TABLE_CHOOSED_LIST_CHANGE'
export const PRIVATE_TABLE_PAGE_CHANGE = 'private/PRIVATE_TABLE_PAGE_CHANGE'
export const PRIVATE_TABLE_SEARCH_LIST = 'private/PRIVATE_TABLE_SEARCH_LIST'
export const PRIVATE_TABLE_SEARCH_LIST_CHOOSE = 'private/PRIVATE_TABLE_SEARCH_LIST_CHOOSE'
export const PRIVATE_TABLE_CHANG = 'private/PRIVATE_TABLE_CHANG'

// 站内信
export const STATIONMAIL_IS_OUT = 'STATIONMAIL_IS_OUT' //打开站内信

// 属性下拉框
export const GROUP_COMPLEXDROP_ALLVETUSERS_PREP    = 'GROUP_COMPLEXDROP_ALLVETUSERS_PREP' //获取完整部门人员
export const GROUP_COMPLEXDROP_NOPOLLANDGROUP_PREP = 'GROUP_COMPLEXDROP_NOPOLLANDGROUP_PREP' //获取本组成员以及公海池以外的人员
export const GROUP_COMPLEXDROP_GROUPMEMBERS_PREP   = 'GROUP_COMPLEXDROP_GROUPMEMBERS_PREP' //获取本组成员


// 客户详情
export const VIEWS_CUSTOMERDETAIL_GET_CUSTOMERDETAIL    = 'VIEWS_CUSTOMERDETAIL_GET_CUSTOMERDETAIL' //获取客户详情信息
export const VIEWS_CUSTOMERDETAIL_GET_DYNAMICOPTIONS    = 'VIEWS_CUSTOMERDETAIL_GET_DYNAMICOPTIONS' //获取客户所有动态类型
export const VIEWS_CUSTOMERDETAIL_DEL_CUSTOM            = 'VIEWS_CUSTOMERDETAIL_DEL_CUSTOM' //删除客户
export const VIEWS_CUSTOMERDETAIL_ALLOT_CUSTOM          = 'VIEWS_CUSTOMERDETAIL_ALLOT_CUSTOM' //分配客户
export const VIEWS_CUSTOMERDETAIL_RELEASE_FOLLOWDYNAMIC = 'VIEWS_CUSTOMERDETAIL_RELEASE_FOLLOWDYNAMIC' //发布动态
export const VIEWS_CUSTOMERDETAIL_GET_DYNAMICLIST       = 'VIEWS_CUSTOMERDETAIL_GET_DYNAMICLIST' //获取客户动态列表
export const VIEWS_CUSTOMERDETAIL_GET_UPDATECUSTOML     = 'VIEWS_CUSTOMERDETAIL_GET_UPDATECUSTOML' //修改客户

export const VIEWS_CUSTOMERDETAIL_TRANSFER_CUSTOM   = 'VIEWS_CUSTOMERDETAIL_TRANSFER_CUSTOM' //转移客户
export const VIEWS_CUSTOMERDETAIL_GET_CUSTOM        = 'VIEWS_CUSTOMERDETAIL_GET_CUSTOM' //领取客户
export const VIEWS_CUSTOMERDETAIL_RETURN_CUSTOM     = 'VIEWS_CUSTOMERDETAIL_RETURN_CUSTOM' //退回客户

// 分组管理
export const VIEWS_CRMGROUP_GET_GROUPLIST    = 'VIEWS_CRMGROUP_GET_GROUPLIST' //获取分组列表
export const VIEWS_CRMGROUP_GET_GROUPADMINS  = 'VIEWS_CRMGROUP_GET_GROUPADMINS' //获取当前组管理员
export const VIEWS_CRMGROUP_GET_GROUPMEMBERS = 'VIEWS_CRMGROUP_GET_GROUPMEMBERS' //获取当前组成员
export const VIEWS_CRMGROUP_ADD_NEWGROUP     = 'VIEWS_CRMGROUP_ADD_NEWGROUP' //新建分组
export const VIEWS_CRMGROUP_CHANGE_ADMINS    = 'VIEWS_CRMGROUP_CHANGE_ADMINS' //修改分组管理员
export const VIEWS_CRMGROUP_CHANGE_MEMBERS   = 'VIEWS_CRMGROUP_CHANGE_MEMBERS' //修改分组成员
export const VIEWS_CRMGROUP_CHANGE_NAME      = 'VIEWS_CRMGROUP_CHANGE_NAME' //修改分组名
export const VIEWS_CRMGROUP_DEL_GROUP        = 'VIEWS_CRMGROUP_DEL_GROUP' //删除分组


// 新建客户（编辑客户）
export const GROUP_NEWCUSTOM_GET_TRADEOPTIONS       = 'GROUP_NEWCUSTOM_GET_TRADEOPTIONS' // 获取行业
export const GROUP_NEWCUSTOM_GET_PRODUCTLINEOPTIONS = 'GROUP_NEWCUSTOM_GET_PRODUCTLINEOPTIONS'  // 获取产品线
export const GROUP_NEWCUSTOM_GET_PROVINCEOPTIONS    = 'GROUP_NEWCUSTOM_GET_PROVINCEOPTIONS'  // 获取省份
export const GROUP_NEWCUSTOM_GET_CITYSOPTIONS       = 'GROUP_NEWCUSTOM_GET_CITYSOPTIONS' // 根据省份ID获取城市
