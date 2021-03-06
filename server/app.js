const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const handleGuestbookRouter = require('./src/router/guestbook')
const { get, set } = require('./src/db/redis')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

// 用于处理 post data
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (['GET', 'DELETE'].includes(req.method)) {
            resolve({})
            return
        }
        
        if (!(/application\/json/.test(req.headers['content-type']))) {
            resolve({})
            return
        }

        let postData = ''

        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }

            resolve(
                JSON.parse(postData)
            )
        })
    })
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json') // 设置返回格式 JSON

    const url = req.url
    req.path = url.split('?')[0] // 获取 path
    req.query = querystring.parse(url.split('?')[1]) // 解析 query
    req.cookie = {}

    const cookieStr = req.headers.cookie || ''  // k1=v1;k2=v2;k3=v3

    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // 解析 session 
    let needSetCookie = false
    let userId = req.cookie.userid

    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值
        set(userId, {})
    }
    req.sessionId = userId
    
    get(userId).then(sessionData => {
        if (sessionData === null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }

        // 处理 post data
        return getPostData(req)
    })
        .then(postData => {
            
            req.body = postData

            // 处理 blog 路由
            const blogResult = handleBlogRouter(req, res)
            
            if (blogResult) {
                blogResult.then(blogData => {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }

                    res.end(
                        JSON.stringify(blogData)
                    )
                })
                return
            }

            // 处理 user 路由
            const userResult = handleUserRouter(req, res)
            
            if (userResult) {
                userResult.then(userData => {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }

                    res.end(
                        JSON.stringify(userData)
                    )
                })
                return
            }

            // 处理 guestbook 路由
            const guestbookResult = handleGuestbookRouter(req, res)
            
            if (guestbookResult) {
                guestbookResult.then(guestbookData => {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }

                    res.end(
                        JSON.stringify(guestbookData)
                    )
                })
                return
            }

            // 未命中路由，返回 404
            res.writeHead(404, { "Content-type": "text/plain" })
            res.write("404 Not Found\n")
            res.end()
        })
}

module.exports = serverHandle
