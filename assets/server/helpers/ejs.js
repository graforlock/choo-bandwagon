function isProd () {
  return process.env.NODE_ENV === 'production';
}

exports.assetPath = () =>
  isProd() ? '' : 'http://localhost:3001'

exports.isProd = isProd
