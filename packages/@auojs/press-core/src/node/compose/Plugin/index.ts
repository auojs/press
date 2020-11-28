import { path } from '@auojs/shared-utils';
import AuoPress from '../../AuoPress';
import PluginTemp from './Temp';

/**
 * 插件
 */
export default class Plugin extends PluginTemp {
  private pluginQueue: PluginAppay[] = [];
  private $cx: AuoPress;

  constructor(cx: AuoPress) {
    super(
      cx.tempDir
        ? cx.tempDir
        : path.resolve(__dirname, '../../../../.temp')
    );

    this.$cx = cx;
  }

  use(pluginRaw: () => Promise<any>, pluginOptions = {}) {
    pluginRaw().then((module: PluginAppay) => {
      if (module.apply) {
        const { name, content, dirname = 'internal' } = module.apply(
          this.$cx,
          pluginOptions
        );

        this.writeFile(`${dirname}/${name}`, content);
      }
      this.pluginQueue.push(module);
    });
  }
}

export interface PluginAppay {
  apply?: (
    content: AuoPress,
    options: any
  ) => { name: string; content: string; dirname?: string };
}
