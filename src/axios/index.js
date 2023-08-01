// 封装 axios 的 基本配置，进行复用
import axios from "axios";
// 创建实例对axios进行配置
const http = axios.create({
    baseURL: 'http://8.129.190.90:19527',
    method:"GET"
  });

  //  请求前拦截
http.interceptors.request.use((config)=>{
    config.headers.Authorization = localStorage.getItem('token');  
    return config
})


// 响应后拦截
http.interceptors.response.use((res) => {
    let data = res.data;
    return  data
})

export default http