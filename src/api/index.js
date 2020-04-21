// 通用接口

import axios from 'axios'

// 登录
export const  login = data => axios.post('/api/user/login', data)

// 注册
export const  register = data => axios.post('/api/user/register', data)
