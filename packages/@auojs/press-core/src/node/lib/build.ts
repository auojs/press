import webpack from 'webpack';
import AuoPress from '../AuoPress';
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

export default class BuildProcess {
  private webpackConfig: webpack.Configuration;
  private context: AuoPress;
  constructor(context: AuoPress) {
    this.context = context;
  }

  async process() {
    this.getWebpackConfig();
  }

  async render() {
    compile(this.webpackConfig);
  }

  getWebpackConfig() {
    this.webpackConfig = createClientConfig(this.context);
  }
}
