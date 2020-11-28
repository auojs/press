import { fs, path } from '@auojs/shared-utils';

/**
 * 插件缓存到文件
 */
export default class PluginTemp {
  public tempdir: string; // 插件存放根目录
  private cache: Map<string, string> = new Map(); // 插件缓存数据

  constructor(tempdir: string) {
    this.tempdir = tempdir;
  }

  /**
   * 写到文件
   * @param file 文件名，基于tempdir存放
   * @param content 保存内容
   * @return 返回完整文件名
   */
  async writeFile(file: string, content: string) {
    const destPath = path.join(this.tempdir, file);
    await fs.ensureDir(path.parse(destPath).dir);

    // 查询缓存数据
    const cached = this.cache.get(file);
    if (cached !== content) {
      await fs.writeFile(destPath, content);
      this.cache.set(file, content);
    }
    return destPath;
  }
}
