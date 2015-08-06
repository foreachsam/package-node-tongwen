
var fs = require('fs'); //https://nodejs.org/api/fs.html
var path = require('path'); //https://nodejs.org/api/path.html

function walkDir(dir) {
	var rtn = [];
	var list = fs.readdirSync(dir);

	list.forEach(function(file) {
		var filePath = path.resolve(dir, file);
		var stat = fs.statSync(filePath);
		//console.log(filePath);

		if (stat && stat.isDirectory()) {
			rtn = rtn.concat(walkDir(filePath));
		} else {
			rtn.push(filePath);
		}
	});

	return rtn;
}

function findFileListSync(data) {
	var rtn = [];
	var map = {};

	data.forEach(function(file) {
		var filePath = path.resolve(file);

		if (!fs.existsSync(filePath)) {
			//console.log('file not exist:', filePath);
			return;
		}

		var stat = fs.statSync(filePath);

		// for file
		if (stat && stat.isFile()) {
			map[filePath] = true;
			return;
		}

		// for dir
		var list = walkDir(file);
		list.forEach(function(item) {
			map[item] = true;
		});
		//console.log(list);


	});

	for (var item in map) {
		rtn.push(item);
	}

	return rtn;
}

module.exports.findFileListSync = findFileListSync;

function convertFileListSync(data, func) {
	var list = findFileListSync(data);
	list.forEach(function(file) {
		console.log('process:', file);
		var src = fs.readFileSync(file, {'encoding': 'utf-8'});
		//console.log(src);
		var des = func(src);
		//console.log(des);
		fs.writeFileSync(file, des);

	});
}

module.exports.convertFileListSync = convertFileListSync;
