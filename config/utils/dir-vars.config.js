// 參考 https://github.com/Array-Huang/webpack-seed/blob/master/webpack-config/base/dir-vars.config.js

var path = require('path');

const rootDir = path.resolve(__dirname, '../../');
const srcDir = path.resolve(rootDir, './src');

module.exports = {
  src: srcDir,
  pages: path.resolve(srcDir, './pages'),
  build: path.resolve(rootDir, './dist'), // production build files
  public: path.resolve(rootDir, './public'), // static files that get copied to build folder
  // vendorDir: path.resolve(rootDir), './vendor'), // 存放所有不能用 npm 管理的第三方库
};
