const webpack = require('webpack');
// node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import our plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'public'),
  JS: path.resolve(__dirname, 'app'),
  CSS: path.resolve(__dirname, 'app/css'),
  COMPONENTS: path.resolve(__dirname, 'app/components'),
  API: path.resolve(__dirname, 'app/api'),

};

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'app.jsx'),
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
      },
      extensions: ['*', '.js', '.jsx'],
  },

  // Tell webpack to use html plugin . Serves
   // index.html is used as a template in which it'll inject bundled app.
   plugins: [
     new HtmlWebpackPlugin({
       template: path.join(paths.SRC, 'index.html'),
     }),
      new ExtractTextPlugin('style.bundle.css'), // CSS will be extracted to this bundle file
   ],
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
      // CSS loader to CSS files
      // Files will get handled by css loader and then passed to the extract text plugin
      // which will write it to the file we defined above

      // {
      //     test: /\.css$/,
      //     include: [ paths.CSS ],
      //     loader: ExtractTextPlugin.extract({
      //     use: 'css-loader',
      //     }),
      // },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
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

// Dev server configuration . Disabled,  because HtmlWebpackPlugin
// injects bundled app into index.html-template
// Now it uses our "public" folder as a starting point
// devServer: {
//   contentBase: paths.SRC,
// },
// Automatically generate JS source maps for a browser.
// Note : Other possible devtool values are:
// "inline-source-map" or "eval-source-map"
  devtool: 'cheap-module-eval-source-map'

};
