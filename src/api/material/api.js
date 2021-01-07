import axios from 'axios'
import { getCookie} from "../../public";

const headers = {
  Authorization: getCookie('enterprisePass')
}

// 产品类型列表
export const getProductList = (params) => {
  return axios.get('/enterprise-base-service/productTypeConfig/queryList', {params:params,headers:headers}).then(res => res.data)
}


//  新增产品
export const addProduction = (params) => {
  return axios.post('/enterprise-base-service/productTypeConfig/add',params, {headers}).then(res => res.data)
}

// 编辑产品
export const editProduct = (params) => {
  return axios.post('/enterprise-base-service/productTypeConfig/update', params, {headers}).then(res => res.data)
}

// 删除产品
export const deleteProduct = (params) => {
  return axios.post('/enterprise-base-service/productTypeConfig/delete', params, {headers}).then(res => res.data)
}


// 新增业务类型
export const addBusiness = (params) => {
  return axios.post('/enterprise-base-service/businessTypeConfig/add', params, {headers}).then(res => res.data)
}

// 删除业务类型
export const deleteBusiness = (params) => {
  return axios.post('/enterprise-base-service/businessTypeConfig/delete', params, {headers}).then(res => res.data)
}

// 修改业务类型
export const editBusiness = (params) => {
  return axios.post('/enterprise-base-service/businessTypeConfig/update', params, {headers}).then(res => res.data)
}

// 查询业务类型列表
export const businessList = (params) => {
  return axios.get('/enterprise-base-service/businessTypeConfig/queryList', {params:params,headers:headers}).then(res => res.data)
}

// 查询业务类型通道列表
export const businessChannel = (params) => {
  return axios.get('/enterprise-base-service/businessTypeConfig/channel/list', {params:params,headers:headers}).then(res => res.data)
}

// 根据产品类型id和业务类型id查询资费
export const postage = (params) => {
  return axios.post('/enterprise-base-service/businessTypeConfig/findByProductIdAndBusinessId', params, {headers}).then(res => res.data)
}
