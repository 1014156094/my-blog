const { exec } = require('../db/mysql')

// 格式化单引号
const singleQuotesFormat = (str) => str ? str.replace(/'/g, `\\'`) : str

// 新增留言
const newGuestbook = ({ content }) => {
    content = singleQuotesFormat(content)
    
    const date = new Date()
    const createTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`
    const sql = `
        insert into guestbooks (content, createtime)
        values ('${content}', '${createTime}')
    `

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

module.exports = {
    newGuestbook,
}
