const { newGuestbook } = require('../controller/guestbook')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleGuestbookRouter = (req, res) => {
    const method = req.method

    // 新增留言
    if (method === 'POST' && req.path === '/api/guestbook') {
        const resutl = newGuestbook(req.body)

        return resutl.then(data => {
            if (data) {
                return new SuccessModel(data)
            }

            return new ErrorModel(data)
        })
    }
}

module.exports = handleGuestbookRouter
