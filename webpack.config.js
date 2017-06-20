const webpack = require('webpack')

const isDebug = !process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

module.exports = {
    name: 'client',
    target: 'web',
    watch: true,
    entry: {
        build: ['babel-polyfill', './src/index.js'],
    },
    output: {
        path: `${__dirname}/public/`,
        filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
        publicPath: `${__dirname}/public/`,
        chunkFilename: isDebug
            ? '[name].chunk.js'
            : '[name].[chunkhash:8].chunk.js',
    },
    resolve: {
        alias: {
            Config: `${__dirname}/src/config`,
            Consts: `${__dirname}/src/constants`,
            Selectors: `${__dirname}/src/store/selectors`,
            Modules: `${__dirname}/src/modules`,
            Schemas: `${__dirname}/src/modules/schemas/`,
            Styled: `${__dirname}/src/modules/styled-components/`,
        },
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: isDebug,
                    babelrc: false,
                    presets: [
                        // A Babel preset that can automatically determine the Babel plugins and polyfills
                        [
                            'env',
                            {
                                targets: {
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9',
                                    ],
                                },
                                modules: false,
                                useBuiltIns: false,
                                debug: false,
                            },
                        ],
                        'stage-0',
                        'react',
                        ...(isDebug ? [] : ['react-optimize']),
                    ],
                    plugins: [
                        ...(isDebug ? ['transform-react-jsx-source'] : []),
                        ...(isDebug ? ['transform-react-jsx-self'] : []),
                    ],
                },
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: isDebug
                        ? '[path][name].[ext]?[hash:8]'
                        : '[hash:8].[ext]',
                },
            },
        ],
    },
    plugins: [
        // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
            'process.env.BROWSER': true,
            __DEV__: isDebug,
        }),

        // https://medium.com/@adamrackis/vendor-and-code-splitting-in-webpack-2-6376358f1923
        new webpack.optimize.CommonsChunkPlugin({
            name: 'node-static',
            minChunks(module, count) {
                const context = module.context
                return context && context.indexOf('node_modules') >= 0
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'used-twice',
            minChunks(module, count) {
                return count >= 2
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
        ...(isDebug
            ? []
            : [
                  // https://github.com/mishoo/UglifyJS2#compressor-options
                new webpack.optimize.UglifyJsPlugin({
                    sourceMap: true,
                    compress: {
                        screw_ie8: true, // React doesn't support IE8
                        warnings: isVerbose,
                        unused: true,
                        dead_code: true,
                    },
                    mangle: {
                        screw_ie8: true,
                    },
                    output: {
                        comments: false,
                        screw_ie8: true,
                    },
                }),
            ]),
    ].filter(Boolean),
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: isDebug ? 'source-map' : false,
    bail: !isDebug,
    cache: isDebug,
    stats: {
        colors: true,
        reasons: isDebug,
        hash: isVerbose,
        version: isVerbose,
        timings: true,
        chunks: isVerbose,
        chunkModules: isVerbose,
        cached: isVerbose,
        cachedAssets: isVerbose,
    },
    // https://github.com/webpack/node-libs-browser/tree/master/mock
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
}
