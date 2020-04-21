const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证
const loginCheck = (req) => {
    console.log(req.session)
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('登录失败')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    const isRESTful = /^\/api\/blog\/\d+$/.test(req.path)

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog') {
        const result = getList(req.query)

        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if (method === 'GET' && isRESTful) {
        const result = getDetail(req.query)

        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新增博客
    if (method === 'POST' && req.path === '/api/blog') {
        const loginCheckResult = loginCheck(req)

        if (loginCheckResult) {
            return loginCheckResult
        }

        const resutl = newBlog(req.body)

        return resutl.then(data => {
            return new SuccessModel(data)
        })
    }
    
    // 更新博客
    if (method === 'PUT' && isRESTful) {
        const result = updateBlog(req.body)

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }

            return new ErrorModel('更新博客失败！')
        })
    }

    // 删除博客
    if (method === 'DELETE' && isRESTful) {
        const result = delBlog(req.query)

        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }

            return new ErrorModel('删除博客失败！')
        })
    }
}

module.exports = handleBlogRouter
