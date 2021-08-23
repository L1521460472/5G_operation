import request from '../../utils/request'

/**
 *
 * 收支明细分页列表查询
 * @param {*} params
 */
export const getIncomes = (params) => {
  return request({
    url: '/enterprise-operation-service/incomeAndExpenseDetail/pageList',
    method: 'post',
    data: params
  })
}
/**
 * 增加收入
 * @param {*} params
 */
export const addIncome = (params) => {
  return request({
    url: '/enterprise-operation-service/incomeAndExpenseDetail/add',
    method: 'post',
    data: params
  })
}

/**
 * 获取企业信息
 * @param {*} params
 */
export const getEnterPriseInfo = (params) => {
  return request({
    url: '/enterprise-operation-service/enterpriseAccount/findEnterpriseAccountInfoById',
    method: 'get',
    params
  })
}

/**
 * 获取待审核收支列表
 * @param {*} params
 */
export const redayList = (params) => {
  return request({
    url: '/enterprise-operation-service/incomeAndExpenseDetail/pageNotAuditList',
    method: 'post',
    data: params
  })
}

/**
 * 审核
 * @param {*} params
 */
export const checkIncome = (params) => {
  return request({
    url: '/enterprise-operation-service/incomeAndExpenseAudit/audit',
    method: 'post',
    data: params
  })
}
