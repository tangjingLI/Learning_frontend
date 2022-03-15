import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from "axios";

Vue.config.productionTip = false;
// axios.defaults.baseURL = 'http://123.57.150.160:8899';

Vue.use(Antd);
Vue.use(Vuex);

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
