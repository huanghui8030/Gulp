const gulp = require('gulp'),
   renameRev = require('gulp-rename-rev');


//添加版本号，并将对应的文件写到json文件中。
gulp.task('rev', () =>
    gulp.src(['src/**/*.js','src/**/*.less','src/**/*.css'])
        .pipe(renameRev())
        .pipe(gulp.dest('assets'))
        .pipe(renameRev.manifest())
        .pipe(gulp.dest('assets'))
);




