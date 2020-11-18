'use strict';

var path = require('path');
var commander = require('commander');
var pressCore = require('@auojs/press-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

var index = (argv) => {
    commander.program
        .version(`@auojs/press ${require('../package.json').version}`)
        .usage('<command> [options]');
    commander.program.command('serve [entry]').action((entry, cmd) => { });
    commander.program
        .command('build [targetDir]')
        .option('-d, --dest <dest>', 'specify build output dir (default: .vuepress/dist)')
        .action((sourceDir = '.', cmd) => {
        pressCore.build({ sourceDir: path__default['default'].resolve(sourceDir) });
    });
    commander.program.parse(argv);
};

module.exports = index;
