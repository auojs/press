import fs from 'fs-extra';
import path from 'path';
// import chalk from 'chalk';

export const packagesDir = path.resolve(__dirname, '../packages/@auojs');

const json = (d: string) =>
  JSON.parse(fs.readFileSync(path.resolve(__dirname, d)).toString());

function getTargets(dir: string): string[] {
  return fs.readdirSync(dir).filter((f) => {
    if (!fs.statSync(path.resolve(dir, f)).isDirectory()) return false;
    const pkg = json(path.resolve(dir, f, 'package.json'));
    if (pkg.private && !pkg.buildOptions) return false;
    return true;
  });
}

export const targets = getTargets(packagesDir);
