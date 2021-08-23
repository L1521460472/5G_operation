import request from '../../utils/request'


// 账号-基本信息

export const getAccountBaseInfo = (params) => {//账号信息
    return request({
      url: '/enterprise-operation-service/operationAccount/getDetail',
      method: 'get',
      params: params
    })
}


// 账号-密码设置

export const changePassword = (params) => {//修改密码
    return request({
      url: '/enterprise-operation-service/operationAccount/password/reset',
      method: 'post',
      data: params
    })
}


// 账号-操作日志

export const getOperationLog = (params) => {//查询操作日志
    return request({
      url: '/enterprise-operation-service/operateHistory/pageList',
      method: 'post',
      data: params
    })
}



