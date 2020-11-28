import {
  deepReadfile,
  filereversal,
  fileToPath,
  fs,
  hash,
  path
} from '@auojs/shared-utils';
import Plugin from '../compose/Plugin';
import AuoPressClientConfig from './AuoPressClientConfig';
import AuoPressConfig from './AuoPressConfig';
import Process from './Process';

export { AuoPressClientConfig, AuoPressConfig };

export interface Page {
  key: string;
  /** 绝对路径 */
  path: string;
  /** 相对路径 */
  relativePath: string;
  /** 路径 */
  regularPath: string;
  /** 标题 */
  title: string;
}

export interface Injdata extends AuoPressClientConfig {
  pages: Page[];
}

export default class AuoPress extends Process {
  public config: AuoPressConfig;
  private plugin: Plugin = new Plugin(this);
  public tempdir: string;
  public rootdir: string;
  public siteConfig: AuoPressClientConfig; // 文件配置
  public injdata: Injdata;

  // injdata

  constructor(config: AuoPressConfig) {
    super(config);
    this.config = config;

    // 配置文件
    const configPath = path.resolve(this.auopressDir, 'config.js');
    if (fs.existsSync(this.auopressDir) && fs.existsSync(configPath)) {
      this.injdata = Object.assign({ pages: [] }, require(configPath));
    }
  }

  /**
   * 通用环境配置、编译、打包环境都可以使用
   */
  async process() {
    this.applyPlugins();
    this.initRoute();
  }

  initRoute() {
    const files = deepReadfile(this.sourceDir);
    this.injdata.pages = files.map((f) => {
      const relativePath = filereversal(path.relative(this.sourceDir, f));
      const content = fs.readFileSync(f);
      const match = content
        .toString()
        .trim()
        .match(/^#+\s+(.*)/);
      let title = '';
      if (match) {
        title = match[1];
      }
      return {
        key: `a-${hash(f)}`,
        path: f,
        relativePath,
        regularPath: fileToPath(relativePath),
        title
      };
    });
  }

  /**
   * 插件初始化
   */
  applyPlugins() {
    this.plugin.use(() => import('../internal-plugins/routes'));
    this.plugin.use(() => import('../internal-plugins/theme'));
    this.plugin.use(() => import('../internal-plugins/sitedata'));
  }
}
