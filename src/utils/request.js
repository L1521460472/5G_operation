import axios from 'axios'
import { getCookie } from '../public'
import router from '../router/index'

const service = axios.create({
  timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(config => {
  const token = getCookie('enterprisePass')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, error => {
  Promise.reject(error)
})

// 返回拦截器
service.interceptors.response.use(config => {
  if (config.data.status == 3) {
    // Message({
    //   type: 'error',
    //   message: config.data.message,
    //   center: true
    // })
    router.replace('/')
    return config.data
    // parent.location.href = '/'
  } else {
    return config.data
  }
}, error =>{
  // console.log(error)
  return error
  // return Promise.reject(error)
})
export default service
