import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('@/components/Index.vue')
const NewReceipe = () => import('@/components/NewReceipe/NewReceipe.vue')
const EditReceipe = () => import('@/components/EditReceipe/EditReceipe.vue')
const Testing = () => import('@/components/Testing.vue')

const routes = [
  { path: '/', component: Index, name: 'index' },
  { path: '/testing', component: Testing, name: 'testing' },
  { path: '/add', component: NewReceipe, name: 'new receipe' },
  { path: '/edit/:slug', component: EditReceipe, name: 'edit receipe' },
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router