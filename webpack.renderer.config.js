const rules = require('./webpack.rules');

rules.push({
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react']
    }
  }
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};
