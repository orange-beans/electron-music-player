var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    name: 'public',
    // These are for the node path resolve
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    // entry: './app/public/js/entry.js',
    // Multiple entry points
    entry: {
      index: './app/public/js/index.js',
      settings: './app/public/js/settings.js',
    },
    output: {
      path: './app/public/build',
      filename: '[name].bundle.js',
    },

    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    cache: false,
    debug: true,
    devtool: 'source-map',

    module: {
      loaders: [
        // {test: /\.css$/, loader: 'style!css'},
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
        },

        {
          test: /\.less$/,
          loader: "style!css!less"
        },

        { test: /\.png$/,    loader: 'url-loader?mimetype=image/png' },


        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015', 'stage-0'],
            cacheDirectory: true
            //plugins: ['transform-runtime']
          }
        }
      ]
    },
    plugins: [
      // Don't compress yet for faster building time
      //new webpack.optimize.UglifyJsPlugin({
      //  compress: {
      //    warnings: false
      //  }
      //}),
      new ExtractTextPlugin('bundle.css', {
        allChunks: true
      })
    ]
  },
  {
    name: 'main',
    // These are for the node path resolve
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    entry: {
      main: './app/main/main.js',
    },
    output: {
      path: './app/main/build',
      filename: '[name].bundle.js',
    },

    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    cache: false,
    debug: true,
    devtool: 'source-map',

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015', 'stage-0'],
            cacheDirectory: true
            //plugins: ['transform-runtime']
          }
        }
      ]
    },
  }
];
