# Gulp

​	[gulp官网](http://www.gulpjs.com.cn/docs/getting-started/)、[gulp入门](http://www.ydcss.com/archives/18)

## 1、基本用法

- 全局安装gulp

  ```
  $ npm install --global gulp
  ```

- 作为项目的开发依赖（devDependencies）安装

  ```
  $ npm install --save-dev gulp
  ```

- 在项目根目录下创建一个名为 `gulpfile.js` 的文件：

  ```js
  var gulp = require('gulp');
  gulp.task('default', function() {
    // 将需要执行的任务代码放在这
  });
  ```

- 运行gulp

  ```
  $ gulp
  ```

## 2、插件

- [gulp-less](http://www.ydcss.com/archives/34)：使用gulp-less插件将less文件编译成css，当有less文件发生改变自动编译less，并保证less语法错误或出现异常时能正常工作并提示错误信息。
- [gulp-livereload](http://www.ydcss.com/archives/702)：gulp-livereload拯救F5！当监听文件发生变化时，浏览器自动刷新页面。【事实上也不全是完全刷新，例如修改css的时候，不是整个页面刷新，而是将修改的样式植入浏览器，非常方便。】特别是引用外部资源时，刷新整个页面真是费时费力。
- [gulp-autoprefixer](http://www.ydcss.com/archives/94)：使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀。使用她我们可以很潇洒地写代码，不必考虑各浏览器兼容前缀。【特别是开发移动端页面时，就能充分体现它的优势。例如兼容性不太好的flex布局。】
- [gulp-concat](http://www.ydcss.com/archives/83)：使用gulp-concat合并javascript文件，减少网络请求。
- [gulp-uglify](http://www.ydcss.com/archives/54)：使用gulp-uglify压缩javascript文件，减小文件大小。
- [gulp-rev-append](http://www.ydcss.com/archives/49)：使用gulp-rev-append给页面的引用添加版本号，清除页面引用缓存。
  - gulp-asset-rev，添加版本号，不用再页面加入参数`npm install --save-dev gulp-asset-rev`
- [gulp-minify-css、gulp-clean-css](http://www.ydcss.com/archives/41)：使用gulp-minify-css压缩css文件，减小文件大小，并给引用url添加版本号避免缓存。重要：gulp-minify-css已经被废弃，请使用gulp-clean-css，用法一致。
- [gulp-imagemin](http://www.ydcss.com/archives/26)：使用gulp-imagemin压缩图片文件（包括PNG、JPEG、GIF和SVG图片），很多人安装gulp-imagemin都会出现错误，我也查了很多资料，也不知道所以然，我的做法是出错再重新安装，如果你知道问题所在，请一定告诉我！
- [gulp-htmlmin](http://www.ydcss.com/archives/20)：使用gulp-htmlmin压缩html，可以压缩页面javascript、css，去除页面空格、注释，删除多余属性等操作。
- [gulp-rename](https://github.com/hparra/gulp-rename)：重命名
- [gulp-csslint](https://github.com/lazd/gulp-csslint)：检查css语法
- [gulp-watch](https://github.com/floatdrop/gulp-watch)：及时更改文件，执行gulp操作，不用手动执行
- [gulp-asset-rev](https://www.npmjs.com/package/gulp-asset-rev)：加入版本号，修改下源码。让远程链接也可以修改版本号。
- [gulp-clean](https://www.npmjs.com/package/gulp-clean)：删除目录。[参考](http://www.cnblogs.com/1wen/p/4586198.html)
- [gulp-uncss](https://github.com/addyosmani/gulp-uncss-task) ：移除空的css元素，如果用less编译的话会自动删掉空的css元素，如果用到less则不需要改插件，因为less会自动把空的css给删除掉。
- [gulp-markdown](https://github.com/sindresorhus/gulp-markdown)：将md文件转化为html文件。
- [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith)：将多张图自动合成雪碧图。
- gulp-css-spriter：将多张图自动合成雪碧图


## 3、卸载插件

使用npm卸载插件：**npm uninstall <name> [-g][--save-dev]**  ，**不要直接删除本地插件包**

- 删除全部插件：**npm uninstall gulp-less gulp-uglify gulp-concat ……**，太麻烦**
- 借助rimraf：**npm install rimraf -g** 用法：**rimraf node_modules**


## 4、项目构建

### 新建项目

- 新建项目，将所有的css、js、images、html都放到src目录下，同时建立对应的包文件。css中放入一个less的包放less文件。 


### 前期装备

- 安装node

  - gulp是基于nodejs，理所当然需要安装nodejs，
  - 安装方法[nodejs官网](http://nodejs.org/)；
- 安装npm

  - nodejs的包管理器，用于node插件管理（包括安装、卸载、管理依赖等）。
  - 使用npm安装插件：命令提示符执行``npm install <name> [-g][--save-dev]``；
  - **name** ：node插件名称。例：```npm install gulp-less --save-dev```;
  - **-g** ：全局安装。将会安装在本地，并且写入系统环境变量；  非全局安装：将会安装在当前定位目录；  全局安装可以通过命令行在任何地方调用它，本地安装将安装在定位目录的node_modules文件夹下，通过require()调用；
  - **--save** ：将保存配置信息至package.json（package.json是[nodejs项目配置文件](http://www.ydcss.com/archives/18#lesson6)）；
  - **-dev**：保存至package.json的devDependencies节点，不指定-dev将保存至dependencies节点；一般保存在dependencies的像这些express/ejs/body-parser等等。 
- 可选择[cnpm]([http://npm.taobao.org](http://npm.taobao.org/))代替npm，速度快

  - 安装方法，执行```npm install cnpm -g --registry=https://registry.npm.taobao.org```
  - cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm
- 全局安装gulp，安装：```sudo cnpm install gulp -g```


### 新建本地配置文件

- 新建package.json文件

  - 基于nodejs项目必不可少的配置文件，放在根目录下的普通json文件

  - 如下，（json文件内不能添加注释）

    ```json
    {
      "name": "test",   //项目名称（必须）
      "version": "1.0.0",   //项目版本（必须）
      "description": "这是一个什么项目呢",   //项目描述（必须）
      "homepage": "",   //项目主页
      "repository": {    //项目资源库
        "type": "git",
        "url": "https://github.com/huanghui8030/"
      },
      "author": {    //项目作者信息
        "name": "huanghui",
        "email": "huanghui8030@qq.com"
      },
      "license": "ISC",    //项目许可协议
      "devDependencies": {    //项目依赖的插件
        "gulp": "^3.8.11",
        "gulp-less": "^3.0.0"
      }
    }
    ```

  - 可通过命令行直接生成该配置文件，```cnpm init```

  - 如果本地已有该配置文件，则通过如下命令将node_modules记载到本项目中`npm install --save-dev`

- 本地安装gulp插件

  - 项目根目录下执行安装，```cnpm install --save-dev gulp```
  - 安装gulp-less，编译less文件，```cnpm install gulp-less --save-dev```
  - 安装gulp，```cnpm install gulp --save-dev```。全局安装了gulp，项目也安装了gulp，全局安装gulp是为了执行gulp任务，本地安装gulp则是为了调用gulp插件的功能。


- 新建gulpfile.js文件

  - gulpfile.js是gulp项目的配置文件，是位于项目根目录的普通js文件（其实将gulpfile.js放入其他文件夹下亦可）

  - 示例

    ```js
    //导入工具包 require('node_modules里对应模块')
    var gulp = require('gulp'), //本地安装gulp所用到的地方
        less = require('gulp-less');
    //定义一个testLess任务（自定义任务名称）
    gulp.task('testLess', function () {
        gulp.src('src/less/index.less') //该任务针对的文件
            .pipe(less()) //该任务调用的模块
            .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
    });
    //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
    gulp.task('default',['testLess', 'elseTask']); 

     
    //gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
    //gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
    //gulp.dest(path[, options]) 处理完后文件生成路径
    ```


### 运行gulp
- gulp方法

  - 说明：命令提示符执行**gulp 任务名称**；**
  - 编译less：命令提示符执行**gulp testLess**；**
  - 当执行**gulp default**或**gulp**将会调用default任务里的所有任务[‘testLess’,’elseTask’]。

- 添加css相关插件

  - gulp-less，编译less：`cnpm install gulp-less --save-dev`

  - gulp-autoprefixer，添加厂商前缀：`cnpm install gulp-autoprefixer --save-dev`

  - gulp-csslint，检查css语法：`cnpm install gulp-csslint --save-dev`

  - gule-rename，重命名：`cnpm install gulp-rename --save-dev`

  - gulp-clean-css，压缩css：`cnpm install gulp-clean-css --save-dev`

  - gulp-watch，有改动时自动编译：`cnpm install gulp-watch --save-dev`

  - gulp-livereload，不用刷新页面： `cnpm install gulp-livereload --save-dev`

  - [gulp-csso](https://github.com/ben-eb/gulp-csso)，css属性合并： `cnpm install gulp-csso --save-dev` 没有效果

  - gulp-concat-css，合并css文件

  - css语法检查：

    - 通过stylelint来检查css语法，做代码检测工作：

    - ```
      npm install gulp-postcss postcss-reporter stylelint postcss-scss --save-dev
      ```

    - gulp-csslint，检查css语法：`cnpm install gulp-csslint --save-dev`，已测试检查不出来错误。

  - ​

- 添加js相关插件

  - gulp-concat，js合并，cnpm install gulp-concat --save-dev
  - gulp-uglify，js压缩，cnpm install gulp-uglify --save-dev
  - gulp-jslint，js代码检验，cnpm install gulp-jslin t  --save-dev  

- 添加images相关插件

  - gulp-imagemin，图片压缩，`**cnpm install gulp-imagemin --save-dev**`

