const fs = require('fs')

module.exports = dest => cb =>
  fs.stat(dest, (err, stats) => {
    if (err && err.code === 'ENOENT') return cb(null, dest)

    if (err) return cb(new Error(err))
    cb(new Error(`${dest} already exists.`))
  })
