import Vue from 'vue'
import VueRouter from 'vue-router'
import tHome from '../views/Teacher/Home.vue'
import tLogin from '../views/Teacher/Login.vue'
import Paper from '../views/Teacher/Paper.vue'
import Test from '../views/Teacher/Test.vue'
import TestBank from '../views/Teacher/TestBank.vue'
import NotFound from '../views/NotFound.vue'
import Exam from '../views/Teacher/Exam.vue'

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
        meta: { title: '首页' },
        component: tHome,
        children: [
            {
                path: 'paper',
                name: 'Paper',
                meta: { title: '试卷管理' },
                component: Paper
            },
            {
                path: 'exam',
                name: 'Exam',
                meta: { title: '题库管理' },
                component: Exam,
                children:[
                    {
                        path: 'test',
                        name: 'Test',
                        meta: { title: '题目列表' },
                        component: Test
                    },
                    {
                        path: 'testBank',
                        name: 'TestBank',
                        meta: { title: '题库列表' },
                        component: TestBank
                    }
                ]
            }
        ]
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
