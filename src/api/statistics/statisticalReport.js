import request from '../../utils/request';

//报表统计
export const reportTotal = (params)=>{
    return request({
        url:'/enterprise-base-service/messageRecord/all/reportStatistics',
        method:'post',
        data:params
    })
}

//报表统计记录导出
export const exportExcel = (params)=>{
    return request({
        url:'enterprise-base-service/messageRecord/all/reportStatisticsExport',
        method:'post',
        data:params,
        responseType: 'blob'
    })
}

//企业列表
export const account = (params)=>{
    return request({
        url:'/enterprise-base-service/enterpriseAccount/mapEnterpriseAccount',
        method:'get',
        params:params
    })
}

//业务类型
export const getBusinessLis = (params)=>{
    return request({
        url:'/enterprise-base-service/common/queryBusinessListByProductType',
        method:'get',
        params:params
    })
}
