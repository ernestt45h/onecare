// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes'

import Vuex from 'Vuex'
import Store from './store/store'

import App from './App'
import Login from './Login.vue'

import jquery from 'jquery'
global.jQuery = jquery;
global.$ = jquery;
let popper = require('popper.js');
let bootstrap = require('bootstrap');
let screenfull = require('../src/assets/js/screenfull');
import 'font-awesome/css/font-awesome.css'
import '../src/assets/css/style.css'
import './assets/css/bootstrap-material-design.min.css'


Vue.use(Router);
Vue.use(Vuex);

Vue.filter('simpleDate', (val)=>{
    let date = new Date(val)
    return date.toLocaleDateString()
})

Vue.filter('captilize', (val)=>{
  if (!val) return ''
  val = val.toString()
  return val.charAt(0).toUpperCase() + val.slice(1)
})

Vue.filter('uppercase', (val)=>{
  if (!val) return ''
  return val.toUpperCase()
})



export const bus = new Vue();

const router = new Router({
    routes: Routes,
    mode: 'history'
});


Vue.config.productionTip = false;

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store: Store.store,
  router,
  components: { App },
  template: '<router-view></router-view>'
})
