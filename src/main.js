import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import HighchartsVue from 'highcharts-vue'

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Vuex);
Vue.use(HighchartsVue)

router.beforeEach((to, from, next) => {
    let phone = store.getters.getTeacher.phone;
    if (to.path == '/logout') {
        window.sessionStorage.clear();
        store.dispatch('asyncUpdateTeacher', {phone: '', id: ''})
        next('/login');
    } else if (to.path == '/login') {
        if (phone != '') {
            next('/teacher');
        }
    } else if (phone == '') {
        next('/login');
    }
    next();
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
