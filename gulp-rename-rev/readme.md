## gulp-rename-rev

基于gulp的插件，将按照一定的规则进行命名。为了满足公司业务需求，文件进行更名操作。 

- 实现：name.js->name-n1.n2.n3.js
  - a.js -> a-1.0.0.js
  - b.min.js -> b-1.0.0.min.js
  - c-1.2.3.min.js -> c-1.2.4.min.js （n自己指定）

-  规则：
  - n1为主要版本号，一般不经常使用，若颠覆性修改可该n1。
  - n2是次主要版本号，若有较大变动可修改n2。
  - n3为小版本号，若js就改个文字等啥的，不存在兼容问题的，可仅修改n3。

## Installation安装

```bash
npm i gulp-rename-rev --save-dev
```
国内用户记得用cnpm，淘宝镜像，速度更快。

## Usage用法

- 引入：const renameRev = require('gulp-rename-rev');
- 调用：renameRev(index)
  - 参数index：1、2、3，标记是修改哪个版本号。具体见上面的【规则】。默认为3。
- 生成json格式的配置文件：renameRev.manifest()
  - 该步骤不能少，通过配置文件可以很清晰的看到本次修改了哪些文件，有一个列表
  - 缺点：目前配置文件不能累加。但在svn记录中可以找到每次修改了哪些脚本文件。

```js
const gulp = require('gulp'),
      renameRev = require('gulp-rename-rev');

gulp.task('renameRev', () =>
    gulp.src('src/*.js')
        .pipe(renameRev(index))  //参数index=1、2、3,说明是第二个参数修改版本号。
        .pipe(gulp.dest('dist'))
        .pipe(renameRev.manifest())   //  这个步骤可以不用加，如果不加，则不生成配置文件。
        .pipe(gulp.dest('dist'))
);
```

## Example实例

```js
const gulp = require('gulp'),
      renameRev = require('gulp-rename-rev');

gulp.task('renameRev', () =>
    gulp.src('src/*.js')
        .pipe(renameRev(2))  //2代表是第二个位置参数修改了，默认为3。
        .pipe(gulp.dest('dist'))
        .pipe(renameRev.manifest())
        .pipe(gulp.dest('dist'))
);
```

### before: scr/
```css
src/a.js
src/a-b-c.min.js
src/b-2.6.4.min.js
src/c-1.2.3.js
```

### after: dist/
```css
dist/a-1.0.0.js
dist/a-b-1.0.0.min.js
dist/b-2.7.4.min.js
dist/c-1.3.3.js
dist/rev-manifest.json
```
### after: rev-manifest.json

```html
{
  "a.js": "a-1.0.0.js",
  "a-b-c.min.js": "a-b-1.0.0.min.js",
  "b-2.6.4.min.js": "b-2.7.4.min.js",
  "c-1.2.3.js": "c-1.3.3.js"
}
```

## 更新日志
- v1.0.5  默认版本号改成1.0.0；有min.js文件时将其放到最后面。
- v1.0.3  提交gulp-rename-rev插件


> 主要参考：[gulp-rev](https://www.npmjs.com/package/gulp-rev) 来完成的。
