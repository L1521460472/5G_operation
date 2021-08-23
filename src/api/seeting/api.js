// import axios from 'axios'
import request from '../../utils/request'

//账号管理

export const getDepartmentTree = (params) => {//获取用户部门树
    return request({
      url: '/enterprise-operation-service/department/treeList',
      method: 'get',
      params: params
    })
}

export const addDepartment = (params) => {//新增部门
    return request({
      url: '/enterprise-operation-service/department/add',
      method: 'post',
      data: params
    })
}

export const editDepartment = (params) => {//修改部门
    return request({
      url: '/enterprise-operation-service/department/update',
      method: 'post',
      data: params
    })
}

export const deleteDepartment = (params) => {//删除部门
    return request({
      url: '/enterprise-operation-service/department/delete',
      method: 'post',
      data: params
    })
}

export const getAccountList = (params) => {//根据部门查询账号
    return request({
      url: '/enterprise-operation-service/operationAccount/pageListByDeptId',
      method: 'post',
      data: params
    })
}

export const getRoleList = (params) => {//获取角色下拉列表
    return request({
      url: '/enterprise-operation-service/operationAccount/roleList',
      method: 'get',
      params: params
    })
}

export const addAccount = (params) => {//新增账号
    return request({
      url: '/enterprise-operation-service/operationAccount/add',
      method: 'post',
      data: params
    })
}

export const editAccount = (params) => {//修改账号
    return request({
      url: '/enterprise-operation-service/operationAccount/update',
      method: 'post',
      data: params
    })
}

export const stopUseAccount = (params) => {//停用账号
    return request({
      url: '/enterprise-operation-service/operationAccount/disable',
      method: 'post',
      data: params
    })
}

export const startUseAccount = (params) => {//启用账号
    return request({
      url: '/enterprise-operation-service/operationAccount/enable',
      method: 'post',
      data: params
    })
}

export const deleteAccount = (params) => {//删除账号
    return request({
      url: '/enterprise-operation-service/operationAccount/delete',
      method: 'post',
      data: params
    })
}

export const resetPassword = (params) => {//重置密码
    return request({
      url: '/enterprise-operation-service/operationAccount/password/resetById',
      method: 'post',
      data: params
    })
}


// 角色权限


export const getRoleData = (params) => {//角色列表
    return request({
      url: '/enterprise-operation-service/role/list',
      method: 'post',
      data: params
    })
}

export const addRole = (params) => {//角色新增
    return request({
      url: '/enterprise-operation-service/role/add',
      method: 'post',
      data: params
    })
}

export const editRole = (params) => {//修改角色
    return request({
      url: '/enterprise-operation-service/role/update',
      method: 'post',
      data: params
    })
}

export const deleteRole = (params) => {//删除角色
    return request({
      url: '/enterprise-operation-service/role/delete',
      method: 'post',
      data: params
    })
}

export const getRoleAuthorityList = (params) => {//获取角色对应权限树
    return request({
      url: '/enterprise-operation-service/role/listAuthority',
      method: 'get',
      params: params
    })
}

export const copyRole = (params) => {//复制并新建角色
    return request({
      url: '/enterprise-operation-service/role/copy/add',
      method: 'post',
      data: params
    })
}

export const editRoleAuthority = (params) => {//修改角色权限
    return request({
      url: '/enterprise-operation-service/role/authority/update',
      method: 'post',
      data: params
    })
}

export const revertRoleAuthority = (params) => {//还原上一版本权限
    return request({
      url: '/enterprise-operation-service/role/revert',
      method: 'post',
      data: params
    })
}




