var fs = require('fs');

fs.readdir(process.argv[2], function(err, data) {
    if(err) throw err;
    data.forEach(function(filename) {
        var pointIndex = filename.lastIndexOf('.');
        if(pointIndex < 0) return;
        var extend = filename.slice(pointIndex + 1);
        var isWanted = extend === process.argv[3];
        if(isWanted) {
            console.log(filename);
        }
    });
})