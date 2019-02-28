'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
const outputPath = path.resolve(__dirname, './dist');

module.exports = {
    entry: {
        app : [
            path.resolve(__dirname, './src/index.js')
        ]
    },
    devtool: "inline-cheap-source-map",
    resolve: {
        extensions: ['.js', '.jsx', '.sass', '.scss', '.css', '.json']
    },
    output : {
        path : outputPath,
        filename : 'assets/js/[name]-[hash].js'
    },
    module : {
        rules: [
            {
                test : /\.(js|jsx)$/,
                exclude: /node_modules/,
                use : 'babel-loader'
            },
            {
                test : /\.(sass|scss)$/,
                exclude : /node_modules/,
                use : [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test : /\.(gif|png|jpg|jpeg)$/,
                exclude : /node_modules/,
                include : path.resolve(__dirname, './src/assets/images'),
                use : 'url-loader?limit=10000&name=img/[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            template : path.join(__dirname, './src/assets/index.html'),
            filename : 'index.html',
            path : outputPath
        }),
        new SvgSpriteHtmlWebpackPlugin({
            includeFiles: ['./src/assets/icons/*.svg']
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        port: 8080,
        stats: 'errors-only'
    }
};
