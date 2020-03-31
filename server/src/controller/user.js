const { exec } = require('../db/mysql')

const login = ({username, password}) => {
    const sql = `select username from users where username='${username}' and password='${password}'`

    return exec(sql).then(rows => {
        return rows[0]
    })
}

const register = ({username, password})=>{
    const sql = `insert into users (username, password) values ('${username}', '${password}')`

    return exec(sql).then(data=>{
        return data
    })
}

module.exports = {
    login,
    register
}
