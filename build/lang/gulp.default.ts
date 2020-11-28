import path from 'path';
import gulp from 'gulp';

export default function htmlGulp(filename: string, outdir: string) {
  gulp.src(filename).pipe(gulp.dest(path.resolve(outdir, 'dist')));
}
