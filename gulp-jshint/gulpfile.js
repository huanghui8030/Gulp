const gulp = require('gulp'),
    JSHint = require('gulp-jshint');

gulp.task('checkCode', function(){
    return gulp.src('./js/*.js')
    .pipe(JSHint())
    .pipe(JSHint.reporter('default'));
});