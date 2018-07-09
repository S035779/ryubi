const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const mode = 'development';

const config = {
  context:  path.resolve(__dirname, 'src')
, target:   "electron-renderer"
, entry:    { 
    app:    './main.js'
  , styles: './main.css'
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
        , test: /react|react-dom|flux/
        , chunks: 'initial'
        , enforce: true
        }
      }
    }
  }
, plugins: [ 
    new MiniCssExtractPlugin({ 
      filename: '[name].css' 
    }) 
  , new CleanWebpackPlugin([
      'public/*.js'
    , 'public/*.js.map'
    , 'public/*.css'
    , 'public/*.css.map'
    ])
  , new WebpackManifestPlugin()
  , new webpack.HotModuleReplacementPlugin()
  ]
, module: { 
    rules: [ 
      {
        enforce: 'pre'
      , test: /\.js$/, exclude: /(node_modules|bower_components)/
      , loader: 'eslint-loader'
      }
    , {
        test: /\.js$/, exclude: /(node_modules|bower_components)/
      , use: { 
          loader:   'babel-loader'
        , options:  { presets: [ '@babel/react', [ '@babel/preset-env', { modules: false } ] ] }
        }
      }
    , {
        test: /\.css$/
      , use: [
          MiniCssExtractPlugin.loader
        , 'css-loader'
        , 'postcss-loader'
        ]
      } 
    ] 
  }
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
, mode
};
module.exports = config;
