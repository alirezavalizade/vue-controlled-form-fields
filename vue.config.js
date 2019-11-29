const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set(
      'vue-controlled-form-fields',
      path.resolve(__dirname, 'src')
    );
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
