// 博客相关接口

import axios from 'axios'

// 新增博客
export const addBlog = data => axios.post('/api/blog', data)

// 更新博客
export const setBlog = data => axios.put(`/api/blog/${data.id}`, data)

// 删除博客
export const delBlog = params => axios.delete(`/api/blog/${params.id}`, { params })

// 获取博客详情
export const getBlogDetail = params => axios.get(`/api/blog/${params.id}`, { params })

// 获取博客列表
export const getBlogList = params => axios.get(`/api/blog`, { params })
