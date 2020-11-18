import path from 'path';
import { program } from 'commander';
import { build } from '@auojs/press-core';

var index = (argv) => {
    program
        .version(`@auojs/press ${require('../package.json').version}`)
        .usage('<command> [options]');
    program.command('serve [entry]').action((entry, cmd) => { });
    program
        .command('build [targetDir]')
        .option('-d, --dest <dest>', 'specify build output dir (default: .vuepress/dist)')
        .action((sourceDir = '.', cmd) => {
        build({ sourceDir: path.resolve(sourceDir) });
    });
    program.parse(argv);
};

export default index;
