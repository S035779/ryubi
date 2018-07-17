const merge = require('webpack-merge');
const path  = require('path');
const bundle = require('./webpack.bundle.js');

const development = {
  mode: 'development'
, devtool: 'inline-source-map'
, devServer: {
    contentBase: path.join(__dirname, 'public')
  , port: 3000
  , hot: true
  }
};
module.exports = merge(bundle, development);
