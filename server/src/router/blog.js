const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)

        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)

        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    if (method === 'POST' && req.path === '/api/blog/new') {
        const resutl = newBlog(req.body)

        return resutl.then(data => {
            return new SuccessModel(data)
        })
    }

    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }

            return new ErrorModel('更新博客失败！')
        })
    }

    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id, req.body.author)

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }

            return new ErrorModel('删除博客失败！')
        })
    }
}

module.exports = handleBlogRouter
