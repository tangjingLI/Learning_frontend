import axios from "axios";

//获取所有课程
export function getAllCourses(uid, pageNum) {
    // return axios.get('/api/course/tcourse_list',{
    //     params:{
    //         user_id:uid
    //         pageNum: pageNum
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        courses: [
            {
                id: 1,
                name: "软件工程",
                create_user: "西瓜",
                create_time: "2022-03-12",
                brief: "这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介"
            },
            {
                id: 2,
                name: "云计算",
                create_user: "西瓜",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
            {
                id: 3,
                name: "设计模式",
                create_user: "葡萄",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
            {
                id: 4,
                name: "c++",
                create_user: "西瓜",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
            {
                id: 5,
                name: "编译原理",
                create_user: "西瓜",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
            {
                id: 6,
                name: "数据集成",
                create_user: "葡萄",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
            {
                id: 7,
                name: "编译原理",
                create_user: "西瓜",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
            {
                id: 8,
                name: "数据集成",
                create_user: "葡萄",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
            {
                id: 9,
                name: "编译原理",
                create_user: "西瓜",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
            {
                id: 10,
                name: "数据集成",
                create_user: "葡萄",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
        ],
        totalPage: 12
    }

}

//根据分类查看课程
export function getCoursesByType(uid, typeId, pageNum) {
    // return axios.get('/api/course/list',{
    //     params:{
    //         user_id:id,
    //         classify:typeId,
    //         pageNum: pageNum
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        courses: [
            {
                id: 1,
                name: "软件工程",
                create_user: "西瓜",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
            {
                id: 2,
                name: "云计算",
                create_user: "西瓜",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
            {
                id: 3,
                name: "设计模式",
                create_user: "葡萄",
                create_time: "2022-03-12",
                brief: "这是简介"
            },
        ],
        totalPage: 7
    }
}

//添加课程类别
export function addCoursesType(uid, type) {
    // let data = {
    //     user_id: uid,
    //     name: type
    // }
    // return axios.post('/api/course/classify_add/', data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        code: 0
    }
}

//删除课程分类
export function deleteCoursesType(uid, typeId) {
    // let data = {
    //     user_id: uid,
    //     id:typeId
    // }
    // return axios.post('/api/course/classify_delete/', data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        code: 0
    }

}

//获取课程分类
export function getCourseType(uid) {
    // return axios.get('/api/course/classify_list', {
    //     params: {
    //         user_id: uid
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        classifies: [
            {
                id: 1,
                name: "软件工程"
            },
            {
                id: 2,
                name: "云计算"
            },
            {
                id: 3,
                name: "设计模式"
            },
        ]
    }
}

//删除课程
export function deleteCourse(uid, cid) {
    // let data = {
    //     user_id: uid,
    //     id: cid
    // }
    // return axios.post('/api/course/delete/', data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        code: 0
    }
}

//批量删除课程
export function deleteCoursesGroup(uid, list) {
    // let data = {
    //     user_id: uid,
    //     course_id: list
    // }
    // return axios.post('/api/course/batch_delete/', data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        code: 0
    }
}

//获取能力列表
export function getAbilityList(uid, pageNum) {
    // return axios.get('/api/ability/list',{
    //     params:{
    //         user_id:uid,
    //         pageNum:pageNum
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        abilities: [
            {
                id: 1,
                name: "能力1",
                brief: "这是简介"
            },
            {
                id: 2,
                name: "能力1",
                brief: "这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介"
            },
            {
                id: 3,
                name: "能力1",
                brief: "这是简介"
            },
            {
                id: 4,
                name: "能力1",
                brief: "这是简介"
            },
            {
                id: 5,
                name: "能力1",
                brief: "这是简介"
            },
            {
                id: 6,
                name: "能力1",
                brief: "这是简介"
            },

        ],
        totalPage: 6
    }
}

//获取知识点列表
export function getKnowledgeList(uid, pageNum) {
    // return axios.get('/api/ability/knowledge_list', {
    //     params: {
    //         user_id: uid,
    //         pageNum: pageNum
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return{
        knowledge:[
            {
                id:1,
                name:"知识点1",
                skill_level:"理解"
            },
            {
                id:2,
                name:"知识点1",
                skill_level:"理解"
            },
            {
                id:3,
                name:"知识点1",
                skill_level:"记忆"
            },
            {
                id:4,
                name:"知识点1",
                skill_level:"记忆"
            },
            {
                id:5,
                name:"知识点1",
                skill_level:"记忆"
            },

        ],
        totalPage:8
    }

}

//获取品行列表
export function getQualityList(uid, pageNum) {
    // return axios.get('/api/ability/quality_list', {
    //     params: {
    //         user_id: uid,
    //         pageNum: pageNum
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return{
        qualities:[
            {
                id:1,
                name:"品行1",
            },
            {
                id:2,
                name:"品行1",
            },
            {
                id:3,
                name:"品行1",
            },
            {
                id:4,
                name:"品行1",
            },
            {
                id:5,
                name:"品行1",
            },
            {
                id:6,
                name:"品行1",
            },
            {
                id:7,
                name:"品行1",
            },
        ],
        totalPage:39
    }
}

//

//查看课程
export function getCourseDetail(uid, cid) {
    // return axios.get('/api/course/detail/', {
    //     params: {
    //         user_id: uid,
    //         course_id: cid
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        code: 0
    }
}

//添加知识点
export function addKnowledge(){

}

//添加品行
export function addQuality(){

}

//添加能力
export function addAbility(){

}

//删除知识点
export function deleteKnowledge(uid,kid){
    let data={
        user_id:uid,
        id:kid
    }
    return axios.post('/api/course/knowledge_delete/',data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
}

//删除品行
export function deleteQuality(uid,qid){
    let data={
        user_id:uid,
        id:qid
    }
    return axios.post('/api/course/quality_delete/',data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
}

//删除能力
export function deleteAbility(uid,aid){
    let data={
        user_id:uid,
        id:aid
    }
    return axios.post('/api/course/ability_delete/',data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
}

//添加课程

//修改课程

//添加章节

//修改章节

//删除章节