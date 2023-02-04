import Vue from 'vue'
import App from './App.vue'
// import './plugins/element.js'
import router from './router'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
import dayjs from 'dayjs'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme
// 导入NProgress包对应的JS和CSS
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在request拦截器中展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须return config
  return config
})
// 在response拦截器中隐藏进度条 Npreogress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

Vue.filter('dateFormat', function (value) {
  return dayjs(value).format(`YYYY-MM-DD HH:mm:ss`)
})
Vue.use(VueQuillEditor, /* { default global options } */)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
