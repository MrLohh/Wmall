import Vue from 'vue'
import VueRouter from 'vue-router'

//路由组件懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

//安装插件
Vue.use(VueRouter);

//配置相关路由映射
const routes = [
  {
    path: '',
    redirect: '/home' //重定向
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]
//创建router对象
const router = new VueRouter({
  routes,
  mode: 'history' //使用history模式
})

//导出router对象
export default router
