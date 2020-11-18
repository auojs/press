import path from 'path';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader-v16';
import AuoPress from '../AuoPress';

const config: webpack.Configuration = {
  mode: 'development',
  // 入口
  entry: '',
  // 出口
  output: {
    // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, 'dist'), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
    filename: 'bundle.js',
    // string    // 输出解析文件的目录，url 相对于 HTML 页面
    publicPath: '/assets/',
    // 导出库(exported library)的名称
    library: 'MyLibrary', // string,
    // 通用模块定义    // 导出库(exported library)的类型
    libraryTarget: 'umd'
  },
  // 模块配置
  module: {
    rules: [
      {
        test: /\.jsx?$/
      }
    ]
  },
  // 解析模块选项
  resolve: {},
  devtool: '',
  context: '',
  target: 'web',
  externals: [],
  stats: 'none',
  // devServer: {},
  plugins: []
};

export default config;

export function createBaseConfig(context: AuoPress): webpack.Configuration {
  const { outDir } = context.config;
  return {
    mode: 'production',
    output: {
      path: outDir,
      filename: 'assets/js/[name].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.md', '.js', 'jsx', '.vue', '.json', '.less']
    },
    module: {
      rules: [
        {
          test: /\.vue?$/,
          loader: 'vue-loader-v16'
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  };
}
