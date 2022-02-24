import Vue from 'vue'
import VueRouter from 'vue-router'
import tHome from '../views/Teacher/Home.vue'
import tLogin from '../views/Teacher/Login.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'tLogin',
        component: tLogin
    },
    {
        path: '/teacher',
        name: 'teacher',
        component: tHome,
        children: []
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '*',
        name: 'notFound',
        component: NotFound
    }
]


const router = new VueRouter({
    routes
})

export default router

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
