import axios from "axios";
import {baseUrls} from "./baseUrl";

// 获取考试库列表
export function getAllPaperBank(id,pageNum) {
    // return axios.get(`${baseUrls.paper}/papers/getAllPapers/`,{
    //     params:{
    //         papersId:id
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
        code: 200,
        res: [
            {
                title: '人机交互试卷库',
                papersInfo: {
                    id: 6,
                    num: 7,
                    creator: '西瓜',
                    isPublic: 0,
                    createTime: ''
                }
            },
            {
                title: 'c++试卷库',
                papersInfo: {
                    id: 8,
                    num: 9,
                    creator: '金毛',
                    isPublic: 1,
                    createTime: ''
                }
            },
        ],
        msg: '',
        totalPage:14
    }
}

//获取试卷库详情
export function getPaperBank(id,pageNum) {
    // return axios.get(`${baseUrls.paper}/paper/ getAllPaper /`,{
    //     params:{
    //         papersId:id
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
        code: 200,
        res: [
            {
                title: "期中测试",
                paperInfo: {
                    status: 0,
                    creator: '金毛',
                    createTime: '',
                    id: 1,
                },
                mag: ''
            },
            {
                title: "期末测试",
                paperInfo: {
                    status: 1,
                    creator: '金毛',
                    createTime: '',
                    id: 6
                },
            }
        ],
        mag: '',
        bankTitle: '人机交互试卷库',
        totalPage:9
    }

}

//获取试卷详情
export function getPaperDetail(id) {
    // return axios.get(`${baseUrls.paper}/paper/ getPaper/`,{
    //     params:{
    //         paperId:id
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        code: 200,
        res:
            {
                title: "期末测试",
                status: 0,
                questions: [
                    {
                        id: 1,
                        title: "猫猫",
                        content: "这里是题目",
                        answer: "这里是答案",
                        type: 2,
                        analysis: "这里是解析",
                        score: 50,
                        sequence: 2,
                        choices: [
                            {
                                number: 'A',
                                content: 'aaa',
                            },
                            {
                                number: 'B',
                                content: 'bbb',
                            },
                        ]
                    },
                    {
                        id: 2,
                        title: "狗狗",
                        content: "这里是题目",
                        answer: "这里是答案",
                        type: 1,
                        analysis: "这里是解析",
                        score: 50,
                        sequence: 1,
                        choices: [
                            {
                                number: 'A',
                                content: 'aaa',
                            },
                            {
                                number: 'B',
                                content: 'bbb',
                            },
                        ]
                    }
                ],
                score: 100,
                bankId: 2
            },
        msg: ''
    }
}

//新建试卷库
export function createPaperBank(title, id, time) {
    // let data = {
    //     title: title,
    //     userId: id,
    //     createTime: time
    // }
    // return axios.post(`${baseUrls.paper}/papers/add`, data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })

    return {
        res: true
    }
}

//删除试卷库
export function deletePaperBank(uid, bid) {
    // let data = {
    //     userId: uid,
    //     paperId: bid
    // }
    // return axios.post(`${baseUrls.paper}/papers/delete/`, data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })

    return {
        res: true
    }
}

//发布试卷
export function uploadPaper(id, name, intro, time) {
    // let data = {
    //     paperId: id,
    //     name: name,
    //     introduction: intro,
    //     time: time
    // }
    // return axios.post(`${baseUrls.paper}/paper/upload/`,data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })

    return {
        res: true
    }
}

//删除试卷
export function deletePaper(uid, pid) {
    // let data={
    //     userId:uid,
    //     paperId:pid
    // }
    // return axios.post(`${baseUrls.paper}/paper/delete/`,data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        res: true
    }
}

//新建试卷
export function addPaper(tests, scores, bankId) {
    let questions = []
    for (let i = 0; i < tests.length; i++) {
        let item = {
            id: tests[i],
            score: scores[i],
            sequence: i
        }
        questions.push(item)
    }
    // console.log(questions)
    let data = {
        questions: questions,
        bankId: bankId
    }
    // return axios.post(`${baseUrls.paper}/paper/addByPaperId`, data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        res: true
    }
}


//获取已发布试卷列表
export function getReleasedPaper(uid,pageNum){
    // return axios.get(`${baseUrls.paper}/paper/ getPaper/`,{
    //     params:{
    //         userId:uid
    //         pageNum:pageNum
    //     }
    // })
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return{
        res:[
            {
                title:"试卷1",
                name:"考试1",
                id:1,
                averageScore:65,
                maxScore:98,
                minScore:20
            },
            {
                title:"试卷2",
                name:"考试2",
                id:2,
                averageScore:75,
                maxScore:88,
                minScore:29
            }
        ],
        totalPage:19
    }
}

//批量删除试卷库
export function deletePaperBankGroup(uid,bidList){
    // let data={
    //     userId:uid,
    //     idList:bidList
    // }
    //
    // return axios.post(`${baseUrls.paper}/papers/delete/`,data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })

    return{
        res:true
    }
}

//批量删除试卷
export function deletePaperGroup(uid,pidList){
    // let data={
    //     userId:uid,
    //     idList:pidList
    // }
    //
    // return axios.post(`${baseUrls.paper}/papers/delete/`,data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })

    return{
        res:true
    }
}