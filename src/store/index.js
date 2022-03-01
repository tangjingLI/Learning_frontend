import Vue from 'vue'
import Vuex from 'vuex'
import teacher from "./modules/teacher";
import bread from "./modules/bread";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        teacher,
        // bread
    }
})
