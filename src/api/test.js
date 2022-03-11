import axios from "axios";

//获取题库列表
export function getAllTestBank(id) {
    // return axios.get('/api/bank/list', {
    //     params: {
    //         userId: id
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
                id: 1,
                title: "数据结构题库",
                isPublic: 0
            },
            {
                id: 2,
                title: "云计算题库",
                isPublic: 1
            },
            {
                id: 3,
                title: "设计模式题库",
                isPublic: 1
            },
            {
                id: 4,
                title: "人机交互题库",
                isPublic: 0
            },
            {
                id: 5,
                title: "c++题库",
                isPublic: 0
            },

        ]
    }
}

//获取题库详情
export function getTestBank(bid, uid) {
    // return axios.get('/api/bank/details/', {
    //         params: {
    //             bankId: bid,
    //             userId: uid
    //         }
    //     }
    // )
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
                    id: 1,
                    title: "青蛙跳台阶",
                    content: "啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦拉鲁拉鲁来了来了啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦拉鲁拉鲁来了来了",
                    type: 1,
                    consume: 4,
                    rate: 0.45
                },
                {
                    id: 2,
                    title: "蚂蚁上树",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 10,
                    rate: 0.5
                },
                {
                    id: 3,
                    title: "循环链表",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 9,
                    rate: 0.89
                },
                {
                    id: 4,
                    title: "最高水位",
                    content: "啦啦啦啦啦",
                    type: 3,
                    consume: 3,
                    rate: 0.67
                },
                {
                    id: 5,
                    title: "月亮弯弯",
                    content: "啦啦啦啦啦",
                    type: 2,
                    consume: 18,
                    rate: 0.32
                },
                {
                    id: 6,
                    title: "小摩托",
                    content: "啦啦啦啦啦",
                    type: 3,
                    consume: 9,
                    rate: 0.68
                },
                {
                    id: 7,
                    title: "猫猫虫",
                    content: "啦啦啦啦啦",
                    type: 1,
                    consume: 9,
                    rate: 0.67
                },
                {
                    id: 8,
                    title: "青蛙跳台阶",
                    content: "啦啦啦啦啦",
                    type: 1,
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
                    id: 12,
                    title: "猫猫虫",
                    content: "啦啦啦啦啦",
                    type: 1,
                    consume: 9,
                    rate: 0.67
                },

            ]
        },
        qPublic: 1
    }
}

//获取题目详情
export function getTestDetail(id) {
    // return axios.get('/api/question/detail/', {
    //         params: {
    //             questionId: id
    //         }
    //     }
    // )
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    return {
        question: {
            id: 1,
            bankId: 1,
            title: "青蛙跳台阶",
            content: "一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法?",
            answer: "A",
            type: 1,
            analysis: "这里是分析",
            consume: 10,
            rate: 0.7
        },
        choices: [
            {
                content: "青蛙一步两步往上跳",
                number: 'A'
            },
            {
                content: "青蛙一次跳一步",
                number: 'B'
            },
            {
                content: "青蛙一次跳两步",
                number: 'B'
            }
        ],
        knowledges: [
            {
                knwoledgeId: 1,
                skillId: 'xxx'
            },
            {
                knwoledgeId: 2,
                skillId: 'xxx'
            }
        ]
    }
}

//新建题库
export function createTestBank(title, isPublic, id) {
    // let data = {
    //     title: title,
    //     isPublic: isPublic,
    //     userId: id
    // }
    // return axios.post('/api/bank/add', data)
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

//删除题库
export function deleteTestBank(bId, uId) {
    // let data = {
    //     bankId: bId,
    //     userId: uId
    // }
    // return axios.post('/api/bank/delete/', data)
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

//编辑题库
export function editTestBank(bId, uId, title,isPublic) {
    // let data = {
    //     bankId: bId,
    //     userId: uId,
    //     title: title,
    //     isPublic: isPublic
    // }
    // return axios.post('/api/bank/edit/', data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
}

//添加题目
export function addTest(values,uid, bid, num) {
    // let arr = [];
    // let list = ['A', 'B', 'C', 'D', 'E', 'F'];
    // while (num > 0) {
    //     num--;
    //     arr.push({
    //         number:list[num],
    //         content:values.number
    //     })
    // }
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
export function deleteTest(uid,qid) {
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
    return {
        code: true
    }
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
export function getTestBin(uid) {
    // return axios.get('/api/bank/recycle',{
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
    return {
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
    }
}

//恢复题目
export function restoreTest(qid, uid) {
    // let data = {
    //     questionId: qid,
    //     userId: uid
    // }
    // return axios.post('/api/question/restore', data)
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

//彻底删除题目
export function dropTest(qid, uid) {
    // let data = {
    //     questionId: qid,
    //     userId: uid
    // }
    // return axios.post('/api/question/physicalDelete', data)
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

//获取题库回收站
export function getTestBankBin(uid) {
    // return axios.get('/api/bank/recycle',{
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
    return {
        banks: [
            {
                id: 1,
                title: "数据结构题库",
                isPublic: 0
            },
            {
                id: 5,
                title: "c++题库",
                isPublic: 0
            },

        ]
    }

}

//恢复题库
export function restoreTestBank(bid, uid) {
    // let data = {
    //     bankId: bid,
    //     userId: uid
    // }
    // return axios.post('/api/bank/restore', data)
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

//彻底删除题库
export function dropTestBank(bid, uid) {
    // let data = {
    //     bankId: bid,
    //     userId: uid
    // }
    // return axios.post('/api/bank/physicalDelete', data)
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

//批量删除题库
export function deleteTestBankGroup(uid,bidList){
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

    return{
        code:0
    }
}

//批量删除题目
export function deleteTestGroup(uid,qidList){
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

    return{
        code:0
    }
}