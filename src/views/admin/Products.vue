<template>
  <loading v-model:active="isLoading"/>
  <div class="container py-3">
    <h1>商品列表</h1>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" @click="updateModal('new')">新增商品</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th width="20%">商品圖片</th>
          <th scope="col">商品名稱</th>
          <th scope="col">商品售價</th>
          <th scope="col">是否啟用</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productList" :key="product.id" class="align-middle">
          <td>
            <div class="image">
              <img :src="product.imageUrl" alt="pic" class="img-fluid">
            </div>
          </td>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.is_enabled ? '啟用' : '未啟用'}}</td>
          <td>
            <button type="button" class="btn btn-primary me-2" @click="updateModal('edit', product)">編輯</button>
            <button type="button" class="btn btn-outline-danger" @click="deleteProduct(product.id, pagination.current_page)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @get-list="getProduct"></pagination>
    <updateModal ref="updateModal" :temp-product="tempProduct" :is-new="isNew"  @get-product="getProduct"></updateModal>
  </div>
</template>

<style>
.image{
  height: 100px;
  overflow: hidden;
}
img{
  object-fit: cover;
}
</style>

<script>
import pagination from '../../components/Pagination.vue'
import updateModal from '../../components/UpdateProductModal.vue'
import swal from 'sweetalert'

export default {
  data () {
    return {
      productList: [],
      pagination: [],
      tempProduct: [],
      isNew: true,
      isLoading: false
    }
  },
  components: {
    pagination,
    updateModal
  },
  methods: {
    getProduct (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.$http.get(url)
        .then(res => {
          if (res.data.success) {
            this.isLoading = false
            this.productList = res.data.products
            this.pagination = res.data.pagination
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct (id, page) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`
      this.$http.delete(url)
        .then(res => {
          if (res.data.success) {
            this.isLoading = false
            swal({
              text: '刪除成功',
              button: false,
              timer: 1500
            })
            this.getProduct(page)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateModal (value, product) {
      if (value === 'edit') {
        this.isNew = false
        this.tempProduct = JSON.parse(JSON.stringify(product))
      } else if (value === 'new') {
        this.isNew = true
        this.tempProduct = { imagesUrl: [] }
      }
      this.$refs.updateModal.openModal()
    }
  },
  created () {
    this.getProduct()
  }
}
</script>
