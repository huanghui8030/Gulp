const gulp = require('gulp'),
   renameRev = require('gulp-rename-rev');


//添加版本号，并将对应的文件写到json文件中。
gulp.task('rev', () =>
    gulp.src(['src/*.js'])
        .pipe(renameRev())
        .pipe(gulp.dest('dist'))
        .pipe(renameRev.manifest())
        .pipe(gulp.dest('dist'))
);
