const http = require('http');
const ConcatStream = require('concat-stream');

var results = {};
var count = 0;

function printAllResults () {
    for(let i = 0; i < 3; i++) {
        console.log(results[i]);
    }
}
/**
 * queue the result and keep track of how many urls have return the complete result
 * @param {*} index 
 */
function simpleRequest(index) {
    http.get(process.argv[2 + index], (response) => {
        response.setEncoding('utf8');
        response.pipe(new ConcatStream((body) => {
            results[index] = body;
            count++;
            if(count === 3) {
                printAllResults();
                console.log(Date.now() - startTime);
            }
        }));
    });
};

const startTime = Date.now();
for(let i = 0; i < 3; i++) {
    simpleRequest(i);
}