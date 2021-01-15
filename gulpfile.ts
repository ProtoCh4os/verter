/* eslint-disable no-console */
import gulp from 'gulp';
import ts from 'gulp-typescript';
import uglify from 'gulp-uglify';

const tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', () =>
  tsProject.src().pipe(tsProject()).js.pipe(uglify()).pipe(gulp.dest('bin')),
);

gulp.task('default', gulp.series('typescript'));
