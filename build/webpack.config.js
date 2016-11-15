var webpack = require('webpack')

module.exports = {
  entry: "./build/common.js",
  module: {
    loaders: [
    {
      test: /\.vue$/,
      loader: 'vue'
    },
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    },
    {
      // edit this for additional asset file types
      test: /\.(png|jpg|gif)$/,
      loader: 'file?name=[name].[ext]?[hash]'
    }
    ],
  },
  output: {
    filename: "bundle.js",
    path: __dirname,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
