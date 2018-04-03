// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import materialize from 'materialize-css'

import store from './store/store'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons/material.css'
import 'font-awesome/css/font-awesome.min.css'

export const bus = new Vue
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
