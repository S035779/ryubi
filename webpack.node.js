const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

const node = {
  target:   "electron-main"
, node:     { __dirname: false }
, entry:    { 
    desktop:    './desktop.js'
  , preload:    './utils/preload.js'
  , fetch:      './utils/fetch.js'
  }
, output:   { 
    filename: '[name].node.js' 
  , path: path.resolve(__dirname, 'dist')
  }
, plugins:  [ 
    new CleanWebpackPlugin([
      'dist/*.js'
    , 'dist/*.js.map'
    , 'dist/*.json'
    , 'dist/out/*.js'
    ])
  , new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'node_modules/devtron/manifest.json') }
    , { from: path.resolve(__dirname, 'node_modules/devtron/out/browser-globals.js'), to: 'out/' }
    ], { debug: false })
  ]
, watch: true
};
module.exports = merge(common, node);
