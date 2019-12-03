import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e216de72 = () => interopDefault(import('../pages/assets/index.vue' /* webpackChunkName: "pages/assets/index" */))
const _80ce7440 = () => interopDefault(import('../pages/order/index.vue' /* webpackChunkName: "pages/order/index" */))
const _4f59ee50 = () => interopDefault(import('../pages/payment/index.vue' /* webpackChunkName: "pages/payment/index" */))
const _13f39e48 = () => interopDefault(import('../pages/profit/index.vue' /* webpackChunkName: "pages/profit/index" */))
const _d80a5564 = () => interopDefault(import('../pages/withdraw/index.vue' /* webpackChunkName: "pages/withdraw/index" */))
const _bf984a6c = () => interopDefault(import('../pages/assets/logs.vue' /* webpackChunkName: "pages/assets/logs" */))
const _7eb41e58 = () => interopDefault(import('../pages/goods/category.vue' /* webpackChunkName: "pages/goods/category" */))
const _c66b1a10 = () => interopDefault(import('../pages/goods/list.vue' /* webpackChunkName: "pages/goods/list" */))
const _18f0eebe = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/assets",
    component: _e216de72,
    name: "assets"
  }, {
    path: "/order",
    component: _80ce7440,
    name: "order"
  }, {
    path: "/payment",
    component: _4f59ee50,
    name: "payment"
  }, {
    path: "/profit",
    component: _13f39e48,
    name: "profit"
  }, {
    path: "/withdraw",
    component: _d80a5564,
    name: "withdraw"
  }, {
    path: "/assets/logs",
    component: _bf984a6c,
    name: "assets-logs"
  }, {
    path: "/goods/category",
    component: _7eb41e58,
    name: "goods-category"
  }, {
    path: "/goods/list",
    component: _c66b1a10,
    name: "goods-list"
  }, {
    path: "/",
    component: _18f0eebe,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
