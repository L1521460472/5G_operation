import request from '../../utils/request'

/**
 * 获取发送记录列表
 * @param {*} params
 */
export const sendBatch = (params) => {
  return request({
    url: '/enterprise-operation-service/sms/messageRecord/all/batchPageList',
    method: 'post',
    data: params
  })
}

/**
 * 消息发送详情查询
 * @param {*} params
 */
export const sendDetailList = (params) => {
  return request({
    url: '/enterprise-operation-service/sms/messageRecord/all/sendPageList',
    method: 'post',
    data: params
  })
}

/**
 * 消息接收记录列表
 * @param {*} params
 */
export const receiveList = (params) => {
  return request({
    url: '/enterprise-operation-service/sms/messageRecord/all/receivePageList',
    method: 'post',
    data: params
  })
}

/**
 * 查看记录
 * @param {*} params
 */
export const recoedDetail = (params) => {
  return request({
    url: '/enterprise-operation-service/sms/messageRecord/all/view',
    method: 'post',
    data: params
  })
}

/**
 * 导出
 * @param {*} params
 */
export const exportExcel = (params) => {
  return request({
    url: '/enterprise-operation-service/sms/messageRecord/all/batchMessageExport',
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}
