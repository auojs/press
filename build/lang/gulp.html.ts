import path from 'path';
import gulp from 'gulp';
import minifyHtml from 'gulp-minify-html';

export default function htmlGulp(filename: string, outdir: string) {
  gulp
    .src(filename)
    .pipe(minifyHtml())
    .pipe(gulp.dest(path.resolve(outdir, 'dist')));
}
