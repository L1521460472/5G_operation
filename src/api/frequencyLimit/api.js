import request from '../../utils/request'

export const addLimit = (params) => {
  return request({
    url: '/enterprise-operation-service/frequencyLimit/add',
    method: 'post',
    data: params
  })
}

export const limitDetail = () => {
  return request({
    url: '/enterprise-operation-service/frequencyLimit/detail',
    method: 'get'
  })
}

export const updateLimit = (params) => {
  return request({
    url: '/enterprise-operation-service/frequencyLimit/update',
    method: 'post',
    data: params
  })
}
