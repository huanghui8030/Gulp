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



