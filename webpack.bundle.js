const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const common = require('./webpack.common.js');

const bundle = {
  target: "electron-renderer"
, entry: { 
    app: [
      './main.js'
    ]
  , css: [
      './assets/css/photon.css'
    , './main.css'
    ]
  }
, output:   { 
    filename: '[name].bundle.js' 
  , path: path.resolve(__dirname, 'public')
  }
, optimization: {
    splitChunks: {
      cacheGroups: {
        common: { 
          name: 'common'
        , test: /react|react-dom|flux|rxjs|ramda/
        , chunks: 'initial'
        , enforce: true
        }
      }
    }
  }
, plugins: [ 
    new MiniCssExtractPlugin({ 
      filename: 'styles.css' 
    }) 
  , new CleanWebpackPlugin([
      'public/*.js'
    , 'public/*.js.map'
    , 'public/*.css'
    , 'public/*.css.map'
    , 'public/*.json'
    , 'public/*.ico'
    , 'public/*.html'
    , 'public/*.eot'
    , 'public/*.ttf'
    , 'public/*.woff'
    ])
  , new WebpackManifestPlugin()
  , new webpack.HotModuleReplacementPlugin()
  , new HtmlWebpackPlugin({
      inject: false
    , template: HtmlWebpackTemplate
    , appMountId: 'app'
    , lang: 'ja-JP'
    , scripts: [ 'assets/log4js.min.js', 'assets/jsonp.js' ]
    , title: 'WatchNote!'
    , filename: 'index.html'
    , favicon: 'favicon.ico'
    , excludeChunks: 'css.bundle.js'
    })
  ]
};
module.exports = merge(common, bundle);
