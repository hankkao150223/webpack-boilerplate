const paths = require('./paths')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const createPage = ({
  outputPath = '',
  title = 'What\'s your title',
  favicon = '/images/favicon.png',
  template = '../template.html',
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
      favicon: path.join(paths.src, favicon),
      template: path.join(paths.src, 'pages', template),
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
    template: '/about/index.html',
    entry: {
      about: combinePagePath('about'),
    },
    chunks: ['about', 'vendor'],
    outputPath: 'about',
  }),
  createPage({
    title: 'Article',
    template: '/article/index.html',
    entry: {
      article: combinePagePath('article'),
    },
    chunks: ['article', 'vendor'],
    outputPath: 'article',
  }),
];
