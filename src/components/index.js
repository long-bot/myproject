import MyChannel from '@/components/my-channel.vue'
export default {
  install (Vue) {
    Vue.component(MyChannel.name, MyChannel)
    // Vue.component(MyBread.name, MyBread)
  }
}
