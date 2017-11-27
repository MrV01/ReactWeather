/// Features: ( can be changed in 'Loaders' section)
///  1.  Files   ''\.(css|sass)$''     SASS  based CSS workflow.
///  2.  CSS Files SASS and PostCSS generates into  separate bundles
//
// node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');
// Webpack embedded plugins.
const webpack = require('webpack');


// Import third party plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// CSS extract to the bundle file
const extractCSS = new ExtractTextPlugin('style.bundle.css');
// SASS extract  to the bundle file.
const extractSass = new ExtractTextPlugin('style.SASSbundle.css');
// PostCSS extract to the bundle file.
const extractPostCSS = new ExtractTextPlugin('style.PostCSSbundle.css');

// Constant with application's paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'public'),
  JS: path.resolve(__dirname, 'app'),
  CUSTOMCSS: path.resolve(__dirname, 'app/styles'),
  STATICCSS: path.resolve(__dirname, 'app/css'),
  COMPONENTS: path.resolve(__dirname, 'app/components'),
  API: path.resolve(__dirname, 'app/api'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),

};

//  PostCSS  based   CSS workflow extended  by SASS  compiler.
//   Grand Reason : Foundation  requires SASS.
/// (https://foundation.zurb.com/sites/docs/sass.html#adjusting-css-output)
//  Therore introduced SASS module dependenies:
///  [SASS Loader for webpack ](https://github.com/webpack-contrib/sass-loader)
///
///  npm install sass-loader node-sass webpack --save-dev
///

// Webpack configuration
const config =  {
  entry:[
    //Jquery file from NODE_MODULES
    'script-loader!jquery/dist/jquery.min.js',

    'script-loader!foundation-sites/dist/foundation.min.js',
    path.join(paths.JS, 'app.jsx')
  ],
  //  module name : variable name .   Pairs for modules.
  externals: {
    jquery: 'jQuery',

  },
 // Distribution package Destination  folder.
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
  },
  // Aliases and how to resove files, etc
  // Enable importing JS files without specifying their's extenstion
  // So we can write:
  // import MyComponent from 'my-component';
  // Instead of:
  //  import MyComponent from './my-component.jsx';
  resolve: {
      alias: {
        Main: path.join(paths.COMPONENTS,'Main.jsx'),
        Nav: path.join(paths.COMPONENTS,'Nav.jsx'),
        Weather: path.join(paths.COMPONENTS,'Weather.jsx'),
        WeatherForm: path.join(paths.COMPONENTS,'WeatherForm.jsx'),
        WeatherMessage: path.join(paths.COMPONENTS,'WeatherMessage.jsx'),
        About: path.join(paths.COMPONENTS,'About.jsx'),
        Examples: path.join(paths.COMPONENTS,'Examples.jsx'),
        openWeatherMap: path.join(paths.API,'openWeatherMap.jsx'),
        ErrorModal: path.join(paths.COMPONENTS,'ErrorModal.jsx'),
        applicationStyles: path.join(paths.CUSTOMCSS,'app.scss'),
      },
      extensions: ['*', '.js', '.jsx'],
      modules: [paths.NODE_MODULES]
  },

   plugins: [
     // Tell webpack to use html plugin . Serves
     // index.html is used as a template in which it'll inject bundled app.
     new HtmlWebpackPlugin({
       template: path.join(paths.SRC, 'index.html'),
     }),
     // CSS will be extracted to this  object representing the bundle file
     extractCSS,
     // CSS SASS will be extracted to this  object representing the bundle file
      extractSass,
      // CSS PostCSS will be extracted to this  object representing the bundle file
      extractPostCSS,
      //  Using embedded webpack plugin to pack jQuery
      // What id does? automatically "require" module jquery in application modules
      // alias for the module  :  module name
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery' : 'jquery'
      })
   ],
  ///
  // Loaders configuration of the module
  ///
  module: {
    rules: [
      // We are telling webpack to use "babel-loader" for transpiling of  .js and .jsx files
      {
        test: /\.(js|jsx)$/,
        include: [ paths.JS, paths.SRC ],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
            options: {
                presets:["env", "react"],
                plugins:["transform-object-rest-spread"]
            }
      },

      //
      // SASS loader
      //
      {
        test: /\.(css|scss)$/,
        use: extractSass.extract({
            use: [{
                   loader: "css-loader" // translates CSS into CommonJS
               }, {
                   loader: "sass-loader" // compiles Sass to CSS
               }],
               // use style-loader in development
               fallback: "style-loader" // creates style nodes from JS strings
        })
      },

      // CSS loader to  CSS files
      // Files will get handled by css loader and then passed to the extract text plugin
      // which will write it to the file we defined above
      {
          test: /\.regular-css$/,
          loader: extractCSS.extract({
          use: 'css-loader',
          }),
      },

      // CSS load of SCSS  PostCSS file bundle
      // Files will get handled by PostCSS loader  ( by PostCSS plugins, defined in postcss.config.js)
      //  then load by CSS loader
      // and then passed to the extract text plugin
      // which will write it to the file we defined above
      {
        test: /\.pscss$/,
        use: extractPostCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            'postcss-loader',
          ],
        }),
      },

      // File loader for image assets
      // Add only image extensions, can add things like svgs, fonts and videos
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },

// Automatically generate JS source maps for a browser.
// Note : Other possible devtool values are:
// "inline-source-map" or "eval-source-map"
  devtool: 'cheap-module-eval-source-map'

};

module.exports = config;
