const x1 = 1694,
      y1 = 1546,
      reste = 2018,
      iterations = 50;
module.exports =  {
    launch : () => {
        calc(0, x1, y1)
        console.log();
    }
};

function calc(i, x, y) {
    i++;
    let xNext = parseInt(x + 2 * y).mod(2018);
    let yNext = parseInt(-3 * x + y).mod(2018);
    if(i === 50) {
        let declinaison = (xNext - 900)  / 10;
        let ascension = (yNext / 150) * 2;
        console.log(declinaison, ascension);
        return 'ok';
    }
    calc(i, xNext, yNext);
}

Number.prototype.mod = function(n) {
    var m = (( this % n) + n) % n;
    return m < 0 ? m + Math.abs(n) : m;
};