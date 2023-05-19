import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 解决报错→重复进入同一路由地址
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    component: () => import('../views/myHome.vue')
  },
  {
    path: '/mySelf',
    component: () => import('../views/mySelf.vue')
  },
  {
    path: '/myCart',
    component: () => import('../views/myCart.vue')
  },
  {
    path: '/myOrder',
    component: () => import('../views/myOrder.vue')
  },
  {
    path: '/mySetting',
    component: () => import('../views/mySetting.vue')
  },
  {
    path: '/details/:id',
    component: () => import('../views/goodDetails.vue')
  },{
    path: '/login',
    component: () => import('../views/loginPage.vue')
  },{
    path: '/register',
    component: () => import('../views/registerPage.vue')
  },{
    path: '/admin',
    component: () => import('../admin/adminHome.vue')
  },{
    path: '/merchant/merchantGoods',
    component: () => import('../views/merchantGoods.vue')
  },{
    path: '/merchant/merchantOrder',
    component: () => import('../views/merchantOrder.vue')
  },{
    path: '/merchant/merchantSelf',
    component: () => import('../views/merchantSelf.vue')
  },{
    path: '/admin/adminOrder',
    component: () => import('../views/adminOrder.vue')
  },{
    path: '/admin/adminGood',
    component: () => import('../views/adminGood.vue')
  },{
    path: '/admin/adminAccount',
    component: () => import('../views/adminAccount.vue')
  },{
    path: '/admin/adminAccount/User',
    component: () => import('../views/adminUser.vue')
  },{
    path: '/admin/adminAccount/Merchant',
    component: () => import('../views/adminMerchant.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// const VueRouterPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }      //防止重复跳转页面的，没用好像


export default router