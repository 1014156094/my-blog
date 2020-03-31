import axios from 'axios'

export default {
    // 登录
    login: data => axios.post('/api/user/login', data),

    // 注册
    register: data => axios.post('/api/user/register', data),
}