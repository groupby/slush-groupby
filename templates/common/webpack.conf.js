var webpack = require('webpack');
var pjson = require('./package.json');

module.exports = {
  entry: './src/index.<% if (typescript) { %>ts<% } else { %>js<% } %>',
  output: {
    filename: pjson.name + '-' + pjson.version + '.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    modulesDirectories: ['bower_components', 'node_modules']
  },
  module: {
    loaders: [<% if (typescript) { %>, {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }<% } else if (babel) { %> {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    <% } %>]
  }
};
