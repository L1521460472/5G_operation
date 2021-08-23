// import axios from 'axios'
import request from '../../utils/request'


// 登录


export const postLogin = (params) => {//登录
    return request({
      url: '/enterprise-auth-service/auth/login',
      method: 'post',
      data: params
    })
}


export const loginOut = (params) => {//退出登录
    return request({
      url: '/enterprise-auth-service/auth/loginOut',
      method: 'get',
      params: params
    })
}

// Home页面

export const getAllMenuList = (params) => {//获取权限菜单
    return request({
      url: '/enterprise-operation-service/menu/listAssignMenuButton',
      method: 'get',
      params: params
    })
}

// 首页

export const getHomeIndexData = (params) => {//获取运营平台首页数据
    return request({
      url: '/enterprise-operation-service/index/overview/message',
      method: 'get',
      params: params
    })
}
