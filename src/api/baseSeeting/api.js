import axios from 'axios'


// import { getCookie } from '../../public'
// const headers = {Authorization:getCookie('enterprisePass')}


// 菜单按钮管理
export const getAllMenuList = (params,headers) => {//获取权限菜单
    return axios.get('/enterprise-base-service/menu/listMenuButton',
{params:params,headers:headers}).then(res => res.data)};

export const addMenu = (params,headers) => {//新增菜单
    return axios.post('/enterprise-base-service/menu/addMenu',
params,{headers}).then(res => res.data)};

export const addButton = (params,headers) => {//新增按钮
    return axios.post('/enterprise-base-service/menu/addButton',
params,{headers}).then(res => res.data)};

export const updateMenuButton = (params,headers) => {//修改菜单按钮
    return axios.post('/enterprise-base-service/menu/update',
params,{headers}).then(res => res.data)};

export const getMenuButtonDetail = (params,headers) => {//菜单或按钮详情
    return axios.post('/enterprise-base-service/menu/getMenuButtonDetail',
params,{headers}).then(res => res.data)};

export const getDeleteDetail = (params,headers) => {//删除前的提示
    return axios.post('/enterprise-base-service/menu/getDeleteDetail',
params,{headers}).then(res => res.data)};

export const deleteMenuButton = (params,headers) => {//删除
    return axios.post('/enterprise-base-service/menu/delete',
params,{headers}).then(res => res.data)};

export const getListMenu = (params,headers) => {//获取所有菜单按钮列表
    return axios.get('/enterprise-base-service/menu/listMenu',
{params:params,headers:headers}).then(res => res.data)};



