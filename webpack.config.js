var config = {
  entry: './src/index.js',
  output: {
    filename: './public/index.web.js',
    library: 'InitApp',
    libraryTarget: 'var'
  },
  module:{
    loaders: [
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.txt$/,
        use: [
          {loader: 'raw-loader'}
        ]
      }
    ]
  },
  resolve: {
      alias: {
          "jquery": "jquery"
      }
  }
};

module.exports = config;
