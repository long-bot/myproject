<template>
  <div class="login-container">
    <!-- 中间方块 -->
    <el-card class="login-card">
      <img src="@/assets/images/logo_index.png" />
      <!-- 表单元素 -->
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" style="width:50%" v-model="loginForm.code"></el-input>
          <el-button type="primary" round style="float:right;width:40%">验证码</el-button>
        </el-form-item>
        <el-checkbox checked>成功发送</el-checkbox>
        <el-form-item>
          <el-button type="primary" style="width:100%" round @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkmobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: checkmobile,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码输入六位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      //   console.log(this.$refs)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              // 验证手机号验证码成功之后  服务器会发送一条token数据  需要吧数据存储起来并且跳转到首页
              console.log(res)
              sessionStorage.setItem('token', JSON.stringify(res.data.data.token))
              this.$router.push('/')
            })
            .catch(() => {
              console.log(this.loginForm)
              console.log('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-card {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
