<template>
  <el-container class="home-container">
    <el-aside class="home-aside" :width="iscollapse?'60px':'200px'">
      <div style="height: 60px; texe-align: center" :class="{show:true}">
        <img style="height:50px " src="../../assets/images/logo_admin.png" alt />
      </div>
      <el-menu
        style="border-right:0;"
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="iscollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-s-order"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-menu"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-postcard"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-line-square"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-menu"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="home-header">
        <span class="el-icon-s-fold" @click="toggle"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown style="float: right;">
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" alt style="vertical-align: middle" />
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      iscollapse: false,
      isShow: false
    }
  },
  methods: {
    toggle () {
      this.iscollapse = !this.iscollapse
      this.isShow = !this.isShow
      console.log(this.iscollapse)
    },
    // 个人设置
    setting () {
    // 跳转到个人设置页面
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      // 点击删除当前的sissionStorage的当前用户
      sessionStorage.removeItem('token')
      // 并且跳转到登录也
      this.$router.push('/login')
    }

  }
}
</script>

  <style scoped lang="less">
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .home-header {
    border-bottom: 1px solid rgba(75, 9, 9, 0.876);
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 30px;
      vertical-align: middle;
    }
  }
  .home-aside {
    background-color: rgb(11, 11, 43);
    .show {
      background: url(../../assets/images/favicon.png)no-repeat center / cover;
      background-size: 36px auto;
    }
  }
}
</style>
