const dirVars = require('./utils/dir-vars.config.js')
const pages = require('./pages');

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')

const commonConfig = {
  // Where webpack outputs the assets and bundles
  entry: {
    // vendor: [
    //   // not use npm mange js that third party lib
    // ],
  },
  output: {
    path: dirVars.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: dirVars.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },

      // Images: Copy image files to build folder
      {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

      // Fonts and SVGs: Inline files
      {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
    ],
  },
}

module.exports = merge(commonConfig, ...pages);
