var path = require('path');
 var webpack = require('webpack');
     
 module.exports = {
     entry: './client/src/index',
     output: {
         path: path.resolve(__dirname, 'client', 'build'),
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
