/**
 * @description gulp配置文件，整合css/js/images等自动化插件
 * @author huanghui
 * @date 20160808
 */
var gulp = require('gulp'),                     //本地安装gulp所用到的地方
    less = require('gulp-less'),                //less文件转为css
    autoprefixer = require('gulp-autoprefixer'),//css添加厂商前缀
    rename = require('gulp-rename'),            //重命名
    cssmin = require('gulp-clean-css'),         //压缩css
    concatCss = require('gulp-concat-css'),      //css合并
    rev = require('gulp-rev'),                  //文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),//路径替换
    watch = require('gulp-watch'),              //即时编译
    chsiRev = require('gulp-chsi-rev'),	      //添加版本号
    concat = require('gulp-concat'),             //js合并
    uglify = require('gulp-uglify'),             //js压缩
    clean = require('gulp-clean'),              //删除文件，做操作前先删除文件
    imgmin = require('gulp-imagemin'),         //图片压缩
    imgCache = require('gulp-cache');         //只压缩修改过的图片

var ArrAll = {
    lessDir : 'css/less',      //需要解析的less文件目录
    cssDir : 'css',       //需要解析的less文件目录
    cssRes : 'css/min', //生成的css目录
    cssMin : 'css/min' ,    //生成的min.css目录
    jsSrc : 'js',         //js目录
    jsRes : 'js',   //js目录
    jsMin : 'js',       //生成的min.js目录
    imgSrc : 'images',   //原图片路径
    imgMin: 'images',  //图片生成路径 
    jspDir : 'WEB-INF/view/jsp/',     //html目录
};   

/**
 * @description：将less转化为css、加厂商前缀、css文件中链接加入版本号、重命名和压缩等
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('commonLess', function () {
    gulp.src([ArrAll.lessDir+'/*.less','!'+ArrAll.lessDir+'/_*.less']) //该任务针对的文件和不对其进行处理的文件
        .pipe(less())                      //将less转化为css
        .pipe(autoprefixer({               //加厂商前缀
            browsers: ['Android 2.3','Android >= 4','iOS >= 6',
              'Explorer >= 6','Chrome >= 20','Firefox >= 24','Opera >= 12'],
            cascade: true,                  //是否美化属性值 默认：true 
            remove:true                     //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(rev())                   //给css中的链接添加版本号
        //.pipe(rename({ suffix: '.min' }))   //重新命名，添加后缀名
        .pipe(cssmin())                     //压缩css
        .pipe(gulp.dest(ArrAll.cssRes))  //生成css文件，less放到css源目录中，然后在同一压缩
        .pipe(rev())
        .pipe(gulp.dest(ArrAll.cssRes))     //生成压缩文件
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev'));
});

gulp.task('rev', function() {
  gulp.src(['./rev/*.json', './html/*.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    .pipe(revCollector({
            replaceReved: true}))                  //- 执行文件内css名的替换
    .pipe(gulp.dest('./html/'));          //- 替换后的文件输出的目录
});

/**
 * @description：js文件处理，js合并，不解析的js以下划线开头"_test.js"
 * @author：huangh@chsi.com.cn 
 * @date：20160805
 **/
gulp.task('jsConcat',function(){
  gulp.src(ArrAll.jsSrc+'/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest(ArrAll.jsRes))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest(ArrAll.jsMin));
});

/**
 * @description：js压缩、重命名处理，不压缩已下划线开头的js文件，例如"_test.js"
 * @author：huangh@chsi.com.cn 
 * @date：20160805
 **/
gulp.task('jsMin',function(){
  gulp.src(ArrAll.jsSrc+'/*.js')
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest(ArrAll.jsMin));
});

//图片处理
gulp.task('imgmin',function(){
  gulp.src(ArrAll.imgSrc+'/*.{png,jpg,gif,ico}')
      .pipe(cache(imgmin({
          optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
          progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
          interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
          multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
      }))
      .pipe(gulp.dest(ArrAll.imgSrc));
});

/**
 * @description：clean清空文件夹
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('clean',function(){
  gulp.src([ArrAll.cssRes])
      .pipe(clean())
});

/**
 * @description：即时编译文件文件
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('watch',function(){
	gulp.watch([ArrAll.lessDir+'/*.less','!'+ArrAll.lessDir+'/_*.less'],['commonLess']);   //less解析为css，并进行优化处理 
  gulp.watch(['./rev/*.json', './html/**/*.html'],['rev']);
});

/**
 * @description：默认任务
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('default',function(){
	gulp.start(['commonLess','watch']);
});

