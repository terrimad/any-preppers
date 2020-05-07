const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (function () {
  const config = {};

  config.mode = 'development'

  config.entry = [__dirname + '/src/index.js'];

  config.output = {
    filename: 'app.js',
    chunkFilename: 'app-[name].js',
    path: __dirname + '/dist',
  };

  config.plugins = [
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ];

  config.module = {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
            plugins: ['emotion', '@babel/plugin-proposal-class-properties']
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  };

  return config;
})();