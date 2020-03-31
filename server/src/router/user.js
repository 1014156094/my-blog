const { login, register } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = ({ method, body, session, path }, res) => {
    // 登录
    if (method === 'POST' && path === '/api/user/login') {
        const result = login(body)

        return result.then(data => {
            if (data && data.username) {
                // 设置 session
                // session.username = data.username
                return new SuccessModel(data)
            }
            return new ErrorModel('登录失败')
        })
    }

    // 注册
    if (method === 'POST' && path === '/api/user/register') {
        const result = register(body)

        return result.then(data => {
            if (data) {
                return new SuccessModel(body)
            }
            return new ErrorModel('注册失败')
        })
    }
}

module.exports = handleUserRouter
