var arguments = process.argv.slice(2);
var sum = arguments.reduce((sum, current) => {
  return sum + Number(current);
}, 0);
console.log(sum);