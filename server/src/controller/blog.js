const { exec } = require('../db/mysql')

// 创建时间格式化 SQL
const createtimeFormatSQL = `date_format(createtime, '%Y-%m-%d %H:%i:%s')`

// 格式化单引号
const singleQuotesFormat = (str) => str ? str.replace(/'/g, `\\'`) : str

// 获取博客总数
const getTotal = () => {
    return exec(`select count(*) as total from blogs;`).then(data => {
        return data[0].total
    })
}

// 获取博客列表
const getList = ({ keyword = '', page = 1, pageSize = 10 }) => {
    const limitEnd = page * pageSize
    const limitStart = limitEnd - pageSize
    let sql = `select id, title, content, ${createtimeFormatSQL} as createtime from blogs where 1=1 `

    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by createtime desc limit ${limitStart},${limitEnd};`

    return exec(sql)
}

// 获取博客详情
const getDetail = ({ id }) => {
    const sql = `select *, ${createtimeFormatSQL} as createtime from blogs where id='${id}'`

    return exec(sql).then(rows => {
        return rows[0]
    })
}

// 新增博客
const newBlog = (blogData = {}) => {
    const date = new Date()
    const title = blogData.title
    const content = singleQuotesFormat(blogData.content)
    const createTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`
    const sql = `
        insert into blogs (title, content, createtime)
        values ('${title}', '${content}', '${createTime}')
    `

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

// 更新博客
const updateBlog = ({ id, title, content }) => {
    content = singleQuotesFormat(content)
    const sql = `update blogs set title='${title}', content='${content}' where id='${id}'`

    return exec(sql).then(updateData => {
        if (updateData.affectedRows) {
            return true
        }

        return false
    })
}

// 删除博客
const delBlog = ({ id }) => {
    const sql = `delete from blogs where id='${id}'`

    return exec(sql).then(delData => {
        if (delData.affectedRows) {
            return true
        }

        return false
    })
}

module.exports = {
    getTotal,
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
