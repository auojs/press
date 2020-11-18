import path from 'path';
import ts from 'rollup-plugin-typescript2';

const packagesDir = path.resolve(__dirname, 'packages/@auojs');
const packageDir = path.resolve(packagesDir, process.env.TARGET);
const name = path.basename(packageDir);
const resolve = (p) => path.resolve(packageDir, p);
const pkg = require(resolve(`package.json`));
const packageOptions = pkg.buildOptions || {};

const outputConfigs = {
  esm: {
    file: resolve(`dist/${name}.esm.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  },
  umd: {
    file: resolve(`dist/${name}.umd.js`),
    format: 'umd'
  }
};

const defaultFormats = ['esm', 'cjs'];
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',');
const packageFormats =
  inlineFormats || packageOptions.formats || defaultFormats;
const packageConfigs = packageFormats.map((format) =>
  createConfig(format, outputConfigs[format])
);

export default packageConfigs;

function createConfig(format, output) {
  const entryFile = packageOptions.input || `src/index.ts`;

  const tsPlugin = ts({
    check: true,
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    tsconfigOverride: {
      compilerOptions: {},
      include: [resolve('')]
    }
  });

  return {
    input: resolve(entryFile),
    output,
    plugins: [tsPlugin]
  };
}
