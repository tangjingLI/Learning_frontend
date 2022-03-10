import axios from "axios";

export function login(phone, password) {
    let data = {
        uer: {
            userPhone: phone,
            password: password
        }
    }
    // return axios.post('/api/user/userlogin', data)
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })

    return {
        code: 200,
        res: {
            ok: true,
            userId: 1,
        },
        msg: ''
    }
}