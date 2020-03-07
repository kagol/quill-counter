const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  let entry, minimize

  if (env && env.minimize) {
    entry = {
      'quill-counter.min.js': ['./src/quill-counter.ts']
    }
    minimize = true
  } else {
    entry = {
      'quill-counter.js': ['./src/quill-counter.ts'],
      'quill-counter': './src/assets/quill-counter.scss'
    }
    minimize = false
  }

  return {
    entry,

    optimization: {
      minimize
    },

    output:{
      filename: '[name]',
      library: 'quillCounter',
      libraryExport: 'default',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, './dist/')
    },

    resolve: {
      alias: {
        'src': path.resolve(__dirname, './src'),
        'dist': path.resolve(__dirname, './dist')
      },
      extensions: [ '.tsx', '.ts', '.js', '.scss' ]
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.scss$/,
          use: [
            // fallback to style-loader in development
            !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },

    plugins:[
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].[id].css'
      }),
      new webpack.HotModuleReplacementPlugin({})
    ],

    devServer:{
      host:'localhost',
      contentBase: path.join(__dirname, './dist'),
      port: 8080,
      hot: false
    }
  }
}