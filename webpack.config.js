const path = require('path');

module.exports = {
  entry: './src/Client/js/app.js',
  output: {
    path: path.resolve(__dirname, 'public/Client/js'),
    filename: 'bundle.js'
  },
  mode: 'development'
}