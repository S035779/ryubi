const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var common = {
  context: path.resolve(__dirname, 'src')
, module: { 
    rules: [
      {
        enforce: 'pre'
      , test: /\.js$/
      , exclude: /node_modules/
      , loader: 'eslint-loader'
      }
    , {
        test: /\.js$/
      , exclude: /node_modules/
      , use: { 
          loader:   'babel-loader'
        , options:  { presets: [ '@babel/react', [ '@babel/preset-env', { modules: false } ] ] }
        }
      }
    , {
        test: /\.css$/
      , use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader' ]
      }
    , {
        test: /\.(woff|woff2|eot|ttf|otf)$/
      , use: [ 'file-loader?name=[name].[ext]' ]
      }
    ] 
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
    , Views:      path.resolve(__dirname, 'src/views'     )
    }
  }
, stats: 'normal'
};

module.exports = common;
