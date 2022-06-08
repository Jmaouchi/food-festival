const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },

  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    // In the config object, we added an object to the rules array. This object will identify 
    //the type of files to pre-process using the test property to find a regular expression, or regex. 
    //In our case, we are trying to process any image file with the file extension of .jpg. 
    //We could expand this expression to also search for other image file extensions such as .png, .svg, or .gif.
    rules: [
      {
        test: /\.(jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false, // The default behavior of file-loader is such that file will be treated as an ES5 module. As a result,
              // paths to images might be formatted incorrectly
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath(url) {
                return url.replace('../', '/assets/');// the publicPath property, which is a function that changes our
                // assignment URL by replacing the ../ from our require() statement with /assets/
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  mode: 'development',

  plugins:[
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    })
  ]
};

