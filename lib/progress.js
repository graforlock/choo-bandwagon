module.exports = () => ({
  start () {
    let i = 0
    let timer = setInterval(() => {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      i = (i + 1) % 4
      let dots = new Array(i + 1).join('.')

      if (!this.running) {
        clearInterval(timer)
        return
      }

      process.stdout.write(`Now installing npm dependencies${dots}`)
    }, 300)
  },
  stop () {
    this.running = false
  },
  running: true
})
