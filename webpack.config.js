const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { argv } = require('yargs');

const isDevelop = argv.development;
const isLocal = argv.local;
const outputPath = path.resolve(__dirname, './dist');
const optimizationConfig = {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()]
};

const configEntry = { app: path.resolve(__dirname, './src/index.js') };

module.exports = {
    mode: isDevelop ? 'development' : 'production',
    entry: configEntry,
    devtool: 'inline-cheap-source-map',
    resolve: { extensions: ['.js', '.jsx', '.sass', '.scss', '.css', '.json'] },
    performance: { hints: false },
    output: { path: outputPath, filename: 'assets/js/[name]-[hash].js' },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /\node_modules/,
                use: [
                    {
                        loader: isDevelop ? 'style-loader' : MiniCssExtractPlugin.loader,
                        options: { sourceMap: true }
                    },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: ['ie >= 8', 'last 15 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src/assets/images'),
                use: 'url-loader?limit=10000&name=assets/images/[name]-[hash].[ext]'
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: SvgSpriteHtmlWebpackPlugin.getLoader()
            },
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            minify: isDevelop
                ? false
                : {
                      html5: true,
                      collapseWhitespace: true,
                      minifyCSS: true,
                      minifyJS: true,
                      minifyURLs: false,
                      removeAttributeQuotes: true,
                      removeComments: true,
                      removeEmptyAttributes: true,
                      removeOptionalTags: true,
                      removeRedundantAttributes: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributese: true,
                      useShortDoctype: true
                  },
            template: path.join(__dirname, './src/assets/index.html'),
            filename: 'index.html',
            path: outputPath
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/main-[hash].css',
            chunkFilename: '[id]-[hash].css'
        }),
        new SvgSpriteHtmlWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    optimization: !isDevelop ? optimizationConfig : {},
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        port: 8080,
        stats: 'errors-only'
    }
};
