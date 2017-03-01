const math = require('mathjs');
const LENGTH = 7;
const PATTERN = 5;
const COLORS = 2;

module.exports =  {
    launch : () => {
        let value = possibilities();
        console.log(value)
        let total = 0;
        total += value*math.factorial(COLORS);
        console.log(total);
    }
};

function possibilities(){
    return (LENGTH-PATTERN) * (LENGTH-PATTERN);
}