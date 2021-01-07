import axios from 'axios'


// 资费套餐
export const getPackageList = (params,headers) => {//资费套餐列表
    return axios.post('/enterprise-base-service/package/pageList',
params,{headers}).then(res => res.data)};

export const productypeList = (params,headers) => {//获取所有产品类型列表
    return axios.get('/enterprise-base-service/dictionaryType/listDictByCode',
{params:params,headers:headers}).then(res => res.data)};

export const addPackage = (params,headers) => {//资费套餐新增
    return axios.post('/enterprise-base-service/package/add',
params,{headers}).then(res => res.data)};

export const editPackage= (params,headers) => {//资费套餐修改
    return axios.post('/enterprise-base-service/package/update',
params,{headers}).then(res => res.data)};

export const deletePackage = (params,headers) => {//资费套餐删除
    return axios.post('/enterprise-base-service/package/delete',
params,{headers}).then(res => res.data)};

export const disablePackage = (params,headers) => {//资费套餐停用
    return axios.post('/enterprise-base-service/package/disable',
params,{headers}).then(res => res.data)};

export const enablePackage= (params,headers) => {//资费套餐启用
    return axios.post('/enterprise-base-service/package/enable',
params,{headers}).then(res => res.data)};

export const changeTariffList= (params,headers) => {//获取变更资费项列表
    return axios.post('/enterprise-base-service/package/pageItemList',
params,{headers}).then(res => res.data)};

export const changeTariff= (params,headers) => {//变更资费项
    return axios.post('/enterprise-base-service/package/costItem/change',
params,{headers}).then(res => res.data)};


// 资费项

export const getTariffData= (params,headers) => {//获取资费项分页数据
    return axios.post('/enterprise-base-service/costItem/pageList',
params,{headers}).then(res => res.data)};

export const addTariff= (params,headers) => {//新增资费项
    return axios.post('/enterprise-base-service/costItem/add',
params,{headers}).then(res => res.data)};

export const editTariff= (params,headers) => {//修改资费项
    return axios.post('/enterprise-base-service/costItem/update',
params,{headers}).then(res => res.data)};

export const deleteTariff= (params,headers) => {//删除资费项
    return axios.post('/enterprise-base-service/costItem/delete',
params,{headers}).then(res => res.data)};

export const disableTariff= (params,headers) => {//停用资费项
    return axios.post('/enterprise-base-service/costItem/disable',
params,{headers}).then(res => res.data)};

export const enableTariff= (params,headers) => {//启用资费项
    return axios.post('/enterprise-base-service/costItem/enable',
params,{headers}).then(res => res.data)};

export const getTypeList = (params,headers) => {//获取所有类型列表
    return axios.post('/enterprise-base-service/dictionaryType/listDictByTypeCodeList',
params,{headers}).then(res => res.data)};




