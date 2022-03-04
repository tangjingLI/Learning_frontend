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
    return{
        code:200,
        res:[
            {
                title:'人机交互试卷库',
                papersInfo:{
                    id:6,
                    num:7,
                    creator:'西瓜',
                    isPublic:0,
                    createTime:''
                }
            },
            {
                title:'c++试卷库',
                papersInfo:{
                    id:8,
                    num:9,
                    creator:'金毛',
                    isPublic:1,
                    createTime:''
                }
            },
        ],
        msg:'',
    }
}

//获取试卷库详情
export function getPaperBank(id){
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
    return{
        code:200,
        res:[
            {
                title:"期中测试",
                paperInfo:{
                    status:0,
                    creator:'金毛',
                    createTime:'',
                    id:1,
                },
                mag:''
            },
            {
                title:"期末测试",
                paperInfo:{
                    status:1,
                    creator:'金毛',
                    createTime:'',
                    id:6
                },
            }
        ],
        mag:'',
        bankTitle:'人机交互试卷库'
    }

}

//获取试卷详情
export function getPaperDetail(id){
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
    return{
        code:200,
        res:
            {
                title:"期末测试",
                questions:[
                    {
                        id:1,
                        title:"猫猫",
                        content:"这里是题目",
                        answer: "这里是答案",
                        type:2,
                        analysis: "这里是解析",
                        score:50,
                        sequence:2,
                        choices:[
                            {
                                number:'A',
                                content:'aaa',
                            },
                            {
                                number:'B',
                                content:'bbb',
                            },
                        ]
                    },
                    {
                        id:2,
                        title:"狗狗",
                        content:"这里是题目",
                        answer: "这里是答案",
                        type:1,
                        analysis: "这里是解析",
                        score:50,
                        sequence:1,
                        choices:[
                            {
                                number:'A',
                                content:'aaa',
                            },
                            {
                                number:'B',
                                content:'bbb',
                            },
                        ]
                    }
                ],
                score:100,
                bankId:2
            },
        msg:''
    }
}