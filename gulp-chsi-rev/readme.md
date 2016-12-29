## gulp-chsi-rev

基于gulp.js的插件，文件添加版本号。方式如下。

## Installation安装

```bash
npm install gulp-chsi-rev
```

## Usage用法

```js
var gulp = require('gulp');
var chsiRev = require('gulp-chsi-rev');

gulp.task('rev',function() {
    gulp.src("./test/test.html")
        .pipe(chsiRev())
        .pipe(gulp.dest('./'));
});
```

## Example实例

```js
var gulp = require('gulp');
var chsiRev = require('gulp-chsi-rev');

gulp.task('rev',['revCss'],function() {
    gulp.src("./test/test.html")
        .pipe(chsiRev())
        .pipe(gulp.dest('./dest'));
});

gulp.task('revCss',function () {
    return gulp.src('./test/styles/test.css')
        .pipe(chsiRev())
        .pipe(gulp.dest('./dest/styles/'))
});
gulp.task('default',['rev']);
```

### before: test.css
```css
body{background:url('../images/bg.png')}
```

### after: test.css
```css
body{background:url("../images/bg.png?v=1482737522923")}
```
### before: test.html
```html
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title></title>
    <link rel="stylesheet" href="./styles/test.css" type="text/css" />
</head>
<body>
    <div>
        <img src="./images/test.png" />
    </div>
    <script src="./scripts/test.js" type="text/javascript"></script>
</body>
</html>
```
### after: test.html

```html
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title></title>
    <link rel="stylesheet" href="./styles/test.css?v=1482737522924" type="text/css" />
</head>
<body>
    <div>
        <img src="./images/test.png?v=148273752295" />
    </div>
    <script src="./scripts/test.js?v=1482737522926" type="text/javascript"></script>
</body>
</html>
```

## 更新日志
- v1.0.0 初版，添加时间戳版本号
- v1.0.1 删除掉无用的注释
- v1.0.2 添加spath访问，可添加版本号
- v1.0.3 链接后面已有参数时，不能再加用“？”，需要改成“&”

