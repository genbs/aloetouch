const webpack = require('webpack');

const min = process.argv.indexOf('-p') >= 0;

let config = {
    entry: './index.js',
    output: {
        filename: './dist/aloetouch.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}

if(min) {
    config.output.filename = './dist/aloetouch.min.js'
    config.devtool = 'source-map'
}

module.exports = config