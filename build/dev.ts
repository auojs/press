//
import fs from 'fs-extra';
import { watch } from 'gulp';
import path from 'path';
import { defaultGulp, htmlGulp, tsGulp, vueGulp } from './lang';
import { packagesDir } from './lib/utils';

interface LangGulp {
  glob: string;
  gulp: (globs: string, outdir: string) => void;
}

interface GulpGlobs {
  [x: string]: LangGulp;
}

export async function devGulp(target: string) {
  const resolve = (p: string = '') => path.resolve(packagesDir, target, p);
  const outDir = resolve('dist');
  const typesDir = resolve('types');

  const globs: GulpGlobs = {
    ts: {
      glob: resolve('src/**/*.ts'),
      gulp: tsGulp
    },
    tsx: {
      glob: resolve('src/**/*.tsx'),
      gulp: tsGulp
    },
    html: {
      glob: resolve('src/**/*.html'),
      gulp: htmlGulp
    },
    vue: {
      glob: resolve('src/**/*.vue'),
      gulp: vueGulp
    },
    less: {
      glob: resolve('src/**/*.less'),
      gulp: defaultGulp
    },
    css: {
      glob: resolve('src/**/*.css'),
      gulp: defaultGulp
    },
    ttf: {
      glob: resolve('src/**/*.ttf'),
      gulp: defaultGulp
    }
  };

  await fs.remove(outDir);
  await fs.remove(typesDir);

  const devProcess = () => {
    Object.keys(globs).forEach((key) => {
      const wapath = path
        .relative(path.join(__dirname, '..'), globs[key].glob)
        .replace(/\\/g, '/');

      watch(
        wapath.replace('\\', '/'),
        {
          delay: 500,
          ignoreInitial: false
        },
        function (cb) {
          globs[key].gulp(globs[key].glob, resolve());
          cb();
        }
      );
    });
  };

  devProcess();
}
