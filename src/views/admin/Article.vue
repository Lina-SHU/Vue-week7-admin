<template>
  <loading v-model:active="isLoading"/>
  <div class="container py-3">
    <h1>文章管理</h1>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" @click="updateModal('new')">新增文章</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th width="20%">文章標題</th>
          <th scope="col">作者</th>
          <th scope="col">建立時間</th>
          <th scope="col">是否公開</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id" class="align-middle">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ new Date(article.create_at*1000).getFullYear() }}/{{ new Date(article.create_at*1000).getMonth()+1 }}/{{ new Date(article.create_at*1000).getDate() }}</td>
          <td>{{ article.isPublic ? '啟用' : '未啟用'}}</td>
          <td>
            <button type="button" class="btn btn-primary me-2" @click="updateModal('edit', article)">編輯</button>
            <button type="button" class="btn btn-outline-danger" @click="deleteArticle(article.id, pagination.current_page)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @get-list="getArticle"></pagination>
    <updateModal ref="updateModal" :temp-article="tempArticle" :is-new="isNew"  @get-article="getArticle"></updateModal>
  </div>
</template>

<script>
import pagination from '../../components/Pagination.vue'
import updateModal from '../../components/UpdateArticleModal.vue'
import swal from 'sweetalert'

export default {
  data () {
    return {
      articles: { tag: [] },
      pagination: [],
      tempArticle: { tag: [] },
      isNew: true,
      isLoading: false
    }
  },
  components: {
    pagination,
    updateModal
  },
  methods: {
    getArticle (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`
      this.$http.get(url)
        .then(res => {
          if (res.data.success) {
            this.isLoading = false
            this.articles = res.data.articles
            this.pagination = res.data.pagination
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateModal (value, article) {
      this.isNew = true
      if (value === 'edit') {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${article.id}`
        this.$http.get(url)
          .then(res => {
            if (res.data.success) {
              this.isLoading = false
              this.tempArticle = JSON.parse(JSON.stringify(res.data.article))
              this.isNew = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else if (value === 'new') {
        this.tempArticle = {}
        this.isNew = true
      }
      this.$refs.updateModal.openModal()
    },
    deleteArticle (id, page) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${id}`
      this.$http.delete(url)
        .then(res => {
          this.isLoading = false
          swal({
            text: '刪除成功',
            button: false,
            timer: 1500
          })
          this.getArticle(page)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getArticle()
  }
}
</script>

<style>
.ck-editor__editable_inline {
  min-height: 500px;
}
</style>
