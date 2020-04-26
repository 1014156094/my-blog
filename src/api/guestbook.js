// 留言相关接口

import axios from 'axios'

// 新增留言
export const addGuestbook = data => axios.post('/api/guestbook', data)