import { fs, path, yaml } from '.';

interface ConfigRules {
  test: RegExp;
  loader: (str: string) => any;
}

export default class Config<T> {
  [x: string]: any;

  constructor(dir: string, filename: string) {
    for (const suf of this.suffix) {
      this.filename = path.resolve(dir, `${filename}.${suf}`);
      if (fs.existsSync(this.filename)) {
        this.config = this.readConfig(suf);
        break;
      }
    }
  }
  static rules: ConfigRules[];
  filename: string;
  config: T;
  suffix: string[] = ['js', 'json', 'yaml', 'toml']; // 配置后缀名

  private readConfig(extension: string) {
    if (extension === 'js') {
      return require(this.filename);
    }
    const content = fs.readFileSync(this.filename, 'utf-8');
    let data;

    switch (extension) {
      case 'yml':
      case 'yaml':
        data = yaml.safeLoad(content);
        break;
      case 'json':
        data = JSON.parse(content);
        break;
    }

    return data || {};
  }

  toConfig() {
    return this.config;
  }

  toString() {
    return JSON.stringify(this.config);
  }
}
