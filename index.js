#!/usr/bin/env node

const async = require('async-collection')
const checkPath = require('./lib/check-path')
const copyAssets = require('./lib/copy')
const { exec } = require('child_process')
const format = require('format-json-stream')
const fs = require('fs')
const path = require('path')
const pump = require('pump')

const progress = require('./lib/progress')
const npm = require('./lib/npm')
const packager = require('./lib/packager')

const cmd = process.argv[2]
const name = process.argv[3]

exec('npm --version', (err, stdout, stderr) => {
  if (err) throw new Error(err.message)
})

if (!cmd || cmd !== 'new' || !name) {
  throw new Error('Usage: bandwagon new my-cool-app')
}

const dest = path.resolve('./', name)

async.waterfall([
  checkPath(dest),
  copyAssets()
], (err) => {
  if (err) throw new Error(err)

  const packageDest = path.resolve(dest, 'package.json')
  pump(packager(name), format(), fs.createWriteStream(packageDest),
    err => {
      if (err) throw new Error(err)

      console.log(`You just joined a bandwagon at ${dest}.`)

      const bar = progress()
      bar.start()

      const installer = Promise.all([
        npm.install(dest),
        npm.installDev(dest)
      ])

      installer
        .then(() => console.log('...All packages successfully installed.'))
        .catch(err => console.error(err))
        .then(() => bar.stop())
    })
})
