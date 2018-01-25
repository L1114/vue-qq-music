import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/index'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import vueLazyLoad from 'vue-lazyload'
import store from './store'

fastclick.attach(document.body)
Vue.use(vueLazyLoad, {
  loading: require('common/image/default.png')
})
/* eslint-disable no-unused-vars */
import vConsole from 'vconsole'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
