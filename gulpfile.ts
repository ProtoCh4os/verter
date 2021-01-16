/* eslint-disable no-console */
import gulp from 'gulp';
import ts from 'gulp-typescript';
import uglify from 'gulp-uglify';

const tsConfig = require('./tsconfig.json');

const tsProject = ts.createProject(tsConfig.compilerOptions);

gulp.task('typescript', () =>
  gulp
    .src('./cli/**/*.ts')
    .pipe(tsProject())
    .js.pipe(uglify())
    .pipe(gulp.dest('./bin')),
);

gulp.task('default', gulp.series('typescript'));
