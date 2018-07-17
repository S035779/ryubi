const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const common = require('./webpack.common.js');

const node = {
  mode: 'none'
, target: "electron-main"
, entry:    { 
    desktop:    './desktop.js'
  }
, output:   { 
    filename: '[name].node.js' 
  , path: path.resolve(__dirname, 'dist')
  }
, optimization: {
    nodeEnv: false
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
  , new WebpackManifestPlugin()
  ]
, node: { 
    __dirname: false 
  , __filename: false
  }
};
module.exports = merge(common, node);
