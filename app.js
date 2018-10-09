var filterFiles = require('./filter');

filterFiles(process.argv[2], process.argv[3], function(err, data) {
  if (err) {
    console.log('there is an error: ', err);
  } else {
    data.forEach(function(file) {
      console.log(file);
    });
  }
});