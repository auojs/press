import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader-v16';
import AuoPress from '../AuoPress';

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
