import Vue from 'vue'
import VueRouter from 'vue-router'
import tHome from '../views/Teacher/Home.vue'
import tLogin from '../views/Teacher/Login.vue'
import Paper from '../views/Teacher/Paper.vue'
import Test from '../views/Teacher/Test.vue'
import TestBank from '../views/Teacher/TestBank.vue'
import NotFound from '../views/NotFound.vue'
import Course from "../views/Teacher/Course";
import CourseInfo from "../views/Teacher/CourseInfo";
import Control from "../views/Teacher/Control";
import PaperBank from "../views/Teacher/PaperBank";
import PaperInfo from "../views/Teacher/PaperInfo";
import Task from "../views/Teacher/Task";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'tLogin',
        component: tLogin
    },
    {
        path: '/teacher',
        name: '首页',
        component: tHome,
        children: [
            {
                path: '/',
                name: '控制台',
                component: Control,
            },
            {
                path: 'course',
                name: '课程列表',
                component: Course,
            },
            {
                path: 'course/:courseId',
                name: '课程列表',
                component: CourseInfo,
                mate: {
                    url: '/teacher/course'
                },

            },
            {
                path: 'paper',
                name: '试卷库列表',
                component: PaperBank
            },
            {
                path: 'paper/:bankId',
                name: '试卷库列表',
                component: Paper
            },
            {
                path: 'paper/:bankId/:paperId',
                name: '试卷列表',
                component: PaperInfo
            },
            {
                path: 'test',
                name: '题库列表',
                component: TestBank
            },
            {
                path: 'test/:bankId',
                name: '题库列表',
                component: Test
            },
            {
                path: 'task',
                name: '目标与任务',
                component: Task
            },
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
