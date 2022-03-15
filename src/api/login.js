import axios from "axios";
// axios.defaults.baseURL = 'http://123.57.150.160:8899';


export function login(phone, password) {
    let LoginForm = new FormData();
    LoginForm.append("phone",phone);
    LoginForm.append("password",password);
    return axios.post('/user/userlogin',LoginForm, {
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

    // return {
    //     code: 200,
    //     res: {
    //         ok: true,
    //         userId: 1,
    //     },
    //     msg: ''
    // }
}