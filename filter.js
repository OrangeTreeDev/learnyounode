var fs = require('fs');
var path = require('path');

module.exports = function (dir, extname, callback) {
  fs.readdir(dir, function(err, data) {
    var files;
    if(err) {
      callback(err);
    } else {
      files = data.filter(function(file) {
        return path.extname(file).slice(1) === extname;
      });
      callback(null, files);
    }
  });    
};