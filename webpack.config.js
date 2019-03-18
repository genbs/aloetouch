module.exports =  (env, argv) => ({
    entry: './src/AloeTouch.js',
    output: {
        filename: argv.mode == 'production' ? './dist/aloetouch.min.js' : './dist/aloetouch.js',
        library: 'AloeTouch',
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    devtool: argv.mode === 'development' ? 'source-map' : false
})