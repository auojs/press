import { path } from '@auojs/shared-utils';
import { VueLoaderPlugin } from 'vue-loader-v16';
import webpack from 'webpack';
import Process from '../AuoPress/Process';

export function createBaseConfig(cx: Process): webpack.Configuration {
  const { outDir, tempDir, rootDir } = cx;
  const isProd = process.env.NODE_ENV === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    output: {
      path: outDir,
      filename: 'assets/js/[name].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.md', '.js', '.jsx', '.vue', '.json', '.less'],
      alias: {
        '@internal': path.join(tempDir, 'internal'),
        '@app': path.resolve(rootDir, 'src/client')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader-v16'
        },
        {
          test: /\.md$/,
          use: ['vue-loader-v16', '@auojs/press-markdown-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                lessOptions: {
                  sourceMap: true,
                  javascriptEnabled: true
                }
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: `assets/fonts/[name].[hash:8].[ext]`
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false'
      })
    ]
  };
}
