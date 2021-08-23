import request from '@/utils/request'

/**
 * 获取到账列表
 * @param {*} params
 */
export const arriveList = (params) => {
  return request({
    url: '/enterprise-operation-service/amountArrivalRecord/pageList',
    method: 'post',
    data: params
  })
}

/**
 * 新增到账
 * @param {*} params
 */
export const addArrive = (params) => {
  return request({
    url: '/enterprise-operation-service/amountArrivalRecord/add',
    method: 'post',
    data: params
  })
}

/**
 * 根据公司账号查询公司名称
 * @param {*} params
 */
export const getDetailByAccount = (params) => {
  return request({
    url: '/enterprise-operation-service/enterpriseAccount/listByEnterpriseAccountName',
    method: 'get',
    params
  })
}

/**
 * 对账
 * @param {*} parms
 */
export const check = (params) => {
  return request({
    url: '/enterprise-operation-service/reconciliationRecord/check',
    method: 'post',
    data: params
  })
}

/**
 * 根据关联id获取关联内容
 * @param {*} params
 */
export const getDetailByCode = (params) => {
  return request({
    url: '/enterprise-operation-service/incomeAndExpenseDetail/findByIncomeAndExpenseCode',
    method: 'get',
    params
  })
}
