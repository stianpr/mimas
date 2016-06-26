var path = require('path');

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://192.168.200.120:8080',
      './js/app.js',
    ],
  },
  output: {
    publicPath: 'http://192.168.200.120:8080/',
    filename: 'dist/[name].js'
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
