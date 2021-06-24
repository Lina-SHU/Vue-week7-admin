<template>
  <loading v-model:active="isLoading"/>
  <div class="container py-3">
    <h1>優惠券管理</h1>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" @click="updateModal('new')">新增優惠券</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">優惠券名稱</th>
          <th scope="col">折扣數</th>
          <th scope="col">到期日</th>
          <th scope="col">是否啟用</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in couponList" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}%</td>
          <td>{{ new Date(coupon.due_date*1000).getFullYear() }}/{{ new Date(coupon.due_date*1000).getMonth()+1 }}/{{ new Date(coupon.due_date*1000).getDate() }}</td>
          <td>{{ coupon.is_enabled ? '啟用':'未啟用' }}</td>
          <td>
            <button class="btn btn-primary me-2" type="button" @click="updateModal('edit', coupon)">編輯</button>
            <button class="btn btn-outline-danger" type="button" @click="deleteCoupon(coupon.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @get-list="getCoupon"></pagination>
    <updateModal ref="updateModal" :is-new="isNew" :temp-coupon="tempCoupon" @get-coupon="getCoupon"></updateModal>
  </div>
</template>

<script>
import pagination from '../../components/Pagination.vue'
import updateModal from '../../components/UpdateCouponModal.vue'
import swal from 'sweetalert'

export default {
  data () {
    return {
      couponList: [],
      pagination: [],
      isNew: true,
      tempCoupon: [],
      isLoading: false
    }
  },
  components: {
    pagination,
    updateModal
  },
  methods: {
    getCoupon (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http.get(url)
        .then(res => {
          if (res.data.success) {
            this.isLoading = false
            this.couponList = res.data.coupons
            this.pagination = res.data.pagination
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateModal (value, coupon) {
      if (value === 'edit') {
        this.isNew = false
        this.tempCoupon = JSON.parse(JSON.stringify(coupon))
      } else if (value === 'new') {
        this.isNew = true
        this.tempCoupon = {}
      }
      this.$refs.updateModal.openModal()
    },
    deleteCoupon (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`
      this.$http.delete(url)
        .then(res => {
          if (res.data.success) {
            this.isLoading = false
            swal({
              text: '刪除成功',
              button: false,
              timer: 1500
            })
            this.getCoupon()
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getCoupon()
  }
}
</script>
