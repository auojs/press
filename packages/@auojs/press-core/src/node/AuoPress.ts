import path from 'path';
import BuildProcess from './process/build';
import DevProcess from './process/dev';
import { generateRoutes } from './generateRoute';

export interface AuoPressConfig {
  // 运行路径 D:\docs\
  sourceDir: string;
  auopressDir?: string;
  outDir?: string;
}

export default class AuoPress {
  public config: AuoPressConfig;
  public buildProcess: BuildProcess;
  public devProcess: DevProcess;

  constructor(config: AuoPressConfig) {
    this.config = config;

    console.log(
      this.config,
      '----',
      JSON.stringify(generateRoutes(this.config.sourceDir))
    );

    // 配置目录
    if (!this.config.auopressDir) {
      this.config.auopressDir = path.resolve(
        this.config.sourceDir,
        '.auopress'
      );
    }

    if (!this.config.outDir) {
      this.config.outDir = path.resolve(this.config.auopressDir, 'dist');
    }
  }

  async process() {
    this.devProcess = new DevProcess(this);
  }

  applyPlugins() {}

  async build() {
    this.buildProcess = new BuildProcess(this);
    await this.buildProcess.process();
    await this.buildProcess.render();
    return this;
  }

  async dev() {
    this.devProcess = new DevProcess(this);
    await this.devProcess.process();
    const error = await new Promise((reslove) => {
      try {
        this.devProcess.createServer();
        this.devProcess.listen(reslove);
      } catch (err) {
        reslove(err);
      }
    });

    if (error) {
      throw error;
    }

    return this;
  }
}

/** 用户配置 */
export interface AuoPressClientConfig {
  base: string;
  title: string;
  description: string;
  head: Array<any>;
  host: string;
  port: number;
  temp: string;
  dest: string;
  locales: any;
  shouldPrefetch: Function;
  cache: boolean | string;
  extraWatchFiles: Array<string>;
  patterns: any;
  theme?: string | object;
  themeConfig?: object;
}
