import { path } from '@auojs/shared-utils';
import BuildProcess from '../process/build';
import DevProcess from '../process/dev';


export default class Process {
  sourceDir: string;
  auopressDir: string;
  outDir: string;
  tempDir: string;
  rootDir: string;
  public buildProcess: BuildProcess;
  public devProcess: DevProcess;

  constructor({ sourceDir, outDir, auopressDir, tempDir, rootDir }: any) {
    this.sourceDir = sourceDir || this.sourceDir; // 应用目录
    this.auopressDir = auopressDir || path.resolve(this.sourceDir, '.auopress'); // 配置目录
    this.outDir = outDir || path.resolve(this.auopressDir, 'dist'); // 输出目录
    this.rootDir = rootDir || __dirname; // 包目录
    this.tempDir = tempDir || path.resolve(this.rootDir, '.temp'); // 临时数据存放目录
  }

  /**
   * 编译
   */
  async build() {
    this.buildProcess = new BuildProcess(this);
    await this.buildProcess.process();
    await this.buildProcess.render();
    return this;
  }

  /**
   * 开发
   */
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
