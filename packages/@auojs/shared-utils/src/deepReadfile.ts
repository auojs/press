import fs from 'fs-extra';
import path from 'path';

/**
 * 递归寻找文件
 *
 * @param _path 目录
 * @param extname 包含后缀
 * @param exclude 排除目录或文件。文件需后缀
 */
export default function deepReadfile(
  _path: fs.PathLike,
  extname: string[] = ['md'],
  exclude: string[] = ['.auopress']
) {
  let files: any[] = [];
  fs.readdirSync(_path).forEach((f) => {
    if (exclude.indexOf(f) === -1) {
      const file = path.resolve(_path.toString(), f);
      if (fs.statSync(file).isDirectory()) {
        files = files.concat(deepReadfile(file));
      } else {
        if (extname.indexOf(path.extname(file).slice(1)) !== -1) {
          files.push(filereversal(file));
        }
      }
    }
  });

  return files;
}

export function removeNonCodeWrappedHTML(str: string): string {
  return String(str).replace(/(^|[^><`])<.*>([^><`]|$)/g, '$1$2');
}

export function filereversal(str: string) {
  return String(str).replace(/\\+/g, '/');
}
