var fs = require('fs');

// sync form
// try {
//     var data = fs.readFileSync(process.argv[2], {
//         encoding: 'utf8'
//     });
//     console.log(data.split('\n').length - 1);
// } catch (err) {
//     console.log(err);
// }

//async form
fs.readFile(process.argv[2], {
    encoding: 'utf8'
}, function(err, data) {
    if (err) throw err;
    var lineCount = data.split('\n').length - 1;
    console.log(lineCount);
});