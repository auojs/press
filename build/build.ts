//
import fs from 'fs-extra';
import path from 'path';
import gulp from 'gulp';
import ts from 'gulp-typescript';
import minifyHtml from 'gulp-minify-html';
import { packagesDir } from './lib/utils';

export async function buildGulp(target: string) {
  console.log('Build 构建');

  const resolve = (p: string) => path.resolve(packagesDir, target, p);
  const tsProject = ts.createProject('tsconfig.json');

  const outDir = resolve('dist');
  const typesDir = resolve('types');

  await fs.remove(outDir);
  await fs.remove(typesDir);

  const stream = gulp.src(resolve('src/**/*.ts')).pipe(tsProject());
  stream.dts.pipe(gulp.dest(typesDir));
  stream.js.pipe(gulp.dest(outDir));

  gulp.src(resolve('src/**/*.html')).pipe(minifyHtml()).pipe(gulp.dest(outDir));
}
