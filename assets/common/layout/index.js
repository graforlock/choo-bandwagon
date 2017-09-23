const html = require('choo/html')

const footer = require('../components/footer')
const navbar = require('../components/navbar')

const layout = component => (state, emitter) => html`
  <body>
    <header>
      ${navbar(state, emitter)}
    </header>
    <main>
      ${component(state, emitter)}
    </main>
    ${footer(state, emitter)}
  </body>
`

module.exports = layout
