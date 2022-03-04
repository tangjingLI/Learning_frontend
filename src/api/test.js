import axios from "axios";

//获取题库列表
export function getAllTestBank(id) {
    // return axios.get('/bank/list', {
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
export function getTestBank(id) {
    // return axios.get('/bank/details/', {
    //         params: {
    //             bankId: id,
    //             userId: this.$store.getters.getTeacher.phone
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
                    type: 1
                },
                {
                    id: 2,
                    title: "蚂蚁上树",
                    type: 2
                },
                {
                    id: 3,
                    title: "循环链表",
                    type: 2
                },
                {
                    id: 4,
                    title: "最高水位",
                    type: 3
                },
                {
                    id: 5,
                    title: "月亮弯弯",
                    type: 2
                },
                {
                    id: 6,
                    title: "小摩托",
                    type: 3
                },
                {
                    id: 7,
                    title: "猫猫虫",
                    type: 1
                },
                {
                    id: 8,
                    title: "青蛙跳台阶",
                    type: 1
                },
                {
                    id: 9,
                    title: "蚂蚁上树",
                    type: 2
                },
                {
                    id: 10,
                    title: "月亮弯弯",
                    type: 2
                },
                {
                    id: 11,
                    title: "小摩托",
                    type: 3
                },
                {
                    id: 12,
                    title: "猫猫虫",
                    type: 1
                },

            ]
        },
        qPublic: 1
    }
}

//获取题目详情
export function getTestDetail(id) {
    // return axios.get('/question/detail/', {
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
                knwoledgeId:1,
                skillId:'xxx'
            },
            {
                knwoledgeId:2,
                skillId:'xxx'
            }
        ]
    }
}

export function createTestBank(title, isPublic, id) {
    let data = {
        title: title,
        isPublic: isPublic,
        userId: id
    }
    return axios.post('/bank/add', data)
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}
