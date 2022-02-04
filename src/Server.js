/*
 * @Author: 小方块 
 * @Date: 2022-02-04 13:13:37 
 * @Last Modified by: 小方块
 * @Last Modified time: 2022-02-04 16:24:37
 * desc: 服务类
 */

/**
 * core
*/
const http = require('http')
const fses = require('fs').promises
const { createReadStream, createWriteStream, readFileSync } = require('fs')
const path = require('path')
const url = require('url')
const util = require('util')

/**
 * dependencies
*/
const ejs = require('ejs')
const debug = require('debug')('server-log')
const mime = require('mime')
const colors = require('colors')

const template = readFileSync(path.resolve(__dirname, 'template.ejs'), 'utf-8')

debug('server-log')

class Server {
  constructor(options) {
    this.port = options.port
    this.directory = options.directory
    this.host = options.host
    this.template = template
  }
  start() {
    const server = http.createServer(this._request.bind(this))
    server.listen(this.port, this.host, () => {
      console.log(colors.yellow(`Starting up hardy-server \r\nserving .${this.directory}\r\n`));
      console.log(colors.green(`    http://${this.host}:${this.port}`))
    })
  }
  async _request(req, res) {
    let { pathname } = url.parse(req.url, true)
    pathname = decodeURIComponent(pathname)
    const filePath = path.join(this.directory, pathname)
    try {
      const statObject = await fses.stat(filePath)
      if (statObject.isFile()) {
        this._sendFile(req, res, filePath, statObject)
      } else {
        let concatFilePath = path.join(filePath, 'index1.html')
        try {
          const statObject = await fses.stat(concatFilePath)
          this._sendFile(req, res, concatFilePath, statObject)
        } catch (err) {
          this._sendDirs(req, res, filePath, statObject, pathname)
        }
      }
    } catch (e) {
      this._sendError(req, res, e)
    }
  }
  _sendError(req, res, e) {
    debug('debug: ', e)
    res.statusCode = 404
    res.end('Not Found')
  }
  _sendFile(req, res, filePath, statObject) {
    res.setHeader('content-type', mime.getType(filePath) + ';charset=utf-8')
    let gzip = this._gzip(req, res, filePath, statObject)
    if (gzip) {
      res.setHeader('Content-Encoding', 'gzip')
      createReadStream(filePath).pipe(gzip).pipe(res)
    } else {
      createReadStream(filePath).pipe(res)
    }
  }
  _gzip(req, res, filePath, statObject) {
    if (req.headers['accept-encoding'] && req.headers['accept-encoding'].includes('gzip')) {
      return require('zlib').createGzip() // 创建一个转化流
    } else {
      return false
    }
  }
  async _sendDirs(req, res, filePath, statObject, pathname) {
    try {
      const dirs = (await fses.readdir(filePath)).map(dir => ({
        dir,
        href: path.join(pathname, dir)
      }))

      let templateStr = await ejs.render(this.template, { dirs }, { async: true })
      res.setHeader('content-type', 'text/html;charset=utf-8')
      res.end(templateStr)
    } catch (e) {
      this._sendError(req, res, e)
    }
  }
}

module.exports = Server