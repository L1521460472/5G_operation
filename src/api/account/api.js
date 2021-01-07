import axios from 'axios'

// import { getCookie } from '../../public'
// const headers = {Authorization:getCookie('enterprisePass')}

// 账号-基本信息
export const getAccountBaseInfo = (params,headers) => {//账号信息
    return axios.get('/enterprise-base-service/operationAccount/getDetail',
{params:params,headers:headers}).then(res => res.data)};


// 账号-密码设置
export const changePassword = (params,headers) => {//修改密码
    return axios.post('/enterprise-base-service/operationAccount/password/reset',
params,{headers}).then(res => res.data)};


// 账号-操作日志
export const getOperationLog = (params,headers) => {//查询操作日志
    return axios.post('/enterprise-base-service/operateHistory/pageList',
params,{headers}).then(res => res.data)};






