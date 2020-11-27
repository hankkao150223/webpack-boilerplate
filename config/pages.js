const dirVars = require('./utils/dir-vars.config.js')
const pageEntries = require('./utils/page-entries.config.js')

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
      favicon: path.join(dirVars.src, favicon),
      template: path.join(dirVars.src, 'pages', template),
      chunks,
    })
  ]
})

const loadPages = () => {
  return pageEntries.map(({
    moduleName,
    templateSettings = {},
    outputPath,
  }) => {
    if (!moduleName) {
      throw new Error('moduleName is undefined');
    }
    return createPage({
      title: templateSettings.title,
      template: templateSettings.isDefault
        ? undefined
        : templateSettings.path || path.join(moduleName, 'index.html'),
      entry: {
        [moduleName]: path.join(dirVars.src, 'pages', moduleName, 'index.js'),
      },
      chunks: [moduleName, 'vendor'],
      outputPath: moduleName,
    });
  });
};

module.exports = loadPages();
