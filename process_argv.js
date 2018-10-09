var arguments = process.argv.slice(2);
var sum = arguments.reduce((sum, item) => {
    return sum += Number(item);
}, 0);
console.log(sum);