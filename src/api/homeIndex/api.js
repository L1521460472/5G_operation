// import axios from 'axios'
import request from '../../utils/request'


// import { getCookie } from '../../public'
// const headers = {Authorization:getCookie('enterprisePass')}
// 登录

// export const postLogin = (params,headers) => {//登录
//     return axios.post('/enterprise-auth-service/auth/login',
// params,{headers}).then(res => res.data)};

export const postLogin = (params) => {//登录
    return request({
      url: '/enterprise-auth-service/auth/login',
      method: 'post',
      data: params
    })
}

// export const loginOut = (params,headers) => {//退出登录
//     return axios.get('/enterprise-auth-service/auth/loginOut',
// {params:params,headers:headers}).then(res => res.data)};

export const loginOut = (params) => {//退出登录
    return request({
      url: '/enterprise-auth-service/auth/loginOut',
      method: 'get',
      params: params
    })
}

// Home页面
// export const getAllMenuList = (params,headers) => {//获取权限菜单
//     // return axios.get(`${url}/menu/listMenuButton`,
//     return axios.get('/enterprise-base-service/menu/listAssignMenuButton',
// {params:params,headers:headers}).then(res => res.data)};

export const getAllMenuList = (params) => {//获取权限菜单
    return request({
      url: '/enterprise-base-service/menu/listAssignMenuButton',
      method: 'get',
      params: params
    })
}

// 首页
// export const getHomeIndexData = (params,headers) => {//获取运营平台首页数据
//     // return axios.get(`${url}/index/overview/message`,
//     return axios.get('/enterprise-base-service/index/overview/message',
// {params:params,headers:headers}).then(res => res.data)};

export const getHomeIndexData = (params) => {//获取运营平台首页数据
    return request({
      url: '/enterprise-base-service/index/overview/message',
      method: 'get',
      params: params
    })
}
