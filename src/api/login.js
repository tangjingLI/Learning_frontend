import axios from "axios";
import {baseUrls} from "./baseUrl";

export function login(phone, password) {
    let data = {
        phone: phone,
        password: password
    }

    return axios.post(`${baseUrls.login}/user/userlogin`, data)
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