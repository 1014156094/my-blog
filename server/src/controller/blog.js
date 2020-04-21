const { exec } = require('../db/mysql')

const formatSingleQuotes = (str)=> str ? str.replace(/'/g, `\\'`) : str

// 获取博客列表
const getList = ({author = '', keyword = ''}) => {
    let sql = `select id, title, content, author, date_format(createtime, '%Y-%m-%d %H:%i:%s') as createtime from blogs where 1=1 `

    if (author) {
        sql += `and author='${author}' `
    }

    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by createtime desc;`
    return exec(sql)
}

// 获取博客详情
const getDetail = ({id}) => {
    const sql = `select * from blogs where id='${id}'`

    return exec(sql).then(rows => {
        return rows[0]
    })
}

// 新增博客
const newBlog = (blogData = {}) => {
    const date = new Date()
    const title = blogData.title
    const content = formatSingleQuotes(blogData.content)
    const author = blogData.author
    const createTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`
    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', '${createTime}', '${author}')
    `

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

// 更新博客
const updateBlog = ({ id, title, content, author }) => {
    content = formatSingleQuotes(content)
    const sql = `update blogs set title='${title}', content='${content}', author='${author}' where id='${id}'`

    return exec(sql).then(updateData => {
        if (updateData.affectedRows) {
            return true
        }

        return false
    })
}

// 删除博客
const delBlog = ({id}) => {
    const sql = `delete from blogs where id='${id}'`

    return exec(sql).then(delData => {
        if (delData.affectedRows) {
            return true
        }

        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
