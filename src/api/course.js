import axios from "axios";
import {baseUrls} from "./baseUrl";

//获取所有课程
export function getAllCourses(uid, pageNum) {
    let Form = new FormData()
    Form.append("page", pageNum)
    Form.append("userId", uid)
    return axios.post(`${baseUrls.course}/course/listUser`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })

}

//根据分类查看课程
export function getCoursesByType(uid, typeId, pageNum) {
    let Form = new FormData()
    Form.append("page", pageNum)
    Form.append("userId", uid)
    Form.append("classifyId", typeId)
    return axios.post(`${baseUrls.course}/course/listClassify`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//添加课程类别
export function addCoursesType(uid, type) {
    // let data = {
    //     userId: uid,
    //     name: type
    // }
    let Form = new FormData()
    Form.append("name", type)
    Form.append("userId", uid)
    return axios.post(`${baseUrls.course}/classify/add`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//删除课程分类
export function deleteCoursesType(uid, typeId) {
    let Form = new FormData()
    Form.append("classifyId", typeId)
    Form.append("userId", uid)
    return axios.post(`${baseUrls.course}/classify/delete`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })

}

//获取课程分类
export function getCourseType(uid) {
    return axios.get(`${baseUrls.course}/classify/listAll`)
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//删除课程
export function deleteCourse(uid, cid) {
    let Form = new FormData()
    Form.append("courseId", cid)
    Form.append("userId", uid)
    return axios.post(`${baseUrls.course}/course/delete`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//批量删除课程
export function deleteCoursesGroup(uid, idList) {
    let data = {
        idList: idList,
        userId: uid
    }
    return axios.post(`${baseUrls.course}/course/batchDelete`, data, {
        headers: {
            'Content-Type': "application/json;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}


//添加课程
export function addCourse(course) {
    let Form = new FormData()
    // Form.append("course", course)
    Form.append("name", course.name)
    Form.append("brief", course.brief)
    Form.append("userId", course.userId)
    // Form.append("createTime", course.createTime)
    Form.append("classifyId", course.classifyId)

    return axios.post(`${baseUrls.course}/course/add`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })

}


//查看课程
export function getCourseDetail(uid, cid) {
    let Form = new FormData()
    Form.append("courseId", cid)

    return axios.post(`${baseUrls.course}/course/detail`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })


}

//获取课程能力列表
export function getAbility(courseId, page) {
    let Form = new FormData()
    Form.append("courseId", courseId)
    Form.append("page", page)

    return axios.post(`${baseUrls.course}/ability/list`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//获取课程知识点列表
export function getKnowledge(courseId, page) {
    let Form = new FormData()
    Form.append("courseId", courseId)
    Form.append("page", page)

    return axios.post(`${baseUrls.course}/knowledge/listAll`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//获取课程品行列表
export function getQuality(courseId, page) {
    let Form = new FormData()
    Form.append("courseId", courseId)
    Form.append("page", page)

    return axios.post(`${baseUrls.course}/quality/listCourse`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//获取品行列表
export function getAllQuality(pageNum) {
    return axios.get(`${baseUrls.course}/quality/listAll`, {
        params: {
            pageNum: pageNum
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })

}

//删除品行
export function deleteQuality(qid) {
    let Form = new FormData()
    Form.append("qualityId", qid)

    return axios.post(`${baseUrls.course}/quality/delete/`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//批量删除品行
export function deleteQualityGroup(qualityList) {
    return axios.post(`${baseUrls.course}/quality/batchDelete`, qualityList, {
        headers: {
            'Content-Type': "application/json;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);

        })
}

//删除能力
export function deleteAbility(aid) {
    let Form = new FormData()
    Form.append("abilityId", aid)

    return axios.post(`${baseUrls.course}/ability/delete/`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//删除知识点
export function deleteKnowledge(kid) {
    let Form = new FormData()
    Form.append("knowledgeId", kid)

    return axios.post(`${baseUrls.course}/knowledge/delete/`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//添加能力
export function addAbility(cid, name,brief) {
    let Form = new FormData()
    Form.append("courseId", cid)
    Form.append("name", name)
    Form.append("brief", brief)


    return axios.post(`${baseUrls.course}/ability/add`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//添加知识点
export function addKnowledge(cid, name,item,brief) {
    let Form = new FormData()
    Form.append("courseId", cid)
    Form.append("name", name)
    Form.append("courseSectionId", item)
    Form.append("brief", brief)

    return axios.post(`${baseUrls.course}/knowledge/add/`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//添加品行
export function addQuality(name) {
    let Form = new FormData()
    Form.append("name", name)

    return axios.post(`${baseUrls.course}/quality/add/`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//获取能力的知识点列表
export function getKnowledgeByAbility(aid, page) {
    let Form = new FormData()
    Form.append("abilityId", aid)
    Form.append("page", page)

    return axios.post(`${baseUrls.course}/knowledge/list`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//获取能力的品行列表
export function getQualityByAbility(aid, page) {
    let Form = new FormData()
    Form.append("abilityId", aid)
    Form.append("page", page)


    return axios.post(`${baseUrls.course}/quality/listAbility`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//能力绑定知识点
export function bindKnowledge(aid, kid, skill, name, cid) {
    let Form = new FormData()
    Form.append("abilityId", aid)
    Form.append("knowledgeId", kid)
    Form.append("skillId", skill)
    Form.append("name", name)
    Form.append("courseId", cid)


    return axios.post(`${baseUrls.course}/knowledge/add`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//能力绑定品行
export function bindQuality(aid, qid, cid, name) {
    let Form = new FormData()
    Form.append("abilityId", aid)
    Form.append("qualityId", qid)
    Form.append("courseId", cid)
    Form.append("name", name)


    return axios.post(`${baseUrls.course}/quality/add`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//查看能力详情
export function getAbilityInfo(aid) {
    let Form = new FormData()
    Form.append("abilityId", aid)

    return axios.post(`${baseUrls.course}/ability/abilityInfo`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//查看知识点详情
export function getKnowledgeInfo(kid) {
    let Form = new FormData()
    Form.append("knowledgeId", kid)

    return axios.post(`${baseUrls.course}/knowledge/info`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//修改能力
export function editAbility(aid, cid, name,brief) {
    let Form = new FormData()
    Form.append("id", aid)
    Form.append("courseId", cid)
    Form.append("name", name)
    Form.append("brief", brief)

    return axios.post(`${baseUrls.course}/ability/edit/`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//修改知识点
export function editKnowledge(kid, cid, name,brief) {
    let Form = new FormData()
    Form.append("id", kid)
    Form.append("courseId", cid)
    Form.append("name", name)
    Form.append("brief", brief)


    return axios.post(`${baseUrls.course}/knowledge/edit/`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//修改品行
export function editQuality(kid, name) {
    let Form = new FormData()
    Form.append("id", kid)
    Form.append("name", name)
    Form.append("brief", 'brief')


    return axios.post(`${baseUrls.course}/quality/edit/`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//编辑课程
export function editCourse(cid, uid, name, brief,url) {
    let Form = new FormData()
    Form.append("id", cid)
    Form.append("name", name)
    Form.append("brief", brief)
    Form.append("userId", uid)
    Form.append("picture", url)


    return axios.post(`${baseUrls.course}/course/edit`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//上传图片
export function uploadPicture(file) {
    let Form = new FormData()
    Form.append("file", file)
    return axios.post(`${baseUrls.course}/upload/image`, Form, {
        headers: {
            'Content-Type': "multipart/form-data;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//上传图片2
// export function editPicture(cid, uid, name, brief, url) {
//     let Form = new FormData()
//     Form.append("id", cid)
//     Form.append("name", name)
//     Form.append("brief", brief)
//     Form.append("userId", uid)
//     Form.append("picture", url)
//
//
//     return axios.post(`${baseUrls.course}/course/edit`, Form, {
//         headers: {
//             'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
//         },
//     })
//         .then(res => {
//             return res.data
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// }

//章节列表
export function getChapter(cid) {
    let Form = new FormData()
    Form.append("courseId", cid)

    return axios.post(`${baseUrls.course}/parent/list`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//增加章节
export function addChapter(uid, cid, name) {
    let Form = new FormData()
    Form.append("userId", uid)
    Form.append("courseId", cid)
    Form.append("name", name)

    return axios.post(`${baseUrls.course}/parent/add`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//删除章节
export function deleteChapter(uid, pid) {
    let Form = new FormData()
    Form.append("userId", uid)
    Form.append("parentId", pid)


    return axios.post(`${baseUrls.course}/parent/delete`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}


//小节列表
export function getItem(cid) {
    let Form = new FormData()
    Form.append("parentId", cid)

    return axios.post(`${baseUrls.course}/courseSection/list`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//新增小节
export function addItem(uid, cid, name, pid, url) {
    let Form = new FormData()
    Form.append("userId", uid)
    Form.append("courseId", cid)
    Form.append("parentId", pid)
    Form.append("name", name)
    Form.append("videoUrl", url)

    return axios.post(`${baseUrls.course}//courseSection/add`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}


//删除小节
export function deleteItem(uid, cid) {
    let Form = new FormData()
    Form.append("userId", uid)
    Form.append("courseSectionId", cid)

    return axios.post(`${baseUrls.course}/courseSection/delete`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}


//知识点列表
export function getAllKnowledge(page) {
    return axios.get(`${baseUrls.course}/knowledge/listKnowledge`, {
        params: {
            pageNum: page
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//获取所有资源
export function getAllItems(cid) {
    let Form = new FormData()
    Form.append("courseId", cid)

    return axios.post(`${baseUrls.course}/courseSection/listCourse`, Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}