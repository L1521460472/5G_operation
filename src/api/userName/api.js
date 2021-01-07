import axios from 'axios'


// 企业账户

export const enterpriseAccountList = (params,headers) => {//企业账户列表
    return axios.post('/enterprise-base-service/enterpriseAccount/pageList',
params,{headers}).then(res => res.data)};

export const addEnterpriseAccount = (params,headers) => {//新增企业账户
    return axios.post('/enterprise-base-service/enterpriseAccount/add',
params,{headers}).then(res => res.data)};

export const editEnterpriseAccount = (params,headers) => {//编辑企业账户
    return axios.post('/enterprise-base-service/enterpriseAccount/update',
params,{headers}).then(res => res.data)};

export const deleteEnterpriseAccount = (params,headers) => {//删除企业账户
    return axios.post('/enterprise-base-service/enterpriseAccount/deleteByIds',
params,{headers}).then(res => res.data)};

export const disableEnterpriseAccount = (params,headers) => {//停用企业账户
    return axios.post('/enterprise-base-service/enterpriseAccount/disable',
params,{headers}).then(res => res.data)};

export const enableEnterpriseAccount = (params,headers) => {//启用企业账户
    return axios.post('/enterprise-base-service/enterpriseAccount/enable',
params,{headers}).then(res => res.data)};

export const unlockEnterpriseAccount = (params,headers) => {//解锁企业账户
    return axios.post('/enterprise-base-service/enterpriseAccount/unlock',
params,{headers}).then(res => res.data)};

export const configEnterpriseAccount = (params,headers) => {//变更企业账户配置
    return axios.post('/enterprise-base-service/enterpriseAccount/config/update',
params,{headers}).then(res => res.data)};

export const enterpriseAccountDetail = (params,headers) => {//获取对应企业账户信息
    return axios.post('/enterprise-base-service/enterpriseAccount/getDetail',
params,{headers}).then(res => res.data)};

export const resetPassword = (params,headers) => {//重置密码
    return axios.post('/enterprise-base-service/enterpriseAccount/password/reset',
params,{headers}).then(res => res.data)};

export const getIndustryTypeList = (params,headers) => {//获取行业类型列表
    return axios.post('/enterprise-base-service/dictionaryType/listDictByTypeCodeList',
params,{headers}).then(res => res.data)};

export const getBelongInfo = (params,headers) => {//获取所属销售及关联部门
    return axios.get('/enterprise-base-service/enterpriseAccount/getOperateAccountDeptInfo',
{params:params,headers:headers}).then(res => res.data)};

export const testTransferBusiness = (params,headers) => {//测试转商用
    return axios.post('/enterprise-base-service/enterpriseAccount/testTransferBusiness',
params,{headers}).then(res => res.data)};

export const testDelay = (params,headers) => {//测试延期
    return axios.post('/enterprise-base-service/enterpriseAccount/testDelay',
params,{headers}).then(res => res.data)};

export const saveCustomList = (params,headers) => {//保存自定义列表
    return axios.post('/enterprise-base-service/common/customList/save',
params,{headers}).then(res => res.data)};

export const getCustomList = (params,headers) => {//获取自定义列表
    return axios.get('/enterprise-base-service/common/customList/getByMouldCode',
{params:params,headers:headers}).then(res => res.data)};


// 企业应用

export const getAppList = (params,headers) => {//获取企业应用管理列表
    return axios.post('/enterprise-base-service/enterpriseAccountApp/selectAppManageList',
params,{headers}).then(res => res.data)};

export const getAppSettigDetail = (params,headers) => {//获取应用配置详情
    return axios.post('/enterprise-base-service/enterpriseAccountApp/getDetail',
params,{headers}).then(res => res.data)};

export const changeaAppSettig = (params,headers) => {//变更应用配置
    return axios.post('/enterprise-base-service/enterpriseAccountApp/config/update',
params,{headers}).then(res => res.data)};

