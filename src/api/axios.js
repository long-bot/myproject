import axios from 'axios'
import JSONBig from 'json-bigint'
// 注册axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [(data) => {
    if (data) {
      JSONBig.parse(data)
    }
    return data
  }]

})
// 添加请求拦截器
//   因为如果关闭页面的话   axios是在main的里面的写的   会立即执行这个组件  但是没有登录的话就没有token值   所以会报错
// 现在需要添加拦截器   也就在发axios发请求之前获取一下token值
instance.interceptors.request.use((config) => {
  // 给头部加认证信息
  //   判断  如果sessionStorage里面又token  就进入 并且给头部加上token 以便于以后每次请求方便
  //   如果没有的话就说明是false  null == false 正常执行
  if (sessionStorage.getItem('token')) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器  因为token值又时间限制  也就是如果两个小时还每退出页面的话就需要重新登录一下
instance.interceptors.response.use(response => response,
  error => {
  // 如果失败了代表token值已经没在了   判断错误代码是不是401  如果是401的话就需要跳转到登录页面  重新登录获取有效的token
    if (error.response && error.response.status === 401) {
      location.hash = '#/login'
    }
    return Promise.reject(error)
  })
console.log(instance)
export default instance
