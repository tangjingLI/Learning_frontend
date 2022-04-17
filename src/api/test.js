import axios from "axios";
import {baseUrls} from "./baseUrl";


//获取不分页题库列表
export function getTestBankList(id) {
    return axios.get(`${baseUrls.test}/bank/listAll`, {
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
}


//获取题库列表
export function getAllTestBank(id, pageNum) {
    return axios.get(`${baseUrls.test}/bank/list`, {
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

//获取题目列表
export function getTestBank(bid, uid, pageNum) {
    return axios.get(`${baseUrls.test}/question/list`, {
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
    return axios.get(`${baseUrls.test}/question/detail/`, {
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

    return axios.post(`${baseUrls.test}/bank/add`, Form, {
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


    return axios.post(`${baseUrls.test}/bank/delete/`, Form, {
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


    return axios.post(`${baseUrls.test}/bank/edit/`, Form, {
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

//修改题目
export function editTest(values, qid, uid, bid, arr) {
    let question = {
        title: values.title,
        content: values.content,
        answer: values.answer,
        type: values.type,
        analysis: values.analysis,
        consume: values.consume,
        userId: uid,
        bankId: bid,
        id: qid
    }

    let data = {
        choices: arr
    }


    return axios.post(`${baseUrls.test}/question/edit`, data, {
        params: question,
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}


//添加题目
export function addTest(values, uid, bid, arr) {


    let question = {
        title: values.title,
        content: values.content,
        answer: values.answer,
        type: values.type,
        analysis: values.analysis,
        consume: values.consume,
        bankId: bid,
        userId: uid
    }

    let data = {
        choices: arr
    }


    return axios.post(`${baseUrls.test}/question/add`, data, {
        params: question,
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//删除题目
export function deleteTest(uid, qid) {
    let Form = new FormData();
    Form.append("questionId", qid);
    Form.append("userId", uid);

    return axios.post(`${baseUrls.test}/question/delete/`, Form, {
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
export function searchTest(bid, title) {
    return axios.get(`${baseUrls.test}/question/search`, {
        params: {
            bankId: bid,
            title: title
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })

}

//搜索题库
export function searchBank(uid, title) {
    return axios.get(`${baseUrls.test}/bank/search`, {
        params: {
            userId: uid,
            title: title
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })

}

//预览试卷
export function getQuestionList(uid, idList) {
    return axios.post(`${baseUrls.test}/question/showList`, idList, {
        params: {
            userId: uid
        }

    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//获取题目回收站
export function getTestBin(uid, page) {
    return axios.get(`${baseUrls.test}/question/recycle`, {
        params: {
            userId: uid,
            page: page
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

    return axios.post(`${baseUrls.test}/question/restore`, Form, {
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

    return axios.post(`${baseUrls.test}/question/physicalDelete`, Form, {
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
    return axios.get(`${baseUrls.test}/bank/recycle`, {
        params: {
            userId: uid,
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

//恢复题库
export function restoreTestBank(bid, uid) {
    let Form = new FormData();
    Form.append("bankId", bid);
    Form.append("userId", uid);

    return axios.post(`${baseUrls.test}/bank/restore`, Form, {
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

    return axios.post(`${baseUrls.test}/bank/physicalDelete`, Form, {
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
    return axios.post(`${baseUrls.test}/bank/batchDelete`, bidList, {
        params: {
            userId: uid
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//批量删除题目
export function deleteTestGroup(uid, qidList) {
    return axios.post(`${baseUrls.test}/question/batchDelete`, qidList, {
        params: {
            userId: uid
        }

    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}


//绑定知识点
export function bindKnowledge(uid, qid, kList) {
    return axios.post(`${baseUrls.test}/question/editKnowledge`, kList, {
        params: {
            userId: uid,
            questionId: qid
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}
