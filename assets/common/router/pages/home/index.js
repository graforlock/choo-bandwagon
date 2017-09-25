const html = require('choo/html')

const homeRoute = (state, emitter) => html`
    <section>
      <h1>Hello, I am a home route!</h1>
      <br>
      <p>made with love and trains</p>
      <img src="/img/train.png" />
      <img src="/img/wagon.png" />
      <img src="/img/wagon.png" />
      <img src="/img/wagon.png" />
      <img src="/img/wagon.png" />
      <img src="/img/wagon.png" />
    </section>
  `

module.exports = homeRoute
