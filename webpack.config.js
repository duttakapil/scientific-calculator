const path = require("path");
// const webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: "./src/index.js",
    // mode: "development",
    module: {
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /(node_modules|bower_components)/,
                loader : "babel-loader",
                options : {presets : ["@babel/env", "@babel/react"]}
            },
            {
                test : /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            react: path.join(__dirname, 'node_modules', 'react'),
        }
    },
    output : {
        path : path.resolve(__dirname, "build/"),
        publicPath : "/build/",
        filename : "bundle.js"
    },
    devServer : {
        contentBase : path.join(__dirname, "public/"),
        port : 3000,
        publicPath : "http://localhost:3000/build/",
        hotOnly : true
    },
    plugins : [ 
        // new webpack.HotModuleReplacementPlugin(), 
        new HtmlWebPackPlugin({
            template: './src/index.html'
        })
    ]
};