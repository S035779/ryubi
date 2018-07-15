const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = 'development';

var common = {
  context: path.resolve(__dirname, 'src')
, module:   { 
    rules:    [{
      enforce: 'pre'
    , test: /\.js$/
    , exclude: /node_modules/
    , loader: 'eslint-loader'
    }, {
      test: /\.js$/
    , exclude: /node_modules/
    , use: { 
        loader:   'babel-loader'
      , options:  { presets: [ '@babel/react', [ '@babel/preset-env', { modules: false } ] ] }
      }
    }, {
      test: /\.css$/
    , use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader' ]
    }] 
  }
, resolve: {
    alias: {
      Main:       path.resolve(__dirname, 'src/'          )
    , Assets:     path.resolve(__dirname, 'src/assets/'   )
    , Utilities:  path.resolve(__dirname, 'src/utils/'    )
    , Stores:     path.resolve(__dirname, 'src/stores'    )
    , Actions:    path.resolve(__dirname, 'src/actions'   )
    , Components: path.resolve(__dirname, 'src/components')
    , Services:   path.resolve(__dirname, 'src/services'  )
    , Pages:      path.resolve(__dirname, 'src/pages'     )
    , Routes:     path.resolve(__dirname, 'src/routes'    )
    , Models:     path.resolve(__dirname, 'src/models'    )
    , Tasks:      path.resolve(__dirname, 'src/tasks'     )
    }
  }
, mode
, stats: 'normal'
};

module.exports = common;