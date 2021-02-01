// import axios from 'axios'
import request from '../../utils/request'

// 通道组

// export const getChannelGroupList = (params,headers) => {//通道组分页列表
//     return axios.post('/enterprise-base-service/channelGroup/pageList',
// params,{headers}).then(res => res.data)};

// export const addChannelGroup = (params,headers) => {//新增通道组
//     return axios.post('/enterprise-base-service/channelGroup/add',
// params,{headers}).then(res => res.data)};

// export const editChannelGroup = (params,headers) => {//修改通道组
//     return axios.post('/enterprise-base-service/channelGroup/update',
// params,{headers}).then(res => res.data)};

// export const deleteChannelGroup = (params,headers) => {//删除通道组
//     return axios.post('/enterprise-base-service/channelGroup/delete',
// params,{headers}).then(res => res.data)};

// export const getAddChannel = (params,headers) => {//获取通道组对应通道--新增
//     return axios.post('/enterprise-base-service/channelGroup/channel/addList',
// params,{headers}).then(res => res.data)};

// export const getRemoveChannel = (params,headers) => {//获取通道组对应通道--移除
//     return axios.post('/enterprise-base-service/channelGroup/channel/removeList',
// params,{headers}).then(res => res.data)};

// export const increaseChannel = (params,headers) => {//新增通道组的通道
//     return axios.post('/enterprise-base-service/channelGroup/channel/add',
// params,{headers}).then(res => res.data)};

// export const removeChannel = (params,headers) => {//删除通道组的通道
//     return axios.post('/enterprise-base-service/channelGroup/channel/remove',
// params,{headers}).then(res => res.data)};

export const getChannelGroupList = (params) => {//通道组分页列表
    return request({
      url: '/enterprise-base-service/channelGroup/pageList',
      method: 'post',
      data: params
    })
}

export const addChannelGroup = (params) => {//新增通道组
    return request({
      url: '/enterprise-base-service/channelGroup/add',
      method: 'post',
      data: params
    })
}

export const editChannelGroup = (params) => {//修改通道组
    return request({
      url: '/enterprise-base-service/channelGroup/update',
      method: 'post',
      data: params
    })
}

export const deleteChannelGroup = (params) => {//删除通道组
    return request({
      url: '/enterprise-base-service/channelGroup/delete',
      method: 'post',
      data: params
    })
}

export const getAddChannel = (params) => {//获取通道组对应通道--新增
    return request({
      url: '/enterprise-base-service/channelGroup/channel/addList',
      method: 'post',
      data: params
    })
}

export const getRemoveChannel = (params) => {//获取通道组对应通道--移除
    return request({
      url: '/enterprise-base-service/channelGroup/channel/removeList',
      method: 'post',
      data: params
    })
}

export const increaseChannel = (params) => {//新增通道组的通道
    return request({
      url: '/enterprise-base-service/channelGroup/channel/add',
      method: 'post',
      data: params
    })
}

export const removeChannel = (params) => {//删除通道组的通道
    return request({
      url: '/enterprise-base-service/channelGroup/channel/remove',
      method: 'post',
      data: params
    })
}

// 通道

// export const getProductList = (params,headers) => {//获取产品列表
//     return axios.get('/enterprise-base-service/productTypeConfig/queryList',
// {params:params,headers:headers}).then(res => res.data)};

// export const getChannelList = (params,headers) => {//通道资源分页列表
//     return axios.post('/enterprise-base-service/channel/pageList',
// params,{headers}).then(res => res.data)};

// export const addChannel = (params,headers) => {//新增通道资源
//     return axios.post('/enterprise-base-service/channel/add',
// params,{headers}).then(res => res.data)};

// export const editChannel = (params,headers) => {//修改通道资源
//     return axios.post('/enterprise-base-service/channel/update',
// params,{headers}).then(res => res.data)};

// export const deleteChannel = (params,headers) => {//删除通道资源
//     return axios.post('/enterprise-base-service/channel/delete',
// params,{headers}).then(res => res.data)};

// export const disableChannel = (params,headers) => {//停用通道资源
//     return axios.post('/enterprise-base-service/channel/disable',
// params,{headers}).then(res => res.data)};

// export const enableChannel = (params,headers) => {//启用通道资源
//     return axios.post('/enterprise-base-service/channel/enable',
// params,{headers}).then(res => res.data)};

// export const getProductTypeList = (params,headers) => {//获取产品类型列表
//     return axios.get('/enterprise-base-service/common/querySelectList',
// {params:params,headers:headers}).then(res => res.data)};

// export const getBussinessTypeList = (params,headers) => {//获取所有业务类型列表
//     return axios.get('/enterprise-base-service/common/queryBusinessListByProductType',
// {params:params,headers:headers}).then(res => res.data)};

export const getChannelList = (params) => {//通道资源分页列表
    return request({
      url: '/enterprise-base-service/channel/pageList',
      method: 'post',
      data: params
    })
}

export const addChannel = (params) => {//新增通道资源
    return request({
      url: '/enterprise-base-service/channel/add',
      method: 'post',
      data: params
    })
}

export const editChannel = (params) => {//修改通道资源
    return request({
      url: '/enterprise-base-service/channel/update',
      method: 'post',
      data: params
    })
}

export const deleteChannel = (params) => {//删除通道资源
    return request({
      url: '/enterprise-base-service/channel/delete',
      method: 'post',
      data: params
    })
}

export const disableChannel = (params) => {//停用通道资源
    return request({
      url: '/enterprise-base-service/channel/disable',
      method: 'post',
      data: params
    })
}

export const enableChannel = (params) => {//启用通道资源
    return request({
      url: '/enterprise-base-service/channel/enable',
      method: 'post',
      data: params
    })
}

export const getProductTypeList = (params) => {//获取产品类型列表
    return request({
      url: '/enterprise-base-service/common/querySelectList',
      method: 'get',
      params: params
    })
}

export const getBussinessTypeList = (params) => {//获取所有业务类型列表
    return request({
      url: '/enterprise-base-service/common/queryBusinessListByProductType',
      method: 'get',
      params: params
    })
}

export const uploadFile = (params) => {//上传通道logo
  return request({
    url: '/enterprise-base-service/uploadFile',
    method: 'post',
    data: params,
  })
}
