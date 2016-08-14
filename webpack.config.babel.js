import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

// constraction
const DEBUG = !process.argv.includes('--production');

export default {
  entry: './src/js/main.jsx',

  output: {
    path: './public/js',
    filename: 'main.js'
  },

  devtool: DEBUG ? 'inline-source-map' : false,

  plugins: (DEBUG ? [] : [
    new webpack.optimize.UglifyJsPlugin()
  ]),

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel'
      },{
        test: /\.css$/,
        loader: 'style!css!postcss'
      }
    ]
  },

  postcss: [autoprefixer]
}
