const paths = require('./paths')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const createPage = ({
  outputPath = '',
  title = 'What\'s your title',
  favicon = `${paths.src}/images/favicon.png`,
  template = `${paths.src}/template.html`,
  entry,
  chunks,
} = {}) => ({
  entry,
  plugins: [
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      filename: `${outputPath && outputPath + '/'}index.html`,
      title,
      favicon,
      template,
      chunks,
    })
  ]
})

const combinePagePath = (pageName) => path.join(paths.src, 'pages', pageName, 'index.js')

module.exports = [
  createPage({
    title: 'Home',
    entry: {
      home: combinePagePath(''),
    },
    chunks: ['home', 'vendor'],
  }),
  createPage({
    title: 'About',
    entry: {
      about: combinePagePath('about'),
    },
    outputPath: 'about',
    chunks: ['about', 'vendor'],
  }),
  createPage({
    title: 'Article',
    entry: {
      article: combinePagePath('article'),
    },
    outputPath: 'article',
    chunks: ['article', 'vendor'],
  }),
];
