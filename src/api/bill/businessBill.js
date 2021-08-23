import request from '@/utils/request'

export const billList = (params) => {
  return request({
    url: '/enterprise-operation-service/enterpriseAccountBill/pageList',
    method: 'post',
    data: params
  })
}
