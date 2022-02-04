const http = require('http')
const url = require('url')

const server = http.createServer()
  
  server.on('request', (req, res) => {
  // console.log(req.method);
  // let { pathname, query } = url.parse(req.url, true)
  // console.log(pathname, query);
  // console.log('http version: ', req.httpVersion);
  // console.log('headers: ', req.headers);

  let arr = []
  req.on('data', chunk => {
    console.log('data: ', chunk);
    arr.push(chunk)
  })

  req.on('end', () => {
    console.log('end');
    let str = Buffer.concat(arr).toString()
    console.log('str: ', str);
  })
  
    res.statusCode = 200
    res.statusMessage = 'ok'

  res.end('hello word')
})

let port = 4000
server.listen(port, () => {
  console.log('start at ', port);
})

server.on('error', (err) => {
  if (err.errno === 'EADDRINUSE') {
    server.listen(++port)
  }
})