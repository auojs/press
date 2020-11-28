import fs from 'fs-extra';
import path from 'path';

/** lib dir */
export const packagesDir = path.resolve(__dirname, '../../packages/@auojs');

/**
 * import json
 *
 * @param d
 */
const json = (d: string) =>
  JSON.parse(fs.readFileSync(path.resolve(__dirname, d)).toString());

/**
 * get targets
 *
 * @param dir
 */
function getTargets(dir: string): string[] {
  return fs.readdirSync(dir).filter((f) => {
    if (!fs.statSync(path.resolve(dir, f)).isDirectory()) return false;
    const pkg = json(path.resolve(dir, f, 'package.json'));
    if (pkg.private && !pkg.buildOptions) return false;
    return true;
  });
}

/**
 * loop target
 *
 * @param callback
 */
export async function loopTargets(callback: Function) {
  getTargets(packagesDir).forEach((target) => callback(target));
}
