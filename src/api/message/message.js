import request from '../../utils/request'

// 获取发送记录列表
export const sendBatch = (params) => {
  return request({
    url: '/enterprise-base-service/messageRecord/all/batchPageList',
    method: 'post',
    data: params
  })
}

// 获取发送记录详情
export const sendDetailList = (params) => {
  return request({
    url: '/enterprise-base-service/messageRecord/all/sendPageList',
    method: 'post',
    data: params
  })
}

// 消息接收记录列表
export const receiveList = (params) => {
  return request({
    url: '/enterprise-base-service/messageRecord/all/receivePageList',
    method: 'post',
    data: params
  })
}


export const recoedDetail = (params) => {
  return request({
    url: '/enterprise-base-service/messageRecord/all/view',
    method: 'post',
    data: params
  })
}

// 导出
export const exportExcel = (params) => {
  return request({
    url: '/enterprise-base-service/messageRecord/all/batchMessageExport',
    method: 'post',
    data: params
  })
}
