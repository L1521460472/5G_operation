// import axios from 'axios'
import request from '../../utils/request'


// 企业账户


export const enterpriseAccountList = (params) => {//企业账户列表
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/pageList',
      method: 'post',
      data: params
    })
}

export const addEnterpriseAccount = (params) => {//新增企业账户
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/add',
      method: 'post',
      data: params
    })
}

export const editEnterpriseAccount = (params) => {//编辑企业账户
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/update',
      method: 'post',
      data: params
    })
}

export const deleteEnterpriseAccount = (params) => {//删除企业账户
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/deleteByIds',
      method: 'post',
      data: params
    })
}

export const disableEnterpriseAccount = (params) => {//停用企业账户
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/disable',
      method: 'post',
      data: params
    })
}

export const enableEnterpriseAccount = (params) => {//启用企业账户
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/enable',
      method: 'post',
      data: params
    })
}

export const unlockEnterpriseAccount = (params) => {//解锁企业账户
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/unlock',
      method: 'post',
      data: params
    })
}

export const configEnterpriseAccount = (params) => {//变更企业账户配置
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/config/update',
      method: 'post',
      data: params
    })
}

export const enterpriseAccountDetail = (params) => {//获取对应企业账户信息
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/getDetail',
      method: 'post',
      data: params
    })
}

export const resetPassword = (params) => {//重置密码
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/password/reset',
      method: 'post',
      data: params
    })
}

export const getIndustryTypeList = (params) => {//获取行业类型列表
    return request({
      url: '/enterprise-operation-service/dictionaryType/listDictByTypeCodeList',
      method: 'post',
      data: params
    })
}

export const getBelongInfo = (params) => {//获取所属销售及关联部门
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/getOperateAccountDeptInfo',
      method: 'get',
      params: params
    })
}

export const testTransferBusiness = (params) => {//测试转商用
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/testTransferBusiness',
      method: 'post',
      data: params
    })
}

export const testDelay = (params) => {//测试延期
    return request({
      url: '/enterprise-operation-service/enterpriseAccount/testDelay',
      method: 'post',
      data: params
    })
}

export const saveCustomList = (params) => {//保存自定义列表
    return request({
      url: '/enterprise-operation-service/common/customList/save',
      method: 'post',
      data: params
    })
}

export const getCustomList = (params) => {//获取自定义列表
    return request({
      url: '/enterprise-operation-service/common/customList/getByMouldCode',
      method: 'get',
      params: params
    })
}

// 协议账户

export const protocolAccountList = (params) => {//协议账户列表
  return request({
    url: '/enterprise-operation-service/protocolAccount/pageList',
    method: 'post',
    data: params
  })
}

export const addProtocolAccount = (params) => {//协议账户新增
  return request({
    url: '/enterprise-operation-service/protocolAccount/add',
    method: 'post',
    data: params
  })
}

export const editProtocolAccount = (params) => {//协议账户修改
  return request({
    url: '/enterprise-operation-service/protocolAccount/update',
    method: 'post',
    data: params
  })
}

export const updateProtocolAccountStatus = (params) => {//协议账户停用启用
  return request({
    url: '/enterprise-operation-service/protocolAccount/status/update',
    method: 'post',
    data: params
  })
}

export const getEnterpriseList = (params) => {//获取所属企业列表
  return request({
    url: '/enterprise-operation-service/common/selectEnterpriseList',
    method: 'post',
    data: params
  })
}

export const getBussinessTypeList = (params) => {//获取所有业务类型列表
  return request({
    url: '/enterprise-operation-service/common/queryBusinessListByProductType',
    method: 'get',
    params: params
  })
}

export const getChannelGroup = (params) => {//根据企业查询通道组
  return request({
    url: '/enterprise-operation-service/common/queryChannelGroupList',
    method: 'get',
    params: params
  })
}

export const getAccessNumber = (params) => {//根据通道组id查询接入号
  return request({
    url: '/enterprise-operation-service/protocolAccount/getAccessNumber',
    method: 'get',
    params: params
  })
}

export const getChannelList = (params) => {//获取协议账号通道信息
  return request({
    url: '/enterprise-operation-service/protocolAccount/selectChannelList',
    method: 'post',
    data: params
  })
}

export const updatePrice = (params) => {//更新单价
  return request({
    url: '/enterprise-operation-service/protocolAccount/price/update',
    method: 'post',
    data: params
  })
}

export const lookSmsChannelDetail = (params) => {//通道组查看sms通道详情
  return request({
    url: '/enterprise-operation-service/channelGroup/sms/getDetailById',
    method: 'post',
    data: params
  })
}


// 企业应用

export const getAppList = (params) => {//获取企业应用管理列表
    return request({
      url: '/enterprise-operation-service/enterpriseAccountApp/selectAppManageList',
      method: 'post',
      data: params
    })
}

export const getAppSettigDetail = (params) => {//获取应用配置详情
    return request({
      url: '/enterprise-operation-service/enterpriseAccountApp/getDetail',
      method: 'post',
      data: params
    })
}

export const changeaAppSettig = (params) => {//变更应用配置
    return request({
      url: '/enterprise-operation-service/enterpriseAccountApp/config/update',
      method: 'post',
      data: params
    })
}

export const selectAppList = (params) => { // 获取应用下拉列表
  return request({
    url: '/enterprise-operation-service/enterpriseAccountApp/selectAppList',
    method: 'post',
    data: params
  })
}
