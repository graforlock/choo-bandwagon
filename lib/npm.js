#!/usr/bin/env node

const { exec } = require('child_process')

const { deps, devDeps } = require('../config/dependencies')

const _depInstaller = (npmDeps, mode = '') => dest => new Promise((resolve, reject) => {
  const prev = process.cwd()
  process.chdir(dest)

  exec(`npm install --save${mode} --loglevel error ${npmDeps.join(' ')}`,
    (err) => {
      if (err) reject(err)

      process.chdir(prev)
      resolve(true)
    })
})

exports.install = _depInstaller(deps)
exports.installDev = _depInstaller(devDeps, '-dev')
