import axios from "axios";
import {baseUrls} from "./baseUrl";

//获取所有课程
export function getAllCourses(uid, pageNum) {
    // return axios.get(`${baseUrls.course}/course/tcourse_list`,{
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
    // return axios.get(`${baseUrls.course}/course/list`,{
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
    // return axios.post(`${baseUrls.course}/course/classify_add/`, data)
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
    // return axios.post(`${baseUrls.course}/course/classify_delete/`, data)
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
    // return axios.get(`${baseUrls.course}/course/classify_list`, {
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
    // return axios.post(`${baseUrls.course}/course/delete/`, data)
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
    // return axios.post(`${baseUrls.course}/course/batch_delete/`, data)
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
    // return axios.get(`${baseUrls.course}/ability/list`,{
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
    // return axios.get(`${baseUrls.course}/ability/knowledge_list`, {
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
    return {
        knowledge: [
            {
                id: 1,
                name: "知识点1",
                skill_level: "理解"
            },
            {
                id: 2,
                name: "知识点1",
                skill_level: "理解"
            },
            {
                id: 3,
                name: "知识点1",
                skill_level: "记忆"
            },
            {
                id: 4,
                name: "知识点1",
                skill_level: "记忆"
            },
            {
                id: 5,
                name: "知识点1",
                skill_level: "记忆"
            },

        ],
        totalPage: 8
    }

}

//获取品行列表
export function getQualityList(uid, pageNum) {
    // return axios.get(`${baseUrls.course}/ability/quality_list`, {
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
    return {
        qualities: [
            {
                id: 1,
                name: "品行1",
            },
            {
                id: 2,
                name: "品行1",
            },
            {
                id: 3,
                name: "品行1",
            },
            {
                id: 4,
                name: "品行1",
            },
            {
                id: 5,
                name: "品行1",
            },
            {
                id: 6,
                name: "品行1",
            },
            {
                id: 7,
                name: "品行1",
            },
        ],
        totalPage: 39
    }
}


//添加知识点
export function addKnowledge(uid, name, skill_level) {
    // let data = {
    //     user_id: uid,
    //     knowledge:{
    //         name: name,
    //         skill_level:skill_level
    //     },
    // }
    // return axios.post(`${baseUrls.course}/ability/knowledge_add/`, data)
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

//添加品行
export function addQuality(uid, name) {
    // let data = {
    //     user_id: uid,
    //     quality:{
    //         name: name
    //     }
    // }
    // return axios.post(`${baseUrls.course}/ability/quality_add/`, data)
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

//添加能力
export function addAbility(uid, name, brief) {
    // let data = {
    //     user_id: uid,
    //     ability: {
    //         name: name,
    //         brief: brief
    //     }
    // }
    // return axios.post(`${baseUrls.course}/ability/add/`, data)
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

//删除知识点
export function deleteKnowledge(uid, kid) {
    // let data={
    //     user_id:uid,
    //     id:kid
    // }
    // return axios.post(`${baseUrls.course}/course/knowledge_delete/`,data)
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

//删除品行
export function deleteQuality(uid, qid) {
    // let data={
    //     user_id:uid,
    //     id:qid
    // }
    // return axios.post(`${baseUrls.course}/course/quality_delete/`,data)
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

//删除能力
export function deleteAbility(uid, aid) {
    // let data={
    //     user_id:uid,
    //     id:aid
    // }
    // return axios.post(`${baseUrls.course}/course/ability_delete/`,data)
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

//按能力查看知识点
export function getKnowledgeListByAbility(uid, aid, pageNum) {
    // return axios.get(`${baseUrls.course}/ability/knowledge_select_list`, {
    //     params: {
    //         user_id: uid,
    //         ability_id: aid,
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
        knowledge: [
            {
                id: 1,
                name: "知识点1",
                skill_level: "理解"
            },
            {
                id: 2,
                name: "知识点1",
                skill_level: "理解"
            },


        ],
        totalPage: 17
    }

}

//按能力查看品行
export function getQualityListByAbility(uid, aid, pageNum) {
    // return axios.get(`${baseUrls.course}/ability/quality_select_list`, {
    //     params: {
    //         user_id: uid,
    //         ability_id: aid,
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
        qualities: [
            {
                id: 1,
                name: "品行1",
            },
            {
                id: 2,
                name: "品行1",
            },
            {
                id: 3,
                name: "品行1",
            },

        ],
        totalPage: 24
    }

}

//能力解绑知识点
export function unbindKnowledge(uid, aid, list) {
    // let data={
    //     user_id:uid,
    //     ability_id:aid,
    //     id_list:list
    // }
    // return axios.post(`${baseUrls.course}/ability/knowledge_unbind/`,data)
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

//能力解绑品行
export function unbindQuality(uid, aid, list) {
    // let data={
    //     user_id:uid,
    //     ability_id:aid,
    //     id_list:list
    // }
    // return axios.post(`${baseUrls.course}/ability/quality_unbind/`,data)
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

//能力绑定知识点
export function bindKnowledge(uid, aid, list) {
    // let data={
    //     user_id:uid,
    //     ability_id:aid,
    //     id_list:list
    // }
    // return axios.post(`${baseUrls.course}/ability/knowledge_bind/`,data)
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

//能力绑定品行
export function bindQuality(uid, aid, list) {
    // let data={
    //     user_id:uid,
    //     ability_id:aid,
    //     id_list:list
    // }
    // return axios.post(`${baseUrls.course}/ability/quality_bind/`,data)
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


//添加课程
export function addCourse(course) {
    return {
        code: 0
    }
}


//查看课程
export function getCourseDetail(uid, cid) {
    // return axios.get(`${baseUrls.course}/course/detail/`, {
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
        course: {
            name: "c++",
            picture: '',
            brief: '这是简介'
        },
        chapters: [
            {
                id: 1,
                name: "章节1",
                children: [
                    {
                        id: 1,
                        name: "小节1",
                        video_url: '',
                        create_time: "2022-3-7",
                        create_user: "西瓜"
                        //其他选项
                    },
                    {
                        id: 2,
                        name: "小节1",
                        video_url: '',
                        create_time: "2022-3-7",
                        create_user: "西瓜"
                        //其他选项
                    }
                ]
            },
            {
                id: 2,
                name: "章节2",
                children: [
                    {
                        id: 1,
                        name: "小节1",
                        video_url: '',
                        create_time: "2022-3-7",
                        create_user: "西瓜"
                        //其他选项
                    }
                ]
            }
        ],
        abilities: [
            {
                id: 1,
                name: "团队协作"
            },
            {
                id: 2,
                name: "超能力"
            }
        ]
    }
}

//修改课程

//添加章节

//修改章节

//删除章节