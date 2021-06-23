import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'login',
        component: () => import('../views/Login.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/Backend.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/Products.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/Order.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/Coupon.vue')
      },
      {
        path: 'article',
        component: () => import('../views/admin/Article.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savePosition) {
    return {
      top: 500
    }
  }
})

export default router
