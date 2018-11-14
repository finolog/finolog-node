const path = require('path');

const rules = [
    {
        test: /\.js/,
        use: {
            loader: 'babel-loader',
        },
    }
];

module.exports = [{
    entry: './src/index.js',
    module: {rules},
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'finolog-esm.js',
    },
    name: 'esm',
}, {
    entry: './src/index.js',
    module: {rules},
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'finolog-amd.js',
        libraryTarget: 'amd'
    },
    name: 'amd',
}, {
    entry: './src/index.js',
    module: {rules},
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'finolog-commonjs.js',
        libraryTarget: 'commonjs'
    },
    name: 'commonjs',
}];
