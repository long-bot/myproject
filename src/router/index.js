// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入login
import Login from '../views/Login/index.vue'
import Home from '../views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/NotFound'
import Articles from '@/views/articles'
// 注册到vue实例上
Vue.use(VueRouter)

// 配置router对象   配置规则
const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '',
    component: Home,
    children: [{
      name: 'welcome',
      path: '/',
      component: Welcome
    },
    {
      name: 'articles',
      path: '/article',
      component: Articles
    } ]
  },

  {
    name: 'notFound',
    path: '*',
    component: NotFound
  }
  ]
})
// 在进入除了login路由之前需要判断一下有没有登录   所以需要前置守卫
router.beforeEach((to, from, next) => {
  // to即将要进入的路由对象、
  // from 当前要离开的路由
  //  next  执行下一个
  if (to.path === '/login') {
    return next()
  }
  if (sessionStorage.getItem('token')) {
    return next()
  }
  return next({
    path: '/login'
  })
})
// 导出router
export default router
