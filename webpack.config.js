const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: "inline-source-map",
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|html|vert|frag)$/, loader: "file-loader" }
        ]
    }
};