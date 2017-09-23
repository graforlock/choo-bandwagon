const copydir = require('copy-dir')
const path = require('path')

const assets = path.resolve(__dirname, '../assets')

module.exports = () => (dest, cb) => {
  copydir(assets, dest, err => {
    if (err) cb(new Error(err))

    cb(null)
  })
}
