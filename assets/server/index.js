const app = require('../common/router')
const express = require('express')
const server = express()
const path = require('path')

const helpers = require('./helpers/ejs')

server.engine('html', require('ejs').renderFile)
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'html')
server.use(express.static('public'))

server.get('/favicon.ico', (req, res) => {
  res.writeHead(200, {'Content-Type': 'image/x-icon'})
  res.end()
})

server.use(function (request, response) {
  const initialState = {}
  const html = app.toString(request.originalUrl, initialState)
  response.render('index', { helpers, html, initialState})
})

const listener = server.listen(process.env.PORT, function () {
  console.log('Your server is listening on port ' + listener.address().port)
})

module.exports = listener
