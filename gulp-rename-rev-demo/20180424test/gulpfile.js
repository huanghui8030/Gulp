const gulp = require('gulp'),
    rename = require('gulp-rename'),    //更名
    replace = require('gulp-replace'),  //替换
    rev = require('gulp-rev');    //添加版本号

var ArrAll = {
    jsSrc : './src',
    jsMin : './dist'
};

gulp.task('rename1',function() {
    gulp.src(ArrAll.jsSrc+'/a.js')
        .pipe(rename('b.css'))
        .pipe(gulp.dest(ArrAll.jsMin));
});

gulp.task('rename2',function() {
    gulp.src(ArrAll.jsSrc+'/a.js')
        .pipe(rename({ suffix: '-1.1.0' }))
        .pipe(gulp.dest(ArrAll.jsMin));
});


//文件替换
gulp.task('replace', function(){
  gulp.src(['src/'+'*.*'])
    .pipe(replace('src/a.js', 'dist/a-1.1.0.js'))
    .pipe(gulp.dest('dist/'));
});

//添加版本号，并将对应的文件写到json文件中。
gulp.task('rev', () =>
    gulp.src('src/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist'))
);
