import Vue from 'vue'
import App from './App.vue'

// 引入router
import router from './router'
// 引入element-ui
import ELEMENTUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 注册到vue实例上
Vue.use(ELEMENTUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
