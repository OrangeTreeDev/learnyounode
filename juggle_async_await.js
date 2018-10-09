
const http = require('http');
const ConcatStream = require('concat-stream');

function simpleRequest(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            response.setEncoding('utf8');
            response.pipe(new ConcatStream((body) => {
                resolve(body);
            }));
        })
    })
}

async function getResultInSequence() {
    const startTime = Date.now();
    for(let i = 0; i < 3; i++) {
        const result = await simpleRequest(process.argv[2 + i]);
        console.log(result);
    }
    console.log(Date.now() - startTime);
}
getResultInSequence();