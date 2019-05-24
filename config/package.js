module.exports = {
  name: '',
  version: '0.0.1',
  main: 'bin/www',
  scripts: {
    start: 'cross-env NODE_ENV=production node bin/www',
    dev: 'concurrently "webpack-dev-server --config webpack.config.dev.js" "cross-env NODE_ENV=development node bin/www"',
    build: 'webpack --config webpack.config.prod.js'
  },
  author: require('os').userInfo().username,
  license: 'ISC'
}
