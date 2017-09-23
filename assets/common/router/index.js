const choo = require('choo')

const app = choo()

const home = require('./pages/home')
const layout = require('../layout')

app.route('/', layout(home))

module.exports = app
