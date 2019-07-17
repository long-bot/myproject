<template>
  <div class="articles_container">
    <el-card>
      <div slot="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="search">按钮</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        根据筛选结果共查询到
        <b>{{total}}</b> 条数据
      </div>
      <el-table :data="articles">
        <el-table-column label="封面" prop>
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width: 100px; height: 100px">
              <div slot="error">
                <img src="../../assets/images/error.gif" width="100" height="100" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" circle icon="el-icon-edit" plain @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" circle icon="el-icon-delete" plani @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align:center" @current-change="page" :current-page="reqParams.page" background layout="prev, pager, next" :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 频道的选项
      reqParams: {
        // 频道当前选项的id
        channel_id: null,
        status: null,
        // 起始时间
        begin_pubdate: null,
        // 结束时间
        end_pubdate: null,
        // 当前页数
        page: 1,
        // 每页数量
        per_page: 20
      },

      //   改变的时间
      time: null,
      //   文章数据
      articles: [],
      // 总文章数
      total: 0
    }
  },
  created () {
    // 获取文章数据
    this.getArticles()
  },
  methods: {
    // 编辑按钮
    edit () {
      this.$router.push('/publish')
    },
    del () {

    },
    // 触发分页功能
    page (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    search () {
      console.log(123)
      this.getArticles()
    },
    // 时间处理
    changeDate (value) {
      this.reqParams.begin_pubdate = value[0]
      this.reqParams.end_pubdate = value[1]
    },

    // 获取文章数据
    async getArticles () {
      // 发送请求  获取文章数据渲染到列表上
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.articles_container {
  .el-card {
    margin-bottom: 30px;
  }
}
</style>
