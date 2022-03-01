const teacher = {
    state: {
        user: window.sessionStorage.getItem('user') != null ? JSON.parse(window.sessionStorage.getItem('user')) :
            {
                phone: '',
                id:''
            }
    },
    getters: {
        getTeacher(state) {
            return state.user;
        }
    },
    mutations: {
        updateTeacher(state, user) {
            state.user = user;
        }
    },
    actions: {
        asyncUpdateTeacher(context, user) {
            context.commit('updateTeacher', user);
        }
    }
}

export default teacher;