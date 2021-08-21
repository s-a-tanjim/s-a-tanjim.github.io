const path = require('path');

module.exports = {
  entry: './js/index.umd.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../static/bootstrap/'),
  },
};