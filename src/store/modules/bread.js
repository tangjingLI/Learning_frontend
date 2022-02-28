const bread = {
    state: {
        mapTitle:JSON.parse(sessionStorage.getItem("mapTitle")) || {},
        breadList:[],
    },
    mutations: {
        saveMapTitle(state,mapTitle){
            state.mapTitle = mapTitle
            sessionStorage.setItem("mapTitle",JSON.stringify(mapTitle))
        },
        addBreadList(state,newBreadList){
            state.breadList.push(newBreadList)
        },
        saveBreadList(state,breadList){
            state.breadList = breadList
        }
    },
    getters:{
        getBread(state){
            return state.breadList;
        },
        getMapTitle(state){
            return state.mapTitle;
        }
    }
}

export default bread;