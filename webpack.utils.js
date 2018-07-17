const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const common = require('./webpack.common.js');

var utils = {
  mode: 'none'
, target: 'node'
, entry: {
    preload:  ['./utils/preload.js']
  , fetch:    ['./utils/fetch.js']
  }
, output:   { 
    filename: '[name].node.js' 
  , path: path.resolve(__dirname, 'dist/utils')
  }
, optimization: {
    nodeEnv: false
  }
, plugins: [ 
    new CleanWebpackPlugin([
      'dist/utils/*.js'
    , 'dist/utils/*.js.map'
    , 'dist/utils/*.json'
    ])
  , new WebpackManifestPlugin()
  ]
};
module.exports = merge(common, utils);
