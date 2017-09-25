const choo = require('choo')

const app = choo()

const home = require('./pages/home')
const notFound = require('./pages/notFound')
const layout = require('../layout')

app.route('/', layout(home))

app.route('*', layout(notFound))

module.exports = app
