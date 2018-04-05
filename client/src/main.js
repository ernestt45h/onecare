// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Routes from './routes'
import Vuetify from 'Vuetify'

import Vuex from 'Vuex'
import Store from './store/store'

import App from './App'
import Login from './Login.vue'

import jquery from 'jquery'
global.jQuery = jquery
global.$ = jquery
let popper = require('popper.js')
let bootstrap = require('bootstrap')
let jqueryCookie = require('../src/assets/js/jquery.cookie')
let screenfull = require('../src/assets/js/screenfull')
import 'font-awesome/css/font-awesome.css'
import './assets/css/bootstrap-material-design.min.css'
import '../src/assets/css/style.css'


Vue.use(Router)
Vue.use(Resource)
Vue.use(Vuex)

export const bus = new Vue()
export const userBus = new Vue()
export const crudBus = new Vue()

const router = new Router({
    routes: Routes,
    mode: 'history'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store: Store.store,
  router,
  components: { App },
  template: '<router-view></router-view>',
})
