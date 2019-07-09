// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入login
import Login from '../views/Login/index.vue'
// 注册到vue实例上
Vue.use(VueRouter)

// 配置router对象   配置规则
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/', component: Login }
  ]
})

// 导出router
export default router
