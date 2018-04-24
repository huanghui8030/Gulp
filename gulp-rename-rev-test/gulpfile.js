const gulp = require('gulp'),
   rev = require('gulp-rev');    //添加版本号

var ArrAll = {
    jsSrc : './src',
    jsMin : './dist'
};

//添加版本号，并将对应的文件写到json文件中。
gulp.task('rev', () =>
    gulp.src('src/*.js')
        .pipe(rev(2))
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest('dist'))
);
