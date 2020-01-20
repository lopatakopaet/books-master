const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/js/app.js',
        form: './src/js/form.js'
    },
    output: {
        filename: '[name].js',
    },
    module: {
        rules:[{
            test: /\.js$/,
            loader:'babel-loader',
            exclude: '/node_modules/'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' },
            { from: 'public', to: '' }
        ]),
    ],
}