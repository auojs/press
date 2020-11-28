/** 用户配置 */
export default interface AuoPressClientConfig {
  base: string;
  title: string;
  description: string;
  head: Array<any>;
  host: string;
  port: number;
  temp: string;
  dest: string;
  locales: any;
  shouldPrefetch: () => void;
  cache: boolean | string;
  extraWatchFiles: Array<string>;
  patterns: any;
  theme?: string;
  themeConfig?: object;
}
