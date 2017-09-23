const html = require('choo/html')

const homeRoute = (state, emitter) =>
  html`
    <section>
      <h1>Hello, I am a home route!</h1>
    </section>
  `

module.exports = homeRoute
