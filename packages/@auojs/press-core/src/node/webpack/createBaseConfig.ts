// import { path } from '@auojs/shared-utils';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader-v16';
import AuoPress from '../AuoPress';

export function createBaseConfig(context: AuoPress): webpack.Configuration {
  const { outDir } = context.config;

  const isProd = process.env.NODE_ENV === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    output: {
      path: outDir,
      filename: 'assets/js/[name].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.md', '.js', 'jsx', '.vue', '.json', '.less'],
      alias: {
        // '@internal': path.resolve(tempPath, 'internal')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader-v16'
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  sourceMap: true,
                  javascriptEnabled: true
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  };
}
