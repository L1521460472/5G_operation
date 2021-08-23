// import axios from 'axios'
import request from '../../utils/request'



// 菜单按钮管理


export const getAllMenuList = (params) => {//获取权限菜单
    return request({
      url: '/enterprise-operation-service/menu/listMenuButton',
      method: 'get',
      params: params
    })
}
export const addMenu = (params) => {//新增菜单
    return request({
      url: '/enterprise-operation-service/menu/addMenu',
      method: 'post',
      data: params
    })
}
export const addButton = (params) => {//新增按钮
    return request({
      url: '/enterprise-operation-service/menu/addButton',
      method: 'post',
      data: params
    })
}
export const updateMenuButton = (params) => {//修改菜单按钮
    return request({
      url: '/enterprise-operation-service/menu/update',
      method: 'post',
      data: params
    })
}
export const getMenuButtonDetail = (params) => {//菜单或按钮详情
    return request({
      url: '/enterprise-operation-service/menu/getMenuButtonDetail',
      method: 'post',
      data: params
    })
}
export const getDeleteDetail = (params) => {//删除前的提示
    return request({
      url: '/enterprise-operation-service/menu/getDeleteDetail',
      method: 'post',
      data: params
    })
}
export const deleteMenuButton = (params) => {//删除
    return request({
      url: '/enterprise-operation-service/menu/delete',
      method: 'post',
      data: params
    })
}
export const getListMenu = (params) => {//获取所有菜单按钮列表
    return request({
      url: '/enterprise-operation-service/menu/listMenu',
      method: 'get',
      params: params
    })
}


