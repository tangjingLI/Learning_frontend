import axios from "axios";

//获取所有课程
export function getAllCourses(uid){
    // return axios.get('/api/course/tcourse_list',{
    //     params:{
    //         userId:uid
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
}

//根据分类查看课程
export function getCoursesByType(uid,type){
    // return axios.get('/api',{
    //     params:{
    //         userId:id,
    //         type:type
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
}

//添加课程类别
export function addCoursesType(uid,type){
    let data={
        userId:uid,
        type:type
    }
    return axios.post('/api/course/sub_classify_add/',data)
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//添加课程
export function addCourses(uid,type){
    let data={
        userId:uid,
        type:type
    }
    return axios.post('/api/course/add/',data)
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//删除课程
export function deleteCourses(uid,type){
    let data={
        userId:uid,
        type:type
    }
    return axios.post('/api/course/delete/',data)
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//获取课程分类
export function getCourseType(uid){
    return{
        res:["类型1","类型2"]
    }
}