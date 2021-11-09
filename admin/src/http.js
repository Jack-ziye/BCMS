//在Main.js中引用http.js

import Vue from "vue";
import router from "./router/index";
import axios from "axios";

const http = axios.create({
    baseURL: "http://" + location.hostname + ":3000/admin/api"
})


// 请求拦截
http.interceptors.request.use(config => {
    if (sessionStorage.token)
        config.headers.Authorization = 'Bearer ' + sessionStorage.token;
    return config;
}, err => {
    return Promise.reject(err)
})

// 响应拦截
http.interceptors.response.use(res => {
    if (res.data.message) {
        Vue.prototype.$message({
            type: 'success',
            message: res.data.message
        })
    }

    return res

}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    if (err.response.status === 401) {
        router.push('/login');
    }
    return Promise.reject(err)
})

export default http