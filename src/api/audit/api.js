// import axios from 'axios'
import request from '../../utils/request'


// 企业审核

export const enterpriseAuditList = (params) => {//企业审核列表
    return request({
      url: '/enterprise-operation-service/authentication/enterpriseAuthentication/pageList',
      method: 'post',
      data: params
    })
}

export const enterpriseAudit = (params) => {//企业审核
    return request({
      url: '/enterprise-operation-service/authentication/checkEnterpriseAuthentication',
      method: 'post',
      data: params
    })
}


// 模板审核

export const templeteAuditList = (params) => {//模板审核列表
    return request({
      url: '/enterprise-operation-service/authentication/mouldAuthentication/pageList',
      method: 'post',
      data: params
    })
}
export const templeteAudit = (params) => {//模板审核
    return request({
      url: '/enterprise-operation-service/authentication/checkMouldAuthentication',
      method: 'post',
      data: params
    })
}
export const businessTypeList = (params) => {//获取所有业务类型列表
    return request({
      url: '/enterprise-operation-service/dictionaryType/listDictByCode',
      method: 'get',
      params: params
    })
}
export const getProductTypeList = (params) => {//获取产品类型列表
  return request({
    url: '/enterprise-operation-service/common/querySelectList',
    method: 'get',
    params: params
  })
}


// 插件审核
export const getPluginList = (params) => {//获取插件分页
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/pageList',
    method: 'post',
    data: params
  })
}

export const pluginDetail = (params) => {//插件详情
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/getPlugDetail',
    method: 'post',
    data: params
  })
}

export const auditPlugin = (params) => {//插件通过/不通过
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/agreeOrDisAgree',
    method: 'post',
    data: params
  })
}


export const addPulgin = (params) => {//插件开通
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/openPlug',
    method: 'post',
    data: params
  })
}

export const stopPulgin = (params) => {//插件停用
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/stop',
    method: 'post',
    data: params
  })
}

export const getCustomerList = (params) => {//查询客户列表
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/selectEnterpriseList',
    method: 'post',
    data: params
  })
}

export const getCustomerDetail = (params) => {//根据客户id查询客户信息
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/getPlugEnterpriseDetail',
    method: 'post',
    data: params
  })
}

export const getAgentList = (params) => {//查询代理商列表
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/selectAgentList',
    method: 'post',
    data: params
  })
}

export const uploadFile = (params) => {//上传文件
  return request({
    url: '/enterprise-operation-service/uploadFile/database',
    method: 'post',
    data: params,
  })
}

export const getServiceCodeList = (params) => {//查询服务代码列表
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/selectServiceCodeList',
    method: 'post',
    data: params
  })
}

export const distributeServiceCode = (params) => {//分配服务代码
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/assignServiceCode',
    method: 'post',
    data: params
  })
}

export const recycleServiceCode = (params) => {//回收服务代码
  return request({
    url: '/enterprise-operation-service/plugConfigAuthentication/takeBackServiceCode',
    method: 'post',
    data: params
  })
}










