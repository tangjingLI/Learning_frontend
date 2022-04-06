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


//添加课程
export function addCourse(course) {
    let Form = new FormData()
    Form.append("course",course)
    // Form.append("name", course.name)
    // Form.append("brief", course.brief)
    // Form.append("userId", course.userId)
    // Form.append("createTime", course.createTime)
    // Form.append("classifyId", course.classifyId)

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
    return axios.get(`${baseUrls.course}/course/detail`, {
        params: {
            courseId: cid
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })


}

//修改课程

//添加章节

//修改章节

//删除章节

//获取课程能力列表
export function getAbility(courseId,page){
    let Form = new FormData()
    Form.append("courseId",courseId)
    Form.append("page",page)

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
export function getKnowledge(courseId,page){
    let Form = new FormData()
    Form.append("courseId",courseId)
    Form.append("page",page)

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
export function getQuality(courseId,page){
    let Form = new FormData()
    Form.append("courseId",courseId)
    Form.append("page",page)

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
export function getAllQuality() {
    return axios.get(`${baseUrls.course}/quality/listAll`)
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })

}

//删除品行
export function deleteQuality(qid){
    let Form = new FormData()
    Form.append("qualityId",qid)

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