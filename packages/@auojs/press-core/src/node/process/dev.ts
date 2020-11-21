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
  protected readonly context: AuoPress;
  protected webpackConfig: webpack.Configuration;
  private server: WebpackDevServer;
  public prot: number = 8088;
  public hostname: string = 'localhost';

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
      publicPath: 'http://localhost:8088',
      contentBase: this.context.config.outDir,
      historyApiFallback: true
    };

    WebpackDevServer.addDevServerEntrypoints(this.webpackConfig, serverConfig);

    const compiler = webpack(this.webpackConfig);
    this.server = new WebpackDevServer(compiler, serverConfig);
    return this;
  }

  listen(callback?: Function) {
    this.server.listen(this.prot, this.hostname, (err) => {
      if (typeof callback === 'function') {
        callback(err);
      }
    });
  }

  getWebpackConfig() {
    this.webpackConfig = createClientConfig(this.context);
    if (this.webpackConfig.plugins) {
      this.webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '../../client/index.html')
        })
      );
    }

    if (this.webpackConfig.output) {
      this.webpackConfig.output.publicPath = 'http://localhost:8088';
    }
    //
  }
}
