<template>
  <loading v-model:active="isLoading"/>
  <div class="modal fade" id="modal" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-if="isNew">新增商品</h5>
          <h5 class="modal-title" v-else>編輯商品</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="name" class="form-label">商品名稱 <small class="text-danger">*必填</small></label>
            <input type="text" class="form-control" id="name" v-model="temp.title">
          </div>
          <div class="row mb-3">
            <div class="col">
              <label for="category" class="form-label">商品種類 <small class="text-danger">*必填</small></label>
            <input type="text" class="form-control" id="category" v-model="temp.category">
            </div>
            <div class="col">
              <label for="unit" class="form-label">商品單位 <small class="text-danger">*必填</small></label>
              <input type="text" class="form-control" id="unit" v-model="temp.unit">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label for="price" class="form-label">商品售價 <small class="text-danger">*必填</small></label>
              <input type="number" class="form-control" id="price" v-model.number="temp.price">
            </div>
            <div class="col">
              <label for="origin_price" class="form-label">商品原價 <small class="text-danger">*必填</small></label>
              <input type="text" class="form-control" id="origin_price" v-model.number="temp.origin_price">
            </div>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">商品內容</label>
            <input type="text" class="form-control" id="content" v-model="temp.content">
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">商品描述</label>
            <input type="text" class="form-control" id="description" v-model="temp.description">
          </div>
          <div class="mb-3">
            <label for="imageUrl" class="form-label">商品圖片</label>
            <div class="input-group">
              <input type="file" class="form-control" id="imageUrl">
              <button class="btn btn-primary" type="button" @click="upload">上傳檔案</button>
            </div>
            <img :src="temp.imageUrl" alt="imageUrl" class="img-fiuld mt-2 w-100" v-if="temp.imageUrl">
          </div>
          <div class="mb-3">
            <div class="mb-1">多圖新增</div>
            <div v-if="Array.isArray(temp.imagesUrl)">
              <div class="mb-1" v-for="(image, index) in temp.imagesUrl" :key="index">
                <label for="imageUrl" class="form-label">圖片網址</label>
                <div class="input-group">
                  <input type="text" class="form-control"  placeholder="請輸入圖片連結" v-model="temp.imagesUrl[index]">
                </div>
                <img :src="image" alt="imageUrl" class="img-fiuld mt-2 w-100" v-if="temp.imagesUrl[index]">
              </div>
              <div v-if="!temp.imagesUrl.length || temp.imagesUrl[temp.imagesUrl.length-1]">
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="temp.imagesUrl.push('')" type="button">新增圖片</button>
              </div>
              <div v-else>
                <button class="btn btn-outline-danger btn-sm d-block w-100" @click="temp.imagesUrl.pop()" type="button">刪除圖片</button>
              </div>
            </div>
            <div v-else>
              <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImage" type="button">新增圖片</button>
            </div>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="newArrival" v-model="temp.newArrival">
            <label class="form-check-label" for="newArrival">
              新品上市
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="hotProduct" v-model="temp.hotProduct">
            <label class="form-check-label" for="hotProduct">
              熱銷款
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="is_enabled" v-model="temp.is_enabled" true-value="1" false-value="0">
            <label class="form-check-label" for="is_enabled">
              是否啟用
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from './modal.js'
import swal from 'sweetalert'

export default {
  data () {
    return {
      modal: '',
      temp: { imagesUrl: [] },
      isLoading: false
    }
  },
  mixins: [ModalMixin],
  emits: ['getProduct'],
  props: ['tempProduct', 'isNew'],
  methods: {
    updateProduct () {
      this.isLoading = true
      if (!this.temp.title || !this.temp.category || !this.temp.origin_price || !this.temp.price || !this.temp.unit) {
        this.isLoading = false
        swal({
          text: '必填項目都要填寫唷！',
          icon: 'error',
          button: false,
          timer: 1500
        })
        return
      }
      if (!this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.temp.id}`
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
              this.$emit('getProduct')
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
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
              this.$emit('getProduct')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    upload () {
      this.isLoading = true
      const image = document.querySelector('#imageUrl')
      const file = image.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(url, formData)
        .then(res => {
          this.isLoading = false
          this.temp.imageUrl = res.data.imageUrl
          image.value = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    createImage () {
      this.temp.imagesUrl = []
      this.temp.imagesUrl.push('')
    }
  },
  watch: {
    tempProduct () {
      this.temp = this.tempProduct
    }
  }
}
</script>
