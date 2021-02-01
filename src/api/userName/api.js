// import axios from 'axios'
import request from '../../utils/request'


// 企业账户

// export const enterpriseAccountList = (params,headers) => {//企业账户列表
//     return axios.post('/enterprise-base-service/enterpriseAccount/pageList',
// params,{headers}).then(res => res.data)};

// export const addEnterpriseAccount = (params,headers) => {//新增企业账户
//     return axios.post('/enterprise-base-service/enterpriseAccount/add',
// params,{headers}).then(res => res.data)};

// export const editEnterpriseAccount = (params,headers) => {//编辑企业账户
//     return axios.post('/enterprise-base-service/enterpriseAccount/update',
// params,{headers}).then(res => res.data)};

// export const deleteEnterpriseAccount = (params,headers) => {//删除企业账户
//     return axios.post('/enterprise-base-service/enterpriseAccount/deleteByIds',
// params,{headers}).then(res => res.data)};

// export const disableEnterpriseAccount = (params,headers) => {//停用企业账户
//     return axios.post('/enterprise-base-service/enterpriseAccount/disable',
// params,{headers}).then(res => res.data)};

// export const enableEnterpriseAccount = (params,headers) => {//启用企业账户
//     return axios.post('/enterprise-base-service/enterpriseAccount/enable',
// params,{headers}).then(res => res.data)};

// export const unlockEnterpriseAccount = (params,headers) => {//解锁企业账户
//     return axios.post('/enterprise-base-service/enterpriseAccount/unlock',
// params,{headers}).then(res => res.data)};

// export const configEnterpriseAccount = (params,headers) => {//变更企业账户配置
//     return axios.post('/enterprise-base-service/enterpriseAccount/config/update',
// params,{headers}).then(res => res.data)};

// export const enterpriseAccountDetail = (params,headers) => {//获取对应企业账户信息
//     return axios.post('/enterprise-base-service/enterpriseAccount/getDetail',
// params,{headers}).then(res => res.data)};

// export const resetPassword = (params,headers) => {//重置密码
//     return axios.post('/enterprise-base-service/enterpriseAccount/password/reset',
// params,{headers}).then(res => res.data)};

// export const getIndustryTypeList = (params,headers) => {//获取行业类型列表
//     return axios.post('/enterprise-base-service/dictionaryType/listDictByTypeCodeList',
// params,{headers}).then(res => res.data)};

// export const getBelongInfo = (params,headers) => {//获取所属销售及关联部门
//     return axios.get('/enterprise-base-service/enterpriseAccount/getOperateAccountDeptInfo',
// {params:params,headers:headers}).then(res => res.data)};

// export const testTransferBusiness = (params,headers) => {//测试转商用
//     return axios.post('/enterprise-base-service/enterpriseAccount/testTransferBusiness',
// params,{headers}).then(res => res.data)};

// export const testDelay = (params,headers) => {//测试延期
//     return axios.post('/enterprise-base-service/enterpriseAccount/testDelay',
// params,{headers}).then(res => res.data)};

// export const saveCustomList = (params,headers) => {//保存自定义列表
//     return axios.post('/enterprise-base-service/common/customList/save',
// params,{headers}).then(res => res.data)};

// export const getCustomList = (params,headers) => {//获取自定义列表
//     return axios.get('/enterprise-base-service/common/customList/getByMouldCode',
// {params:params,headers:headers}).then(res => res.data)};

export const enterpriseAccountList = (params) => {//企业账户列表
    return request({
      url: '/enterprise-base-service/enterpriseAccount/pageList',
      method: 'post',
      data: params
    })
}

export const addEnterpriseAccount = (params) => {//新增企业账户
    return request({
      url: '/enterprise-base-service/enterpriseAccount/add',
      method: 'post',
      data: params
    })
}

export const editEnterpriseAccount = (params) => {//编辑企业账户
    return request({
      url: '/enterprise-base-service/enterpriseAccount/update',
      method: 'post',
      data: params
    })
}

export const deleteEnterpriseAccount = (params) => {//删除企业账户
    return request({
      url: '/enterprise-base-service/enterpriseAccount/deleteByIds',
      method: 'post',
      data: params
    })
}

export const disableEnterpriseAccount = (params) => {//停用企业账户
    return request({
      url: '/enterprise-base-service/enterpriseAccount/disable',
      method: 'post',
      data: params
    })
}

export const enableEnterpriseAccount = (params) => {//启用企业账户
    return request({
      url: '/enterprise-base-service/enterpriseAccount/enable',
      method: 'post',
      data: params
    })
}

export const unlockEnterpriseAccount = (params) => {//解锁企业账户
    return request({
      url: '/enterprise-base-service/enterpriseAccount/unlock',
      method: 'post',
      data: params
    })
}

export const configEnterpriseAccount = (params) => {//变更企业账户配置
    return request({
      url: '/enterprise-base-service/enterpriseAccount/config/update',
      method: 'post',
      data: params
    })
}

export const enterpriseAccountDetail = (params) => {//获取对应企业账户信息
    return request({
      url: '/enterprise-base-service/enterpriseAccount/getDetail',
      method: 'post',
      data: params
    })
}

export const resetPassword = (params) => {//重置密码
    return request({
      url: '/enterprise-base-service/enterpriseAccount/password/reset',
      method: 'post',
      data: params
    })
}

export const getIndustryTypeList = (params) => {//获取行业类型列表
    return request({
      url: '/enterprise-base-service/dictionaryType/listDictByTypeCodeList',
      method: 'post',
      data: params
    })
}

export const getBelongInfo = (params) => {//获取所属销售及关联部门
    return request({
      url: '/enterprise-base-service/enterpriseAccount/getOperateAccountDeptInfo',
      method: 'get',
      params: params
    })
}

export const testTransferBusiness = (params) => {//测试转商用
    return request({
      url: '/enterprise-base-service/enterpriseAccount/testTransferBusiness',
      method: 'post',
      data: params
    })
}

export const testDelay = (params) => {//测试延期
    return request({
      url: '/enterprise-base-service/enterpriseAccount/testDelay',
      method: 'post',
      data: params
    })
}

export const saveCustomList = (params) => {//保存自定义列表
    return request({
      url: '/enterprise-base-service/common/customList/save',
      method: 'post',
      data: params
    })
}

export const getCustomList = (params) => {//获取自定义列表
    return request({
      url: '/enterprise-base-service/common/customList/getByMouldCode',
      method: 'get',
      params: params
    })
}

// 企业应用

// export const getAppList = (params,headers) => {//获取企业应用管理列表
//     return axios.post('/enterprise-base-service/enterpriseAccountApp/selectAppManageList',
// params,{headers}).then(res => res.data)};

// export const getAppSettigDetail = (params,headers) => {//获取应用配置详情
//     return axios.post('/enterprise-base-service/enterpriseAccountApp/getDetail',
// params,{headers}).then(res => res.data)};

// export const changeaAppSettig = (params,headers) => {//变更应用配置
//     return axios.post('/enterprise-base-service/enterpriseAccountApp/config/update',
// params,{headers}).then(res => res.data)};

export const getAppList = (params) => {//获取企业应用管理列表
    return request({
      url: '/enterprise-base-service/enterpriseAccountApp/selectAppManageList',
      method: 'post',
      data: params
    })
}

export const getAppSettigDetail = (params) => {//获取应用配置详情
    return request({
      url: '/enterprise-base-service/enterpriseAccountApp/getDetail',
      method: 'post',
      data: params
    })
}

export const changeaAppSettig = (params) => {//变更应用配置
    return request({
      url: '/enterprise-base-service/enterpriseAccountApp/config/update',
      method: 'post',
      data: params
    })
}
