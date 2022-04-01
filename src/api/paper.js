import axios from "axios";
import {baseUrls} from "./baseUrl";

// 获取考试库列表
export function getAllPaperBank(id, pageNum) {
    let data = {
        userId: id,
        pageNum: pageNum
    }

    return axios.post(`${baseUrls.paper}/papers/getAllPapers/`, data, {
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

// 考试库模糊搜索
export function getPaperBankByName(id, pageNum, name) {
    let data = {
        userId: id,
        pageNum: pageNum,
        name: name
    }

    return axios.post(`${baseUrls.paper}/papers/getAllPapers/`, data, {
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


//获取试卷库详情
export function getPaperBank(id, pageNum) {
    let data = {
        papersId: id,
        currentPage: pageNum
    }
    return axios.post(`${baseUrls.paper}/paper/selectPaperByPapersId`, data, {
        headers: {
            'Content-Type': "application/json;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error)
        })
}

//试卷模糊搜索
export function getPaperByName(id, pageNum, paperName) {
    let data = {
        papersId: id,
        currentPage: pageNum,
        paperName: paperName
    }
    return axios.post(`${baseUrls.paper}/paper/selectAllPaper`, data, {
        headers: {
            'Content-Type': "application/json;charset=utf-8"
        },
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error)
        })
}

//获取试卷详情
export function getPaperDetail(id) {
    return axios.get(`${baseUrls.paper}/paper/selectPaperById`, {
        params: {
            paperId: id
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//新建试卷库
export function createPaperBank(title, id, isPublic) {
    let data = {
        papersName: title,
        createId: id,
        isPublic: isPublic
    }

    return axios.post(`${baseUrls.paper}/papers/insertPapers`, data, {
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

//删除试卷库
export function deletePaperBank(uid, bid) {
    return axios.get(`${baseUrls.paper}/papers/delPapersById`, {
        params: {
            id: bid
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//发布试卷
export function uploadPaper(paperId, examTime, remark) {
    let data = {
        paperId: paperId,
        examTime: examTime,
        remark: remark
    }

    return axios.post(`${baseUrls.paper}/paper/publishPaper`, data, {
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

//删除试卷
export function deletePaper(uid, pid) {

    return axios.get(`${baseUrls.paper}/paper/delPaper`, {
        params: {
            paperId: pid
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//新建试卷
export function addPaper(tests, scores, bankId, uid, isPublic, paperName, score) {
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
        bankId: bankId,
        createId: uid,
        isPublic: isPublic,
        paperName: paperName,
        score: score
    }
    return axios.post(`${baseUrls.paper}/paper/insertPaper`, data, {
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


//获取已发布试卷列表
export function getReleasedPaper(uid, pageNum) {
    let data={
        userId: uid,
        pageNum: pageNum,
        status: 1
    }
    return axios.post(`${baseUrls.paper}/paper/selectAllPaper`, data, {
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

//批量删除试卷库
export function deletePaperBankGroup(uid, bidList) {
    return axios.post(`${baseUrls.paper}/papers/delPapers`, bidList, {
        headers: {
            'Content-Type': "application/json;charset=utf-8"
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })

}

//批量删除试卷
export function deletePaperGroup(uid, pidList) {
    return axios.post(`${baseUrls.paper}/paper/delBatchPaper`, pidList, {
        headers: {
            'Content-Type': "application/json;charset=utf-8"
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}

//修改试卷库
export function editPaperBank(papersId, papersName, isPublic) {
    return axios.get(`${baseUrls.paper}/papers/upIsPublicAndPapersName`, {
        params: {
            papersId: papersId,
            papersName: papersName,
            isPublic: isPublic
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}


//编辑试卷
export function editPaper(paperId, paperName, isPublic) {
    return axios.get(`${baseUrls.paper}/paper/updIsPublicAndPaperName`, {
        params: {
            paperId: paperId,
            paperName: paperName,
            isPublic: isPublic
        }
    })
        .then(res => {
            return res.data
        })
        .catch(function (error) {
            console.log(error);
        })
}