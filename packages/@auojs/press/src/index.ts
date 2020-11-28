import path from 'path';
import { program } from 'commander';
import { build, dev } from '@auojs/press-core';

export function CLI(argv: string[]) {
  program
    .version(`@auojs/press ${require('../package.json').version}`)
    .usage('<command> [options]');

  program.command('serve [entry]').action((entry, cmd) => {});

  program
    .command('dev [targetDir]')
    .option(
      '-d, --dest <dest>',
      'specify build output dir (default: .vuepress/dist)'
    )
    .action((sourceDir = '.', cmd) => {
      dev({ sourceDir: path.resolve(sourceDir) });
    });

  program
    .command('build [targetDir]')
    .option(
      '-d, --dest <dest>',
      'specify build output dir (default: .vuepress/dist)'
    )
    .action((sourceDir = '.', cmd) => {
      build({ sourceDir: path.resolve(sourceDir) });
    });

  program.parse(argv);
}
