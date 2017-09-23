#!/usr/bin/env node

const async = require('async-collection')
const { exec } = require('child_process')
const format = require('format-json-stream')
const fs = require('fs')
const path = require('path')
const pump = require('pump')

const lib = require('./lib')

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
  lib.checkPath(dest),
  lib.copyAssets()
], (err) => {
  if (err) throw new Error(err)

  const packageDest = path.resolve(dest, 'package.json')
  pump(lib.packager(name), format(), fs.createWriteStream(packageDest),
    err => {
      if (err) throw new Error(err)

      console.log(`You just joined a bandwagon at ${dest}.`)

      const bar = lib.progress()
      bar.start()

      const installer = Promise.all([
        lib.npm.install(dest),
        lib.npm.installDev(dest)
      ])

      installer
        .then(() => console.log('...All packages successfully installed.'))
        .catch(err => console.error(err))
        .then(() => bar.stop())
    })
})
