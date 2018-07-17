const merge = require('webpack-merge');
const bundle = require('./webpack.bundle.js');

var production = {
  mode: 'production'
, devtool: 'source-map'
, performance: {
    hints: "warning"
  , maxAssetSize: 2048000
  , maxEntrypointSize: 4096000
  , assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
};
module.exports = merge(bundle, production);

