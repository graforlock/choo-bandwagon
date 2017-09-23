const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    restaurant: [
      './styles/main.css',
      './client/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'javascripts/[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /(\.css|\.scss)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              context: './stylesheets/',
              outputPath: 'stylesheets/',
              publicPath: 'public/'
            }
          },
          {loader: 'extract-loader'},
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'postcss-loader', options: {sourceMap: true, plugins: () => [autoprefixer, cssnano]}}
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new UglifyJsPlugin()
  ]
}
