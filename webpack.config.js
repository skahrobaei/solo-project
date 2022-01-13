const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.Node_ENV, //process.env.Node_ENV
  module: {
    rules: [
      {
        test: /.(js|jsx)$/, //   /\.jsx?/
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      },
      {
        test: /\.s?css/,
        use: [
          // MiniCssExtractPlugin.loader,
          // Creates 'style' nodes from JS strings
          "style-loader",
          // Translates CSS into commonJS
          "css-loader",
          // Complies Sass to css
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Development',
      template: './client/index.html'
    }),
    // new MiniCssExttractPlugin()
  ],
  devServer: {
    // statis: {
      // publicPath: '/build',
      // directory: path.resolve(__dirname, 'build')
    // },
    proxy: {
      '/': 'http://localhost:3000'
    }
  // },
  // performance: {
  //   hints: false,
  //   maxEntrypointSize: 512000,
  //   maxAssetSize: 512000
  }
}