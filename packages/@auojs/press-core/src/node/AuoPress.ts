import path from 'path';
import BuildProcess from './build';

export interface AuoPressConfig {
  // 运行路径 D:\docs\
  sourceDir: string;
  auopressDir?: string;
  outDir?: string;
}

export default class AuoPress {
  public config: AuoPressConfig;
  public buildProcess: BuildProcess;

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

  async process() {}

  async build() {
    this.buildProcess = new BuildProcess(this);
    await this.buildProcess.process();
    await this.buildProcess.render();
    return this;
  }
}
