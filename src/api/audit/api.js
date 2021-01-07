import axios from 'axios'


// 企业审核

export const enterpriseAuditList = (params,headers) => {//企业审核列表
    return axios.post('/enterprise-base-service/authentication/enterpriseAuthentication/pageList',
params,{headers}).then(res => res.data)};

export const enterpriseAudit = (params,headers) => {//企业审核
    return axios.post('/enterprise-base-service/authentication/checkEnterpriseAuthentication',
params,{headers}).then(res => res.data)};



// 模板审核

export const templeteAuditList = (params,headers) => {//模板审核列表
    return axios.post('/enterprise-base-service/authentication/mouldAuthentication/pageList',
params,{headers}).then(res => res.data)};

export const templeteAudit = (params,headers) => {//模板审核
    return axios.post('/enterprise-base-service/authentication/checkMouldAuthentication',
params,{headers}).then(res => res.data)};

export const businessTypeList = (params,headers) => {//获取所有业务类型列表
    return axios.get('/enterprise-base-service/dictionaryType/listDictByCode',
{params:params,headers:headers}).then(res => res.data)};


// 套餐审核

export const packageAuditList = (params,headers) => {//套餐审核列表
    return axios.post('/enterprise-base-service/authentication/packageAuthentication/pageList',
params,{headers}).then(res => res.data)};

export const packageAudit = (params,headers) => {//套餐审核
    return axios.post('/enterprise-base-service/authentication/checkPackageAuthentication',
params,{headers}).then(res => res.data)};

