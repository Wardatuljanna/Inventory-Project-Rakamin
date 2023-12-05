const path = require('path');

module.exports = {
  mode: 'development', 
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(mp3)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader',
      },
    ],
  },
};