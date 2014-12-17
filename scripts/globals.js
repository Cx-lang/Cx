var fs = require('fs');
var path = require('path');
var pegjs = require('pegjs');
var UglifyJS = require('uglifyjs');
var mkdirp = require('mkdirp');

var newLineChars = /(\n|\r\n|\r)/g;
global.indent = function ( data, tabs ) {
  return data.replace(newLineChars, function(m, nl){ return nl + (tabs || "  "); });
};

global.buildParser = function ( grammer ) {
  return "module.exports = " + pegjs.buildParser(grammer, {
    cache: false, output: "source", optimize: "speed", allowedStartRules: ["start"]
  }) + ";\n";
};

global.minify = function ( data ) {
  return UglifyJS.minify(data, { fromString: true }).code;
};

global.readFile = function ( filename ) {
  return fs.readFileSync(filename).toString();
};

global.writeFile = function ( filename, data ) {
  mkdirp.sync(filename);
  return fs.writeFileSync(filename, data);
};

global.exists = fs.existsSync;
global.lstat = fs.lstatSync;
global.basename = fs.basename;
global.dirname = fs.dirname;
global.extname = fs.extname;
global.join = path.join;
global.resolve = path.resolve;

global.lstat = function ( path ) {
  var stat = fs.lstatSync(path);
  stat.path = path;
  stat.basename = basename(path);
  stat.dirname = dirname(path);
  stat.extname = extname(path);
  return stat;
};

global.walk = function ( path, callback ) {
  var stat = lstat(path);
  if ( stat.isDirectory() )
    fs.readdirSync(path).forEach(function(item){
      walk(join(path, item), callback);
    });
  else
    callback(path, stat);
};