const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    bundle: [
      './styles/main.css',
      './client/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  target: 'web',
  mode: 'production',
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
              context: './css/',
              outputPath: 'css/',
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
