import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Process from '../AuoPress/Process';
import { createClientConfig } from '../webpack/createClientConfig';

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
  protected readonly context: Process;
  protected webpackConfig: webpack.Configuration;
  private server: WebpackDevServer;
  public prot = 8088;
  public hostname = 'localhost';

  constructor(context: Process) {
    this.context = context;
  }

  async process() {
    this.getWebpackConfig();
  }

  async createServer() {
    const serverConfig: WebpackDevServer.Configuration = {
      hot: true, // 启用 webpack 的模块热替换特性
      clientLogLevel: 'error',
      publicPath: '/',
      filename: 'bundle.js',
      quiet: true, // 除了初始启动信息之外的任何内容都不会被打印到控制台
      contentBase: this.context.outDir,
      overlay: false, // 错误在浏览器全屏覆盖
      compress: true, // gzip 压缩
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [{ from: /./, to: '/index.html' }]
      }
    };

    WebpackDevServer.addDevServerEntrypoints(this.webpackConfig, serverConfig);

    const compiler = webpack(this.webpackConfig);
    this.server = new WebpackDevServer(compiler, serverConfig);
    return this;
  }

  listen(callback?: (err: Error | undefined) => void) {
    this.server.listen(this.prot, this.hostname, (err) => {
      if (typeof callback === 'function') {
        callback(err);
      }
    });
  }

  getWebpackConfig() {
    this.webpackConfig = createClientConfig(this.context);

    this.webpackConfig.devtool = 'source-map';
    if (this.webpackConfig.plugins) {
      this.webpackConfig.plugins.push(new webpack.NamedChunksPlugin());
      this.webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    if (this.webpackConfig.plugins) {
      this.webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '../../client/index.html')
        })
      );
    }

    if (this.webpackConfig.output) {
      this.webpackConfig.output.publicPath = 'http://localhost:8088/';
    }
    //
  }
}
