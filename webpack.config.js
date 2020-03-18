/* eslint-disable */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清除多余文件

module.exports = {
    devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'none',// 用于开发调试
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'action_snap.js', // 输出的文件名
        path: path.resolve(__dirname, 'dist') // 
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[path][name]__[local]',
                              }
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 20000
                }
            }, {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),//每次编译都会把dist下的文件清除
    ],
    resolve: {
        alias: {
            '@common': path.resolve(__dirname, "src/commonComponent"),
            '@normal': path.resolve(__dirname, "src/normal"),
            '@report': path.resolve(__dirname, "src/report/report.js"),
            "@commonMethods":path.resolve(__dirname, "src/utils/commonMethods.js"),
            "@media":path.resolve(__dirname, "src/media"),
            "@image":path.resolve(__dirname, "src/asset/image")
        }
    },
};
