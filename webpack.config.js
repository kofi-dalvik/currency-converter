module.exports = {
    entry: ['./public/js/app.js'],
    output: {
        filename: './bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' }
        ]
    }
};