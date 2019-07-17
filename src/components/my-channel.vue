
<template>
  <el-select placeholder="请选择" :value="value" @change="send">
    <el-option v-for="item in channelOptions" :key="item.id" :value="item.id" :label="item.name"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  name: 'my-channel',
  data () {
    return {
      //   频道的选项
      channelOptions: [{ name: 'java', id: 1 }]
    }
  },
  created () {
    // 获取频道数据
    this.getChannel()
  },
  methods: {
    send (value) {
      this.$emit('input', value)
    },
    // 获取频道数据
    async getChannel () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style>
</style>
