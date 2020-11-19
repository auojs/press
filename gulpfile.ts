import fs from 'fs-extra';
import path from 'path';
import gulp from 'gulp';
import ts from 'gulp-typescript';
import minifyHtml from 'gulp-minify-html';

const packagesDir = path.resolve(__dirname, 'packages/@auojs');

async function createTargetTask(dir: string) {
  const resolve = (p: string) =>
    path.resolve(__dirname, 'packages/@auojs', dir, p);
  const tsProject = ts.createProject('tsconfig.json');

  const distDir = resolve('dist');
  const typeDir = resolve('types');

  // 移除编译目录
  await fs.remove(distDir);
  await fs.remove(typeDir);

  const tsRes = gulp.src(resolve('src/**/*.ts')).pipe(tsProject());
  tsRes.dts.pipe(gulp.dest(typeDir));
  tsRes.js.pipe(gulp.dest(distDir));

  gulp
    .src(resolve('src/**/*.html'))
    .pipe(minifyHtml())
    .pipe(gulp.dest(distDir));
}

function requireJson(dir: string) {
  const content = fs.readFileSync(path.resolve(__dirname, dir));
  return JSON.parse(content.toString());
}

const targets = (exports.targets = fs.readdirSync(packagesDir).filter((f) => {
  const packageDir = path.resolve(packagesDir, f);
  if (!fs.statSync(packageDir).isDirectory()) {
    return false;
  }

  const pkg = requireJson(path.resolve(packageDir, 'package.json'));
  if (pkg.private && !pkg.buildOptions) {
    return false;
  }
  return true;
}));

function build(cb: any) {
  targets.forEach((key) => {
    createTargetTask(key);
  });
  cb();
}

exports.build = build;
