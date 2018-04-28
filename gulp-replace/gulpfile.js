const gulp = require('gulp'),
    replace = require('gulp-replace');

gulp.task('replace',function(){
    gulp.src('html/*.html')
        .pipe(replace('js/common.js','js/common.min.js'))
        .pipe(gulp.dest('dist/'));
});