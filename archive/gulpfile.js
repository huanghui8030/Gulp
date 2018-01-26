/**
 * @description gulp配置文件，整合css/js/images等自动化插件
 * @author huanghui
 * @date 20160808
 */
var gulp = require('gulp'),                     //本地安装gulp所用到的地方
    less = require('gulp-less'),                //less文件转为css
    autoprefixer = require('gulp-autoprefixer'),//css添加厂商前缀
    csslint = require('gulp-csslint'),          //检查css语法
    rename = require('gulp-rename'),            //重命名
    cssmin = require('gulp-clean-css'),         //压缩css
    concatCss = require('gulp-concat-css'),
    watch = require('gulp-watch'),              //即时编译
    assetRev = require('gulp-asset-rev'),	      //添加版本号
    concat = require('gulp-concat'),             //js合并
    uglify = require('gulp-uglify'),             //js压缩
    clean = require('gulp-clean'),               //删除文件，做操作前先删除文件
    imgmin = require('gulp-imagemin');         //图片压缩

var ArrAll = {
    lessDir : 'src/css/less',      //需要解析的less文件目录
    cssDir : 'src/css',       //需要解析的less文件目录
    cssRes : 'dist/css', //生成的css目录
    cssMin : 'dist/css' ,    //生成的min.css目录
    jsSrc : 'src/js',         //js目录
    jsRes : 'dist/js',   //js目录
    jsMin : 'dist/js',       //生成的min.js目录
    imgSrc : 'src/images',   //原图片路径
    imgMin: 'dist/images',  //图片生成路径 
    htmlDir : 'src/html',     //html目录
    htmlminDir : 'dist/html'
};   

/**
 * @description：将less转化为css、加厂商前缀、css文件中链接加入版本号、重命名和压缩等
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('testLess', function () {
    gulp.src([ArrAll.lessDir+'/*.less','!'+ArrAll.lessDir+'/_*.less']) //该任务针对的文件和不对其进行处理的文件
        .pipe(less())                      //将less转化为css
        .pipe(autoprefixer({               //加厂商前缀
            browsers: ['Android 2.3','Android >= 4','iOS >= 6',
              'Explorer >= 6','Chrome >= 20','Firefox >= 24','Opera >= 12'],
            cascade: true,                  //是否美化属性值 默认：true 
            remove:true                     //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(assetRev())                   //给css中的链接添加版本号
        .pipe(gulp.dest(ArrAll.cssDir))     //生成css文件，less放到css源目录中，然后在同一压缩
       //.pipe(rename({ suffix: '.min' }))   //重新命名，添加后缀名
       // .pipe(cssmin())                     //压缩css
       //.pipe(gulp.dest(ArrAll.cssDir)); //生成压缩文件
});

/**
 * @description：css代码检查
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
var postcss     = require('gulp-postcss'),
	reporter    = require('postcss-reporter'),
	stylelint   = require('stylelint');
gulp.task('testCssLint', function() {

  // 检查规则
  var stylelintConfig = {
    "rules": {
     // "adjoining-classes": true,
      "block-no-empty": true,
	  "color-no-invalid-hex": true,
	  "declaration-colon-space-after": "always",
	  "declaration-colon-space-before": "never",
	  "function-comma-space-after": "always",
	//  "function-url-quotes": "double",
	  "media-feature-colon-space-after": "always",
	  "media-feature-colon-space-before": "never",
	 // "media-feature-name-no-vendor-prefix": true,
	  "max-empty-lines": 5,
	  "number-leading-zero": "never",
	  "number-no-trailing-zeros": true,
	  //"property-no-vendor-prefix": true,
	  "selector-list-comma-space-before": "never",
	  "selector-list-comma-newline-after": "always",
	  //"selector-no-id": true,  //Id是否能作为选择器
	  "string-quotes": "double",
	 //"value-no-vendor-prefix": true
    }
  }

  var processors = [
    stylelint(stylelintConfig),
    // Pretty reporting config
    reporter({
      clearMessages: true,
      throwError: false
    })
  ];

  return gulp.src(
      // 需要检查的css列表
      ['src/css/res/*.css']
    )
    .pipe(postcss(processors));
});
/**
 * @description：css文件合并，不解析的js以下划线开头"_test.js"
 * @author：huangh@chsi.com.cn 
 * @date：20160805
 **/
gulp.task('concatCss',function(){
  gulp.src(ArrAll.cssDir+'/*.css')
      .pipe(concatCss('archive.css'))
      .pipe(autoprefixer({               //加厂商前缀
            browsers: ['Android 2.3','Android >= 4','iOS >= 6',
              'Explorer >= 6','Chrome >= 20','Firefox >= 24','Opera >= 12'],
            cascade: true,                  //是否美化属性值 默认：true 
            remove:true                     //是否去掉不必要的前缀 默认：true 
        }))
      .pipe(assetRev())                   //给css中的链接添加版本号
      .pipe(gulp.dest(ArrAll.cssRes))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cssmin())
      .pipe(gulp.dest(ArrAll.cssMin));
});

/**
 * @description：js文件处理，js合并，不解析的js以下划线开头"_test.js"
 * @author：huangh@chsi.com.cn 
 * @date：20160805
 **/
gulp.task('jsConcat',function(){
  gulp.src(ArrAll.jsSrc+'/*.js')
      .pipe(concat('archive.js'))
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
  gulp.src([ArrAll.jsSrc+'/*.js','!'+ArrAll.jsSrc+'/_*.js'])
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest(ArrAll.jsMin));
});

//图片处理
gulp.task('imgmin',function(){
  gulp.src(ArrAll.imgSrc+'/*.{png,jpg,gif,ico}')
      .pipe(imgmin({
          optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
          progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
          interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
          multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
      }))
      .pipe(gulp.dest(ArrAll.imgMin))
});


//html页面引用时加入版本号
gulp.task('htmlRev',function() {
    gulp.src([ArrAll.htmlDir+'/*.html'])
        .pipe(assetRev())
        .pipe(gulp.dest(ArrAll.htmlDir));
});

/**
 * @description：clean清空文件夹
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('clean',function(){
  gulp.src([ArrAll.cssRes,ArrAll.cssMin,ArrAll.jsRes,ArrAll.jsMin])
      .pipe(clean())
});

/**
 * @description：即时编译文件文件
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('watch',function(){
  gulp.watch(ArrAll.lessDir+'/*.less',['testLess']);   //less解析为css，并进行优化处理
  gulp.watch(ArrAll.cssDir+'/*.css',['concatCss']);   //合并css文件，并进行优化处理
  gulp.watch(ArrAll.jsSrc+'/*.js',['jsConcat']);
 // gulp.watch([ArrAll.jsSrc+'/*.js','!'+ArrAll.jsSrc+'/_*.js'],['jsMin']);
  gulp.watch(ArrAll.htmlDir+'/*.html',['htmlRev']);
});

/**
 * @description：默认任务
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('default',['clean'],function(){
	gulp.start(['watch','concatCss','jsConcat']);
});

