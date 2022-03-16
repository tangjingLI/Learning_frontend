import axios from "axios";
import {baseUrls} from "./baseUrl";

export function login(phone, password) {
    let LoginForm = new FormData();
    LoginForm.append("phone",phone);
    LoginForm.append("password",password);
    return axios.post(`${baseUrls.login}/user/userlogin`,LoginForm, {
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
    //     code: 0,
    //     data: {
    //         userId: 1,
    //     },
    // }
}