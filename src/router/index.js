import Vue from 'vue'
import VueRouter from 'vue-router'
import tHome from '../views/Teacher/Home.vue'
import tLogin from '../views/Teacher/Login.vue'
import PaperList from '../views/Teacher/PaperList.vue'
import TestList from '../views/Teacher/TestList.vue'
import TestBank from '../views/Teacher/TestBank.vue'
import TestInfo from "../views/Teacher/TestInfo";
import NotFound from '../views/NotFound.vue'
import CourseList from "../views/Teacher/CourseList";
import CourseInfo from "../views/Teacher/CourseInfo";
import Control from "../views/Teacher/Control";
import PaperBank from "../views/Teacher/PaperBank";
import PaperInfo from "../views/Teacher/PaperInfo";
import CreatePaper from "../views/Teacher/CreatePaper";
import ReleasedPaper from "../views/Teacher/ReleasedPaper";
import TestBin from "../views/Teacher/TestBin";
import TestBankBin from "../views/Teacher/TestBankBin";
import Quality from "../views/Teacher/Quality";
import Ability from "../views/Teacher/Ability";

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

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
        children: [
            {
                path: 'control',
                name: 'control',
                component: Control
            },
            {
                path: 'quality',
                name: 'quality',
                component: Quality
            },

            {
                path: 'ability/:abilityId',
                name: 'ability',
                component: Ability
            },
            {
                path: 'courseList',
                name: 'courseList',
                component: CourseList
            },
            {
                path: 'courseInfo/:courseId',
                name: 'courseInfo',
                component: CourseInfo
            },
            {
                path: 'paperBank',
                name: 'paperBank',
                component: PaperBank
            },
            {
                path: 'paperList/:bankId',
                name: 'paperList',
                component: PaperList
            },
            {
                path: 'paperInfo/:paperId',
                name: 'paperInfo',
                component: PaperInfo
            },
            {
                path: 'testBank',
                name: 'testBank',
                component: TestBank
            },
            {
                path: 'testList/:bankId',
                name: 'testList',
                component: TestList
            },
            {
                path: 'testInfo/:testId',
                name: 'testInfo',
                component: TestInfo
            },
            {
                path: '/teacher',
                redirect: '/teacher/control'
            },
            {
                path: 'createPaper/:bankId',
                name: 'createPaper',
                component: CreatePaper
            },
            {
                path: 'releasedPaper',
                name: 'releasedPaper',
                component: ReleasedPaper
            },
            {
                path: 'testBin',
                name: 'testBin',
                component: TestBin
            },
            {
                path: 'testBankBin',
                name: 'testBankBin',
                component: TestBankBin
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
    mode:"hash",
    routes
})

export default router

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
