import request from '../../utils/request'


// 产品类型列表
export const getProductList = (params) => {
  return request({
    url: '/enterprise-operation-service/productTypeConfig/queryList',
    method: 'get',
    params: params
  })
}


//  新增产品
export const addProduction = (params) => {
  return request({
    url: '/enterprise-operation-service/productTypeConfig/add',
    method: 'post',
    data: params
  })
}


// 编辑产品
export const editProduct = (params) => {
  return request({
    url: '/enterprise-operation-service/productTypeConfig/update',
    method: 'post',
    data: params
  })
}

// 删除产品
export const deleteProduct = (params) => {
  return request({
    url: '/enterprise-operation-service/productTypeConfig/delete',
    method: 'post',
    data: params
  })
}


// 新增业务类型
export const addBusiness = (params) => {
  return request({
    url: '/enterprise-operation-service/businessTypeConfig/add',
    method: 'post',
    data: params
  })
}

// 删除业务类型
export const deleteBusiness = (params) => {
  return request({
    url: '/enterprise-operation-service/businessTypeConfig/delete',
    method: 'post',
    data: params
  })
}

// 修改业务类型
export const editBusiness = (params) => {
  return request({
    url: '/enterprise-operation-service/businessTypeConfig/update',
    method: 'post',
    data: params
  })
}


// 查询业务类型列表
export const businessList = (params) => {
  return request({
    url: '/enterprise-operation-service/businessTypeConfig/pageList',
    method: 'post',
    data: params
  })
}


// 查询业务类型通道列表
export const businessChannel = (params) => {
  return request({
    url: '/enterprise-operation-service/businessTypeConfig/channel/list',
    method: 'get',
    params: params
  })
}


// 根据产品类型id和业务类型id查询资费
export const postage = (params) => {
  return request({
    url: '/enterprise-operation-service/businessTypeConfig/findByProductIdAndBusinessId',
    method: 'post',
    data: params
  })
}


/**
 * 根据产品类型获取业务类型
 */
export const getBusinessTypeList = (params) => {
  return request({
    url: '/enterprise-operation-service/common/queryBusinessListByProductType',
    method: 'get',
    params
  })
}
