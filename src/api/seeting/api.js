import axios from 'axios'

// const url ='http://172.18.11.107:7820'

// import { getCookie } from '../../public'
// const headers = {Authorization:getCookie('enterprisePass')}

//账号管理

export const getDepartmentTree = (params,headers) => {//获取用户部门树
    return axios.get('/enterprise-base-service/department/treeList',
{params:params,headers:headers}).then(res => res.data)};

export const addDepartment = (params,headers) => {//新增部门
    return axios.post('/enterprise-base-service/department/add',
params,{headers}).then(res => res.data)};

export const editDepartment = (params,headers) => {//修改部门
    return axios.post('/enterprise-base-service/department/update',
params,{headers}).then(res => res.data)};

export const deleteDepartment = (params,headers) => {//删除部门
    return axios.post('/enterprise-base-service/department/delete',
params,{headers}).then(res => res.data)};

export const getAccountList = (params,headers) => {//根据部门查询账号
    return axios.post('/enterprise-base-service/operationAccount/pageListByDeptId',
params,{headers}).then(res => res.data)};

export const getRoleList = (params,headers) => {//获取角色下拉列表
    return axios.get('/enterprise-base-service/operationAccount/roleList',
{params:params,headers:headers}).then(res => res.data)};

export const addAccount = (params,headers) => {//新增账号
    return axios.post('/enterprise-base-service/operationAccount/add',
params,{headers}).then(res => res.data)};

export const editAccount = (params,headers) => {//修改账号
    return axios.post('/enterprise-base-service/operationAccount/update',
params,{headers}).then(res => res.data)};

export const stopUseAccount = (params,headers) => {//停用账号
    return axios.post('/enterprise-base-service/operationAccount/disable',
params,{headers}).then(res => res.data)};

export const startUseAccount = (params,headers) => {//启用账号
    return axios.post('/enterprise-base-service/operationAccount/enable',
params,{headers}).then(res => res.data)};

export const deleteAccount = (params,headers) => {//删除账号
    return axios.post('/enterprise-base-service/operationAccount/delete',
params,{headers}).then(res => res.data)};

export const resetPassword = (params,headers) => {//删除账号
    return axios.post('/enterprise-base-service/operationAccount/password/resetById',
params,{headers}).then(res => res.data)};


// 角色权限

export const getRoleData = (params,headers) => {//角色列表
    return axios.post('/enterprise-base-service/role/list',
params,{headers}).then(res => res.data)};

export const addRole = (params,headers) => {//角色新增
    return axios.post('/enterprise-base-service/role/add',
params,{headers}).then(res => res.data)};

export const editRole = (params,headers) => {//修改角色
    return axios.post('/enterprise-base-service/role/update',
params,{headers}).then(res => res.data)};

export const deleteRole = (params,headers) => {//删除角色
    return axios.post('/enterprise-base-service/role/delete',
params,{headers}).then(res => res.data)};

export const getRoleAuthorityList = (params,headers) => {//获取角色对应权限树
    return axios.get('/enterprise-base-service/role/listAuthority',
{params:params,headers:headers}).then(res => res.data)};

export const copyRole = (params,headers) => {//复制并新建角色
    return axios.post('/enterprise-base-service/role/copy/add',
params,{headers}).then(res => res.data)};

export const editRoleAuthority = (params,headers) => {//修改角色权限
    return axios.post('/enterprise-base-service/role/authority/update',
params,{headers}).then(res => res.data)};

export const revertRoleAuthority = (params,headers) => {//还原上一版本权限
    return axios.post('/enterprise-base-service/role/revert',
params,{headers}).then(res => res.data)};






