var ConcatStream = require('./lib/concat-stream');
var http = require('http');

http.get(process.argv[2], function(response) {
  response.setEncoding('utf8');
  var streamCollection = new ConcatStream(function(data) {
    console.log(data.length);
    console.log(data);
  });
  response.pipe(streamCollection);
});

var write = ConcatStream(function(data) {console.log(data);})