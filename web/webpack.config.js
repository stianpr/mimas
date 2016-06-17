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
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                  presets:['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};
