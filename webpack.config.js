const path = require('path');

module.exports = {
  entry: './src/main.js',
  devtool: 'source-map',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    liveReload: true,
  },
};