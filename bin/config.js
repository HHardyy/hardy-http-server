/*
 * @Author: 小方块 
 * @Date: 2022-02-04 13:13:56 
 * @Last Modified by: 小方块
 * @Last Modified time: 2022-02-04 16:29:07
 * 命令行参数
 */
const config = {
  // 配置端口
  port: {
    option: '-p, --port <val>',
    description: 'set your server port',
    usage: 'hardy-http-server --port 3000',
    default: 3000
  },
  // 配置服务器目录
  directory: {
    option: '-d, --directory <val>',
    description: 'set your start directory',
    usage: 'hardy-http-server --directory D:',
    default: process.cwd()
  },
  // 配置服务器域名
  host: {
    option: '-h, --host <val>',
    description: 'set your server host',
    usage: 'hardy-http-server --host 127.0.0.1',
    default: 'localhost'
  },
  gzip: {
    option: '-g, --gzip <val>',
    description: 'set gzip if you want',
    usage: 'hardy-http-server --gzip true',
    default: true
  }
}

module.exports = config