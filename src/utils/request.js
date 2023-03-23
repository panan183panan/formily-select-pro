import axios from 'axios'
// import {BASE_URL} from'../config/conster'

var instance = axios.create({
    baseURL: 'http://localhost:5001',
    timeout: 1000,
})

// axios.interceptors.request.use(function (config) {
//     // config.headers
//     return config;
//   }, function (error) {
//     return Promise.reject(error);
//   });

// axios.interceptors.response.use(function (response) {
//     return response;
//   }, function (error) {
//     return Promise.reject(error);
//   });


export default instance