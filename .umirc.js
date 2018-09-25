const path = require('path');
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      // dynamicImport: true,
      title: 'umi-framework',
      pwa: false,
      routes: {
        exclude: [
          /models/,
          /services/,
          /_components/,
        ],
      },
      dll: {
        exclude: [],
        // include: ['dva', "dva/router", "dva/saga", "dva/fetch", "antd/es", 'lodash'],
      },
      hardSource: true,
    }],
  ],
  alias: {
    bcomponents: path.resolve(__dirname, './src/bcomponents'),
    config: path.resolve(__dirname, './src/config'),
    components: path.resolve(__dirname, './src/components'),
    utils: path.resolve(__dirname, './src/utils'),
    pages: path.resolve(__dirname, './src/pages'),
    services: path.resolve(__dirname, './src/services'),
    assets: path.resolve(__dirname, './src/assets'),
  },
}
