<template>
  <loading v-model:active="isLoading"/>
  <div class="container py-3">
    <h1>訂單列表</h1>
    <div class="d-flex justify-content-end">
      <button class="btn btn-danger" v-if="orderList.length >=2" @click="deleteAll">刪除所有訂單</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">訂購人姓名</th>
          <th scope="col">訂購人 Email</th>
          <th scope="col">訂購日期</th>
          <th scope="col">是否付款</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderList" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.user.name }}</td>
          <td>{{ order.user.email }}</td>
          <td>{{ new Date(order.create_at*1000).getFullYear() }}/{{ new Date(order.create_at*1000).getMonth()+1 }}/{{ new Date(order.create_at*1000).getDate() }}</td>
          <td>{{ order.is_paid ? '已付款':'未付款' }}</td>
          <td>
            <button class="btn btn-primary me-2" type="button" @click="editOrder(order)">編輯</button>
            <button class="btn btn-outline-danger" type="button" @click="deleteOrder(order.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @get-list="getOrder"></pagination>
    <editModal ref="editModal" :temp-order='tempOrder' @get-order="getOrder"></editModal>
  </div>
</template>

<script>
import pagination from '../../components/Pagination.vue'
import editModal from '../../components/EditOrderModal.vue'
import swal from 'sweetalert'

export default {
  data () {
    return {
      orderList: [],
      pagination: [],
      tempOrder: [],
      isLoading: false
    }
  },
  components: {
    pagination,
    editModal
  },
  methods: {
    getOrder (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(url)
        .then(res => {
          if (res.data.success) {
            this.isLoading = false
            this.orderList = res.data.orders
            this.pagination = res.data.pagination
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteOrder (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${id}`
      this.$http.delete(url)
        .then(res => {
          console.log(res)
          if (res.data.success) {
            this.isLoading = false
            swal({
              text: '刪除成功',
              button: false,
              timer: 1500
            })
            this.getOrder()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteAll () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`
      this.$http.delete(url)
        .then(res => {
          console.log(res)
          if (res.data.success) {
            this.isLoading = false
            swal({
              text: '刪除所有訂單成功',
              button: false,
              timer: 1500
            })
            this.getOrder()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    editOrder (order) {
      this.tempOrder = JSON.parse(JSON.stringify(order))
      this.$refs.editModal.openModal()
    }
  },
  created () {
    this.getOrder()
  }
}
</script>
