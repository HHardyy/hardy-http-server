#! /usr/bin/env node

/*
 * @Author: 小方块 
 * @Date: 2022-02-04 13:13:42 
 * @Last Modified by: 小方块
 * @Last Modified time: 2022-02-04 14:02:11
 * 命令行
 */

const program = require('commander')
const package = require('../package.json')
const config = require('./config')
const Server = require('../src/Server')

program.name(package.name)
program.version(package.version)

Object.values(config).forEach(o => {
  if (o.option) program.option(o.option, o.description)
})

program.on('--help', () => {
  console.log("you can see the options -. -");
})

program.parse(process.argv)
const parseOptions = program.opts()

const _c = {}
Object.keys(config).forEach(key => { _c[key] = parseOptions[key] || config[key].default })

const server = new Server(_c)
server.start()