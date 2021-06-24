<template>
  <loading v-model:active="isLoading"/>
  <div class="modal fade" id="modal" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">訂單編輯</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="orderId" class="form-label">訂單編號</label>
            <input type="text" class="form-control" id="orderId" disabled v-model="temp.id">
          </div>
          <div class="accordion accordion-flush" id="orderAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  訂購人資訊
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#orderAccordion">
                <div class="accordion-body">
                  <div class="mb-3">
                    <label for="orderName" class="form-label">訂單人姓名</label>
                    <input type="text" class="form-control" id="orderName" v-model="temp.user.name">
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">訂單人Email</label>
                    <input type="text" class="form-control" id="email" v-model="temp.user.email">
                  </div>
                  <div class="mb-3">
                    <label for="tel" class="form-label">訂單人電話</label>
                    <input type="tel" class="form-control" id="tel" v-model="temp.user.tel">
                  </div>
                  <div class="mb-3">
                    <label for="address" class="form-label">訂單人地址</label>
                    <input type="text" class="form-control" id="address" v-model="temp.user.address">
                  </div>
                  <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <input type="text" class="form-control" id="message" v-model="temp.message" disabled>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  訂單資訊
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#orderAccordion">
                <div class="accordion-body">
                  <div class="mb-3">
                    <label for="total" class="form-label">訂單總額 <small class="text-danger">*必填</small></label>
                    <input type="number" class="form-control" id="total" v-model.number="temp.total">
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="isPaid" v-model="temp.is_paid">
                    <label class="form-check-label" for="isPaid">
                      是否付款
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="editOrder">編輯</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from './modal.js'
import swal from 'sweetalert'

export default {
  data () {
    return {
      modal: '',
      temp: {
        user: {}
      },
      isLoading: false
    }
  },
  mixins: [modalMixin],
  emits: ['getOrder'],
  props: ['tempOrder'],
  methods: {
    editOrder () {
      this.isLoading = true
      if (!this.temp.total) {
        this.isLoading = false
        swal({
          text: '必填項目要填寫唷！',
          icon: 'error',
          button: false,
          timer: 1500
        })
        return
      }
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.temp.id}`
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
            this.$emit('getOrder')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    tempOrder () {
      this.temp = this.tempOrder
    }
  }
}
</script>
