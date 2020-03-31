const http = require('http')
const port = 8000
const serveHandle = require('../app')
const server = http.createServer(serveHandle)

server.listen(port)
