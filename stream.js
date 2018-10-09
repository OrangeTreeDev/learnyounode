var fs = require('fs');

var writable = fs.createWriteStream('./test.txt');
writable.write('data', 'utf8', function() {
  console.log('数据已输出');
});