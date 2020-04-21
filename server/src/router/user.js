const { login, register } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    // 登录
    if (req.method === 'POST' && req.path === '/api/user/login') {
        const result = login(req.body)

        return result.then(data => {
            if (data && data.username) {
                // 设置 session
                req.session.username = data.username
                // 同步到 redis
                set(req.sessionId, req.session)

                return new SuccessModel(data)
            }
            return new ErrorModel('登录失败')
        })
    }

    // 注册
    if (req.method === 'POST' && req.path === '/api/user/register') {
        const result = register(req.body)

        return result.then(data => {
            if (data) {
                return new SuccessModel(req.body)
            }
            return new ErrorModel('注册失败')
        })
    }
}

module.exports = handleUserRouter
