const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/only-dev-server',
      './styles/main.css',
      './client/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].js',
    publicPath: 'http://localhost:3001/js'
  },
  resolve: {
    extensions: ['.js']
  },
  target: 'web',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /(\.css|\.scss)$/,
        loaders: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                autoprefixer
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      BUILD_TARGET: 'client',
      NODE_ENV: 'development'
    })
  ],
  devServer: {
    port: 3001,
    hot: true,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}
