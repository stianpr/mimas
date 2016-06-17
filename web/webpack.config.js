module.exports = {
    entry: {
        app: [
          'webpack-dev-server/client?http://localhost:8080',
          './js/app.js',
        ],
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'dist/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'jsx', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};
