const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

const server = http.createServer()
let port = 4000

server.on('request', (req, res) => {
  const { pathname } = url.parse(req.url, true)
  const filePath = path.join(__dirname, pathname)

  fs.stat(filePath, (err, staObj) => {
    if (err) {
      res.end('Not found!!!')
    } else {
      if (staObj.isFile()) {
        fs.createReadStream(filePath).pipe(res)
      } else {
        let file = path.join(filePath, 'index.html')
        fs.stat(file, (err, fileStaObj) => {
          if (err) {
            res.end('Not found!!!')
          } else {
            fs.createReadStream(file).pipe(res)
          }
        })
      }
    }
  })

  // fs.readFile(filePath, (err, data) => {
  //   if (err) return res.end('err: ', err.toString())
  //   res.end(data)
  // })

  // res.end('hello hardy server')
})

server.listen(port, () => {
  console.log('server start at ', port);
})

server.on('error', err => {
  if (err.errno === 'EADDRINUSE') {
    server.listen(++port)
  }
})

