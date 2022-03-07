import axios from "axios";

// 获取考试库列表
export function getAllPaperBank(id) {
    // return axios.get('/papers/getAllPapers/',{
    //     params:{
    //         papersId:id
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
    }
}

//获取试卷库详情
export function getPaperBank(id) {
    // return axios.get('/paper/ getAllPaper /',{
    //     params:{
    //         papersId:id
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
        bankTitle: '人机交互试卷库'
    }

}

//获取试卷详情
export function getPaperDetail(id) {
    // return axios.get('/paper/ getPaper/',{
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
    // return axios.post('/ papers/add', data)
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
    // return axios.post('/papers/delete/', data)
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
    // return axios.post('/paper/upload/',data)
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
export function deletePaper(uid,pid){
    // let data={
    //     userId:uid,
    //     paperId:pid
    // }
    // return axios.post('/paper/delete/',data)
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
