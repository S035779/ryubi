const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: path.resolve(__dirname, 'src')
  , entry: {
    app:        './main.js'
    , common:   [  'react', 'react-dom', 'react-router-dom', './main.css' ]
  }
  , target: "electron-renderer"
  , output: {
    path: path.resolve(__dirname, 'public')
    , filename: '[name].bundle.js'
  }
  , module: {
    rules: [{
      test: /\.js$/
      , loader: 'babel-loader'
      , options: {
        presets: ['react', ['es2015', { modules: false }]]
      }}
    , {
      test: /\.css$/
      , use: ExtractTextPlugin.extract({
        use: [ 'css-loader', 'postcss-loader' ]
      })
    }]}
  , devServer: {
    contentBase: path.join(__dirname, 'public')
    , host: '0.0.0.0'
    , port: 8080
    , watchContentBase: true
    , inline: true
  }
  , performance: {
    hints: "warning",
    maxAssetSize: 700000,
    maxEntrypointSize: 700000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
  , devtool: 'source-map'
  , plugins: [
    new ExtractTextPlugin({
      filename: 'common.css'
    })
    , new webpack.optimize.UglifyJsPlugin({
      warnings:  true
      , sourceMap: true
      , mangle:    true
    })
    , new webpack.optimize.CommonsChunkPlugin({
      name:       'common'
      , filename: 'common.js'
      , minChunk: Infinity
    })
  ]
};
module.exports = config;
