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
  target:   "electron-renderer"
, entry:    { 
    app:    ['./main.js', './main.css']
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
    ])
  , new WebpackManifestPlugin()
  , new webpack.HotModuleReplacementPlugin()
  , new HtmlWebpackPlugin({
      inject: false
    , template: HtmlWebpackTemplate
    , appMountId: 'app'
    , lang: 'ja-JP'
    , links: [
        { rel:  'stylesheet', href: 'assets/css/photon.min.css' }
      ]
    , scripts: [
        'assets/js/log4js.min.js'
      , 'assets/js/jsonp.js'
      ]
    , title: 'WatchNote!'
    , filename: 'index.html'
    , favicon: 'favicon.ico'
    })
  ]
, devServer: {
    contentBase: path.join(__dirname, 'public')
  , port: 3000
  , hot: true
  }
, performance: {
    hints: "warning"
  , maxAssetSize: 2048000
  , maxEntrypointSize: 4096000
  , assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
, devtool: 'source-map'
};
module.exports = merge(common, bundle);
