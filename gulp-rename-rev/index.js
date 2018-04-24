'use strict';

/**
 * @description: 为了满足公司业务需求，文件进行更名操作。 
			 * 实现：name.js->name-n1.n2.n3.js
			 * 规则：
				 * n1为主要版本号，一般不经常使用，若颠覆性修改可该n1。
				 * n2是次主要版本号，若有较大变动可修改n2。
				 * n3为小版本号，若js就改个文字等啥的，不存在兼容问题的，可仅修改n3。
 * @author huanghui8030@qq.com 
 * @data 20180424
 */

const path = require('path');
const through = require('through2');
const vinylFile = require('vinyl-file');
const revHash = require('rev-hash');
const revPath = require('rev-path');
const sortKeys = require('sort-keys');
const modifyFilename = require('modify-filename');
const Vinyl = require('vinyl');
const PluginError = require('plugin-error');

function relPath(base, filePath) {
	filePath = filePath.replace(/\\/g, '/');
	base = base.replace(/\\/g, '/');

	if (filePath.indexOf(base) !== 0) {
		return filePath;
	}

	const newPath = filePath.slice(base.length);

	if (newPath[0] === '/') {
		return newPath.slice(1);
	}

	return newPath;
}

//更名
function transformFilename(file,indexRev) {

	file.revOrigPath = file.path;
	file.revOrigBase = file.base;
	file.revHash = revHash(file.contents);

	file.path = modifyFilename(file.path, (filename, extension) => { //修改名称
		const extIndex = filename.indexOf('.');
		/*filename = extIndex === -1 ?
			revPath(filename, file.revHash) :
			revPath(filename.slice(0, extIndex), file.revHash) + filename.slice(extIndex);*/
		
		
		var rev = filename.substring(filename.lastIndexOf('-')+1);
		var overname = filename.substring(0,filename.lastIndexOf('-')) || filename;
		
		//console.log('rev:'+rev,'overname:'+overname);
		
		var revArr = rev.split(".");
		var newIndex = parseInt(indexRev)-1;

		
		var newrev = '1.1.1' ;

		if(revArr.length==3){
			revArr[newIndex] = parseInt(revArr[newIndex]) +1; 
			newrev = revArr.join(".");
		}
		var newname = overname +'-'+ newrev + extension;

		return newname;
	});
}

//获取配置文件
const getManifestFile = opts => vinylFile.read(opts.path, opts).catch(err => {
	if (err.code === 'ENOENT') {
		return new Vinyl(opts);
	}

	throw err;
});

//执行方法
const plugin = (index) => {

	const sourcemaps = [];
	const pathMap = {};
	const indexRev = index || 3; //index默认为3

	return through.obj((file, enc, cb) => {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new PluginError('gulp-rev', 'Streaming not supported'));
			return;
		}

		// This is a sourcemap, hold until the end
		if (path.extname(file.path) === '.map') {
			sourcemaps.push(file);
			cb();
			return;
		}

		const oldPath = file.path;
		transformFilename(file,indexRev);
		pathMap[oldPath] = file.revHash;

		cb(null, file);
	}, function (cb) {
		sourcemaps.forEach(file => {
			let reverseFilename;

			// Attempt to parse the sourcemap's JSON to get the reverse filename
			try {
				reverseFilename = JSON.parse(file.contents.toString()).file;
			} catch (err) {}

			if (!reverseFilename) {
				reverseFilename = path.relative(path.dirname(file.path), path.basename(file.path, '.map'));
			}

			if (pathMap[reverseFilename]) {
				// Save the old path for later
				file.revOrigPath = file.path;
				file.revOrigBase = file.base;

				const hash = pathMap[reverseFilename];
				file.path = revPath(file.path.replace(/\.map$/, ''), hash) + '.map';
			} else {
				transformFilename(file,indexRev);
			}

			this.push(file);
		});

		cb();
	});
};

//生成配置文件
plugin.manifest = (pth, opts) => {

	if (typeof pth === 'string') {
		pth = {path: pth};
	}

	opts = Object.assign({
		path: 'rev-manifest.json',
		merge: false,
		transformer: JSON
	}, opts, pth);

	let manifest = {};

	return through.obj((file, enc, cb) => {
	
		if (!file.path || !file.revOrigPath) {
			cb();
			return;
		}

		const revisionedFile = relPath(path.resolve(file.cwd, file.base), path.resolve(file.cwd, file.path));
		const originalFile = path.join(path.dirname(revisionedFile), path.basename(file.revOrigPath)).replace(/\\/g, '/');

		manifest[originalFile] = revisionedFile;

		cb();
	}, function (cb) {
		
		if (Object.keys(manifest).length === 0) {
			cb();
			return;
		}

		getManifestFile(opts).then(manifestFile => {  //生成json格式配置文件
			if (opts.merge && !manifestFile.isNull()) {

				let oldManifest = {};

				try {
					oldManifest = opts.transformer.parse(manifestFile.contents.toString());
				} catch (err) {}

				manifest = Object.assign(oldManifest, manifest);
			}

			manifestFile.contents = Buffer.from(opts.transformer.stringify(sortKeys(manifest), null, '  '));
			this.push(manifestFile);
			
			cb();

		}).catch(cb);
	});
};

module.exports = plugin;
