const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: path.join(__dirname, 'src/content/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'content.js',
    clean: true
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: 'src/manifest.json',
          to: 'manifest.json'
        }
      ]
    })
  ],
  optimization: {
    minimize: false  // Disable minification for development
  },
  devtool: 'source-map'
};