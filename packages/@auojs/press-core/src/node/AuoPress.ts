import path from 'path';
import BuildProcess from './lib/build';
import DevProcess from './lib/dev';

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

  async build() {
    this.buildProcess = new BuildProcess(this);
    await this.buildProcess.process();
    await this.buildProcess.render();
    return this;
  }

  async dev() {
    this.devProcess = new DevProcess(this);
    await this.devProcess.process();
    this.devProcess.createServer();
    this.devProcess.listen(8088, 'localhost');
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
