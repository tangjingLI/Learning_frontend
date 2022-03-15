import axios from "axios";

axios.defaults.baseURL = 'http://123.57.150.160:8900';


//获取不分页题库列表
export function getTestBankList(id) {
    return axios.get('/bank/listAll', {
        params: {
            userId: id
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
    // return {
    //     code: 200,
    //     res: [
    //         {
    //             id: 1,
    //             title: "数据结构题库",
    //             isPublic: 0
    //         },
    //         {
    //             id: 2,
    //             title: "云计算题库",
    //             isPublic: 1
    //         },
    //         {
    //             id: 3,
    //             title: "设计模式题库",
    //             isPublic: 1
    //         },
    //         {
    //             id: 4,
    //             title: "人机交互题库",
    //             isPublic: 0
    //         },
    //         {
    //             id: 5,
    //             title: "c++题库",
    //             isPublic: 0
    //         },
    //
    //     ]
    // }
}


//获取题库列表
export function getAllTestBank(id, pageNum) {
    return axios.get('/bank/list', {
        params: {
            userId: id,
            page: pageNum
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })

}

//获取题库详情
export function getTestBank(bid, uid, pageNum) {
    return axios.get('/bank/details/', {
            params: {
                bankId: bid,
                userId: uid,
                page: pageNum
            }
        }
    )
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })

}

//获取题目详情
export function getTestDetail(id) {
    return axios.get('/question/detail/', {
            params: {
                questionId: id
            }
        }
    )
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//新建题库
export function createTestBank(title, isPublic, id) {
    let Form = new FormData();
    Form.append("title", title);
    Form.append("isPublic", isPublic);
    Form.append("userId", id);

    return axios.post('/bank/add', Form, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log("error: " + error);
        })

}

//删除题库
export function deleteTestBank(bid, uid) {
    let Form = new FormData();
    Form.append("bankId", bid);
    Form.append("userId", uid);


    return axios.post('/bank/delete/', Form, {
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

//编辑题库
export function editTestBank(bid, uid, title, isPublic) {
    let Form = new FormData();
    Form.append("id", bid);
    Form.append("userId", uid);
    Form.append("title", title);
    Form.append("isPublic", isPublic);


    return axios.post('/bank/edit/', Form, {
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

//添加题目
export function addTest(values, uid, bid, num) {
    let arr = [];
    let list = ['A', 'B', 'C', 'D', 'E', 'F'];
    while (num > 0) {
        num--;
        arr.push({
            number: list[num],
            content: values.number
        })
    }

    let question = {
        title: values.title,
        content: values.content,
        answer: values.answer,
        type: values.type,
        analysis: values.analysis,
        consume: values.consume,
    }

    let Form = new FormData();
    Form.append("question", question);
    Form.append("userId", uid);
    Form.append("id", bid);
    Form.append("choices", arr);


    return axios.post('/bank/edit/', Form, {
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
    // let data = {
    //     question: {
    //         title: values.title,
    //         content: values.content,
    //         answer: values.answer,
    //         type: values.type,
    //         analysis: values.analysis,
    //         consume: values.consume,
    //     },
    //     choices: arr,
    //     id: id,
    //     userId:uid
    // }
    // return axios.post('/api/question/add', data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        code: true
    }
}

//删除题目
export function deleteTest(uid, qid) {
    // let data={
    //     questionId:qid,
    //     userId:uid
    // }
    // return axios.post('/api/question/delete/',data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    // return {
    //     code: 0
    // }
    let Form = new FormData();
    Form.append("questionId", qid);
    Form.append("userId", uid);

    return axios.post('/question/delete/', Form, {
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

//搜索题目
export function searchTest(title) {
    // return axios.get('/api/question/search/',{
    //     params:{
    //         title:title
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
        res: {
            bankTitle: "数据结构题库",
            questions: [
                {
                    id: 11,
                    title: "小摩托",
                    type: 3,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 12,
                    title: "猫猫虫",
                    type: 1,
                    consume: 9,
                    rate: 0.67
                },

            ]
        },
        qPublic: 1
    }

}

//预览试卷
export function getQuestionList(id, tests) {
    let data = {
        userId: id,
        questions: tests
    }

    return {
        res: {
            questions: [
                {
                    id: 9,
                    title: "蚂蚁上树",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 10,
                    title: "月亮弯弯",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 11,
                    title: "小摩托",
                    content: "啦啦啦啦啦",
                    type: 3,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 9,
                    title: "蚂蚁上树",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 10,
                    title: "月亮弯弯",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 11,
                    title: "小摩托",
                    content: "啦啦啦啦啦",
                    type: 3,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 9,
                    title: "蚂蚁上树",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 10,
                    title: "月亮弯弯",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 11,
                    title: "小摩托",
                    content: "啦啦啦啦啦",
                    type: 3,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 9,
                    title: "蚂蚁上树",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 10,
                    title: "月亮弯弯",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 11,
                    title: "小摩托",
                    content: "啦啦啦啦啦",
                    type: 3,
                    consume: 9,
                    rate: 0.67
                },
            ]
        }
    }
}

//获取题目回收站
export function getTestBin(uid, page) {
    return axios.get('/question/recycle',{
        params:{
            userId:uid,
            page:page
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//恢复题目
export function restoreTest(qid, uid) {
    let Form = new FormData();
    Form.append("questionId", qid);
    Form.append("userId", uid);

    return axios.post('/question/restore', Form, {
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

//彻底删除题目
export function dropTest(qid, uid) {
    let Form = new FormData();
    Form.append("questionId", qid);
    Form.append("userId", uid);

    return axios.post('/question/physicalDelete', Form, {
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

//获取题库回收站
export function getTestBankBin(uid, pageNum) {
    return axios.get('/bank/recycle',{
        params:{
            userId:uid,
            page:pageNum
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//恢复题库
export function restoreTestBank(bid, uid) {
    let Form = new FormData();
    Form.append("bankId", bid);
    Form.append("userId", uid);

    return axios.post('/bank/restore', Form, {
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

//彻底删除题库
export function dropTestBank(bid, uid) {
    let Form = new FormData();
    Form.append("bankId", bid);
    Form.append("userId", uid);

    return axios.post('/bank/physicalDelete', Form, {
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

//批量删除题库
export function deleteTestBankGroup(uid, bidList) {
    // let data={
    //     userId:uid,
    //     idList:bidList
    // }
    //
    // return axios.post('/api/bank/batchDelete',data)
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

//批量删除题目
export function deleteTestGroup(uid, qidList) {
    // let data={
    //     userId:uid,
    //     idList:qidList
    // }
    //
    // return axios.post('/api/question/batchDelete',data)
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