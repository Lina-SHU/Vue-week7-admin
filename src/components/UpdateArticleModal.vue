<template>
  <loading v-model:active="isLoading"/>
  <div class="modal fade" id="modal" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-if="isNew">新增文章</h5>
          <h5 class="modal-title" v-else>編輯文章</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <div class="mb-3">
                <label for="title" class="form-label">文章名稱 <small class="text-danger">*必填</small></label>
                <input type="text" class="form-control" id="title" v-model='temp.title' placeholder="請輸入標題">
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者 <small class="text-danger">*必填</small></label>
                <input type="text" class="form-control" id="author" v-model='temp.author' placeholder="請輸入作者">
              </div>
              <div class="mb-3">
                <label for="create_at" class="form-label">建立日期 <small class="text-danger">*必填</small></label>
                <input type="date" class="form-control" id="create_at" v-model='date'>
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">圖片</label>
                <input type="url" class="form-control" id="image" v-model='temp.image' placeholder="請輸入圖片連結">
              </div>
              <div class="mb-3">
                <label for="decription" class="form-label">文章描述</label>
                <input type="text" class="form-control" id="decription" v-model='temp.decription' placeholder="請輸入描述">
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="isPublic" v-model="temp.isPublic">
                <label class="form-check-label" for="isPublic">
                  是否公開
                </label>
              </div>
              <div>
                <div class="mb-1">文章標籤</div>
                <div v-if="Array.isArray(temp.tag)">
                  <label for="tag" class="form-label">標籤</label>
                  <div class="mb-1" v-for="(item, key) in temp.tag" :key="key">
                    <div class="input-group">
                      <input type="text" class="form-control" id="tag" placeholder="請輸入標籤" v-model="temp.tag[key]">
                    </div>
                  </div>
                  <div v-if="!temp.tag.length || temp.tag[temp.tag.length-1]">
                    <button class="btn btn-primary d-block btn-sm" @click="temp.tag.push('')">新增標籤</button>
                  </div>
                  <div v-else>
                    <button class="btn btn-danger btn-sm" @click="temp.tag.pop()">刪除標籤</button>
                  </div>
                </div>
                <div v-else>
                  <button class="btn btn-primary btn-sm" @click="createTag">新增標籤</button>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="mb-3">
                <label for="content" class="form-label">文章內容 <small class="text-danger">*必填</small></label>
                <ckeditor :editor="editor" :config="editorConfig" v-model="temp.content"></ckeditor>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="UpdateArticle">編輯</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from './modal.js'
import swal from 'sweetalert'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  data () {
    return {
      modal: '',
      temp: { tag: [] },
      date: '',
      isLoading: false,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'typing', 'bold', 'italic', '|', 'link']
      }
    }
  },
  mixins: [ModalMixin],
  emits: ['getArticle'],
  props: ['tempArticle', 'isNew'],
  methods: {
    UpdateArticle () {
      this.isLoading = true
      this.temp.create_at = Math.floor(new Date(this.date) / 1000)
      if (!this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.temp.id}`
        this.$http.put(url, { data: this.temp })
          .then(res => {
            if (res.data.success) {
              this.isLoading = false
              swal({
                text: '編輯成功',
                icon: 'success',
                button: false,
                timer: 1500
              })
              this.hideModal()
              this.$emit('getArticle')
              this.date = ''
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`
        this.$http.post(url, { data: this.temp })
          .then(res => {
            if (res.data.success) {
              this.isLoading = false
              swal({
                text: '新增成功',
                icon: 'success',
                button: false,
                timer: 1500
              })
              this.hideModal()
              this.$emit('getArticle')
              this.date = ''
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    createTag () {
      this.temp.tag = []
      this.temp.tag.push('')
    }
  },
  watch: {
    tempArticle () {
      this.temp = {
        ...this.tempArticle,
        isPublic: this.tempArticle.isPublic || false
      }
      if (!this.isNew) {
        this.date = `${new Date(this.temp.create_at * 1000).getFullYear()}-${('0' + (new Date(this.temp.create_at * 1000).getMonth() + 1)).slice(-2)}-${('0' + new Date(this.temp.create_at * 1000).getDate()).slice(-2)}`
      }
    }
  }
}
</script>
