/**
 * COMMON WEBPACK CONFIGURATION
 */

const path    = require('path');
const webpack = require('webpack');

module.exports = (options) => ({
  entry      : options.entry,
  output     : Object.assign({ // Compile into js/build.js
    path      : path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  module     : {
    loaders: [{
      test   : /\.js$/, // Transform all .js files required somewhere with Babel
      loader : 'babel-loader',
      exclude: /node_modules/,
      query  : options.babelQuery,
    }, {
      // Don't use extract-text-plugin, which is the normal way. Rather, keep vendor-only CSS in the global
      // scope. This is the same compilation time, just no more struggling with importing CSS into the project
      test   : /\.css$/,
      include: [/node_modules/, /app\/styles/, /app\/assets/],
      use    : ['style-loader', 'css-loader'],
    }, {
      test  : /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test   : /\.(jpg|png|gif)$/,
      loaders: ['file-loader', {
        loader: 'image-webpack-loader',
        query : {
          progressive      : true,
          optimizationLevel: 7,
          interlaced       : false,
          pngquant         : {
            quality: '65-90',
            speed  : 4,
          },
        },
      },],
    }, {
      test  : /\.html$/,
      loader: 'html-loader',
    }, {
      test  : /\.json$/,
      loader: 'json-loader',
    }, {
      test  : /\.(mp4|webm)$/,
      loader: 'url-loader',
      query : {
        limit: 10000,
      },
    }, // Give jQuery access to window
    {
      test  : /[\/\\]node_modules[\/\\]jquery[\/\\]dist[\/\\]jquery\.js$/,
      loader: "imports-loader?this=>window"
    }
    ],
  },
  plugins    : options.plugins.concat([new webpack.ProvidePlugin({
    // make fetch available
    fetch: 'exports-loader?self.fetch!whatwg-fetch',
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    "window.$": "jquery",
    _: "lodash",
    "window._": "lodash",
    "jquery-ui": "jquery-ui",
    "window.jquery-ui": "jquery-ui",
  }),
  // new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
  // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
   new webpack.DefinePlugin({
     'process.env': {
       NODE_ENV: JSON.stringify(process.env.NODE_ENV),
     },
   }), new webpack.NamedModulesPlugin(),
   // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]),
  resolve    : {
    modules   : ['app', 'node_modules'],
    extensions: ['.js', '.jsx', '.react.js',],
    mainFields: ['browser', 'jsnext:main', 'main',],
  },
  devtool    : options.devtool,
  target     : 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  node       : {
    console: false,
    fs     : 'empty',
    net    : 'empty',
    tls    : 'empty',
  },
});
