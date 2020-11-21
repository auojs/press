//
import fs from 'fs-extra';
import path from 'path';
import gulp from 'gulp';
import ts from 'gulp-typescript';
import minifyHtml from 'gulp-minify-html';

import { packagesDir, targets as allTargets } from './utils';

export async function dev() {
  const watchDirs = [];
  for (const target of allTargets) {
    console.log(target);
    await devGulp(target);
    watchDirs.push(path.resolve(packagesDir, target, 'src'));
  }
}

export async function devGulp(target: string) {
  const resolve = (p: string) => path.resolve(packagesDir, target, p);
  const tsProject = ts.createProject('tsconfig.json');

  const outDir = resolve('dist');
  const typesDir = resolve('types');
  const watchDir = resolve('src');

  await fs.remove(outDir);
  await fs.remove(typesDir);

  const tsCompile = async (filename: string) => {
    const relPath = path.relative(watchDir, filename);
    const relDirname = filename.indexOf('*') <= 0 ? path.dirname(relPath) : '';
    if (filename.indexOf('*') <= 0 && !fs.existsSync(filename)) {
      const basename = path.basename(filename, '.ts');

      await fs.remove(path.resolve(outDir, relDirname, `${basename}.js`));
      await fs.remove(path.resolve(typesDir, relDirname, `${basename}.d.ts`));
      return;
    }

    const stream = gulp.src(filename).pipe(tsProject());
    stream.dts.pipe(gulp.dest(path.resolve(typesDir, relDirname)));
    stream.js.pipe(gulp.dest(path.resolve(outDir, relDirname)));
  };

  const watcher = gulp.watch(watchDir);

  watcher.on('change', tsCompile);
  watcher.on('add', tsCompile);
  watcher.on('unlink', tsCompile);

  tsCompile(resolve('src/**/*.ts'));
  gulp.src(resolve('src/**/*.html')).pipe(minifyHtml()).pipe(gulp.dest(outDir));
  gulp.src(resolve('src/**/*.vue')).pipe(gulp.dest(outDir));
}
