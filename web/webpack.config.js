var path = require('path');

module.exports = {
  entry: {
    app: process.env.NODE_ENV === 'production' ?
      ['./js/app.js'] :
      ['webpack/hot/dev-server', './js/app.js']
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? './dist/' : './build'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets:['es2015', 'react']
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/ionicons/dist/scss/')
    ],
  },
};
