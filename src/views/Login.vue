<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h1>後台管理登入</h1>
        <Form v-slot="{ errors }" @submit="onSubmit">
          <div class="mb-3">
            <label for="email">Email</label>
            <Field type="text" :class="{ 'is-invalid': errors['email'] }" class="form-control" id="email" name="email" rules="email|required" v-model="user.username"></Field>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="password">密碼</label>
            <Field type="password" :class="{ 'is-invalid': errors['密碼'] }" class="form-control" id="password" name="密碼" rules="required" v-model="user.password"></Field>
            <error-message name="密碼" class="invalid-feedback"></error-message>
          </div>
          <button type="submit" class="btn btn-primary">登入</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    onSubmit (values) {
      const url = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(url, this.user)
        .then(res => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
            this.$router.push('/admin')
          } else {
            swal({
              text: '登入失敗',
              icon: 'error',
              button: false,
              timer: 1500
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
