
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
        include: ['dva', "dva/router", "dva/saga", "dva/fetch", "antd/es", "jsplumb", "react-ace", 'lodash'],
      },
      hardSource: true,
    }],
  ],
}
