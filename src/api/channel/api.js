// import axios from 'axios'
import request from '../../utils/request'

// 通道组


export const getChannelGroupList = (params) => {//通道组分页列表
    return request({
      url: '/enterprise-operation-service/channelGroup/pageList',
      method: 'post',
      data: params
    })
}

export const addChannelGroup = (params) => {//新增通道组
    return request({
      url: '/enterprise-operation-service/channelGroup/add',
      method: 'post',
      data: params
    })
}

export const editChannelGroup = (params) => {//修改通道组
  return request({
    url: '/enterprise-operation-service/channelGroup/update',
    method: 'post',
    data: params
  })
}


export const disableChannelGroup = (params) => {//停用通道组
  return request({
    url: '/enterprise-operation-service/channelGroup/disable',
    method: 'post',
    data: params
  })
}

export const enableChannelGroup = (params) => {//启用通道组
  return request({
    url: '/enterprise-operation-service/channelGroup/enable',
    method: 'post',
    data: params
  })
}

export const getAddChannel = (params) => {//获取通道组对应通道--新增
  return request({
    url: '/enterprise-operation-service/channelGroup/channel/selectAddList',
    method: 'post',
    data: params
  })
}


export const channelList = (params) => {//获取通道列表
  return request({
    url: '/enterprise-operation-service/channelGroup/channel/selectAssignServiceCodeList',
    method: 'post',
    data: params
  })
}

export const chenkChannel = (params) => {//校验企业通道模式是否与通道一致
  return request({
    url: '/enterprise-operation-service/channelGroup/channel/check',
    method: 'post',
    data: params
  })
}

export const increaseChannel = (params) => {//新增通道组的通道
  return request({
    url: '/enterprise-operation-service/channelGroup/channel/add',
    method: 'post',
    data: params
  })
}

export const removeChannel = (params) => {//移除通道组的通道
  return request({
    url: '/enterprise-operation-service/channelGroup/channel/remove',
    method: 'post',
    data: params
  })
}

export const lookRcsChannelDetail = (params) => {//通道组查看rcs通道详情
  return request({
    url: '/enterprise-operation-service/channelGroup/chatbot/getDetailById',
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

export const lookMmsChannelDetail = (params) => {//通道组查看mms通道详情
  return request({
    url: '/enterprise-operation-service/channelGroup/vms/getDetailById',
    method: 'post',
    data: params
  })
}

export const getEnterpriseList = (params) => {//查询所有企业下拉框列表
  return request({
    url: '/enterprise-operation-service/common/selectEnterpriseList',
    method: 'post',
    data: params
  })
}

export const getAppList = (params) => {//查询所有应用
  return request({
    url: '/enterprise-operation-service/common/selectAppList',
    method: 'get',
    params: params
  })
}

export const getEnterpriseAppList = (params) => {//根据id查询企业应用
  return request({
    url: '/enterprise-operation-service/common/selectAppListByEnterpriseId',
    method: 'get',
    params: params
  })
}



// 通道管理

export const getChannelList = (params) => {//通道资源分页列表
  return request({
    url: '/enterprise-operation-service/channel/pageList',
    method: 'post',
    data: params
  })
}

export const getRcsChannelList = (params) => {//Rcs消息通道分页列表
  return request({
    url: '/enterprise-operation-service/channel/chatbot/pageList',
    method: 'post',
    data: params
  })
}

export const getRcsChannelDetail = (params) => {//Rcs消息通道详情
  return request({
    url: '/enterprise-operation-service/channel/chatbot/getDetailById',
    method: 'post',
    data: params
  })
}


export const getSmsChannelList = (params) => {//sms消息通道分页列表
  return request({
    url: '/enterprise-operation-service/channel/sms/pageList',
    method: 'post',
    data: params
  })
}

export const getSmsChannelDetail = (params) => {//sms消息通道详情
  return request({
    url: '/enterprise-operation-service/channel/sms/getDetailById',
    method: 'post',
    data: params
  })
}

export const getVmsChannelList = (params) => {//vms消息通道分页列表
  return request({
    url: '/enterprise-operation-service/channel/vms/pageList',
    method: 'post',
    data: params
  })
}

export const getVmsChannelDetail = (params) => {//vms消息通道详情
  return request({
    url: '/enterprise-operation-service/channel/vms/getDetailById',
    method: 'post',
    data: params
  })
}


export const addChannel = (params) => {//新增Chatbot
    return request({
      url: '/enterprise-operation-service/channel/add',
      method: 'post',
      data: params
    })
}

export const editChannel = (params) => {//修改通道资源
    return request({
      url: '/enterprise-operation-service/channel/update',
      method: 'post',
      data: params
    })
}

export const deleteChannel = (params) => {//删除通道资源
  return request({
    url: '/enterprise-operation-service/channel/delete',
    method: 'post',
    data: params
  })
}

export const logoutChannel = (params) => {//注销
  return request({
    url: '/enterprise-operation-service/channel/cancel',
    method: 'post',
    data: params
  })
}

export const putAwayChannel = (params) => {//上架
  return request({
    url: '/enterprise-operation-service/channel/putAway',
    method: 'post',
    data: params
  })
}


export const disableChannel = (params) => {//停用通道资源
    return request({
      url: '/enterprise-operation-service/channel/disable',
      method: 'post',
      data: params
    })
}

export const enableChannel = (params) => {//启用通道资源
  return request({
    url: '/enterprise-operation-service/channel/enable',
    method: 'post',
    data: params
  })
}

export const copyChannel = (params) => {//通道复制
  return request({
    url: '/enterprise-operation-service/channel/copy',
    method: 'post',
    data: params
  })
}

export const getProductTypeList = (params) => {//获取产品类型列表
    return request({
      url: '/enterprise-operation-service/common/querySelectList',
      method: 'get',
      params: params
    })
}

export const getBussinessTypeList = (params) => {//获取所有业务类型列表
    return request({
      url: '/enterprise-operation-service/common/queryBusinessListByProductType',
      method: 'get',
      params: params
    })
}

export const uploadFile = (params) => {//上传通道logo
  return request({
    url: '/enterprise-operation-service/uploadFile/database',
    method: 'post',
    data: params,
  })
}

export const getServiceCodeList = (params) => {//查询服务代码
  return request({
    url: '/enterprise-operation-service/channel/selectServiceCodeList',
    method: 'get',
    params: params
  })
}

export const getCustomerList = (params) => {//查询客户名称列表
  return request({
    url: '/enterprise-operation-service/channel/selectCustomerList',
    method: 'get',
    params: params
  })
}

export const getAgentList = (params) => {//查询代理商列表
  return request({
    url: '/enterprise-operation-service/channel/selectAgentList',
    method: 'get',
    params: params
  })
}

export const getCspList = (params) => {//查询csp列表
  return request({
    url: '/enterprise-operation-service/channel/selectCspList',
    method: 'get',
    params: params
  })
}

export const getSupplierList = (params) => {//查询供应商列表
  return request({
    url: '/enterprise-operation-service/common/querySupplierList',
    method: 'get',
    params: params
  })
}




// 签名管理

export const getSignChannelList = (params) => {//添加报备通道列表
  return request({
    url: '/enterprise-operation-service/signConfig/addReportChannelPageList',
    method: 'post',
    data: params,
  })
}

export const channelReport = (params) => {//通道报备确认
  return request({
    url: '/enterprise-operation-service/signConfig/report',
    method: 'post',
    data: params,
  })
}

export const getSignPageList = (params) => {//获取签名管理页面列表
  return request({
    url: '/enterprise-operation-service/signConfig/pageList',
    method: 'post',
    data: params,
  })
}

export const addSign = (params) => {//新增签名
  return request({
    url: '/enterprise-operation-service/signConfig/add',
    method: 'post',
    data: params,
  })
}

export const checkSign = (params) => {//审核签名
  return request({
    url: '/enterprise-operation-service/signConfig/check',
    method: 'post',
    data: params,
  })
}

export const deleteSign = (params) => {//删除签名
  return request({
    url: '/enterprise-operation-service/signConfig/delete',
    method: 'post',
    data: params,
  })
}



