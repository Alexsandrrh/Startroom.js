'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const outputPath = path.resolve(__dirname, './dist');

module.exports = {
    entry: {
        app: [path.resolve(__dirname, './src/index.js')]
    },
    devtool: 'inline-cheap-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.sass', '.scss', '.css', '.json']
    },
    performance: {
        hints: false
    },
    output: {
        path: outputPath,
        filename: 'assets/js/[name]-[hash].js'
    },
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
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
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
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src/assets/images'),
                use: 'url-loader?limit=10000&name=img/[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/assets/index.html'),
            filename: 'index.html',
            path: outputPath
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/main-[hash].css',
            chunkFilename: '[id]-[hash].css'
        }),
        new SvgSpriteHtmlWebpackPlugin({
            includeFiles: ['./src/assets/icons/*.svg']
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        port: 8080,
        stats: 'errors-only'
    }
};
