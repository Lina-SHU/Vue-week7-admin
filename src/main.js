import { createApp } from 'vue'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import axios from 'axios'

import VueAxios from 'vue-axios'
import VueLoading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css'

import 'bootstrap'

import CKEditor from '@ckeditor/ckeditor5-vue'
import App from './App.vue'
import router from './router'

defineRule('required', required)
defineRule('email', email)
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

const app = createApp(App)
app.use(router)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.use(VueAxios, axios)
app.component('Loading', VueLoading)
app.use(CKEditor)
app.mount('#app')
