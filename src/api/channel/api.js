import axios from 'axios'

// 通道组

export const getChannelGroupList = (params,headers) => {//通道组分页列表
    return axios.post('/enterprise-base-service/channelGroup/pageList',
params,{headers}).then(res => res.data)};

export const addChannelGroup = (params,headers) => {//新增通道组
    return axios.post('/enterprise-base-service/channelGroup/add',
params,{headers}).then(res => res.data)};

export const editChannelGroup = (params,headers) => {//修改通道组
    return axios.post('/enterprise-base-service/channelGroup/update',
params,{headers}).then(res => res.data)};

export const deleteChannelGroup = (params,headers) => {//删除通道组
    return axios.post('/enterprise-base-service/channelGroup/delete',
params,{headers}).then(res => res.data)};

export const getAddChannel = (params,headers) => {//获取通道组对应通道--新增
    return axios.post('/enterprise-base-service/channelGroup/channel/addList',
params,{headers}).then(res => res.data)};

export const getRemoveChannel = (params,headers) => {//获取通道组对应通道--移除
    return axios.post('/enterprise-base-service/channelGroup/channel/removeList',
params,{headers}).then(res => res.data)};

export const increaseChannel = (params,headers) => {//新增通道组的通道
    return axios.post('/enterprise-base-service/channelGroup/channel/add',
params,{headers}).then(res => res.data)};

export const removeChannel = (params,headers) => {//新增通道组的通道
    return axios.post('/enterprise-base-service/channelGroup/channel/remove',
params,{headers}).then(res => res.data)};


// 通道

// export const getProductList = (params,headers) => {//获取产品列表
//     return axios.get('/enterprise-base-service/productTypeConfig/queryList',
// {params:params,headers:headers}).then(res => res.data)};

export const getChannelList = (params,headers) => {//通道资源分页列表
    return axios.post('/enterprise-base-service/channel/pageList',
params,{headers}).then(res => res.data)};

export const addChannel = (params,headers) => {//新增通道资源
    return axios.post('/enterprise-base-service/channel/add',
params,{headers}).then(res => res.data)};

export const editChannel = (params,headers) => {//修改通道资源
    return axios.post('/enterprise-base-service/channel/update',
params,{headers}).then(res => res.data)};

export const deleteChannel = (params,headers) => {//删除通道资源
    return axios.post('/enterprise-base-service/channel/delete',
params,{headers}).then(res => res.data)};

export const disableChannel = (params,headers) => {//停用通道资源
    return axios.post('/enterprise-base-service/channel/disable',
params,{headers}).then(res => res.data)};

export const enableChannel = (params,headers) => {//启用通道资源
    return axios.post('/enterprise-base-service/channel/enable',
params,{headers}).then(res => res.data)};

export const getProductTypeList = (params,headers) => {//获取产品类型列表
    return axios.get('/enterprise-base-service/common/querySelectList',
{params:params,headers:headers}).then(res => res.data)};

export const getBussinessTypeList = (params,headers) => {//获取所有业务类型列表
    return axios.get('/enterprise-base-service/common/queryBusinessListByProductType',
{params:params,headers:headers}).then(res => res.data)};



