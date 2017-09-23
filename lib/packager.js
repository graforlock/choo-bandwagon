const { Readable } = require('stream')

const _pkg = require('../config/package')

module.exports = name => Readable({
  read () {
    const pkg = _pkg
    pkg.name = name
    this.push(JSON.stringify(pkg))
    this.push(null)
  }
})
