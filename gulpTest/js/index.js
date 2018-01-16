"use strict";

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-asset-rev';

var ASSET_REG = {
    "SCRIPT": /(<script[^>]+src=)['"]([^'"]+)["']/ig,
    "STYLESHEET": /(<link[^>]+href=)['"]([^'"]+)["']/ig,
    "IMAGE": /(<img[^>]+src=)['"]([^'"]+)["']/ig,
    "BACKGROUND": /(url\()(?!data:|about:)([^)]*)/ig
};

var createHash = function (file, len) {
    return crypto.createHash('md5').update(file).digest('hex').substr(0, len);
};

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {

        options = options || {};

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        var content = file.contents.toString();

        var filePath = path.dirname(file.path);

        for (var type in ASSET_REG) {
            if (type === "BACKGROUND" && !/\.(css|scss|less)$/.test(file.path)) {

            } else {
                content = content.replace(ASSET_REG[type], function (str, tag, src) {
                    src = src.replace(/(^['"]|['"]$)/g, '');
                    
                    if (!/\.[^\.]+$/.test(src)) {
                        return str;
                    }
                    
                    if (options.verStr) {
                        src += options.verStr;
                        return tag + '"' + src + '"';
                    }
                    /**
                     * @description 截取字符串，避免出现多个版本号叠加
                     * @modify      huangh@chsi.com.cn
                     * @date        201601027
                     */
                    var hasVer = src.indexOf('?v=');
                    if(hasVer>-1){
                        src = src.substring(0,hasVer);
                    }
                    // remote resource
                    if (/^https?:\/\//.test(src)) {
                        //return str;
                        /**
                         * @description 修改远程图片版本号，如果已存在则替换
                         * @modify      huangh@chsi.com.cn
                         * @date        20160804
                         */
                        var date = new Date().getTime();
                        src = src + "?v="+date;
                        console.log('远程连接更改：'+src);
                        return tag + '"' + src + '"';
                    } 
                    var assetPath = path.join(filePath, src);
                    if (src.indexOf('/') == 0) {
                        if (options.resolvePath && typeof options.resolvePath === "function") {
                            assetPath = options.resolvePath(src);
                        } else {
                            assetPath = (options.rootPath || "") + src;
                        }
                    }
                    if (fs.existsSync(assetPath)) {
                        var buf = fs.readFileSync(assetPath);

                        var md5 = createHash(buf, options.hashLen || 7);
                        /**
                         * @description 更改文件版本号输出方式
                         * @modify      huangh@chsi.com.cn
                         * @date        20160804
                         */
                        //var verStr = (options.verConnecter || "-") + md5;
                        //src = src.replace(verStr, '').replace(/(\.[^\.]+)$/, verStr + "$1");
                        var verStr = (options.verConnecter || "") + md5;
                        var date = new Date().getTime();
                        src = src + "?v="+date;
                        console.log('本地连接更改：'+src);
                    } else {
                        /**
                         * @description 本地找不到的文件，更改文件版本号输出方式
                         * @modify      huangh@chsi.com.cn
                         * @date        20161027
                         */
                        var date = new Date().getTime();
                        
                        src = src + "?v="+date;
                        console.log('spath连接更改：'+src);
                        //return src;
                    }
                    return tag + '"' + src + '"';
                });
            }
        }

        file.contents = new Buffer(content);
        this.push(file);
        cb();
    });
};

