// import axios from 'axios'
import request from '../../utils/request'


// import { getCookie } from '../../public'
// const headers = {Authorization:getCookie('enterprisePass')}


// 菜单按钮管理
// export const getAllMenuList = (params,headers) => {//获取权限菜单
//     return axios.get('/enterprise-base-service/menu/listMenuButton',
// {params:params,headers:headers}).then(res => res.data)};

// export const addMenu = (params,headers) => {//新增菜单
//     return axios.post('/enterprise-base-service/menu/addMenu',
// params,{headers}).then(res => res.data)};

// export const addButton = (params,headers) => {//新增按钮
//     return axios.post('/enterprise-base-service/menu/addButton',
// params,{headers}).then(res => res.data)};

// export const updateMenuButton = (params,headers) => {//修改菜单按钮
//     return axios.post('/enterprise-base-service/menu/update',
// params,{headers}).then(res => res.data)};

// export const getMenuButtonDetail = (params,headers) => {//菜单或按钮详情
//     return axios.post('/enterprise-base-service/menu/getMenuButtonDetail',
// params,{headers}).then(res => res.data)};

// export const getDeleteDetail = (params,headers) => {//删除前的提示
//     return axios.post('/enterprise-base-service/menu/getDeleteDetail',
// params,{headers}).then(res => res.data)};

// export const deleteMenuButton = (params,headers) => {//删除
//     return axios.post('/enterprise-base-service/menu/delete',
// params,{headers}).then(res => res.data)};

// export const getListMenu = (params,headers) => {//获取所有菜单按钮列表
//     return axios.get('/enterprise-base-service/menu/listMenu',
// {params:params,headers:headers}).then(res => res.data)};


export const getAllMenuList = (params) => {//获取权限菜单
    return request({
      url: '/enterprise-base-service/menu/listMenuButton',
      method: 'get',
      params: params
    })
}
export const addMenu = (params) => {//新增菜单
    return request({
      url: '/enterprise-base-service/menu/addMenu',
      method: 'post',
      data: params
    })
}
export const addButton = (params) => {//新增按钮
    return request({
      url: '/enterprise-base-service/menu/addButton',
      method: 'post',
      data: params
    })
}
export const updateMenuButton = (params) => {//修改菜单按钮
    return request({
      url: '/enterprise-base-service/menu/update',
      method: 'post',
      data: params
    })
}
export const getMenuButtonDetail = (params) => {//菜单或按钮详情
    return request({
      url: '/enterprise-base-service/menu/getMenuButtonDetail',
      method: 'post',
      data: params
    })
}
export const getDeleteDetail = (params) => {//删除前的提示
    return request({
      url: '/enterprise-base-service/menu/getDeleteDetail',
      method: 'post',
      data: params
    })
}
export const deleteMenuButton = (params) => {//删除
    return request({
      url: '/enterprise-base-service/menu/delete',
      method: 'post',
      data: params
    })
}
export const getListMenu = (params) => {//获取所有菜单按钮列表
    return request({
      url: '/enterprise-base-service/menu/listMenu',
      method: 'get',
      params: params
    })
}


