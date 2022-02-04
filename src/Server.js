/*
 * @Author: 小方块 
 * @Date: 2022-02-04 13:13:37 
 * @Last Modified by: 小方块
 * @Last Modified time: 2022-02-04 14:02:43
 * desc: 服务类
 */

/**
 * core
*/
const http = require('http')
const fses = require('fs').promises
const { createReadStream, createWriteStream } = require('fs')
const path = require('path')

/**
 * dependencies
*/
const ejs = require('ejs')
const debug = require('debug')('server-log')
const mime = require('mime')
const colors = require('colors')

debug('server-log')

class Server {
  constructor(options) {
    this.port = options.port
    this.directory = options.directory
    this.host = options.host
  }
  start() {
    const server = http.createServer(this._request.bind(this))
    server.listen(this.port, this.host, () => {
      console.log(colors.yellow(`Starting up hardy-server \r\nserving .${this.directory}\r\n`));
      console.log(colors.green(`    http://${this.host}:${this.port}`))
    })
  }
  _request(req, res) {
    console.log('service running');
    res.end('hello my project')
  }
}

module.exports = Server