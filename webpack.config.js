const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
};
