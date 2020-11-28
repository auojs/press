import gulp from 'gulp';
import babel from 'gulp-babel';
import ts from 'gulp-typescript';
import path from 'path';

const tsSettings: ts.Settings = {
  noImplicitAny: false,
  suppressImplicitAnyIndexErrors: false,
  isolatedModules: true
};

const babelConfig = {
  presets: [['@babel/preset-env', { targets: { node: true } }]],
  plugins: ['@vue/babel-plugin-jsx']
};

export default function tsGulp(filename: string, outdir: string) {
  const tsProject = ts.createProject('tsconfig.json', tsSettings);

  const str = gulp.src(filename).pipe(tsProject());
  str.dts.pipe(gulp.dest(path.resolve(outdir, 'types')));
  str.js
    .pipe(babel(babelConfig as any))
    .pipe(gulp.dest(path.resolve(outdir, 'dist')));
}
