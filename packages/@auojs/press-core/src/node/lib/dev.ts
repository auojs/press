import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import AuoPress from '../AuoPress';
import { createClientConfig } from '../webpack/createClientConfig';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export function compile(config: webpack.Configuration) {
  return new Promise((resolve, reject) => {
    webpack(config, (err: Error, stats: webpack.Stats) => {
      if (err) {
        reject(err);
      }
      if (stats.hasErrors()) {
        stats.toJson().errors.forEach((error: any) => {
          console.error(error);
        });
        reject(new Error(`Failed to compile with errors.`));
        return;
      }
    });
  });
}

export default class DevProcess {
  private webpackConfig: webpack.Configuration;
  private server: WebpackDevServer;
  private context: AuoPress;

  constructor(context: AuoPress) {
    this.context = context;
  }

  async process() {
    this.getWebpackConfig();
  }

  async createServer() {
    const serverConfig: WebpackDevServer.Configuration = {
      hot: true,
      quiet: true,
      headers: {
        'access-control-allow-origin': '*'
      },
      publicPath: '/',
      contentBase: this.context.config.outDir
    };
    WebpackDevServer.addDevServerEntrypoints(this.webpackConfig, serverConfig);

    const compiler = webpack(this.webpackConfig);
    this.server = new WebpackDevServer(compiler, serverConfig);
    return this;
  }

  listen(prot: number, hostname: string, callback?: Function) {
    this.server.listen(prot, hostname, (err) => {
      if (callback) {
        callback(err);
      }
    });
  }

  getWebpackConfig() {
    this.webpackConfig = createClientConfig(this.context);
    if (this.webpackConfig.plugins) {
      this.webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '../../cliemt/index.html')
        })
      );
    }

    console.log(path.resolve(__dirname, '../../cliemt/index.html'), 'template');

    // console.log(this.webpackConfig, 'this.webpackConfig');
  }
}
