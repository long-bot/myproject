import axios from 'axios'
// 注册axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'

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
console.log(instance)
export default instance
